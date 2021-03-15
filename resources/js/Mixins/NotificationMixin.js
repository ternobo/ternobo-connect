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
            return moment(this.notificationGroup.updated_at).locale('fa').format("jDD jMMMM jYYYY");
        }
    }
};
export default NotificationMixin;
