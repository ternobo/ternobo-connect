<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xxsm" img-class="profile-xxsm" />
				</div>
				<div class="notification-text">
					<div class="title">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">در این محتوا از شما نام برده</div>
				</div>
			</div>
			<i class="material-icons-outlined text-action">account_circle</i>
		</div>
		<div class="notification-content">
			<post-viewer :post="notificationGroup.notifiable"></post-viewer>
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
import PostViewer from "./PostViewer.vue";
export default {
	mixins: [NotificationMixin],
	components: {
		PostViewer,
	},
};
</script>

<style>
</style>
