<template>
	<div v-if="user != null">
		<category-select-modal :categories.sync="categories" @hide="onCategoryClose" :selectedCategory.sync="category" :show.sync="showCategoryModal"></category-select-modal>

		<b-modal ignore-enforce-focus-selector=".ternoboeditor--link-input, .form-control, .editor-block-container *" v-model="showModal" @hide="hide" @show="shown" no-close-on-esc hide-footer :hide-backdrop="hideModal" :modal-class="{ 'opacity-0': hideModal }" size="lg" :title="__.get('content/posts.create-new-post')" :centered="true">
			<div class="content-creation">
				<div class="content-creation--header">
					<div class="content-creation--header__user-profile">
						<lazy-image :src="user.profile" class="profile-xxsm mb-0" img-class="profile-xxsm" loading="lazy" />
						<strong class="user-profile-name">{{ username }}</strong>
					</div>
					<div class="content-creation--header__actions">
						<!-- <div class="can-tip-post-check clickable" @click="canDonate = !canDonate">
							<div>
								<i class="material-icons-outlined font-20 me-1">savings</i>
								{{ __.choice("tips.tip", 1) }}
							</div>
							<loading-spinner v-if="loadingCanDonate" style="height: 12px; width: 12px; border-width: 1px"></loading-spinner>
							<checkbox v-else v-model="canDonate" :status="canDonate" class="m-0 text-superlight light"></checkbox>
						</div> -->
						<div class="category-select" @click="showCategoryModal = true">
							<i class="material-icons-outlined">layers</i>
							<span>{{ category == null ? __.choice("content/posts.category", 2) : category.name }}</span>
						</div>
					</div>
				</div>
				<editor :content.sync="blocks" />
				<!-- <tag-input v-model="tags" /> -->
			</div>
			<modal-footer-buttons @ok="submitPost(shouldDraft)" @cancel="submitPost(!shouldDraft)" class="mt-8" :cancelLoading="loadingDraft" :okLoading="loading" :okText="post ? __.get('application.save') : __.get('content/posts.publish')" :cancelText="shouldDraft ? __.get('content/posts.publish') : __.get('content/posts.draft')" :cancelDisable="!checkContent" cancelClass="btn-text" :okDisabled="!checkContent" okClass="btn-primary"></modal-footer-buttons>
		</b-modal>
	</div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import TagInput from "../inputs/TagInput";
import Checkbox from "../inputs/Checkbox.vue";
import { mapState } from "vuex";
import LoadingSpinner from "../LoadingSpinner.vue";
import CategorySelect from "../CategorySelect/CategorySelect.vue";
import CategorySelectModal from "../CategorySelect/CategorySelectModal.vue";
import { serialize } from "../../Libs/ObjectToFormdata";
import ModalFooterButtons from "../Modals/ModalFooterButtons.vue";
import Editor from "./Editor/Index";

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
		// Prevent tab close
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

		submitPost(draft = false) {
			// Check if post is draft
			if (draft) {
				this.loadingDraft = true;
			} else {
				this.loading = true;
			}

			let data = {
				blocks: this.blocks.map((item, sort) => {
					return {
						type: item.type,
						id: item.id,
						sort: sort,
						content: item.content,
						meta: item.meta,
					};
				}),
				draft: draft ? 1 : 0,
				tags: this.tags,
				canDonate: this.canDonate,
				category: this.category ? this.category.name : null,
				_method: this.post ? "PUT" : "POST",
			};

			let requestConfig = {
				method: "post",
				url: this.post != null ? `/posts/${this.post.id}` : "/posts",
				data: serialize(data),
			};

			this.$root.application
				.backgroundUpload(requestConfig)
				.then((response) => {
					if (response.data.result) {
						if (this.post && this.post?.blocks != response.data.post.blocks) {
							this.$emit("update:post", response.data.post);
							this.toast(__.get("messages.save-success"), "check", "text-success");
						} else {
							this.blocks = [];
							this.category = undefined;
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
	// watch: {
	// canDonate(newValue) {
	// 	if (newValue && this.show) {
	// 		this.loadingCanDonate = true;
	// 		axios
	// 			.post("/can-donate")
	// 			.then((response) => {
	// 				if (!response.data.result) {
	// 					this.canDonate = false;
	// 					this.$bvModal
	// 						.msgBoxConfirm(this.__.get("messages.active-tip-error"), {
	// 							title: this.__.get("tips.active-gateway"),
	// 							cancelVariant: "transparent text-muted",
	// 							cancelTitle: this.__.get("application.skip"),
	// 							okTitle: this.__.get("tips.activate"),
	// 							headerClass: "category-select-modal",
	// 							centered: true,
	// 							headerCloseContent: "arrow_back",
	// 							hideBackdrop: false,
	// 							hideHeaderClose: false,
	// 						})
	// 						.then((value) => {
	// 							this.$emit("update:show", true);
	// 							if (value) {
	// 								window.open("/monetization?tab=settings");
	// 							}
	// 						});
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 				this.toast(__.get("messages.save-error"));
	// 				this.canDonate = false;
	// 			})
	// 			.then(() => (this.loadingCanDonate = false));
	// 	}
	// },
	// },
	mounted() {
		if (this.$store.state.user) {
			if (this.$store.state.shared.currentPage.categories != null) {
				this.categories = this.$store.state.shared.currentPage.categories;
			}
		}

		if (this.post) {
			this.canDonate = this.post.can_tip;
			this.category = this.post.category;
			let content = _.cloneDeep(this.post.blocks);
			this.blocks = content;
		}
	},
	computed: {
		...mapState(["user", "shared", "showNewPostModal"]),
		hideModal() {
			return this.showCategoryModal || !this.showNewPostModal;
		},
		shouldDraft() {
			return this.post?.type == "draft_post";
		},
		username() {
			return Boolean(this.user) && Boolean(this.user.name) && this.user.name.length > 40 ? this.user.name.substr(0, 40) : this.user.name;
		},
		checkContent() {
			return (
				this.blocks.filter((block) => {
					return block.content != null;
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
			blocks: [],
			tags: [],

			canDonate: false,
			loadingCanDonate: false,
		};
	},
	components: {
		TagInput,
		Checkbox,
		LoadingSpinner,
		CategorySelect,
		CategorySelectModal,
		ModalFooterButtons,
		Editor,
	},
	mixins: [ModalMixin],
	name: "NewPostModal",
};
</script>