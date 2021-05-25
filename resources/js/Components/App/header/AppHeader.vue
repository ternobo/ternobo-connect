<template>
	<div class="header">
		<user-option-modal :show.sync="showOptions"></user-option-modal>
		<div class="container">
			<div class="d-flex align-items-center w-100">
				<wire-link href="/feed" class="logodesktop" v-if="$root.isDesktop">
					<img src="/images/farsi-logo.svg" class="w-100" />
				</wire-link>
				<wire-link href="/feed" class="logo-sm" v-if="!$root.isDesktop">
					<img src="/images/logo.svg" class="mr-2" />
				</wire-link>

				<form method="get" action="/search" ref="searchfield" class="searchfield d-flex">
					<auto-complete class="search-field w-100" icon="search" v-model="searchVal" @search="$refs.searchfield.submit()" required type="text" :suggestionPosition="17" name="q" placeholder="هر چیزی که در جستن آنی، آنی" />
					<div class="text-muted align-items-center justify-content-center d-lg-flex d-none nowrap font-12" style="padding-right: 24px !important"><img src="/images/beta.svg" width="36" class="verical-middle" /> <span class="mr-2 text-nowrap">۰.۶ V</span></div>
				</form>
				<div v-if="!$root.isDesktop">
					<i class="material-icons hover-dark clickable" @click="showOptions = true">more_vert</i>
				</div>
			</div>
			<div class="d-flex align-items-center justify-content-end" v-if="$root.isDesktop" style="min-width: 400px">
				<header-toolbar></header-toolbar>
			</div>
		</div>
	</div>
</template>

<script>
import Autocomplete from "@trevoreyre/autocomplete-vue";
import HeaderToolbar from "./HeaderToolbar";
import UserOptionModal from "../../Modals/UserOptionModal.vue";
import AutoComplete from "../../inputs/AutoComplete.vue";
export default {
	created() {
		this.searchVal = this.$store.state.search;
	},
	data() {
		return {
			searchVal: null,
			showOptions: false,
		};
	},
	methods: {
		search(input) {
			const element = document.getElementById("searchforminput").parentElement;
			element.style.position = "unset";
			if (element.getElementsByClassName("autocomplete-result-list").length > 0) {
				element.getElementsByClassName("autocomplete-result-list")[0].style.width = element.getBoundingClientRect().width + "px";
				element.getElementsByClassName("autocomplete-result-list")[0].style.marginTop = "-14px";
			}

			if (input.length < 2) {
				return [];
			}
			return new Promise((resolve, reject) => {
				axios
					.post(this.$APP_URL + "/search", {
						q: input,
					})
					.then((response) => {
						if (response.data.result) {
							resolve(response.data.suggestions);
						} else {
							resolve([]);
						}
					});
			});
		},
	},
	name: "AppHeader",
	components: {
		HeaderToolbar,
		Autocomplete,
		UserOptionModal,
		AutoComplete,
	},
};
</script>
