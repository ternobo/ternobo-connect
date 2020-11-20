<template>
  <div class="post-notification">
    <div class="d-flex flex-responsive flex-row aling-items-center justify-content-between w-100">
      <inertia-link class="d-flex align-items-center justify-content-start w-100" :href="$APP_URL + '/' + notification.sender.slug">
        <lazy-image :src="notification.sender.profile" img-class="profile-md" class="mb-0 ml-2" />
        <span class="d-flex align-items-center">
          <span class="d-flex flex-column">
            <span class="d-flex aling-items-center">
              <b> {{ notification.sender.name }} <i v-if="notification.sender.is_verified" class="verificationcheck">check_circle</i> </b>
              <span class="d-flex ml-2 align-items-center text-muted font-11">{{ createdAt }}</span>
            </span>
            <div class="w-100">شما را دنبال می‌کند</div>
          </span>
        </span>
      </inertia-link>
      <div class="actions d-flex align-items-center mt-2 mt-lg-0">
        <connetion-buttons :page-id="notification.sender.id" :userId="notification.sender.u"></connetion-buttons>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationMixin from "../../Mixins/NotificationMixin";
import ConnetionButtons from "../buttons/ConnetionButtons.vue";
export default {
  components: { ConnetionButtons },
  mixins: [NotificationMixin],
};
</script>
