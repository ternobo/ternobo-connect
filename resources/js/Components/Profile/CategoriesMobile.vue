<template>
	<div :class="{ 'mobile-filters-sticky': isSticky }">
		<CategoriesModal @categoryAdded="addCategory" :show.sync="edit" :categories.sync="list"></CategoriesModal>
		<categories-list :categories="list" :show.sync="showCategoriesMenu" @edit="edit = true" :active-category.sync="activeCategory"></categories-list>
		<tags-list :tags="tags" :show.sync="showTagsMenu" :activeTag="activeTag" @remove="removeTag" @select="tagAction" @cancel="cancelRemove" @save="saveTagRemove"></tags-list>

		<div class="profile-action-filter item-filters justify-content-between">
			<div class="filter-item" @click="action = 'all'" :class="{ active: action == 'all' }"><i class="material-icons-outlined">library_books</i> همه مطالب</div>
			<div class="filter-item" @click="action = 'likes'" :class="{ active: action == 'likes' }"><i class="material-icons-outlined">favorite_border</i> پسند‌ها</div>
			<div class="filter-item" @click="action = 'comments'" :class="{ active: action == 'comments' }"><i class="material-icons-outlined">comment</i> نظرات</div>
		</div>

		<div class="profile-filters" ref="catfilters" v-show="!isSticky">
			<div class="filter-item" @click="showCategoriesMenu = true">
				<i class="material-icons-outlined">layers</i>
				دسته‌بندی‌ها
			</div>
			<div class="filter-item" @click="showTagsMenu = true">
				<i class="material-icons-outlined">label</i>
				برچسب‌ها
			</div>
		</div>
	</div>
</template>

<script>
import CategoryItem from "./CategoryItem";
import CategoriesModal from "../Modals/CategoryModal/CategoriesModal";

export default {
	computed: {
		tagsToShow() {
			return this.searchTag.length > 0 ? this.tags.filter((tag) => tag.startsWith(this.searchTag)) : this.tags.slice(0, 5 * this.tagPage);
		},
	},
	watch: {
		action(newVal) {
			if (newVal != null) {
				this.activeCategory = null;
				this.activeTag = null;
				this.$emit("input", {
					action: newVal,
				});
				let data = {};
				axios.post("/" + this.slug + "/tags", data).then((response) => {
					this.tags = response.data.tags;
				});
			}
		},
		activeCategory(newVal) {
			if (newVal != null) {
				this.action = null;
				this.$emit("input", {
					category: newVal,
					tag: this.activeTag,
				});

				let data = {
					category: newVal,
				};
				axios.post("/" + this.slug + "/tags", data).then((response) => {
					this.tags = response.data.tags;
				});
			}
		},
	},
	methods: {
		addCategory(category) {
			this.list.push(category);
		},
		removeTag(tag) {
			this.removedTags.push(tag);
			this.tags.splice(this.tags.indexOf(tag), 1);
		},
		saveTagRemove() {
			axios
				.post("/tags/delete", {
					tags: this.removedTags,
				})
				.catch((err) => {
					this.toast("خطا در حذف اطلاعات");
					let data = {};
					if (this.activeCategory != null) {
						data.category = this.activeCategory;
					}
					axios.post("/" + this.slug + "/tags", data).then((response) => {
						this.tags = response.data.tags;
					});
				})
				.then(() => {
					this.removedTags = [];
					this.tagsEdit = false;
					this.action = "all";
					this.activeCategory = null;
					this.activeTag = null;
				});
		},
		cancelRemove() {
			this.tagsEdit = false;
			this.removedTags = [];
			let data = {};
			if (this.activeCategory != null) {
				data.category = this.activeCategory;
			}
			axios.post("/" + this.slug + "/tags", data).then((response) => {
				this.tags = response.data.tags;
			});
		},
		tagAction(tag) {
			if (this.tagsEdit) {
				return this.removeTag(tag);
			}
			if (tag == this.activeTag) {
				this.activeTag = null;
				let filter = {};
				if (this.activeCategory != null) {
					filter.category = this.activeCategory;
				} else if (this.action != null) {
					filter.action = this.action;
				} else {
					filter.action = "all";
					this.action = "all";
				}
				this.$emit("input", filter);
				return;
			}
			this.action = null;
			this.activeTag = tag;

			if (this.activeCategory != null) {
				this.$emit("input", {
					category: this.activeCategory,
					tag: this.activeTag,
				});
			} else {
				this.$emit("input", {
					tag: this.activeTag,
				});
			}
		},

		handleScroll() {
			this.scrollY = window.scrollY;
			if (this.scrollY > this.categoriesPosition) {
				this.isSticky = true;
			} else {
				this.isSticky = false;
			}
		},
	},
	destroyed() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	created() {
		window.addEventListener("scroll", this.handleScroll);
		this.list = this.categories;
	},
	mounted() {
		this.categoriesPosition = this.$refs.catfilters.offsetTop;
	},
	data() {
		return {
			edit: false,

			tagsEdit: false,
			list: [],

			activeTag: null,

			action: "all",
			activeCategory: null,
			tags: [],

			removedTags: [],

			searchTag: "",

			tagPage: 1,

			scrollY: 0,

			isSticky: false,

			categoriesPosition: 400,

			showCategoriesMenu: false,
			showTagsMenu: false,
		};
	},
	mounted() {
		let data = {};
		if (this.activeCategory != null) {
			data.category = this.activeCategory;
		}
		axios.post("/" + this.slug + "/tags", data).then((response) => {
			this.tags = response.data.tags;
		});
	},
	components: {
		CategoryItem,
		CategoriesModal,
		CategoriesList: () => import("./CategoriesModal/CategoriesList.vue"),
		TagsList: () => import("./CategoriesModal/TagsList.vue"),
	},
	props: {
		pageId: {
			default: 0,
			required: true,
		},
		slug: {
			type: String,
			default: null,
			required: true,
		},
		categories: {
			type: Array,
			default: [],
			required: true,
		},
	},
};
</script>

<style>
</style>
