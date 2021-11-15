<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link v-if="notifications[0].sender" class="profile-xsm clickable" :href="notifications[0].sender.slug">
						<lazy-image :src="notifications[0].sender.profile" class="profile-xsm" img-class="profile-xsm" />
					</wire-link>
					<div v-else>
						<lazy-image src="/images/man-profile.png" class="profile-xsm" img-class="profile-xsm" />
					</div>
				</div>
				<div class="notification-text">
					<profile-peeking position="bottom" class="title clickable" v-if="notifications[0].sender" :page="notifications[0].sender">
						<span>{{ notifications[0].sender.name }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</profile-peeking>
					<div class="title" v-else>
						<span>{{ __.get("application.guest-user") }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">{{ __.choice("notifications.donated-your-post", notifications.length) }}</div>
				</div>
			</div>
			<i class="material-icons-outlined text-success">savings</i>
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

<style></style>
