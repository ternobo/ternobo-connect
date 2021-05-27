<template>
	<div class="pinned-card">
		<div class="card-header">
			<wire-link :href="'/' + feedbackReply.user.username" class="d-flex align-items-center">
				<img :src="feedbackReply.user.profile" class="profile-sm" />
				<div class="pr-3 pagedetail">
					<span class="name">
						<strong>
							{{ feedbackReply.user.name }}
						</strong>
					</span>
				</div>
			</wire-link>
			<div class="feedback-pin-details d-flex">
				<div class="text-action mx-2 clickable">
					<i class="material-icons-outlined">push_pin</i>
				</div>
				{{ feedbackReply_time }}
			</div>
		</div>
		<div class="card-body">
			<div v-html="feedbackReply.text" style="unicode-bidi: plaintext; width: 100% !important; display: block; text-align: justify"></div>
		</div>
	</div>
</template>

<script>
import PersianDate from "persian-date";

export default {
	computed: {
		feedbackReply_time() {
			return new PersianDate(Date.parse(this.feedbackReply.created_at)).format("D MMMM YYYY");
		},
	},
	props: {
		feedbackReply: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style>
</style>
