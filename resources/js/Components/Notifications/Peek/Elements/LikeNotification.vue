<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link class="profile-xsm clickable" :href="notification.sender.slug"><lazy-image :src="notification.sender.profile" class="profile-xsm" img-class="profile-xsm" /></wire-link>
				</div>
				<div class="notification-text">
					<wire-link :href="`/${notification.sender.profile}`" class="notification-sender">
						<strong>{{ notification.sender.name }}</strong> {{ __.choice("notifications.liked-your-post", 1) }}
					</wire-link>
					<span class="notification__created">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons text-danger">favorite</i>
		</div>
	</div>
</template>

<script>
import NotificationPeekMixin from "../../../../Mixins/NotificationPeekMixin";
export default {
	mixins: [NotificationPeekMixin],
};
</script>

<style></style>
