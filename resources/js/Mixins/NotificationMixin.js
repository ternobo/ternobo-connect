import moment from "jalali-moment";
import PostViewer from "../Components/Notifications/PostViewer";
const NotificationMixin = {
    components: {
        PostViewer
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
