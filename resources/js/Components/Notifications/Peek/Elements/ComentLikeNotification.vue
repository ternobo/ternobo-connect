<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link :href="notification.sender.slug" class="profiles profile-xsm clickable">
						<lazy-image :src="notification.sender.profile" class="profile-xsm" img-class="profile-xsm" />
					</wire-link>
				</div>
				<div class="notification-text">
					<wire-link :href="`/${notification.sender.profile}`" class="notification-sender">
						<span>
							<strong>{{ notification.sender.name }}</strong> {{ __.get("notifications.liked-your-comment") }}
						</span>
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
	components: {},
};
</script>

<style></style>
