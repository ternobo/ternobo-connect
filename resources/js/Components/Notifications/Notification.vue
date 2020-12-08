<template>
	<component :is="component" :notification="notification"></component>
</template>

<script>
import CommentLikeNotification from "./ComentLikeNotification";
import CommentNotification from "./CommentNotification";
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
		switch (this.notification.action) {
			case "like_comment":
				if (this.notification.mycomment != null) {
					this.component = CommentLikeNotification;
				}
				break;
			case "like":
				if (this.notification.post != null) {
					this.component = LikeNotification;
				}
				break;
			case "follow":
				this.component = FollowNotification;
				break;
			case "comment":
				if (this.notification.post != null) {
					this.component = CommentNotification;
				}
				break;
			case "reply":
				if (this.notification.mycomment != null) {
					this.component = ReplyNotification;
				}
				break;
			case "skill_credit":
				if (this.notification.skill != null) {
					this.component = SkillCreditNotificationVue;
				}
				break;
			case "mention":
				if (this.notification.post != null) {
					this.component = MentionNotification;
				}
				break;
		}
	},
	name: "Notification",
	props: ["notification"],
};
</script>

<style></style>
