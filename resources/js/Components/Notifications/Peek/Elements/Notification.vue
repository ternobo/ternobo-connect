<template>
	<component :is="component" :notification="notification"></component>
</template>

<script>
export default {
	data() {
		return {
			component: null,
		};
	},
	created() {
		switch (this.notification.action) {
			case "like_comment":
				this.component = () => import("./ComentLikeNotification");
				break;
			case "like":
				this.component = () => import("./LikeNotification");
				break;
			case "follow":
				this.component = () => import("./FollowNotification");
				break;
			case "comment":
				this.component = () => import("./CommentNotification");
				break;
			case "reply":
				this.component = () => import("./ReplyNotification");
				break;
			case "skill_credit":
				this.component = () => import("./SkillCreditNotification");
				break;
			case "mention":
				this.component = () => import("./MentionNotification");
				break;
			case "donation":
				this.component = () => import("./DonateNotification");
				break;
			case "ternobo":
				this.component = () => import("./TernoboNotification.vue");
		}
	},
	name: "Notification",
	props: ["notification"],
};
</script>

<style></style>
