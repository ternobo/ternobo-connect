<template>
	<div class="header">
		<user-option-modal :show.sync="showOptions"></user-option-modal>
		<div class="container">
			<div class="d-flex align-items-center w-100">
				<inertia-link href="/feed" class="logodesktop" v-if="$root.isDesktop">
					<img src="/images/farsi-logo.png" class="w-100" />
				</inertia-link>
				<inertia-link href="/feed" class="logo-sm" v-if="!$root.isDesktop">
					<img src="/images/logo.svg" class="mr-2" />
				</inertia-link>

				<form method="get" action="/search" class="searchfield d-flex mr-3">
					<autocomplete class="search-field w-100" :default-value="searchVal" :search="search" id="searchforminput" autocomplete="off" required type="text" name="q" placeholder="هر چیزی که در جستن آنی، آنی" />
					<div class="text-muted align-items-center justify-content-center d-lg-flex d-none nowrap font-12" style="width: max-content; margin-right: 24px !important">
						<img src="/images/beta.svg" width="36" class="verical-middle" />
						<span class="mx-1 text-nowrap" style="margin-top: 3px">۰.۵ V</span>
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
import Autocomplete from "@trevoreyre/autocomplete-vue";
import HeaderToolbar from "./HeaderToolbar";
import UserOptionModal from "../../Modals/UserOptionModal.vue";
export default {
	data() {
		return {
			searchVal: this.$page.props.search ? this.$page.props.search : "",
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
	},
};
</script>
