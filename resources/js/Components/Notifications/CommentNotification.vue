<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link :href="notifications[0].sender.slug" class="profiles profile-xsm clickable">
						<lazy-image :src="notifications[0].sender.profile" class="profile-xsm" img-class="profile-xsm" />
					</wire-link>
				</div>
				<div class="notification-text">
					<profile-peeking position="bottom" class="title clickable" :page="notifications[0].sender">
						<span class="hover-dark">{{ notifications[0].sender.name }}</span>
						<div class="ms-2 font-12 text-gray-medium-dark font-demibold">{{ __.get("notifications.commented-your-post") }}</div>
					</profile-peeking>
					<span class="font-12 text-gray-medium-dark font-demibold">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons-outlined notif-icon">comment</i>
		</div>
		<div class="notification-content">
			<content-viewer :content="JSON.parse(notifications[0].comment.text)"></content-viewer>
			<post-viewer class="post-viewer" :href="`/posts/${notificationGroup.notifiable.id}?comment=${notifications[0].comment.id}`" :post="notificationGroup.notifiable"></post-viewer>
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
import PostViewer from "./PostViewer.vue";
import ContentViewer from "../PostCard/ContentViewer.vue";

export default {
	mixins: [NotificationMixin],
	components: {
		PostViewer,
		ContentViewer
	},
};
</script>