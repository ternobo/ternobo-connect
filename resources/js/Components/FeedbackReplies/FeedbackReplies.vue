<template>
	<div class="feedback-replies px-2">
		<new-feedback-reply :feedback="feedback" @submit="submit"></new-feedback-reply>
		<feedback-reply v-for="reply in feedbackReplies" v-on:deleted="feedbackReplyDelete" :feedback-reply="reply" :key="'feedback_reply_' + reply.id"></feedback-reply>
		<div class="d-flex w-100 justify-content-center align-items-center py-3" v-if="feedbackRepliesLoading">
			<loading-spinner></loading-spinner>
		</div>
	</div>
</template>

<script>
import FeedbackReply from "./FeedbackReply";
import NewFeedbackReply from "./NewFeedbackReply";
export default {
	methods: {
		submit(feedback) {
			this.feedbackReplies.unshift(feedback);
		},
		feedbackReplyDelete(feedback) {
			const index = this.feedbackReplies.indexOf(feedback);
			if (index > -1) {
				this.feedbackReplies.splice(index, 1);
				this.loadMore();
			}
		},
		loadMore() {
			if (this.next_page_url !== null && !this.feedbackRepliesLoading) {
				this.feedbackRepliesLoading = true;
				axios
					.get(this.next_page_url)
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.next_page_url = data.data.next_page_url;
							this.feedbackReplies = this.feedbackReplies.concat(data.data.data);
						}
						this.feedbackRepliesLoading = false;
					})
					.catch((error) => console.log(error))
					.then(() => (this.feedbackRepliesLoading = false));
			}
		},
	},
	props: {
		noScroll: {
			type: Boolean,
			default: false,
			required: false,
		},
		feedback: {
			type: Number,
			default: undefined,
			required: true,
		},
	},
	mounted() {
		axios
			.get(this.$APP_URL + "/feedbacks/" + this.feedback + "/replies")
			.then((response) => {
				const data = response.data;
				if (data.result) {
					this.next_page_url = data.data.next_page_url;
					this.feedbackReplies = data.data.data;
				}
				this.feedbackRepliesLoading = false;
			})
			.catch((error) => console.log(error));
	},
	data() {
		return {
			feedbackRepliesLoading: true,
			feedbackReplies: undefined,
			next_page_url: null,
		};
	},
	name: "FeedbackReplies",
	components: {
		FeedbackReply,
		NewFeedbackReply,
	},
};
</script>

<style></style>
