<template>
	<div class="container-fluid px-3">
		<LoginModal :show.sync="showLogin"></LoginModal>
		<LawsModal :show.sync="showLaws"></LawsModal>
		<SignupModal :show.sync="showSignup"></SignupModal>
		<b-sidebar id="sidebar" title="" backdrop-variant="dark" right backdrop shadow>
			<div>
				<div class="b-sidebar-item w-100 d-flex justify-content-between align-items-center clickable" style="overflow-x: hidden" @click="showLaws = !showLaws">قوانین و مقررات</div>
				<div class="b-sidebar-item w-100 d-flex justify-content-between align-items-center" style="overflow-x: hidden">
					<span>نمایش پس زمینه</span>
					<switches v-model="hasBG"></switches>
				</div>
				<a v-if="$store.state.user" href="/logout" method="post" class="b-sidebar-item hover-danger w-100 d-flex justify-content-between align-items-center">
					<span>خروج از حساب کاربری</span>
					<i class="material-icons">power_settings_new</i>
				</a>
			</div>
		</b-sidebar>
		<div class="search-page-container">
			<div class="header-search d-flex justify-content-between align-items-center">
				<div class="menu d-flex">
					<div class="clickable" v-b-toggle.sidebar><i class="material-icons header-btn" :class="{ 'text-dark': !hasBG, 'text-white': hasBG }">menu</i></div>
				</div>
				<div class="d-flex align-items-center">
					<wire-link v-if="$store.state.user" :class="{ 'text-dark': !hasBG, 'text-white': hasBG }" href="/feed">
						<i class="navheader-icon material-icons-outlined" :class="{ 'text-dark': !hasBG, 'text-white': hasBG }">home</i>
					</wire-link>

					<button v-if="!$store.state.user" class="btn btn-transparent font-14 py-1" :class="{ 'text-dark': !hasBG }" @click="showLogin = !showLogin">ورود</button>
				</div>
			</div>
			<div class="search-section" :class="{ noBG: !hasBG }">
				<form action="/search" id="searchform" autocomplete="off">
					<div class="content-body d-flex justify-content-center align-items-center flex-column">
						<div class="col-md-6 p-0 d-flex justify-content-center align-items-center flex-column">
							<img src="/images/logo-type.svg" class="thelogo logo-type" v-if="hasBG" />
							<img src="/images/logo-type-dark.svg" class="thelogo logo-type" v-if="!hasBG" />
							<auto-complete style="min-width: 270px" v-model="search" required type="text" name="q" :icon="'search'" placeholder="هر چیزی که در جستن آنی، آنی" />
						</div>
					</div>
				</form>
			</div>
			<div class="footer p-3 d-flex justify-content-between align-items-center">
				<div class="bg-downloader d-flex" v-if="hasBG" @mouseenter="showDownloader = true" @mouseleave="showDownloader = false">
					<i class="material-icons-outlined text-white">add_photo_alternate</i>
					<transition name="fade">
						<div class="d-flex py-2 copyright-bg px-4 bg-dark align-items-center text-white" v-if="showDownloader">
							<div class="d-flex flex-column justify-content-center">
								<b class="my-1" style="font-size: 0.8rem">علی اطیابی</b>
								<small style="font-size: 0.8rem">تهران، تهران ایران</small>
							</div>
							<a class="d-flex align-items-center" download href="/images/search-background-2x.jpg"><i class="material-icons text-white ms-5">get_app</i></a>
						</div>
					</transition>
				</div>
				<div v-if="$root.isMobile">
					<img src="/images/logo-white.svg" class="thelogo" v-if="hasBG" style="width: 24px" />
					<img src="/images/logo.svg" class="thelogo" v-if="!hasBG" style="width: 24px" />
				</div>
				<div v-else>
					<img src="/images/logo-en.svg" class="thelogo" v-if="hasBG" style="width: 110px" />
					<img src="/images/logo-en-dark.svg" class="thelogo" v-if="!hasBG" style="width: 110px" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Switches from "vue-switches";
import LawsModal from "../Components/Modals/LawsModal";
import AppHeader from "../Components/App/header/AppHeader";
import Landing from "../Components/App/Landing";
import LoginModal from "../Components/Modals/LoginModal";
import SignupModal from "../Components/Modals/SignupModal";
import App from "../Layouts/App";
import AutoComplete from "../Components/inputs/AutoComplete.vue";

export default {
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
	data() {
		return {
			showLanding: false,
			showDownloader: false,
			hasBG: true,
			showLogin: false,
			showLaws: false,
			showSignup: false,
		};
	},
	watch: {
		showLanding: function () {
			setTimeout(function () {
				window.scrollTo(0, 800);
			}, 500);
		},
	},
	mounted() {
		// const $this = this;
		// var i = 0;
		// var txt = "شبکه اجتماعی متخصصین";
		// var speed = 130;
		// function typeWriter() {
		// 	if (i < txt.length) {
		// 		$this.$refs.typewritingdescript.innerHTML += txt.charAt(i);
		// 		i++;
		// 		setTimeout(typeWriter, speed);
		// 	}
		// }
		// typeWriter();
	},
	props: {
		articles: {
			type: Array,
			default: undefined,
		},
	},
	layout: App,
	name: "Welcome",
	components: {
		LawsModal,
		AppHeader,
		Landing,
		Switches,
		LoginModal,
		SignupModal,
		AutoComplete,
	},
};
</script>