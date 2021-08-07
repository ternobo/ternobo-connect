<template>
	<div>
		<category-select-modal :categories.sync="categories" @hide="onCategoryClose" :selectedCategory.sync="category" :show.sync="showCategoryModal"></category-select-modal>

		<b-modal v-if="user != null" v-model="showModal" @hide="hide" @show="shown" no-close-on-esc hide-footer no-stacking modal-class="new-post-modal" size="new-post" :title="__.get('content/posts.create-new-post')" :centered="true">
			<div action="/posts" data-ajax method="POST" data-reload="1" enctype="multipart/form-data" class="w-100">
				<div class="new-post position-relative">
					<div class="selections">
						<div class="d-flex align-items-center">
							<lazy-image :src="user.profile" class="profile-sm mb-0" img-class="profile-sm" loading="lazy" />
							<strong class="user-profile-name">{{ username }}</strong>
						</div>
						<div class="categoryandtype">
							<div class="can-tip-post-check clickable" @click="canDonate = !canDonate">
								<div>
									<i class="material-icons-outlined font-20 me-1">savings</i>
									{{ __.choice("tips.tip", 1) }}
								</div>
								<loading-spinner v-if="loadingCanDonate" style="height: 12px; width: 12px; border-width: 1px"></loading-spinner>
								<checkbox v-else v-model="canDonate" :status="canDonate" class="m-0 text-superlight light"></checkbox>
							</div>
							<div class="category-select" @click="showCategoryModal = true">
								<i class="material-icons-outlined">layers</i>
								<span>{{ category == null ? __.choice("content/posts.category", 2) : category.name }}</span>
							</div>
						</div>
					</div>
					<slider v-model="content" @delete="onSlideDelete" ref="sliderEditor" />
					<div class="d-flex justify-content-center align-items-center mt-3 mb-2">
						<loading-button :loading="loadingDraft" class="btn btn-transparent font-14" :disabled="!checkContent" @click.native="submitPost(true)">{{ __.get("content/posts.draft") }}</loading-button>
						<loading-button :loading="loading" class="btn btn-primary font-14 w-100" :class="{ 'text-muted': !checkContent }" :disabled="!checkContent" @click.native="submitPost(false)"> {{ post ? __.get("application.save") : __.get("content/posts.publish") }} </loading-button>
					</div>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import TagInput from "../inputs/TagInput";
import FileInput from "../../Components/inputs/FileInput";
import Slider from "./Slides/Slider.vue";

import uuidv4 from "uuid";
import isUUID from "is-uuid";
import Checkbox from "../inputs/Checkbox.vue";
import { mapState } from "vuex";
import LoadingSpinner from "../LoadingSpinner.vue";
import CategorySelect from "../CategorySelect/CategorySelect.vue";
import CategorySelectModal from "../CategorySelect/CategorySelectModal.vue";
import { serialize } from "../../Libs/ObjectToFormdata";
export default {
	props: {
		post: {
			type: Object,
			default: null,
			required: false,
		},
	},
	methods: {
		hide() {
			window.onbeforeunload = null;
		},
		onCategoryClose() {
			this.$emit("update:show", true);
		},
		onSlideDelete(id) {
			if (!isUUID.v4(id)) {
				this.deletedSlides.push(id);
			}
		},
		newCategory(value) {
			if (!this.categories.filter((item) => item.name == value).length > 0) {
				this.categories.push({
					name: value,
					id: value,
				});
				axios
					.post("/categories", {
						name: value,
					})
					.then(() => {
						this.$store.commit("addCategory", { name: value, id: value });
					});
			} else {
				this.toast(__.get("messages.duplicated-category"));
			}
		},
		toBase64(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});
		},
		shown() {
			window.onbeforeunload = function (e) {
				var message = "در صورت خروج اطلاعات از بین‌می‌رود!",
					e = e || window.event;
				// For IE and Firefox
				if (e) {
					e.returnValue = message;
				}

				// For Safari
				return message;
			};
		},
		async submitPost(draft = false) {
			if (draft) {
				this.loadingDraft = true;
			} else {
				this.loading = true;
			}
			let data = {
				slides: this.content,
			};
			data.slides = data.slides.map((item) => {
				for (let sort = 0; sort < item.content.length; sort++) {
					item.content[sort].sort = sort;
				}
				return item;
			});
			if (this.category) {
				data.category = his.category.name;
			}

			if (this.post) {
				data.deletedSlides = JSON.stringify(this.deletedSlides);
				data._method = "PUT";
			}

			data.draft = this.draft;
			data.canDonate = this.canDonate;

			let url = this.post != null ? `/posts/${this.post.id}` : "/posts";

			console.log(data);

			let requestConfig = {
				method: "post",
				url: url,
				data: serialize(data),
			};

			this.$root.application
				.backgroundUpload(requestConfig)
				.then((response) => {
					if (response.data.result) {
						if (this.post) {
							this.$emit("update:post", response.data.post);
							this.deletedSlides = [];
							this.toast(__.get("messages.save-success"), "check", "text-success");
						} else {
							this.content = [{ id: uuidv4(), content: [], icon: "more_horiz", active: true }];
							this.category = undefined;
							this.canDonate = false;
							this.deletedSlides = [];
							if (draft) {
								this.toast(__.get("messages.drafted-success"), "check", "text-success");
							} else {
								this.toast(__.get("messages.published-success"), "check", "text-success");
								this.$emit("posted", response.data.post);
							}
						}
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.then(() => {
					if (draft) {
						this.loadingDraft = false;
					} else {
						this.loading = false;
					}
				});
			this.$emit("update:show", false);
		},
	},
	watch: {
		text(newValue) {
			if (newValue) {
				this.txtlen = (newValue.length / 2500) * 100 + "%";
				this.leftCharacter = 2500 - newValue.length;
			}
		},
		canDonate(newValue) {
			if (newValue && this.show) {
				this.loadingCanDonate = true;
				axios
					.post("/can-donate")
					.then((response) => {
						if (!response.data.result) {
							this.canDonate = false;
							this.$bvModal
								.msgBoxConfirm(this.__.get("messages.active-tip-error"), {
									title: this.__.get("tips.active-gateway"),
									cancelVariant: "transparent text-muted",
									cancelTitle: this.__.get("application.skip"),
									okTitle: this.__.get("tips.activate"),
									headerClass: "category-select-modal",
									centered: true,
									headerCloseContent: "arrow_back",
									hideBackdrop: false,
									hideHeaderClose: false,
								})
								.then((value) => {
									this.$emit("update:show", true);
									if (value) {
										window.open("/tips?tab=settings");
									}
								});
						}
					})
					.catch((err) => {
						console.log(err);
						this.toast(__.get("messages.save-error"));
						this.canDonate = false;
					})
					.then(() => (this.loadingCanDonate = false));
			}
		},
	},
	mounted() {
		if (this.$store.state.user) {
			if (this.$store.state.shared.currentPage.categories != null) {
				this.categories = this.$store.state.shared.currentPage.categories;
			}
		}
		this.deletedSlides = [];
		if (this.post) {
			this.canDonate = this.post.can_tip;
			this.category = this.post.category;
			let content = _.cloneDeep(this.post.slides);
			for (let i = 0; i < content.length; i++) {
				let item = content[i];
				item.icon = "more_horiz";
				let items = item.content;
				for (let i = 0; i < items.length; i++) {
					let elem = items[i];
					if (elem.type == "media") {
						item.icon = "image";
						break;
					} else {
						item.icon = "text_fields";
					}
				}
				item.active = false;
			}
			content[0].active = true;
			this.content = content;
		}
	},
	computed: {
		...mapState(["user", "shared"]),
		username() {
			return Boolean(this.user) && Boolean(this.user.name) && this.user.name.length > 40 ? this.user.name.substr(0, 40) : this.user.name;
		},

		checkContent() {
			return (
				this.content.filter((item) => {
					return item.content.length > 0 && item.content.filter((content) => Boolean(content.content)).length > 0;
				}).length > 0
			);
		},
	},
	data() {
		return {
			categories: [],
			category: undefined,
			loading: false,
			loadingDraft: false,

			showCategoryModal: false,

			deletedSlides: [],
			content: [{ id: uuidv4(), content: [], icon: "more_horiz", active: true }],

			canDonate: false,
			loadingCanDonate: false,
		};
	},
	components: {
		TagInput,
		FileInput,
		Slider,
		Checkbox,
		LoadingSpinner,
		CategorySelect,
		CategorySelectModal,
	},
	mixins: [ModalMixin],
	name: "NewPostModal",
};
</script>