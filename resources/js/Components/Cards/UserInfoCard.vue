<template>
<div class="card sticky-aside pb-4">
    <img class="card-img-top page-cover" style="height: auto;" :src="$page.user.cover">
    <inertia-link :href="'/'+$page.user.username" class="userinfo-card">
        <div class="d-flex flex-column align-items-center">
            <div class="profile-image">
                <vue-circle :progress="$page.user.profile_steps.percent" :size="90" empty-fill="#F5F5F5" :show-percent="false" :start-angle="-Math.PI/2" :fill="{color: '#0898DF'}">
                    <img :src="$page.user.profile">
                </vue-circle>
            </div>
            <strong class="text-black">{{ this.$page.user.name }} <i v-if="$page.user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
            <small class="text-muted">{{ this.$page.user.short_bio }}</small>
        </div>
        <div class="done-precent d-flex">
            <strong class="text-white">{{ $page.user.percent }}%</strong>
        </div>
    </inertia-link>
</div>
</template>

<script>
export default {
    name: "UserInfoCard"
}
</script>

<style>

</style>
