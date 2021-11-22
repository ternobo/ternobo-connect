<template>
	<div class="login-page">
		<div class="login-header">
			<login-menu @showlaws="showlaws = true" :show.sync="showMenu"></login-menu>
			<laws-modal :show.sync="showlaws"></laws-modal>
			<div class="header-container">
				<div class="logo-container">
					<wire-link href="/" class="logodesktop" v-if="$root.isDesktop">
						<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
					</wire-link>
					<wire-link href="/" v-if="!$root.isDesktop">
						<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="logo-sm w-auto" />
					</wire-link>
					<span class="beta-badge">Beta</span>
				</div>
				<div class="login-header-menu">
					<slot name="header">
						<a href="https://trello.com/b/Vku6XmjN/ternobo" target="trello">{{ __.get("application.trello") }}</a>
						<a href="https://discord.gg/unXsnGHsNj" target="discord">{{ __.get("application.discord") }}</a>
						<a href="#" @click="showlaws = !showlaws">{{ __.get("application.comuunity-guidelines") }}</a>
						<dropdown-menu class="me-4 pe-0" variant="white">
							<template #button="{ active }">
								<i class="material-icons transition" :class="{ 'rotate-180': active }">keyboard_arrow_down</i>
								<span class="d-flex flex-row ms-1" v-if="appDirection == 'ltr'"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /></span>
								<span class="d-flex flex-row ms-1" v-else> <img src="/images/iran-flag.png" width="24" /></span>
							</template>
							<dropdonw-item>
								<language-link lang="en" class="d-flex flex-row"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /> <span class="ms-3"> English</span> </language-link>
							</dropdonw-item>
							<dropdonw-item>
								<language-link lang="fa" class="d-flex flex-row"> <img src="/images/iran-flag.png" width="24" /> <span class="ms-3"> فارسی</span> </language-link>
							</dropdonw-item>
						</dropdown-menu>
					</slot>
				</div>
			</div>
		</div>

		<div class="login-content" id="app" :class="contentClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import DropdonwItem from "../Components/Menues/dropdown/DropdonwItem.vue";
import DropdownMenu from "../Components/Menues/dropdown/DropdownMenu.vue";
import LawsModal from "../Components/Modals/LawsModal.vue";
import LoginMenu from "../Components/App/LoginMenu.vue";
export default {
	props: {
		contentClass: {
			default: [],
		},
	},
	data() {
		return {
			showlaws: false,
			showMenu: false,
		};
	},

	components: {
		DropdownMenu,
		LawsModal,
		DropdonwItem,
		LoginMenu,
	},
};
</script>



<style>
</style>