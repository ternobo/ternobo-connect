<template>
<loading-button class="btn m-0 connect-btn" :loading="loading" v-on:click.native="postapi">تایید درخواست</loading-button>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        }
    },
    props: {
        connectionId: {
            default: undefined,
            required: true
        },

    },
    name: "AcceptConnection",
    methods: {
        postapi: function () {
            this.loading = true;
            var data = new FormData();
            data.append('connection_id', this.connectionId);

            var config = {
                method: 'post',
                url: this.$APP_URL + '/connection/accept',
                data: data

            };
            console.log(data);
            axios(config)
                .then((response) => {
                    if (response.data.result) {
                        this.$emit("accept");
                    }
                }).then(() => {
                    this.loading = false
                });
        }
    }
}
</script>

<style>

</style>
