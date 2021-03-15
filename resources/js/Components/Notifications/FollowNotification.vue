<template>
	<div class="post-notification">
		<div class="notification-header">
			<div class="notification-title">
				<div class="profiles">
					<lazy-image :src="notifications[0].sender.profile" class="profile-xxsm" img-class="profile-xxsm" />
					<lazy-image v-if="notifications[1]" :src="notifications[1].sender.profile" class="profile-xxsm" img-class="profile-xxsm" />
				</div>
				<div class="notification-text">
					<div class="title">
						<span>{{ notifications[0].sender.name }}</span>
						<span v-if="notifications[1]">، {{ notifications[1].sender.name }}</span>
						<span v-if="notifications.length > 2">و {{ notifications.length - 2 }} نفر دیگر</span>
						<span class="font-weight-normal date-text">{{ createdAt }}</span>
					</div>
					<div class="action">شما را {{ notifications.length > 1 ? "دنبال می‌کنند" : "دنبال می‌کند" }}</div>
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
