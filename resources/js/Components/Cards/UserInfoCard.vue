<template>
  <div class="card sticky-aside pb-4" v-if="$page.props.user != null">
    <lazy-image class="card-img-top page-cover" :src="$page.props.user.cover" />
    <inertia-link :href="'/' + $page.props.user.username" class="userinfo-card">
      <div class="d-flex flex-column align-items-center">
        <div class="profile-image">
          <vue-circle :progress="$page.props.user.profile_steps.percent" :size="90" empty-fill="#F5F5F5" :show-percent="false" :start-angle="-Math.PI / 2" :fill="{ color: '#0898DF' }">
            <lazy-image :src="$page.props.user.profile" />
          </vue-circle>
        </div>
        <strong class="text-black">{{ this.$page.props.user.name }} <i v-if="$page.props.user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
        <small class="text-muted">{{ this.$page.props.user.short_bio }}</small>
      </div>
      <div class="done-precent d-flex">
        <strong class="text-white">{{ $page.props.user.percent }}%</strong>
      </div>
    </inertia-link>
  </div>
</template>

<script>
export default {
  name: "UserInfoCard",
};
</script>

<style></style>
