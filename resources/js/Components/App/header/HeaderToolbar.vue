<template>
	<div class="toolbar">
		<div class="header-menu" v-if="$store.state.user != null">
			<inertia-link :class="{ active: $root.url === '/feed' }" href="/feed">
				<i class="navheader-icon">home</i>
				<div class="navheader-text">خانه</div>
			</inertia-link>
			<inertia-link :class="{ active: $root.url === '/connections' }" href="/connections">
				<i class="navheader-icon">group</i>
				<div class="navheader-text">شبکه من</div>
			</inertia-link>
			<inertia-link :class="{ active: $root.url === '/notifications' }" href="/notifications">
				<i class="navheader-icon" :class="{ unread: $page.props.notifications_count > 0 }">{{ $root.url === "/notifications" ? "notifications" : "notifications_none" }}</i>
				<div class="navheader-text">اعلان‌ها</div>
			</inertia-link>
			<inertia-link :class="{ active: $root.url === '/bookmarks' }" href="/bookmarks">
				<i class="navheader-icon">bookmarks</i>
				<div class="navheader-text">نشان‌ها</div>
			</inertia-link>
		</div>
		<div v-else>
			<login-modal :show.sync="showLogin"></login-modal>
			<signup-modal :show.sync="showSignup"></signup-modal>
			<div class="d-flex align-items-center">
				<button class="text-dark btn btn-transparent font-14 py-1" @click="showLogin = true">ورود</button>
				<span class="splitor-line"></span>
				<button class="text-dark btn btn-transparent font-14 py-1" @click="showSignup = true">ثبت‌نام</button>
			</div>
		</div>

		<div id="usermenu-show" v-if="$store.state.user != null" class="usertoolbar h-100 d-flex align-items-center mr-2 py-3" @mouseenter="showUserMenu" @mouseleave="menuVisible = false">
			<div class="d-flex align-items-center">
				<div class="d-flex align-items-center">
					<span style="white-space: nowrap; user-select: none" dir="ltr" class="ml-2">{{ $store.state.user.username }} <i v-if="$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i> </span>
					<img v-bind:src="$store.state.user.profile" class="profile-xsm" />
				</div>
				<i class="material-icons text-light">more_vert</i>
			</div>
			<transition name="fade" mode="out-in">
				<user-menu v-bind:style="{ left: menuLeft }" v-show="menuVisible"></user-menu>
			</transition>
		</div>
	</div>
</template>

<script>
import LoginModal from "../../Modals/LoginModal.vue";
import SignupModal from "../../Modals/SignupModal.vue";
import UserMenu from "./UserMenu";

export default {
	props: {},
	name: "HeaderToolbar",
	data() {
		return {
			menuVisible: false,
			menuLeft: 0,

			showLogin: false,
			showSignup: false,
		};
	},
	methods: {
		showUserMenu(e) {
			this.menuVisible = true;
			const $this = this;
			const left = document.getElementById("usermenu-show").getBoundingClientRect().x;
			this.menuLeft = left + "px";
		},
	},
	components: {
		UserMenu,
		LoginModal,
		SignupModal,
	},
};
</script>
