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
						<span>{{ notifications[0].sender.name }}</span>
						<div class="ms-2 font-12 text-gray-medium-dark font-demibold">{{ __.get("notifications.liked-your-comment") }}</div>
					</profile-peeking>
					<span class="ms-2 font-12 text-gray-medium-dark font-demibold">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons text-danger">favorite</i>
		</div>
		<div class="notification-content">
			<wire-link :href="`/posts/${notificationGroup.notifiable.post_id}?comment=${notifications[0].comment.id}`" class="col-md-12 py-2">{{ notifications[0].notifiable.text }}</wire-link>
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
	mixins: [NotificationMixin],
	components: {},
};
</script>

<style></style>
