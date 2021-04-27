<template>
	<component :is="component" :notificationGroup="notificationGroup"></component>
</template>

<script>
import CommentLikeNotification from "./ComentLikeNotification";
import CommentNotification from "./CommentNotification";
import DonateNotification from "./DonateNotification.vue";
import FollowNotification from "./FollowNotification";
import LikeNotification from "./LikeNotification";
import MentionNotification from "./MentionNotification";
import ReplyNotification from "./ReplyNotification";
import SkillCreditNotificationVue from "./SkillCreditNotification.vue";
export default {
	data() {
		return {
			component: null,
		};
	},
	created() {
		switch (this.notificationGroup.action) {
			case "like_comment":
				this.component = CommentLikeNotification;
				break;
			case "like":
				this.component = LikeNotification;
				break;
			case "follow":
				this.component = FollowNotification;
				break;
			case "comment":
				this.component = CommentNotification;
				break;
			case "reply":
				this.component = ReplyNotification;
				break;
			case "skill_credit":
				this.component = SkillCreditNotificationVue;
				break;
			case "mention":
				this.component = MentionNotification;
				break;
			case "donation":
				this.component = DonateNotification;
		}
	},
	name: "Notification",
	props: ["notificationGroup"],
};
</script>

<style></style>
