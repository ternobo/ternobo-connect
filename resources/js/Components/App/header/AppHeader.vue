<template>
	<div class="header">
		<user-option-modal :show.sync="showOptions"></user-option-modal>
		<div class="container">
			<div class="d-flex align-items-center w-100">
				<wire-link href="/feed" class="logodesktop" v-if="$root.isDesktop">
					<img :src="shared.direction == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
				</wire-link>
				<wire-link href="/feed" class="logo-sm" v-if="!$root.isDesktop">
					<img src="/images/logo.svg" class="ms-2" />
				</wire-link>

				<form method="get" action="/search" ref="searchfield" class="searchfield d-flex">
					<auto-complete class="search-field w-100" icon="search" v-model="searchVal" @search="submitsearch" required type="text" :suggestionPosition="17" name="q" :placeholder="__.get('application.search-palceholder')" />
					<div class="beta-badge">
						<span class="me-2 text-nowrap">v 0.1</span>
						<img src="/images/beta.svg" width="36" class="verical-middle" />
					</div>
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
	created() {
		this.searchVal = this.$store.state.search;
	},
	data() {
		return {
			searchVal: "",
			showOptions: false,
		};
	},
	computed: {
		...mapState(["shared"]),
	},
	methods: {
		submitsearch() {
			if (this.searchVal.length > 0) $refs.searchfield.submit();
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
