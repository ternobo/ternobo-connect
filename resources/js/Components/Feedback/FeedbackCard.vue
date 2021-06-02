<template>
	<div class="feedback-card">
		<div class="card-body">
			<div class="feedback-actions">
				<div class="feedback-votes">
					{{ votes }}
				</div>
				<loading-button v-b-tooltip.hover.ds700 key="vote_item" :title="`ثبت رای`" :loading="loading" @click.native="voteIdea" v-if="feedback.status == 'voting' && !voted && !loading" class="btn btn-primary feedback-vote-button" :class="{ voted: voted }">
					<i class="material-icons-outlined">{{ voted ? "highlight_off" : "arrow_circle_up" }}</i>
				</loading-button>
				<loading-button v-b-tooltip.hover.ds700 key="unvote_item" :title="'برداشتن رای'" :loading="loading" @click.native="voteIdea" v-else-if="feedback.status == 'voting'" class="btn btn-primary feedback-vote-button" :class="{ voted: voted }">
					<i class="material-icons-outlined">{{ voted ? "highlight_off" : "arrow_circle_up" }}</i>
				</loading-button>
				<loading-button @click.native="bookmark" :class="{ 'text-dark': bookmarked }" class="btn feedback-flag-button">
					<i class="material-icons">
						{{ bookmarked ? "flag" : "outlined_flag" }}
					</i>
				</loading-button>
			</div>

			<div class="feedback-content">
				<wire-link class="feedback-title" :href="'/feedbacks/' + feedback.id">
					{{ feedback.title }}
				</wire-link>
				<p class="feedback-description-text">
					{{ feedback.description }}
				</p>
			</div>
			<feedback-label :feedbackId="feedback.id" :type.sync="feedback.status"> {{ feedbackStatus }} </feedback-label>
		</div>
		<div class="card-footer">
			<div class="feedback-publisher-info">
				<div class="publisher-name">
					<wire-link :href="'/' + feedback.user.username"><lazy-image :src="feedback.user.profile" class="mb-0 profile-xxsm" img-class="profile-xxsm" /> </wire-link>
					<div class="d-flex flex-column">
						<div class="d-flex align-items-center">
							<wire-link as="strong" :href="'/' + feedback.user.username" class="me-1 clickable"> {{ feedback.user.name }}</wire-link>
							<span class="text-grey">این بازخورد را به اشتراک گذاشته است</span>
						</div>
						<div class="publish_time">{{ createDate }}</div>
					</div>
				</div>
				<wire-link class="comments-viewer" v-if="showComment" :href="'/feedbacks/' + feedback.id">
					<span class="text-grey" v-if="feedback.replies.length > 0">{{ feedback.replies.length }} نظر </span>
					<i class="material-icons-outlined text-grey ms-2">comment</i>
				</wire-link>
				<div class="comments-viewer" v-else :href="'/feedbacks/' + feedback.id">
					<span class="text-grey" v-if="feedback.replies.length > 0">{{ feedback.replies.length }} نظر </span>
					<i class="material-icons-outlined text-grey ms-2">comment</i>
				</div>
			</div>
			<pinned-reply-card v-if="feedback.pinned_reply != null && showPinned" :feedbackReply="feedback.pinned_reply"></pinned-reply-card>
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
		showPinned: {
			type: Boolean,
			default: true,
			required: false,
		},
		showComment: {
			type: Boolean,
			default: true,
			required: false,
		},
	},
	components: {
		FeedbackLabel,
		PinnedReplyCard,
	},
};
</script>

