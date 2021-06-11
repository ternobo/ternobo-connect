<template>
	<div class="sticky-aside">
		<CategoriesModal @categoryAdded="addCategory" :show.sync="edit" :categories.sync="list"></CategoriesModal>

		<div class="categories-sidebar-card">
			<div class="actions-list">
				<button class="action-item" @click="action = 'all'" :class="{ active: action == 'all' }">
					<i class="material-icons-outlined">article</i> <span style="margin-top: 1px">{{ __.choice("application.post", 2) }}</span>
				</button>
				<button class="action-item" @click="action = 'likes'" :class="{ active: action == 'likes' }"><i class="material-icons">favorite_border</i> {{ __.choice("application.like", 2) }}</button>
				<button class="action-item" @click="action = 'comments'" :class="{ active: action == 'comments' }"><i class="material-icons-outlined">comment</i> {{ __.choice("application.comment", 2) }}</button>
			</div>
			<hr v-if="list.length > 0" />
			<div class="categories" v-if="list.length > 0">
				<div class="d-flex align-items-start justify-content-between">
					<h2 class="category--title"><i class="material-icons-outlined">layers</i> {{ __.choice("content/posts.category", 2) }}</h2>
					<i class="btn btn-edit material-icons-outlined font-16" style="height: 25px; width: 25px; padding: 2px" v-if="checkUser(pageId)" @click="edit = !edit">edit</i>
				</div>
				<ul>
					<category-item v-for="category in list" :class="{ active: category.id == activeCategory }" @click.native="categorySelect(category.id)" :key="category.id" :category="category"></category-item>
				</ul>
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
		activeCategory(newVal, oldValue) {
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
		categorySelect(category) {
			if (category == this.activeCategory) {
				this.activeCategory = null;
				this.action = "all";
			}
			this.activeCategory = category;
		},
		saveTagRemove() {
			axios
				.post("/tags/delete", {
					tags: this.removedTags,
				})
				.catch((err) => {
					this.toast(__.get("messages.delete-error"));
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
