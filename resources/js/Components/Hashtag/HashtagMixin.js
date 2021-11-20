export default {
    props: ['followed'],
    mounted() {
        this.isFollowed = this.followed;
    },
    methods: {
        follow() {
            this.loading = true;
            axios
                .post(`/tags/${this.tag}/follow`)
                .then((response) => {
                    this.isFollowed = response.data.follow;
                })
                .catch((err) => {
                    console.log(err);
                    this.toast(__.get("messages.connection-error"));
                })
                .then(() => {
                    this.loading = false;
                });
        },
    },
    data() {
        return {
            loading: false,
            isFollowed: false,
        }
    },
}