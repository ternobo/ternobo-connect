const AchievementsItem = {
    props: {
        user: {
            type: Object,
            default: undefined,
            required: false
        },
        page: {
            type: Object,
            default: undefined,
            required: false
        },
        language: {
            type: Object,
            default: undefined,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        detailed: {
            type: Boolean,
            default: false
        }
    },
};
export default AchievementsItem;
