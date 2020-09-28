<template>
<div class="usermenu card d-block">
    <div class="card-header d-flex bg-white border-bottom">
        <a :href="'/'+this.$root.user.username" class="d-flex aling-items-center">
            <img class="profile" :src="this.$root.user.profile" />
            <span class="mx-2 d-flex flex-column justify-content-center">
                <strong class="text-black">{{ this.$root.user.name }}
                    <i v-if="this.$root.user.is_verified === 1" class="verificationcheck">check_circle</i>
                </strong>
                <small>{{this.$root.user.short_bio}}</small>
            </span>
        </a>
    </div>
    <div class="card-body p-0">
        <ul class="list-group list-group-flush">
            <li class="list-group-item headermenu-item d-flex flex-column px-2 pt-3">
                <inertia-link href="/settings" class="m-0"><i class="material-icons-outlined">settings</i> تنظیمات و حریم خصوصی </inertia-link>
            </li>
            <li class="list-group-item  border-top-0 headermenu-item d-flex flex-column pb-3 px-2">
                <inertia-link href="/ideas" class="m-0"><i class="material-icons-outlined">emoji_objects</i> فیدبک </inertia-link>
            </li>
            <li class="list-group-item headermenu-item d-flex flex-column px-2 pb-2">
                <inertia-link href="/logout" method="post" class="hover-danger m-0"><i class="material-icons">power_settings_new</i> خروج
                </inertia-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: "UserMenu"
}
</script>

<style>

</style>
