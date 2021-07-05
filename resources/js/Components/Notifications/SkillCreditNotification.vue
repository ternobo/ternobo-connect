<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<wire-link class="profile-xsm clickable" :href="notifications[0].sender.slug"><lazy-image :src="notifications[0].sender.profile" class="profile-xsm" img-class="profile-xsm" /></wire-link>
					<wire-link class="profile-xsm clickable" :href="notifications[1].sender.slug" v-if="notifications[1]"><lazy-image v-if="notifications[1]" :src="notifications[1].sender.profile" class="profile-xsm" img-class="profile-xsm" /></wire-link>
				</div>
				<div class="notification-text">
					<div class="title">
						<wire-link class="clickable" :href="notifications[0].sender.slug">{{ notifications[0].sender.name }}</wire-link>
						<wire-link class="clickable" :href="notifications[1].sender.slug" v-if="notifications[1]">، {{ notifications[1].sender.name }}</wire-link>
						<span v-if="notifications.length > 2">{{ __.get("application.more-people", { number: notifications.length - 2 }) }}</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">{{ __.choice("notifications.endorsed-your-skill", notifications.length, { skill: notificationGroup.notifiable.name }) }}</div>
				</div>
			</div>
			<i class="material-icons text-muted">arrow_circle_up</i>
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
import ConnetionButtons from "../buttons/ConnetionButtons.vue";
export default {
	components: { ConnetionButtons },
	mixins: [NotificationMixin],
};
</script>
