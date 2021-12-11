<template>
	<div class="d-flex" :class="{ 'flex-column': vertical }">
		<!-- <ConnectionButton @connected="onConnected" @disconnected="onDisconnect" :class="{'splitor-l': (!vertical && connected && followed),'splitor-b': (vertical && connected && followed)}" :style="btnStyle" :user="userId"></ConnectionButton> -->
		<unblock-button :page="page.id" @unblocked="onunblock" v-if="blocked"></unblock-button>
		<FollowButton v-else ref="button" @followed="onFollowed" :class="btnClass" @unfollowed="onUnfollowed" :style="btnStyle" :page="page"></FollowButton>
	</div>
</template>

<script>
import ConnectionButton from "./ConnectionButton";
import FollowButton from "./FollowButton";
import UnblockButton from "./UnblockButton.vue";
export default {
	methods: {
		setLoading() {
			this.$refs.button.loading = true;
		},
		offLoading() {
			this.$refs.button.loading = false;
		},
		onFollowed() {
			this.followed = true;
			this.$emit("followed");
		},
		onunblock() {
			this.$emit("unblocked");
			this.$emit("update:blocked", false);
		},
		onUnfollowed() {
			this.followed = false;
			this.$emit("unfollowed");
		},
		onConnected() {
			this.connected = true;
		},
		onDisconnect() {
			this.connected = false;
		},
	},
	components: {
		ConnectionButton,
		FollowButton,
		UnblockButton,
	},
	data() {
		return {
			followed: false,
			connected: false,
		};
	},
	props: {
		userId: {
			default: undefined,
			// required: true,
		},
		page: {
			default: undefined,
			required: true,
		},
		btnClass: {
			type: String,
			default: "",
		},
		btnStyle: {
			type: String,
			default: "",
		},
		blocked: {
			type: Boolean,
			default: false,
		},
		vertical: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
