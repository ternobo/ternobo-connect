<template>
<div class="post-notification" v-if="notification.post !== null">
    <inertia-link class="userinfo text-dark" :href="'/' + notification.sender.slug">
        <lazy-image imgClass="profile-md" class="mb-0 ml-2" :src="notification.sender.profile" />
        <div class="d-flex flex-column justify-content-center">
            <span class="d-flex align-items-center">
                <b>
                    {{ notification.sender.name }}
                    <i v-if="notification.sender.is_verified" class="verificationcheck">check_circle</i>
                </b>
                <span class="ml-2 text-muted font-11">{{ time(notification.created_at) }} </span></span>
            <div class="w-100 text-left">محتوای شما را پسندید</div>
        </div>
    </inertia-link>
    <div class="row m-0">
        <post-viewer :post="notification.post"></post-viewer>
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
