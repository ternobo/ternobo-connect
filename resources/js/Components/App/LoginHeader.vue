<template>
	<div class="login-header">
		<laws-modal :show.sync="showlaws"></laws-modal>
		<div class="logo-container">
			<wire-link href="/" class="logodesktop" v-if="$root.isDesktop">
				<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
			</wire-link>
			<wire-link href="/" class="logo-sm" v-if="!$root.isDesktop">
				<img src="/images/logo.svg" class="ms-2" />
			</wire-link>
			<span class="beta-badge m-0">Beta</span>
		</div>
		<div class="login-header-menu" dir="ltr">
			<a href="https://trello.com/b/Vku6XmjN/ternobo" target="__blank">{{ __.get("application.trello") }}</a>
			<a href="https://discord.gg/unXsnGHsNj" target="__blank">{{ __.get("application.discord") }}</a>
			<a href="#" @click="showlaws = !showlaws">{{ __.get("application.comuunity-guidelines") }}</a>
			<dropdown-menu variant="white">
				<template #button="{ active }">
					<i class="material-icons transition" :class="{ 'rotate-180': active }">keyboard_arrow_down</i>
					<span class="d-flex flex-row ms-1" v-if="(appDirection = 'ltr')"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /> <span class="me-2">English</span> </span>
					<span class="d-flex flex-row ms-1" v-else> <img src="/images/iran-flag.png" width="24" /> <span class="me-2">فارسی</span> </span>
				</template>
				<dropdonw-item>
					<a class="d-flex flex-row" href="/set-language?locale=en"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /> <span class="me-2">English</span> </a>
				</dropdonw-item>
				<dropdonw-item>
					<a class="d-flex flex-row" href="/set-language?locale=fa"> <img src="/images/iran-flag.png" width="24" /> <span class="me-2">فارسی</span> </a>
				</dropdonw-item>
			</dropdown-menu>
		</div>
	</div>
</template>

<script>
import DropdonwItem from "../Menues/dropdown/DropdonwItem.vue";
import DropdownMenu from "../Menues/dropdown/DropdownMenu.vue";
import LawsModal from "../Modals/LawsModal.vue";
export default {
	data() {
		return {
			showlaws: false,
		};
	},

	components: {
		DropdownMenu,
		LawsModal,
		DropdonwItem,
	},
};
</script>



<style>
</style>