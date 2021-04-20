<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-md-2">
					<div class="vote-box">
						<div class="feedback-votes">
							{{ votes }}
						</div>
						<loading-button :loading="loading" @click.native="voteIdea" v-if="feedback.status !== 'scheduled' && feedback.status !== 'done'" class="btn mt-1 btn-dark w-100" :class="{ voted: voted }">
							{{ voted ? "ثبت شده" : "ثبت رای" }}
						</loading-button>
					</div>
				</div>
				<div class="col-md-10">
					<div class="feedback-title mb-2">
						<div>
							<wire-link :href="'/feedbacks/' + feedback.id">
								<strong>{{ feedback.title }}</strong>
							</wire-link>
							<i class="material-icons text-grey clickable" @click="bookmark">
								{{ bookmarked ? "flag" : "outlined_flag" }}
							</i>
						</div>
						<feedback-label :feedbackId="feedback.id" :type.sync="feedback.status"> {{ feedbackStatus }} </feedback-label>
					</div>
					<p>
						{{ feedback.description }}
					</p>
					<div class="d-flex align-items-center font-12">
						<wire-link :href="'/' + feedback.user.username" class="d-flex align-items-center ml-2">
							<lazy-image :src="feedback.user.profile" class="my-0 ml-1" img-class="profile-sm" />
							<strong class="text-grey"> {{ feedback.user.name }}</strong>
						</wire-link>
						<span class="text-grey ml-1">این بازخورد را به اشتراک گذاشته است</span>
						<span class="mx-2">.</span>
						<strong class="text-grey">{{ createDate }}</strong>
						<span class="mx-2">.</span>
						<span class="text-grey" v-if="feedback.replies.length > 0">{{ feedback.replies.length }} نظر </span>
					</div>
					<div v-if="feedback.pinned_reply != null" class="pr-3 mt-3 border-right">
						<pinned-reply-card :feedbackReply="feedback.pinned_reply"></pinned-reply-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FeedbackLabel from "./FeedbackLabel";
import PersianDate from "persian-date";
import PinnedReplyCard from "./PinnedReplyCard.vue";
export default {
	data() {
		return {
			voted: false,
			loading: false,
			votes: 0,
			bookmarked: false,
		};
	},
	created() {
		this.votes = this.feedback.votes;
		this.voted = this.feedback.voted;
		this.bookmarked = this.feedback.isBookmarked;
	},
	methods: {
		bookmark() {
			this.bookmarked = !this.bookmarked;

			axios.post(this.$APP_URL + "/feedbacks/bookmark", {
				id: this.feedback.id,
			});
		},
		voteIdea() {
			this.loading = true;
			axios
				.post(this.$APP_URL + "/feedbacks/vote", {
					feedback: this.feedback.id,
				})
				.then((respone) => {
					if (respone.data.result) {
						this.voted = respone.data.vote;
						if (respone.data.vote) {
							this.votes++;
						} else {
							this.votes--;
						}
					}
				})
				.catch((error) => {
					this.$toast("خطا در برقراری ارتباط");
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	computed: {
		feedbackStatus() {
			if (this.feedback.status === "done") return "انجام شده";
			else if (this.feedback.status === "scheduled") return "برنامه‌ریزی شده";
			else if (this.feedback.status === "closed") return "بسته شده";
			else return "درحال رای گیری";
		},
		createDate() {
			return new PersianDate(Date.parse(this.feedback.created_at)).format("D MMMM YYYY");
		},
	},
	props: {
		feedback: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	components: {
		FeedbackLabel,
		PinnedReplyCard,
	},
};
</script>

