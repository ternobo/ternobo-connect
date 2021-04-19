<template>
	<div class="card shadow-0 bg-body">
		<div class="card-header d-flex align-items-center justify-content-between bg-transparent">
			<div class="d-flex align-items-center">
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
				<span class="mr-2 font-14">نظرش را ارسال کرد</span>
				<span class="mx-2">.</span>
				<span class="font-14">{{ feedbackReply_time }}</span>
			</div>

			<div class="pinned-badge mr-2" style="user-select: none">
				<i class="material-icons-outlined">push_pin</i>
				پین شده
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
