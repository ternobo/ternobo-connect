<template>
	<b-modal v-model="showModal" hide-footer hide-header @show="onShow" body-class="pb-0" ref="modal" size="lg">
		<div class="useroptions" v-if="$page.props.user">
			<div class="useroptions-header">
				<inertia-link @click="$emit('update:show', false)" :href="'/' + this.$page.props.user.username" class="d-flex aling-items-center">
					<img class="profile-sm" :src="this.$page.props.user.profile" />
					<span class="mx-2 d-flex flex-column justify-content-center">
						<strong class="text-black"
							>{{ this.$page.props.user.name }}
							<i v-if="this.$page.props.user.is_verified === 1" class="verificationcheck">check_circle</i>
						</strong>
						<small>{{ this.$page.props.user.short_bio }}</small>
					</span>
				</inertia-link>
				<i class="close material-icons text-muted hover-dark" @click="$emit('update:show', false)">close</i>
			</div>
			<ul class="p-0 menu">
				<li class="list-item d-flex flex-column">
					<inertia-link @click="$emit('update:show', false)" href="/settings" class="m-0"><i class="material-icons-outlined">settings</i> تنظیمات و حریم خصوصی </inertia-link>
				</li>
				<li class="list-item d-flex flex-column">
					<inertia-link @click="$emit('update:show', false)" href="/ideas" class="m-0"><i class="material-icons-outlined">emoji_objects</i> صدای شما </inertia-link>
				</li>
				<li class="list-item d-flex flex-column">
					<inertia-link @click="$emit('update:show', false)" href="/help" class="m-0"><i class="material-icons-outlined">help_outline</i> مرکز راهنمایی </inertia-link>
				</li>
			</ul>
			<div class="langs">
				<div class="lang-item disabled"><img src="/img/franch.png" width="24" height="24" /> <span>Française</span></div>
				<div class="lang-item disabled"><img src="/img/en.png" width="24" height="24" /> <span>English</span></div>
				<div class="lang-item"><img src="/img/iranicon.png" width="24" height="24" /> <span>فارسی</span></div>
			</div>
			<ul class="mb-0 p-0">
				<li class="list-item">
					<inertia-link @click="$emit('update:show', false)" href="/logout" method="post" as="button" class="text-right bg-transparent hover-danger m-0 border-0 text-grey"><i class="material-icons">power_settings_new</i> خروج </inertia-link>
				</li>
			</ul>
		</div>
        <div v-else class="useroptions">
            <ul class="p-0 menu">
				<li class="list-item d-flex flex-column">
					<inertia-link @click="$emit('update:show', false)" href="/settings" class="m-0"><i class="material-icons-outlined">login</i> ورود </inertia-link>
				</li>
				<li class="list-item d-flex flex-column">
					<inertia-link @click="$emit('update:show', false)" href="/ideas" class="m-0"><i class="material-icons-outlined">account_circle</i> ثبت‌نام </inertia-link>
				</li>
			</ul>
        </div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
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
