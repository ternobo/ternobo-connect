<template>
	<div>
		<login-modal :show.sync="showLogin"></login-modal>
		<b-modal v-model="showModal" hide-footer hide-header @show="onShow" body-class="pb-0" ref="modal" size="lg">
			<div class="useroptions" v-if="$store.state.user">
				<div class="useroptions-header">
					<wire-link @click="$emit('update:show', false)" :href="'/' + $store.state.user.username" class="d-flex aling-items-center">
						<img class="profile-sm" :src="$store.state.user.profile" />
						<span class="mx-2 d-flex flex-column justify-content-center">
							<strong class="text-black"
								>{{ $store.state.user.name }}
								<i v-if="$store.state.user.is_verified === 1" class="position-relative verificationcheck">check_circle</i>
							</strong>
							<small>{{ $store.state.user.short_bio }}</small>
						</span>
					</wire-link>
					<i class="close material-icons text-muted hover-dark" @click="$emit('update:show', false)">close</i>
				</div>
				<ul class="p-0 menu">
					<li class="list-item d-flex flex-column">
						<wire-link @click="$emit('update:show', false)" href="/settings" class="m-0"><i class="material-icons-outlined">settings</i> {{ __.get("settings.settings") }}</wire-link>
					</li>
					<li class="list-item d-flex flex-column">
						<wire-link @click="$emit('update:show', false)" href="/feedbacks" class="m-0"><i class="material-icons-outlined">emoji_objects</i> {{ __.choice("feedbacks.feedback", 2) }} </wire-link>
					</li>
					<li class="list-item d-flex flex-column">
						<wire-link @click="$emit('update:show', false)" href="/teeps" class="m-0"><i class="material-icons-outlined">savings</i> {{ __.choice("tips.tip", 2) }}</wire-link>
					</li>
				</ul>
				<div class="langs">
					<language-link lang="en" class="lang-item"><img src="/img/en.png" width="24" height="24" /> <span>English</span></language-link>
					<language-link lang="fa" class="lang-item"><img src="/img/iranicon.png" width="24" height="24" /> <span>فارسی</span></language-link>
				</div>
				<ul class="mb-0 p-0">
					<li class="list-item">
						<wire-link @click="$emit('update:show', false)" href="/logout" method="post" as="button" class="text-right bg-transparent hover-danger m-0 border-0 text-grey"> <i class="material-icons" v-if="appDirection == 'ltr'">logout</i> <i class="material-icons" style="transform: rotate(180deg)" v-else>logout</i> {{ __.get("application.signout") }} </wire-link>
					</li>
				</ul>
			</div>
			<div v-else class="useroptions">
				<ul class="p-0 menu">
					<li class="list-item d-flex flex-column">
						<a @click="$emit('update:show', false), (showLogin = true)" class="clickable m-0"><i class="material-icons-outlined">login</i> {{ __.get("application.login") }} </a>
					</li>
				</ul>
			</div>
		</b-modal>
	</div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import LoginModal from "./LoginModal.vue";
import SignupModal from "./SignupModal.vue";
export default {
	data() {
		return {
			showLogin: false,
			showSignup: false,
		};
	},
	components: { LoginModal, SignupModal },
	methods: {
		onShow() {
			setTimeout(() => {
				this.$refs.modal.$refs.dialog.style.marginTop = "0";
			}, 100);
		},
	},

	mixins: [ModalMixin],
	name: "UserOptionModal",
};
</script>

<style></style>
