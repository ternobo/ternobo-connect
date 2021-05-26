<template>
	<div class="toolbar">
		<div class="header-menu" v-if="$store.state.user != null">
			<a :class="{ active: $store.state.url === '/feed' }" href="/feed" @click="onHomeClick">
				<i class="navheader-icon">home</i>
			</a>
			<!-- <wire-link :class="{ active: $store.state.url === '/chats' }" href="/chats">
				<i class="navheader-icon" :class="{ unread: $store.state.shared.unread_messages_count > 0 && $store.state.url != '/chats' }">textsms</i>
			</wire-link> -->
			<wire-link :class="{ active: $store.state.url === '/notifications' }" href="/notifications">
				<i class="navheader-icon" :class="{ unread: $store.state.shared.notifications_count > 0 && $store.state.url != '/notifications' }">{{ $store.state.url === "/notifications" ? "notifications" : "notifications_none" }}</i>
			</wire-link>
			<wire-link :class="{ active: $store.state.url === '/invite' }" href="/invite">
				<i class="navheader-icon invite-link">{{ $store.state.url === "/invite" ? "confirmation_number" : "confirmation_number" }}</i>
			</wire-link>
			<wire-link :class="{ active: $store.state.url === '/bookmarks' }" href="/bookmarks">
				<i class="navheader-icon">{{ $store.state.url === "/bookmarks" ? "bookmark" : "bookmark_border" }} </i>
			</wire-link>
		</div>
		<div v-else>
			<login-modal :show.sync="showLogin"></login-modal>
			<signup-modal :show.sync="showSignup"></signup-modal>
			<div class="d-flex align-items-center">
				<button class="text-dark btn btn-transparent font-14 py-1" @click="showLogin = true">ورود</button>
			</div>
		</div>

		<div id="usermenu-show" v-if="$store.state.user != null" class="usertoolbar" @mouseenter="showUserMenu" @mouseleave="menuVisible = false">
			<div class="usertoolbar-container">
				<div class="d-flex align-items-center">
					<span dir="ltr" class="user-username">{{ $store.state.user.username }} <i v-if="$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i> </span>
					<img v-bind:src="$store.state.user.profile" class="profile-xxsm" />
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
		onHomeClick(e) {
			e.preventDefault();
			if (window.location.pathname === "/feed") {
				window.scrollTo(0, 0);
			} else {
				this.$store.state.ternoboWireApp.visit("/feed");
			}
		},
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
