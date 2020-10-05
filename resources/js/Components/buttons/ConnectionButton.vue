<template>
<LoadingButton :loading="loading" class="connect-btn" :class="{ 'btn-followed-connected': followed }" @click.native="follow">{{ text }}</LoadingButton>
</template>

<script>
import LoadingButton from "./LoadingButton";

export default {
    created() {
        if (this.$page.connections.includes(this.user)) {
            this.connected = true;
            this.page = "متصل شده";
        }
    },
    data() {
        return {
            loading: false,
            connected: false,
            text: "متصل شدن",
        };
    },
    props: {
        user: {
            type: Number,
            default: undefined,
            required: true,
        },
    },
    methods: {
        follow() {
            const $this = this;
            this.loading = true;
            if (!this.connected) {
                var config = {
                    method: "post",
                    url: this.$APP_URL + "/connect/" + this.user,
                };

                axios(config)
                    .then(function (response) {
                        // console.log(response.data);
                        if (response.data.result) {
                            $this.loading = false;
                            $this.$page.followings.push($this.page);
                            $this.text = "متصل شده";
                            $this.followed = true;
                            $this.emit("connected");
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
                    url: this.$APP_URL + "/disconnect/" + this.page,
                };

                axios(config)
                    .then(function (response) {
                        // console.log(response.data);
                        if (response.data.result) {
                            $this.loading = false;
                            $this.$page.followings.push($this.page);
                            $this.text = "متصل شدن";
                            $this.followed = false;
                            $this.emit("disconnected");
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
