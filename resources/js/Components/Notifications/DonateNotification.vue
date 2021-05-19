<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link class="profile-xxsm clickable" :href="notifications[0].sender.slug"><lazy-image :src="notifications[0].sender.profile" class="profile-xxsm" img-class="profile-xxsm" /></wire-link>
					<wire-link class="profile-xxsm clickable" :href="notifications[0].sender.slug"><lazy-image v-if="notifications[1]" :src="notifications[1].sender.profile" class="profile-xxsm" img-class="profile-xxsm" /></wire-link>
				</div>
				<div class="notification-text">
					<div class="title">
						<wire-link class="clickable" :href="notifications[0].sender.slug">{{ notifications[0].sender.name }}</wire-link>
						<wire-link class="clickable" :href="notifications[1].sender.slug" v-if="notifications[1]">، {{ notifications[1].sender.name }}</wire-link>
						<span v-if="notifications.length > 2">و {{ notifications.length - 2 }} نفر دیگر</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">از محتوای شما {{ notifications.length > 1 ? "حمایت کردند" : "حمایت کرد" }}</div>
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
