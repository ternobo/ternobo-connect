import PostViewer from "../Components/Notifications/PostViewer";

const NotificationMixin = {
    components:{
        PostViewer
    },
    props: {
        notification: {
            type: Object,
            default: undefined,
        },
    },
};
export default NotificationMixin;