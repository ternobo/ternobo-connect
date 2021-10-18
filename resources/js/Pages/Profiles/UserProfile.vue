<template>
	<base-layout>
		<mobile-categories v-if="!$root.isDesktop" :categories="page.categories" :show.sync="showMobileCategory"></mobile-categories>
		<div class="content-container-profile" v-infinite-scroll="loadMore" infinite-scroll-distance="5">
			<ProfileHeader ref="ProfileHeader" :page="page" :can-edit="canEdit"></ProfileHeader>
			<page-blocked v-if="page.blocked" :fname="page.user.first_name" />
			<tabs :compact="true" :disabled="edit" class="profile-tabs" @selected="tabChange" :state-tab="true" v-else>
				<template slot="custom-item">
					<div class="d-flex align-items-center" v-if="canEdit && showEdit">
						<div class="me-4" v-if="edit">
							<button class="btn btn-text mt-4">
								<i class="material-icons text-muted" v-if="edit" @click="cancelEdit">close</i>
							</button>
						</div>
						<div class="d-flex align-items-center clickable mt-4" @click="doEdit">
							<button class="btn btn-text border-gray-medium-dark rounded-4">
								<i class="ternobo-icons-save" v-if="edit"></i>
								<i class="ternobo-icons-edit" v-else></i>
								<span class="font-demibold ms-2">
									{{ edit ? __.get("application.save") : __.get("application.edit") }}
								</span>
							</button>
						</div>
					</div>
					<div class="d-flex algin-items-center" v-else-if="current_tab == 'activities' && canEdit">
						<button class="btn btn-subtle btn-rounded" @click="draft = !draft">
							<div :style="$root.isDesktop ? '' : 'height: 16px;display: flex;'" v-if="!draft">
								<i class="material-icons-outlined" :class="{ 'me-1': $root.isDesktop }">save</i><span style="font-weight: 600" v-if="$root.isDesktop"> {{ __.get("content/posts.draft") }} </span>
							</div>
							<div :style="$root.isDesktop ? '' : 'height: 16px;display: flex;'" v-else>
								<i class="material-icons-outlined" :class="{ 'me-1': $root.isDesktop }">article</i><span style="font-weight: 600" v-if="$root.isDesktop"> {{ __.get("user-profile.published") }} </span>
							</div>
						</button>
					</div>
				</template>
				<tab v-if="hasAbout || canEdit" :name="__.get('user-profile.tabs.about')" id="home" :href="'/' + page.slug" :selected="current_tab === 'home'">
					<div class="w-100 d-flex justify-content-center py-3" v-if="loadingTab">
						<loading-spinner class="image__spinner" />
					</div>
					<AboutTab v-else ref="about" :edit="edit" :page="page"></AboutTab>
				</tab>
				<tab v-if="hasActivity || canEdit" :name="__.get('user-profile.tabs.activities')" id="activities" :href="'/' + page.slug + '/activities'" :selected="current_tab === 'activities'">
					<div class="row">
						<div class="categories-sidebar" v-if="$root.isDesktop">
							<Categories v-model="filters" :page-id="page.id" :categories="page.categories" :slug="page.slug"></Categories>
						</div>
						<div class="posts-container-profile">
							<div v-if="draft">
								<div class="profile-posts posts" :class="{ 'mt-0': !canEdit }" v-if="!loadingActions">
									<draft-card class="mb-4" v-for="action in actionsList" :post="action" :key="action.id"></draft-card>
								</div>
								<posts-loading v-if="loadingActions" :count="3" />
								<div class="w-100 d-flex justify-content-center py-3" v-else-if="loadingMore">
									<loading-spinner class="image__spinner" />
								</div>
								<div v-if="next_page_url === null && !loadingActions">
									<no-content></no-content>
								</div>
							</div>
							<div v-else>
								<NewPostCard :showDraft="false" @posted="onPostAdded" ref="newPostCard" v-if="canEdit"></NewPostCard>
								<categories-mobile v-model="filters" :page-id="page.id" :categories="page.categories" :slug="page.slug" v-if="!$root.isDesktop"></categories-mobile>
								<div class="profile-posts posts" :class="{ 'mt-0': !canEdit }" v-if="!loadingActions">
									<ActionCard v-for="action in actionsList" :page="page" :action="action" :key="action.id"></ActionCard>
								</div>
								<posts-loading v-if="loadingActions" :count="3" />
								<div class="w-100 d-flex justify-content-center py-3" v-else-if="loadingMore">
									<loading-spinner class="image__spinner" />
								</div>
								<div v-if="next_page_url === null && !loadingActions">
									<no-content></no-content>
								</div>
							</div>
						</div>
					</div>
				</tab>
				<tab :name="__.get('user-profile.tabs.contact')" id="contact" :href="'/' + page.slug + '/contact'" :selected="current_tab === 'contact'">
					<ContactTab ref="contacts" :edit="edit" :page="page"></ContactTab>
				</tab>
			</tabs>
		</div>
		<sidebar-left v-if="$root.isDesktop">
			<div class="card" style="margin-bottom: 16px" v-if="pages.length > 0">
				<div class="card-header pt-4 px-4 pb-0 font-14" v-html="__.get('user-profile.followed', { name: page.user.first_name })"></div>
				<div class="people-suggestion-card-body card-body">
					<people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
				</div>
			</div>
			<AppFooter class="sticky-aside"></AppFooter>
		</sidebar-left>
	</base-layout>
</template>

<script>
import NoContent from "../../Components/NoContent";

import ProfileHeader from "../../Components/Profile/ProfileHeader";

import MobileCategories from "../../Components/Profile/MobileCategories.vue";
import CategoriesMobile from "../../Components/Profile/CategoriesMobile.vue";
import ProfileSteps from "../../Components/Profile/ProfileSteps.vue";
import VerifyModal from "../../Components/Modals/VerifyModal.vue";
import DraftCard from "../../Components/PostCard/DraftCard.vue";
import AppLayout from "../../Layouts/AppLayout.vue";
import ContactTab from "../../Components/Profile/Contact/ContactTab";
import AboutTab from "../../Components/Profile/AboutMe/AboutMeTab";
import PostsLoading from "../../Components/Skeletons/PostsLoading.vue";
import PageBlocked from "../../Components/Profile/PageBlocked.vue";
export default {
	watch: {
		filters() {
			this.draft = false;
			this.loadingActions = true;
			axios
				.post("/" + this.page.slug + "/actions", this.filters)
				.then((response) => {
					this.actionsList = response.data.actions.data;
					this.next_page_url = response.data.actions.next_page_url;
				})
				.catch((err) => console.log(err))
				.then(() => (this.loadingActions = false));
		},
		draft() {
			this.loadingActions = true;
			if (this.draft) {
				axios
					.post("/" + this.page.slug + "/drafts", this.filters)
					.then((response) => {
						this.actionsList = response.data.drafts.data;
						this.next_page_url = response.data.drafts.next_page_url;
					})
					.catch((err) => console.log(err))
					.then(() => (this.loadingActions = false));
			} else {
				axios
					.post("/" + this.page.slug + "/actions", this.filters)
					.then((response) => {
						this.actionsList = response.data.actions.data;
						this.next_page_url = response.data.actions.next_page_url;
					})
					.catch((err) => console.log(err))
					.then(() => (this.loadingActions = false));
			}
		},
	},
	created() {
		if (window.location.hash == "#drafts") {
			this.current_tab = "activities";
			this.draft = true;
			this.showEdit = false;
		} else {
			this.current_tab = this.location;
		}

		if (this.current_tab == "activities") {
			this.showEdit = false;
			const params = new URLSearchParams(window.location.search);
			if (params.get("filters")) {
				this.filters = JSON.parse(params.get("filters"));
			}
			axios
				.post("/" + this.page.slug + "/actions", this.filters)
				.then((response) => {
					this.actionsList = response.data.actions.data;
					this.next_page_url = response.data.actions.next_page_url;
				})
				.catch((err) => console.log(err))
				.then(() => (this.loadingActions = false));
		} else {
			this.showEdit = true;
		}
	},
	beforeRouteLeave(to, from, next, vm) {
		if (vm.edit) {
			vm.confirmDialog(window.__.get("messages.on-exit-confirm")).then((value) => {
				if (value) {
					vm.$store.commit("setProfileEdit", false);
					vm.$forceUpdate();
					next();
				}
			});
		} else {
			vm.$forceUpdate();
			next();
		}
	},
	destroyed() {
		window.onbeforeunload = null;
	},
	methods: {
		reloadUser() {
			this.$store.dispatch("loadUser");
		},
		onPostAdded() {
			this.reloadUser();
			this.loadingActions = true;
			axios
				.post("/" + this.page.slug + "/actions", this.filters)
				.then((response) => {
					this.actionsList = response.data.actions.data;
					this.next_page_url = response.data.actions.next_page_url;
				})
				.catch((err) => {})
				.then(() => (this.loadingActions = false));
		},
		stepsAction(action) {
			switch (action) {
				case "upload_profile":
					this.$refs.ProfileHeader.setProfileImage();
					break;
				case "set_shortbio":
					this.$refs.ProfileHeader.edit = true;
					break;
				case "set_biography":
					this.current_tab = "home";
					this.loadTab("/" + this.page.slug);
					this.doEdit();
					break;
				case "set_skills":
					this.current_tab = "home";
					this.loadTab("/" + this.page.slug);
					this.doEdit();
					break;
				case "add_post":
					this.current_tab = "activities";
					this.$refs.newPostCard.showPostModal = true;
					break;
				case "verfication":
					this.showVerification = true;
					break;
			}
		},
		loadMore() {
			if (!this.loadingMore && this.next_page_url !== null) {
				const options = {
					method: "POST",
					url: this.next_page_url,
					data: this.filters,
				};
				this.loadingMore = true;
				axios(options)
					.then((response) => {
						const data = response.data;
						if (data) {
							if (data.actions) {
								this.actionsList = this.actionsList.concat(data.actions.data);
								this.next_page_url = data.actions.next_page_url;
							}
						}
					})
					.catch((error) => {
						this.next_page_url = options.url;
					})
					.then(() => {
						this.loadingMore = false;
					});
			}
		},

		loadTab(link, pushState = true) {
			if (link.endsWith("articles") || link.endsWith("activities")) {
				this.showEdit = false;
				this.loadingTab = true;
				this.loadingActions = true;
				axios
					.post("/" + this.page.slug + "/actions", this.filters)
					.then((response) => {
						this.actionsList = response.data.actions.data;
						this.next_page_url = response.data.actions.next_page_url;
					})
					.catch((err) => {
						console.log(err);
						this.toast(__.get("messages.error-in-get-data"));
					})
					.then(() => {
						this.loadingTab = false;
						this.loadingActions = false;
					});
			} else {
				this.showEdit = true;
			}

			if (pushState) {
				window.history.replaceState({}, false, link);
			}
		},

		tabChange(link, id) {
			this.current_tab = id;
			this.loadTab(link);
		},
		doEdit() {
			if (this.edit) {
				this.loadingSave = true;
				if (this.current_tab === "contact") {
					let data = this.$refs.contacts.getData();
					if (data) {
						axios
							.post("/contacts", {
								contacts: data,
							})
							.then((response) => {
								if (response.data.result) {
									this.$store.commit("setProfileEdit", false);
									window.onbeforeunload = null;
									if (response.data.redirectTo != null) {
										window.location = response.data.redirectTo;
									}
								} else {
									this.handleError(response.data.errors);
								}
								this.loadingSave = false;
							})
							.catch((err) => {
								console.log(err);
								this.toast(__.get("messages.save-error"));
							})
							.then(() => {
								this.loadingSave = false;
							});
					} else {
						this.loadingSave = false;
						this.toast(__.get("messages.invalid-inputs"));
					}
				} else if (this.current_tab === "home") {
					axios
						.post("/save/resume", this.$refs.about.getData())
						.then((response) => {
							if (response.data.result) {
								this.$store.commit("setProfileEdit", false);
								window.onbeforeunload = null;
								this.reloadUser();
							} else {
								this.handleError(response.data.errors, response.data.type);
							}
							this.loadingSave = false;
						})
						.catch((err) => {
							console.log(err);
							this.toast(__.get("messages.save-error"));
						})
						.then(() => {
							this.loadingSave = false;
						});
				}
			} else {
				this.$store.commit("setProfileEdit", true);
				window.onbeforeunload = function (e) {
					var message = "در صورت خروج تغییرات پروفایل از بین‌می‌رود!",
						e = e || window.event;
					// For IE and Firefox
					if (e) {
						e.returnValue = message;
					}

					// For Safari
					return message;
				};
			}
		},
		cancelEdit() {
			this.loadingTab = true;
			this.$store.state.ternoboWireApp.reload({
				only: ["page"],
			});
			setTimeout(() => {
				this.loadingTab = false;
			}, 300);
			this.$store.commit("setProfileEdit", false);
		},
	},
	data() {
		return {
			about: null,
			loadingSave: false,
			current_tab: "",
			experiences: [],
			skills: [],
			categories: [],
			actionsList: [],
			articlesList: [],
			next_page_url: null,
			showEditModal: false,
			showEdit: true,
			loadingTab: false,
			loadingMore: false,
			showAbout: true,

			showMobileCategory: false,

			loadingActions: true,

			filters: {
				action: "all",
			},
			showVerification: false,

			draft: false,
		};
	},
	computed: {
		edit() {
			return this.$store.state.profileEdit;
		},
		canEdit() {
			return this.checkUser(this.page.user.id);
		},
	},
	name: "UserProfile",
	props: {
		currentCategory: {
			default: null,
			required: false,
		},
		pages: {
			type: Array,
			default: [],
		},
		page: {
			type: Object,
			default: undefined,
		},
		hasActivity: {
			type: Boolean,
			default: true,
		},
		hasAbout: {
			type: Boolean,
			default: true,
		},
		actions: {
			type: Object,
			default: () => {
				return {
					data: [],
					next_page_url: null,
				};
			},
		},
		articles: {
			type: Object,
			default: () => {
				return {
					data: [],
					next_page_url: null,
				};
			},
		},
		location: {
			type: String,
			default: "home",
		},
	},
	/**

       */
	components: {
		AboutTab,
		NewPostCard: () => import("../../Components/Cards/NewPostCard"),
		Categories: () => import("../../Components/Profile/Categories"),
		ActionCard: () => import("../../Components/PostCard/ActionCard"),
		NoContent,
		PostCard: () => import("../../Components/PostCard/PostCard"),
		ContactTab,
		ProfileHeader,
		MobileCategories,
		CategoriesMobile,
		ProfileSteps,
		VerifyModal,
		DraftCard,
		PostsLoading,
		PageBlocked,
	},
	layout: AppLayout,
};
</script>
