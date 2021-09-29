<template>
	<div>
		<LawsModal :show.sync="showLaws"></LawsModal>
		<div class="sticky-aside d-flex align-items-center flex-column">
			<langdropdown class="mb-3" :value="lang"></langdropdown>
			<div class="app-footer">
				<div class="sidemenu-links d-flex flex-wrap justify-content-center align-items-center mb-2">
					<a class="text-muted hover-dark font-14 me-3" @click="showLaws = true">{{ __.get("application.comuunity-guidelines") }}</a>
					<a class="text-muted hover-dark font-14 me-3" href="https://discord.gg/unXsnGHsNj" target="_blank">{{ __.get("application.discord") }}</a>
					<a class="text-muted hover-dark font-14" href="https://trello.com/b/Vku6XmjN/ternobo" target="_blank">{{ __.get("application.trello") }}</a>
				</div>
				<div class="copyright-text d-flex align-items-center justify-content-center" style="height: 16px">
					<img :src="shared.direction == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="mx-1" height="16" />
					<span class="font-14" style="height: 13px; line-height: 1">© {{ this.lang.value == "fa" ? "۱۴۰۰" : "2021" }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Langdropdown from "../Langdropdown";
export default {
	data() {
		return {
			showLaws: false,
			lang: { label: "فارسی", subtext: "", icon: "/images/iran-flag.png" },
		};
	},
	computed: {
		...mapState(["shared"]),
	},
	mounted() {
		if (lang == "en") {
			this.lang = { label: "English", subtext: "US", icon: "/emoji/72x72/1f1fa-1f1f8.png" };
		}
	},
	components: {
		LawsModal: () =>
			import(
				/* webpackChunkName: "LawsModal" */
				"../Modals/LawsModal"
			),
		Langdropdown,
	},
};
</script>

<style>
</style>
