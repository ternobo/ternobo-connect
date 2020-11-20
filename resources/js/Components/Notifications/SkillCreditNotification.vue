<template>
  <div class="post-notification">
    <div class="d-flex flex-row aling-items-center justify-content-between w-100">
      <inertia-link class="userinfo text-dark" :href="'/' + notification.sender.slug">
        <lazy-image class="ml-2" img-class="profile-md" :src="notification.sender.profile" />
        <span class="userinfo flex-column flex-start align-items-start">
          <div>
            {{ notification.sender.name }}
            <i v-if="notification.sender.is_verified" class="verificationcheck">check_circle</i>
            <span class="ml-2 text-muted font-11">{{ time(notification.created_at) }} </span>
          </div>
          <div class="text-left">
            مهارت <b>{{ notification.skill.name }}</b> را تایید کرد
          </div>
        </span>
      </inertia-link>
    </div>
  </div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
export default {
  mixins: [NotificationMixin],
};
</script>

<style></style>
