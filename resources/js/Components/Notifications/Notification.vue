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
import SkillCreditNotificationVue from './SkillCreditNotification.vue';

export default {
    data() {
        return {
            component: null
        }
    },
    created() {
        switch (this.notification.action) {
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
                this.component = CommentNotification;
                break;
        }
    },
    name: "Notification",
    props: ["notification"]
}
</script>

<style>

</style>
