<template>
	<div class="sticky-aside">
		<CategoriesModal @categoryAdded="addCategory" :show.sync="edit" :categories.sync="list"></CategoriesModal>

		<div class="card mb-3">
			<div class="card-body">
				<div class="actions-list">
					<button class="action-item" @click="action = 'all'" :class="{ active: action == 'all' }"><i class="material-icons">library_books</i> همه مطالب</button>
					<button class="action-item" @click="action = 'comments'" :class="{ active: action == 'comments' }"><i class="material-icons-outlined">comment</i> نظرات</button>
					<button class="action-item" @click="action = 'likes'" :class="{ active: action == 'likes' }"><i class="material-icons">favorite_border</i> پسند‌ها</button>
					<button class="action-item" @click="action = 'share'" :class="{ active: action == 'share' }"><i class="material-icons-outlined">share</i> بازنشر‌ها</button>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-body">
				<div class="categories">
					<div class="d-flex justify-content-between">
						<h2 class="category--title">دسته‌بندی‌ها</h2>
						<i class="clickable hover-dark material-icons-outlined" v-if="checkUser(pageId)" @click="edit = !edit">{{ !edit ? "edit" : "save" }}</i>
					</div>
					<ul>
						<category-item v-for="category in list" :class="{ active: category.id == activeCategory }" @click.native="activeCategory = category.id" :key="category.id" :category="category"></category-item>
					</ul>

					<hr v-if="tags.length > 0" />

					<div class="d-flex justify-content-between" v-if="tags.length > 0">
						<h2 class="category--title">برچسب‌ها</h2>
						<div class="d-flex align-items-center" v-if="checkUser(pageId)">
							<i class="clickable hover-dark material-icons-outlined" v-if="!tagsEdit" @click="tagsEdit = !tagsEdit">edit</i>

							<i class="clickable hover-dark material-icons-outlined" v-if="tagsEdit" @click="cancelRemove">close</i>
							<i class="clickable hover-dark material-icons-outlined" v-if="tagsEdit" @click="saveTagRemove">save</i>
						</div>
					</div>
					<div>
						<input class="form-control my-2 rounded-pill" placeholder="جستجو" v-model="searchTag" />
					</div>
					<div class="profile-tags tags" :class="{ 'tag-edit': tagsEdit }">
						<div class="tag-item" :class="{ active: tag == activeTag }" @click="tagAction(tag)" v-for="tag in tagsToShow" :key="'tag_item_' + tag">
							{{ tag }}
						</div>
					</div>
					<span class="text-action clickable mt-2" v-if="tags.length > 5 && 5 * tagPage < tags.length" @click="tagPage++">نمایش بیشتر</span>
				</div>
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
	},
	created() {
		this.list = this.categories;
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
