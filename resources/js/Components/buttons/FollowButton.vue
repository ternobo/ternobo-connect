<template>
<LoadingButton :loading="loading" class="follow-btn" @click="follow">{{ text }}</LoadingButton>
</template>

<script>
import LoadingButton from "./LoadingButton";

export default {
    created() {
        if (this.$page.followings.includes(this.page)) {
            this.followed = true;
            this.page = "دنبال شده";
        }
    },
    data() {
        return {
            loading: false,
            followed: false,
            text: "دنبال کردن"
        }
    },
    props: {
        page: {
            type: Number,
            default: undefined,
            required: true
        },

    },
    methods: {
        follow() {
            const $this = false;
            var config = {
                method: 'post',
                url: this.$APP_URL + '/follow/' + this.page,
            };

            axios(config)
                .then(function (response) {
                    if (response.data.result) {
                        $this.loading = false;
                        this.$page.followings.push($this.page);
                        $this.emit("followed");
                    } else {
                        const errors = response.data.errors;
                        Object.keys(errors).forEach(function (item, index) {
                            $this.$bvToast.toast(errors[item][0], {
                                noCloseButton: true,
                                toaster: "b-toaster-bottom-left",
                                bodyClass: ["bg-dark", "text-right", "text-white"],
                                solid: true
                            });
                        });
                    }
                    $this.loading = false;
                })
                .catch(function (error) {
                    $this.loading = false;
                });
        },

    },
    components: {
        LoadingButton
    }
}
</script>

<style>

</style>
