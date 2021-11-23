<template>
	<div class="my-5 ternobo-notification">
		<div class="notification-header">
			<div class="notification-info">
				<img :src="notification.icon" width="24" class="icon" />
				<div class="d-flex flex-column">
					<strong class="title">{{ notification.title }}</strong>
					<span class="subtitle">{{ createdAt }}</span>
				</div>
			</div>
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
			return this.notifications[0];
		},
	},
};
</script>

<style>
</style>