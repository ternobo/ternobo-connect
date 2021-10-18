<template>
	<base-layout :class="{ 'justify-content-center': pages.length < 1 }">
		<div class="col-md-8" v-infinite-scroll="loadMore" :infinite-scroll-distance="5">
			<div class="w-100 d-flex align-items-center mb-4">
				<wire-link class="text-grey" href="/feedbacks">
					<i class="material-icons" style="transform: rotate(180deg)" v-if="appDirection == 'rtl'">keyboard_backspace</i>
					<i class="material-icons" v-else>keyboard_backspace</i>
					{{ __.get("application.back") }}
				</wire-link>
			</div>
			<FeedbackCard :showComment="false" :showPinned="false" :feedback="feedback"></FeedbackCard>
			<div class="mt-4">
				<strong>{{ __.choice("application.comment", 2) }}</strong>
				<feedback-replies ref="replies" :feedback="feedback.id"></feedback-replies>
			</div>
		</div>
		<sidebar-left v-if="pages.length > 0">
			<div class="card">
				<div class="people-suggestion-card-body card-body">
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
			if (this.$refs.replies) {
				this.$refs.replies.loadMore();
			}
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
