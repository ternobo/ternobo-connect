<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<wire-link :href="notifications[0].sender.slug" class="profiles clickable">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xsm" img-class="profile-xsm" />
				</wire-link>
				<div class="notification-text">
					<profile-peeking position="bottom" class="title clickable" :page="notifications[0].sender">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</profile-peeking>
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
