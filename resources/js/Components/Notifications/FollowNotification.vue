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
						<profile-peeking position="bottom" :page="notifications[0].sender" class="hover-dark">{{ notifications[0].sender.name }}</profile-peeking>
						<span class="mx-1" v-if="notifications[1]">{{ __.get("application.and") }}</span>
						<profile-peeking v-if="notifications[1]" position="bottom" :page="notifications[1].sender" class="hover-dark">{{ notifications[1].sender.name }}</profile-peeking>
						<span v-if="notifications.length > 2">{{ __.get("application.more-people", { number: notifications.length - 2 }) }}</span>
						<div class="ms-2 font-12 text-gray-medium-dark font-demibold">{{ __.choice("notifications.following-you", notifications.length) }}</div>
					</div>
					<span class="font-12 text-gray-medium-dark font-demibold">{{ createdAt }}</span>
				</div>
			</div>
			<i class="material-icons text-action">group_add</i>
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
