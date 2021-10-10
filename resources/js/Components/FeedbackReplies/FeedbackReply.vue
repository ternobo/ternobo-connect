<template>
	<div class="feedback-item" v-if="!deleted">
		<div class="reply-to-container" v-if="replyTo != undefined && feedbackReply.replyto.user">
			<span>
				<i class="material-icons">reply</i> {{ __.get("content/comments.reply-to") }} <strong class="font-demibold">{{ feedbackReply.replyto.user.name }}</strong>
			</span>
		</div>
		<div class="feedback-reply">
			<div class="feedback-reply-header">
				<div class="d-flex align-items-center">
					<wire-link :href="'/' + feedbackReply.user.username" class="d-flex align-items-center">
						<img :src="feedbackReply.user.profile" class="profile-xsm" />
						<div class="pagedetail">
							<span class="name">
								<strong> {{ feedbackReply.user.name }} <i v-if="feedbackReply.user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
							</span>
							<small class="short-bio" v-if="feedbackReply.user.short_bio">
								{{ feedbackReply.user.short_bio }}
							</small>
						</div>
					</wire-link>
				</div>
				<div class="d-flex align-items-center">
					<i class="material-icons-outlined me-2 text-superlight hover-dark clickable" @click="pinReply(true)" v-if="!pinned && replyTo == undefined && shared.is_admin">push_pin</i>
					<loading-spinner class="me-2" style="height: 24px; width: 24px" v-else-if="loadingPin && shared.is_admin"></loading-spinner>
					<div v-else-if="pinned" @click="pinReply(false)" class="text-action pin-icon me-2 clickable">
						<i class="material-icons-outlined">push_pin</i>
					</div>
					<span class="font-10 text-muted">{{ feedbackReply_time }}</span>
					<div>
						<dropdown-menu size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
							<template v-slot:button class="p-0">
								<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
							</template>
							<dropdown-item v-if="!checkUser(feedbackReply.user_id)">
								<div class="d-flex align-items-center" @click="showReport = true">
									<i class="material-icons-outlined text-dark">report</i>
									<div>
										<div>
											<strong> {{ __.choice("content/report.report", 1) }} </strong>
										</div>
									</div>
								</div>
							</dropdown-item>
							<dropdown-item class="hover-danger" @click="deleteComment" v-if="checkUser(feedbackReply.user_id)">
								<div class="d-flex hover-danger align-items-center">
									<i class="material-icons-outlined">delete_sweep</i>
									<div>
										<div>
											{{ __.get("application.delete") }}
										</div>
									</div>
								</div>
							</dropdown-item>
						</dropdown-menu>
					</div>
				</div>
			</div>
			<div class="feedback-reply-body">
				<div v-html="feedbackReply.text" style="unicode-bidi: plaintext; width: 100% !important; display: block; text-align: justify"></div>
			</div>
		</div>
		<div class="w-100 d-flex align-content-center justify-content-between pt-2">
			<div>
				<div class="d-flex post-likes-text text-muted clickable" v-if="feedbackReply.mutual_likes != null && feedbackReply.mutual_likes.length > 0">
					<span class="me-1">{{ __.get("content/posts.liked-text") }}</span>
					<wire-link v-if="feedbackReply.mutual_likes[0]" :href="'/' + feedbackReply.mutual_likes[0].page.slug" class="text-dark">
						<strong class="text-gray-medium-dark">{{ feedbackReply.mutual_likes[0].page.name }}</strong>
					</wire-link>
					<div v-if="feedbackReply.mutual_likes.length > 1">
						<span class="ms-1">{{ __.get("contnet/posts.and") }}</span>
						<wire-link v-if="feedbackReply.mutual_likes[1]" :href="'/' + feedbackReply.mutual_likes[0].page.slug" class="text-dark">
							<strong class="text-gray-medium-dark">{{ feedbackReply.mutual_likes[1].page.name }}</strong>
						</wire-link>
					</div>
					<span class="mx-1" v-if="feedbackReply.mutual_likes.length > 2"> {{ __.get("contnet/posts.and") }} ... </span>
				</div>
			</div>
			<div class="actions">
				<strong class="text-gray-medium-dark me-2 clickable" v-if="feedbackReply.replies_count > 0" @click="loadReplies">{{ feedbackReply.replies_count }} {{ __.choice("content/comments.reply", feedbackReply.replies_count) }}</strong>
				<i @click="loadReplies" :class="{ 'material-icons-outlined': !showReplies, 'material-icons': showReplies }" class="hover-dark me-2 clickable"> insert_comment </i>
				<i @click="likeComment" class="hover-danger clickable material-icons" v-if="feedbackReply.user.id != $store.state.user.id" :class="{ 'text-danger': liked }">
					{{ liked ? "favorite" : "favorite_border" }}
				</i>
			</div>
		</div>
		<transition name="slide">
			<div class="feedback-reply-replies" v-if="showReplies">
				<new-feedback-reply class="mb-4" @submit="submit" :feedback="feedbackReply.feedback_id" :reply-to="feedbackReply.id"></new-feedback-reply>
				<div class="replies" v-if="replyTo === undefined">
					<feedback-reply v-on:replied="submit" :reply-to="feedbackReply.id" v-for="reply in replies" v-on:deleted="feedbackReplyDelete" :feedback-reply="reply" :key="reply.id"></feedback-reply>
					<div class="w-100 d-flex p-2 justify-content-center align-items-center" v-if="repliesLoading">
						<loading-spinner></loading-spinner>
					</div>
				</div>
				<div class="w-100 d-flex align-items-center justify-content-center p-2" v-if="next_page_url !== null">
					<loading-button v-if="next_page_url !== null" @click.native="loadMore" class="btn btn-outline-dark" :loading="loadingMore">{{ __.get("application.load-more") }}</loading-button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import NewFeedbackReply from "./NewFeedbackReply";
import LoadingSpinner from "../LoadingSpinner";

import { mapState } from "vuex";
export default {
	mounted() {
		this.liked = this.feedbackReply.is_liked;
		this.pinned = this.feedbackReply.pinned;
	},
	data() {
		return {
			deleted: false,
			showReply: false,
			replies: [],
			repliesLoading: true,
			showReplies: false,
			next_page_url: null,
			loadingMore: false,
			liked: false,

			pinned: false,
			loadingPin: false,

			showPinned: false,
		};
	},
	methods: {
		pinReply(pin) {
			if (this.shared.is_admin) {
				this.pinned = pin;
				this.loadingPin = pin;
				axios
					.post("/feedback-replies/" + this.feedbackReply.id + "/pin", { pin: pin })
					.then(() => {
						this.pinned = pin;
					})
					.catch((err) => console.log(err))
					.then(() => {
						this.loadingPin = false;
					});
			}
		},
		feedbackReplyDelete() {
			const index = this.replies.indexOf(comment);
			if (index > -1) {
				this.replies.splice(index, 1);
				this.loadMore();
			}
		},
		likeComment() {
			if (this.liked) {
				this.liked = false;
			} else {
				this.liked = true;
			}
			axios.post(this.$APP_URL + "/feedback-replies/" + this.feedbackReply.id + "/like");
		},
		loadReplies() {
			this.showReplies = !this.showReplies;
			if (this.showReplies) {
				this.repliesLoading = true;
				axios
					.post(this.$APP_URL + "/feedback-replies/" + this.feedbackReply.id + "/replies")
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.next_page_url = data.data.next_page_url;
							this.replies = data.data.data;
						}
						this.repliesLoading = false;
					})
					.catch((error) => console.log(error))
					.then(() => (this.repliesLoading = false));
			}
		},
		deleteComment() {
			this.deleted = true;
			axios
				.delete("/feedback-replies/" + this.feedbackReply.feedback_id + "/replies/" + this.feedbackReply.id)
				.then((response) => {
					this.$emit("deleted", this.feedbackReply);
				})
				.catch((error) => console.log(error));
		},
		loadMore() {
			if (this.next_page_url !== null && !this.loadingMore) {
				this.loadingMore = true;
				axios
					.get(this.next_page_url)
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.next_page_url = data.data.next_page_url;
							this.replies = this.replies.concat(data.data.data);
						}
						this.loadingMore = false;
					})
					.catch((error) => console.log(error))
					.then(() => (this.loadingMore = false));
			}
		},
		submit(comment) {
			if (this.replyTo !== undefined) {
				this.$emit("replied", comment);
			} else {
				this.replies.unshift(comment);
				setTimeout(() => {
					const theComment = this.$el;
					this.$parent.$el.scrollTop += theComment.getBoundingClientRect().top;
				}, 300);
			}
		},
	},
	computed: {
		...mapState(["shared"]),
		feedbackReply_time() {
			return this.timeAgo(this.feedbackReply.created_at);
		},
	},
	components: {
		NewFeedbackReply,
		LoadingSpinner,
	},
	props: {
		replyTo: {
			default: undefined,
			required: false,
		},
		feedbackReply: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	name: "FeedbackReply",
};
</script>