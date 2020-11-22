<template>
  <div class="usermenu card d-block" v-if="$page.props.user != null">
    <div class="card-header px-2 d-flex bg-white border-bottom">
      <inertia-link :href="'/' + this.$page.props.user.username" class="d-flex aling-items-center">
        <img class="profile-sm" :src="this.$page.props.user.profile" />
        <span class="mx-2 d-flex flex-column justify-content-center">
          <strong class="text-black"
            >{{ this.$page.props.user.name }}
            <i v-if="this.$page.props.user.is_verified === 1" class="verificationcheck">check_circle</i>
          </strong>
          <small>{{ this.$page.props.user.short_bio }}</small>
        </span>
      </inertia-link>
    </div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush">
        <li class="list-group-item headermenu-item d-flex flex-column px-2 pt-3">
          <inertia-link href="/settings" class="m-0"><i class="material-icons-outlined">settings</i> تنظیمات و حریم خصوصی </inertia-link>
        </li>
        <li class="list-group-item border-top-0 headermenu-item d-flex flex-column pb-3 px-2">
          <inertia-link href="/ideas" class="m-0"><i class="material-icons-outlined">emoji_objects</i> فیدبک </inertia-link>
        </li>
        <li class="list-group-item headermenu-item d-flex flex-column px-2 pb-2">
          <inertia-link href="/logout" method="post" as="button" class="text-right bg-transparent hover-danger m-0 border-0 text-grey"><i class="material-icons">power_settings_new</i> خروج </inertia-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
};
</script>
