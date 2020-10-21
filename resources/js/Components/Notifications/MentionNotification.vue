<template>
<div class="post-notification">
    <inertia-link class="userinfo text-dark" :href="'/' + notification.sender.slug">
        <img class="profileimage mr-2" :src="notification.sender.profile" />
        <div class="d-flex flex-column justify-content-center">
            <span class="d-flex align-items-center">
                <b>
                    {{ notification.sender.name }}
                    <i v-if="notification.sender.is_verified" class="verificationcheck">check_circle</i>
                </b>
                <span class="ml-2 text-muted font-11">{{ time(notification.created_at) }} </span></span>
            <div class="w-100 text-left">در این محتوا از شما نام برده</div>
        </div>
    </inertia-link>
    <div class="row m-0">
        <div class="col-md-12 d-flex p-0 justify-content-end">
            <div class="post p-0 bg-default text-dark clickale" style="text-align: justify" @click="window.location = $APP_URL + '/posts/' + notification.post_id">
                <div class="more-content position-relative">
                    <pre class="p-2 m-0" v-html="notification.post.text"></pre>
                </div>
                <div class="media">
                    <lazy-image :src="notification.post.medias" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
    mixins: [NotificationMixin]
};
</script>

<style>
</style>
