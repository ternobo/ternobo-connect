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
            <div class="w-100 text-left">برای محتوای شما نظر گذاشت</div>
        </div>
    </inertia-link>
    <div class="row m-0">
        <div class="col-md-12 px-0 d-flex p-0 justify-content-end">
            <div class="post p-0 text-dark clickale text-left">
                <div class="col-md-12 py-2 bg-default">
                    نه
                </div>
                <div class="col-md-12 px-0 bg-dede">
                    <post-viewer :post="notification.post"></post-viewer>
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
