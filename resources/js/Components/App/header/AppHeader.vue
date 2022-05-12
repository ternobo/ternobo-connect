<template>
	<div class="header">
		<user-option-modal :show.sync="showOptions"></user-option-modal>
		<div class="container">
			<div class="d-flex align-items-center w-100">
				<wire-link href="/feed" class="logodesktop" v-if="$root.isDesktop">
					<img :src="shared.direction == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
				</wire-link>
				<wire-link href="/feed" class="logo-sm" v-if="!$root.isDesktop">
					<img :src="shared.direction == 'rtl' ? '/images/logo-type-fa-mobile.svg' : '/images/logo-en-dark.svg'" height="24" />
				</wire-link>

				<form @submit="searchSubmit" method="get" action="javascript:;" ref="searchfield" class="searchfield d-flex">
					<auto-complete class="search-field w-100" endpoint="/search" ref="searchInput" inputClass="fill rounded xsm-input" icon="search" v-model="searchVal" @suggestionclick="searchSubmit" @search="searchSubmit" required type="text" :suggestionPosition="17" name="q" :placeholder="__.get('application.searchq')" />
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
import HeaderToolbar from "./HeaderToolbar";
import UserOptionModal from "../../Modals/UserOptionModal.vue";
import AutoComplete from "../../inputs/AutoComplete.vue";
import { mapState } from "vuex";
export default {
	data() {
		return {
			searchVal: "",
			showOptions: false,
		};
	},
	mounted() {
		this.searchVal = this.$store.state.search;
	},
	computed: {
		...mapState(["shared"]),
	},
	methods: {
		searchSubmit(searchFor = null) {
			this.$store.state.ternoboWireApp.visit("/search?q=" + searchFor ? searchFor : this.searchVal);
			this.$refs.searchInput.focus = false;
		},
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
		UserOptionModal,
		AutoComplete,
	},
};
</script>
