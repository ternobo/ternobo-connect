<template>
<button class="connect-btn float-left w-100" v-on:click="postapi">تایید درخواست</button>
</template>

<script>
export default {
    name:"AcceptConnections",
    methods: {
        postapi:function(){
            var data = new FormData();
            data.append('connection_id', '');

            var config = {
            method: 'post',
            url: this.$APP_URL+'/connection/accept',
            data : data

            };
            console.log(data);
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
}
</script>

<style>

</style>
