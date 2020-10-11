<template>
<LoadingButton :loading="loading" class="connect-btn" :class="{ 'btn-followed-connected': connected }" @click.native="connect">{{ text }}</LoadingButton>
</template>

<script>
import LoadingButton from "./LoadingButton";

export default {
    created() {
        if (this.$page.connectedPeople.includes(this.user)) {
            this.connected = true;
            this.text = "متصل شده";
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
            default: undefined,
            required: true,
        },
    },
    methods: {
        connect() {
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
                            $this.$page.connectedPeople.push($this.user);
                            $this.text = "متصل شده";
                            $this.connected = true;
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
                            $this.$page.connectedPeople.remove($this.user);
                            $this.text = "متصل شدن";
                            $this.connected = false;
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
