<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<wire-link :href="notification.sender.slug" class="profiles clickable">
					<lazy-image :src="notification.sender.profile" class="profile-xsm" img-class="profile-xsm" />
				</wire-link>
				<div class="notification-text">
					<wire-link :href="`/${notification.sender.profile}`" class="notification-sender">
						<strong>{{ notification.sender.name }}</strong> {{ __.get("notifications.replied-you") }}
					</wire-link>
					<span class="notification__created">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons-outlined text-muted">comment</i>
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
