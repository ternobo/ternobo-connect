<template>
<LoadingButton :loading="loading" class="btn connect-btn" :class="{ 'btn-followed-connected': connected,'btn-connection-waiting':waiting }" @click.native="connect">{{ text }}</LoadingButton>
</template>

<script>
import {
    Inertia
} from '@inertiajs/inertia';
import LoadingButton from "./LoadingButton";

export default {
    created() {
        if (this.$page.connectedPeople.includes(this.user)) {
            this.connected = true;
            this.text = "متصل شده";
        } else if (this.$page.waitingConnections.includes(this.user)) {
            this.waiting = true;
            this.text = "در انتظار تایید";
        }
    },
    data() {
        return {
            loading: false,
            connected: false,
            waiting: false,
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
            if (!this.connected && !this.waiting) {
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
                            $this.text = "در انتظار تایید";
                            $this.waiting = true;
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
                    url: this.$APP_URL + "/disconnect/" + this.user,
                };

                axios(config)
                    .then(function (response) {
                        // console.log(response.data);
                        if (response.data.result) {
                            $this.loading = false;
                            Inertia.reload();
                            $this.text = "متصل شدن";
                            $this.connected = false;
                            $this.waiting = false;
                            $this.$emit("disconnected");
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
                        console.log(error);
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
