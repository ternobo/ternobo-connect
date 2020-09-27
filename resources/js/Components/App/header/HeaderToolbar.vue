<template>
<div class="toolbar">
    <div class="header-menu">
        <inertia-link :class="{'active': $root.url === '/feed'}" href="/feed">
            <i class="navheader-icon">home</i>
            <div class="navheader-text">خانه</div>
        </inertia-link>
        <inertia-link :class="{'active': $root.url === '/connections'}" href="/connections">
            <i class="navheader-icon">group</i>
            <div class="navheader-text">شبکه من</div>
        </inertia-link>
        <inertia-link :class="{'active': $root.url === '/notifications'}" href="/notifications">
            <i class="navheader-icon">notifications_none</i>
            <div class="navheader-text">اعلان‌ها</div>
        </inertia-link>
        <inertia-link :class="{'active': $root.url === '/bookmarks'}" href="/bookmarks">
            <i class="navheader-icon">bookmarks</i>
            <div class="navheader-text">نشان‌ها</div>
        </inertia-link>
    </div>
    <div id="usermenu-show" class="usertoolbar h-100 d-flex align-items-center mr-2 py-3" @mouseenter="showUserMenu" @mouseleave="menuVisible = false">
        <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
                <span style="white-space: nowrap;" class="ml-2">{{ $root.user.username }}</span>
                <img v-bind:src="$root.user.profile" class="profile-sm" />
            </div>
            <i class="material-icons text-light">more_vert</i>
        </div>
        <transition name="fade" mode="out-in">
            <user-menu v-bind:style="{ left: menuLeft }" v-if="menuVisible"></user-menu>
        </transition>
    </div>
</div>
</template>

<script>
import UserMenu from "./UserMenu";

export default {
    name: "HeaderToolbar",
    data() {
        return {
            menuVisible: false,
            menuLeft: 0
        }
    },
    methods: {
        showUserMenu(e) {
            this.menuVisible = true;
            const $this = this;
            const left = document.getElementById("usermenu-show").getBoundingClientRect().x;
            this.menuLeft = left + 'px';
        }
    },
    components: {
        UserMenu
    }
};
</script>
