<template>
	<base-layout :class="{ 'justify-content-center': pages.length < 1 }">
		<div :class="{ 'content-container-right': pages.length > 0, 'content-container-right': pages.length < 1 }" v-infinite-scroll="loadMore" :infinite-scroll-distance="5">
			<div class="w-100 d-flex justify-content-end align-items-center py-3">
				<wire-link class="text-grey" href="/feedbacks">
					بازگشت
					<i class="material-icons">keyboard_backspace</i>
				</wire-link>
			</div>
			<FeedbackCard :feedback="feedback"></FeedbackCard>

			<feedback-replies ref="replies" class="mt-3" :feedback="feedback.id"></feedback-replies>
		</div>
		<sidebar-left v-if="pages.length > 0">
			<div class="card">
				<div class="card-body px-2 py-1">
					<people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
				</div>
			</div>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import NoContent from "../../Components/NoContent";
import FeedbackCard from "../../Components/Feedback/FeedbackCard";
import FeedbackReplies from "../../Components/FeedbackReplies/FeedbackReplies.vue";

export default {
	methods: {
		loadMore() {
			this.$refs.replies.loadMore();
		},
	},
	props: {
		pages: {
			type: Array,
			default: undefined,
		},
		feedback: {
			type: Object,
			default: undefined,
		},
	},
	components: {
		NoContent,
		FeedbackCard,
		FeedbackReplies,
	},
	name: "Ideapage",
	layout: AppLayout,
};
</script>

<style></style>
