<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<wire-link as="div" :href="notifications[0].sender.slug" class="profiles clickable">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xxsm" img-class="profile-xxsm" />
				</wire-link>
				<div class="notification-text">
					<div class="title">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">برای محتوای شما نظر گذاشت</div>
				</div>
			</div>
			<i class="material-icons-outlined notif-icon">comment</i>
		</div>
		<div class="notification-content">
			<div class="comment-text">{{ notifications[0].comment.text }}</div>
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

<style></style>
