const NotificationMixin = {
    props: {
        notification: {
            default: undefined,
        },
    },
    computed: {
        createdAt() {
            if (moment().isSame(this.notification.created_at, "day")) {
                return this.timeAgo(this.notification.created_at)
            }
            return this.formatTime(this.notification.created_at, "YYYY MMMM DD")
        }
    }
};
export default NotificationMixin;
