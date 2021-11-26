<template>
	<div class="usermenu card" v-if="$store.state.user != null">
		<div class="card-header">
			<wire-link :href="$store.state.shared.fullAccess ? '/' + this.$store.state.user.username : null" :linkDisabled="!$store.state.shared.fullAccess" class="d-flex aling-items-center">
				<img class="profile-xsm" imgClass="profile-xsm" :src="this.$store.state.user.profile" />
				<span class="userinfo">
					<strong class="user-name">
						{{ this.$store.state.user.name }}
						<i v-if="this.$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i>
					</strong>
					<small dir="ltr" class="user-short-bio">@{{ this.$store.state.user.username }}</small>
				</span>
			</wire-link>
		</div>
		<div class="card-body p-0">
			<div class="list-group list-group-flush">
				<wire-link href="/monetization" v-if="shared.fullAccess" as="a" class="list-group-item border-0 headermenu-item">
					<a class="m-0"><i class="material-icons-outlined">savings</i> {{ __.get("monitization.monitization") }}</a>
				</wire-link>
				<wire-link href="/settings" as="a" class="list-group-item border-0 headermenu-item">
					<a class="m-0"><i class="material-icons-outlined">settings</i> {{ __.get("settings.settings") }} </a>
				</wire-link>
				<wire-link href="/feedbacks" as="a" class="list-group-item border-0 headermenu-item">
					<a class="m-0"><i class="material-icons-outlined">emoji_objects</i> {{ __.choice("feedbacks.feedback", 2) }} </a>
				</wire-link>
				<div class="list-group-item border-0 headermenu-item hover-danger" @click="logout">
					<form action="/logout" method="POST" ref="logoutForm">
						<button type="button" class="btn btn-text text-start bg-transparent m-0 p-0 border-0 text-grey"><i class="material-icons" v-if="appDirection == 'ltr'">logout</i> <i class="material-icons" style="transform: rotate(180deg)" v-else>logout</i> {{ __.get("application.signout") }}</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "UserMenu",
	computed: {
		...mapState(["shared"]),
	},
	methods: {
		logout() {
			this.$refs.logoutForm.submit();
			// this.confirmDialog("آیا می‌خواهید از حساب کاربری خود خارج شوید؟", {
			// 	okVariant: "danger border-0",
			// }).then((value) => {
			// 	if (value) {

			// 	}
			// });
		},
	},
};
</script>
