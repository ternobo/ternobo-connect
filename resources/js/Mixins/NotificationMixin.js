import PostViewer from "../Components/Notifications/PostViewer";
import ProfilePeeking from "../Components/App/ProfilePeeking/ProfilePeeking.vue";

const NotificationMixin = {
    components: {
        PostViewer, ProfilePeeking,
    },
    props: {
        notificationGroup: {
            default: undefined,
        },
    },
    computed: {
        notifications() {
            return this.notificationGroup.notifications;
        },
        createdAt() {
            return this.formatTime(this.notificationGroup.updated_at, "YYYY MMMM DD")
        }
    }
};
export default NotificationMixin;
