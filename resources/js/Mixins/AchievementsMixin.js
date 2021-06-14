import {
    Skeleton
} from "vue-loading-skeleton";

const AchievementsMixin = {
    methods: {
        toggleDetailed() {
            if (!this.edit) {
                this.open = !this.open;

            }
        },
    },
    data() {
        return {
            open: false,
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false,
            required: false
        },
        edit: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    components: {
        Skeleton,
    },
};
export default AchievementsMixin;
