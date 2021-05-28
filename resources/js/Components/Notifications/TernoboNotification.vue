<template>
	<div class="ternobo-notification">
		<div class="notification-header">
			<div>
				<strong class="title">{{ notification.title }}</strong>
				<span class="time">{{ createdAt }}</span>
			</div>

			<img src="/public/images/logo.svg" width="24" />
		</div>
		<div class="notification-content">
			{{ notification.text }}
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
	mixins: [NotificationMixin],
	computed: {
		notification() {
			return notifications[0];
		},
	},
};
</script>

<style>
</style>