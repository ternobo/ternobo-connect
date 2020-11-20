import PostViewer from "../Components/Notifications/PostViewer";
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import fa from 'javascript-time-ago/locale/fa'

TimeAgo.addLocale(fa)

const NotificationMixin = {
    components: {
        PostViewer
    },
    props: {
        notification: {
            type: Object,
            default: undefined,
        },
    },
    computed: {
        createdAt() {
            const timeAgo = new TimeAgo('fa-FA');
            return timeAgo.format(Date.parse(this.notification.created_at), 'twitter');
        }
    }
};
export default NotificationMixin;
