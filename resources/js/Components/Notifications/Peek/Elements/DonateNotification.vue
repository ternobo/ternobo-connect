<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link v-if="notification.sender" class="profile-xsm clickable" :href="notification.sender.slug">
						<lazy-image :src="notification.sender.profile" class="profile-xsm" img-class="profile-xsm" />
					</wire-link>
					<div v-else>
						<lazy-image src="/images/man-profile.png" class="profile-xsm" img-class="profile-xsm" />
					</div>
				</div>
				<div class="notification-text">
					<wire-link :href="`/${notification.sender.profile}`" class="notification-sender">
						<span>
							<strong>{{ notification.sender.name }}</strong> {{ __.choice("notifications.donated-your-post", 1) }}
						</span>
					</wire-link>
					<span class="notification__created">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons-outlined text-success">savings</i>
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
