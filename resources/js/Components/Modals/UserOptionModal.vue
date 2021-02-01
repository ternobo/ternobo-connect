<template>
	<div>
		<login-modal :show.sync="showLogin"></login-modal>
		<signup-modal :show.sync="showSignup"></signup-modal>
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
						<wire-link @click="$emit('update:show', false)" href="/settings" class="m-0"><i class="material-icons-outlined">settings</i> تنظیمات و حریم خصوصی </wire-link>
					</li>
					<li class="list-item d-flex flex-column">
						<wire-link @click="$emit('update:show', false)" href="/ideas" class="m-0"><i class="material-icons-outlined">emoji_objects</i> صدای شما </wire-link>
					</li>
					<li class="list-item d-flex flex-column">
						<wire-link @click="$emit('update:show', false)" href="/help" class="m-0"><i class="material-icons-outlined">help_outline</i> مرکز راهنمایی </wire-link>
					</li>
				</ul>
				<div class="langs">
					<div class="lang-item disabled"><img src="/img/franch.png" width="24" height="24" /> <span>Française</span></div>
					<div class="lang-item disabled"><img src="/img/en.png" width="24" height="24" /> <span>English</span></div>
					<div class="lang-item"><img src="/img/iranicon.png" width="24" height="24" /> <span>فارسی</span></div>
				</div>
				<ul class="mb-0 p-0">
					<li class="list-item">
						<wire-link @click="$emit('update:show', false)" href="/logout" method="post" as="button" class="text-right bg-transparent hover-danger m-0 border-0 text-grey"><i class="material-icons">power_settings_new</i> خروج </wire-link>
					</li>
				</ul>
			</div>
			<div v-else class="useroptions">
				<ul class="p-0 menu">
					<li class="list-item d-flex flex-column">
						<a @click="$emit('update:show', false), (showLogin = true)" class="clickable m-0"><i class="material-icons-outlined">login</i> ورود </a>
					</li>
					<li class="list-item d-flex flex-column">
						<a @click="$emit('update:show', false), (showSignup = true)" class="clickable m-0"><i class="material-icons-outlined">account_circle</i> ثبت‌نام </a>
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
