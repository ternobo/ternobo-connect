<template>
	<div class="toolbar">
		<transition name="fade" duration="100">
			<notification-peek v-if="notificationPeek" @mouseenter.native="showNotificationPeek" @mouseleave.native="hideNotificationPeek" />
		</transition>

		<div class="header-menu" v-if="$store.state.user != null">
			<a :class="{ active: $store.state.url === '/feed' }" href="/feed" @click="onHomeClick">
				<i class="navheader-icon">home</i>
			</a>
			<!-- <wire-link :class="{ active: $store.state.url === '/chats' }" href="/chats">
				<i class="navheader-icon" :class="{ unread: $store.state.shared.unread_messages_count > 0 && $store.state.url != '/chats' }">textsms</i>
			</wire-link> -->
			<!-- <wire-link :class="{ active: $store.state.url === '/explore' }" href="/explore">
				<i class="navheader-icon">explore</i>
			</wire-link> -->
			<wire-link :class="{ active: $store.state.url === '/notifications' }" v-if="$store.state.shared.fullAccess" href="/notifications">
				<i class="navheader-icon" :class="{ unread: $store.state.shared.notifications_count > 0 && $store.state.url != '/notifications' }">{{ $store.state.url === "/notifications" ? "notifications" : "notifications_none" }}</i>
			</wire-link>
			<wire-link :class="{ active: $store.state.url === '/invite' }" v-if="$store.state.shared.fullAccess" href="/invite">
				<i class="navheader-icon invite-link" :class="{ hasInvite: $store.state.shared.invites_count > 0 }">{{ $store.state.url === "/invite" ? "confirmation_number" : "confirmation_number" }}</i>
			</wire-link>
		</div>
		<div v-else>
			<login-modal :show.sync="showLogin"></login-modal>
			<div class="d-flex align-items-center">
				<button class="text-dark btn btn-transparent font-14 py-1" @click="showLogin = true">{{ __.get("application.login") }}</button>
			</div>
		</div>
		<div ref="usermenushow" v-if="$store.state.user != null" class="usertoolbar" @mouseenter="showUserMenu" @mouseleave="menuVisible = false">
			<div class="usertoolbar-container" :class="{ active: menuVisible }">
				<div :class="{ active: $store.state.url === '/' + $store.state.user.username }" class="profile-image-container p-1">
					<img v-bind:src="$store.state.user.profile" class="profile-xxxsm" />
				</div>
			</div>
			<transition name="fade" mode="out-in">
				<user-menu :style="usermenuStyle" v-show="menuVisible"></user-menu>
			</transition>
		</div>
	</div>
</template>

<script>
import LoginModal from "../../Modals/LoginModal.vue";
import SignupModal from "../../Modals/SignupModal.vue";
import NotificationPeek from "../../Notifications/Peek/NotificationPeek.vue";
import UserMenu from "./UserMenu";

export default {
	props: {},
	name: "HeaderToolbar",
	data() {
		return {
			menuVisible: false,

			showLogin: false,
			showSignup: false,
			usermenuStyle: {},

			notificationPeek: false,

			peektimeout: null,
		};
	},
	methods: {
		showNotificationPeek() {
			clearTimeout(this.peektimeout);
			this.peektimeout = setTimeout(() => {
				this.notificationPeek = true;
			}, 350);
		},
		hideNotificationPeek() {
			setTimeout(() => {
				this.notificationPeek = false;
			}, 350);
		},
		onHomeClick(e) {
			e.preventDefault();
			if (window.location.pathname === "/feed") {
				window.scrollTo(0, 0);
			} else {
				this.$store.state.ternoboWireApp.visit("/feed");
			}
		},
		showUserMenu() {
			if (this.appDirection == "rtl") {
				const left = this.$refs.usermenushow.getBoundingClientRect().x;
				this.usermenuStyle = {
					left: `${left}px`,
				};
			} else {
				const right = window.innerWidth - this.$refs.usermenushow.getBoundingClientRect().x - (this.$refs.usermenushow.getBoundingClientRect().width + 16);
				this.usermenuStyle = {
					right: `${right}px`,
				};
			}

			this.menuVisible = true;
		},
	},
	components: {
		UserMenu,
		LoginModal,
		SignupModal,
		NotificationPeek,
	},
};
</script>
