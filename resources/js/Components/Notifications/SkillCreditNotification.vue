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
						<profile-peeking position="bottom" :page="notifications[0].sender">{{ notifications[0].sender.name }}</profile-peeking>
						<profile-peeking v-if="notifications[1]" position="bottom" :page="notifications[1].sender">{{ notifications[1].sender.name }}</profile-peeking>
						<span v-if="notifications.length > 2">{{ __.get("application.more-people", { number: notifications.length - 2 }) }}</span>
						<div class="ms-2 text-gray-medium-dark font-demibold">{{ __.choice("notifications.endorsed-your-skill", notifications.length, { skill: notificationGroup.notifiable.name }) }}</div>
					</div>
					<span class="text-gray-medium-dark font-demibold">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons text-muted">arrow_circle_up</i>
		</div>
	</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
import ProfilePeeking from "../App/ProfilePeeking/ProfilePeeking.vue";
import ConnetionButtons from "../buttons/ConnetionButtons.vue";
export default {
	components: { ConnetionButtons, ProfilePeeking },
	mixins: [NotificationMixin],
};
</script>
