<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<wire-link :href="notifications[0].sender.slug" class="profiles clickable">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xxsm" img-class="profile-xxsm" />
				</wire-link>
				<div class="notification-text">
					<wire-link class="title clickable" :href="notifications[0].sender.slug">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</wire-link>
					<div class="action">{{ __.get("notifications.replied-you") }}</div>
				</div>
			</div>
			<i class="material-icons-outlined text-muted">comment</i>
		</div>
		<div class="notification-content">
			<div class="comment-text">{{ notifications[0].comment.text }}</div>
			<div class="post-content">{{ notificationGroup.notifiable.text }}</div>
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
