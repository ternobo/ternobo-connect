import {
    Skeleton
} from "vue-loading-skeleton";

const AchievementsMixin = {
    methods: {
        showDetailed(){
            this.open = !this.open;
        }
    },
    data(){
        return{
            open: false,
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false,
            required: false
        },
    },
    components: {
        Skeleton,
    },
};
export default AchievementsMixin;
