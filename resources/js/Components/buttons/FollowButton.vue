<template>
<LoadingButton :loading="loading" class="btn follow-btn" :class="{ 'btn-followed-connected': followed }" @click.native="follow">{{ text }}</LoadingButton>
</template>

<script>
import LoadingButton from "./LoadingButton";

export default {
    created() {
        if (this.$page.followings.includes(this.page)) {
            this.followed = true;
            this.text = "دنبال شده";
        }
    },
    data() {
        return {
            loading: false,
            followed: false,
            text: "دنبال کردن",
        };
    },
    props: {
        page: {
            type: Number,
            default: undefined,
            required: true,
        },
    },
    methods: {
        follow() {
            const $this = this;
            this.loading = true;
            if (!this.followed) {
                var config = {
                    method: "post",
                    url: this.$APP_URL + "/follow/" + this.page,
                };

                axios(config)
                    .then(function (response) {
                        // console.log(response.data);
                        if (response.data.result) {
                            $this.loading = false;
                            $this.$page.followings.push($this.page);
                            $this.text = "دنبال شده";
                            $this.followed = true;
                            $this.emit("followed");
                        } else {
                            const errors = response.data.errors;
                            Object.keys(errors).forEach(function (item, index) {
                                $this.$bvToast.toast(errors[item][0], {
                                    noCloseButton: true,
                                    toaster: "b-toaster-bottom-left",
                                    bodyClass: ["bg-dark", "text-right", "text-white"],
                                    solid: true,
                                });
                            });
                        }
                        $this.loading = false;
                    })
                    .catch(function (error) {
                        $this.loading = false;
                    });
            } else {
                var config = {
                    method: "post",
                    url: this.$APP_URL + "/unfollow/" + this.page,
                };

                axios(config)
                    .then(function (response) {
                        // console.log(response.data);
                        if (response.data.result) {
                            $this.loading = false;
                            $this.$page.followings.remove($this.page);
                            $this.text = "دنبال کردن";
                            $this.followed = false;
                            $this.emit("unfollowed");
                        } else {
                            const errors = response.data.errors;
                            Object.keys(errors).forEach(function (item, index) {
                                $this.$bvToast.toast(errors[item][0], {
                                    noCloseButton: true,
                                    toaster: "b-toaster-bottom-left",
                                    bodyClass: ["bg-dark", "text-right", "text-white"],
                                    solid: true,
                                });
                            });
                        }
                        $this.loading = false;
                    })
                    .catch(function (error) {
                        $this.loading = false;
                    });
            }
        },
    },
    components: {
        LoadingButton,
    },
};
</script>

<style>
</style>
