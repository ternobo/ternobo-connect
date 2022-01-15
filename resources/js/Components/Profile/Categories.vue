<template>
	<div class="sticky-aside">
		<CategoriesModal @categoryAdded="addCategory" :show.sync="edit" :categories.sync="list"></CategoriesModal>

		<div class="categories-sidebar-card">
			<div class="actions-list">
				<button class="btn action-item" @click="action = 'all'" :class="{ active: action == 'all' }">
					<i class="material-icons-outlined">article</i> <span style="margin-top: 1px">{{ __.choice("application.post", 2) }}</span>
				</button>
				<button class="btn action-item" @click="action = 'likes'" :class="{ active: action == 'likes' }"><i class="material-icons">favorite_border</i> {{ __.choice("application.like", 2) }}</button>
				<button class="btn action-item" @click="action = 'comments'" :class="{ active: action == 'comments' }"><i class="material-icons-outlined">comment</i> {{ __.choice("application.comment", 2) }}</button>
			</div>
			<hr v-if="list.length > 0" />
			<div class="categories" v-if="list.length > 0">
				<div class="d-flex align-items-start justify-content-between">
					<h2 class="category--title"><i class="material-icons-outlined">layers</i> {{ __.choice("content/posts.category", 2) }}</h2>
					<button class="btn btn-text btn-icon"><i class="material-icons-outlined font-16" style="height: 25px; width: 25px; padding: 2px" v-if="checkUser(pageId)" @click="edit = !edit">edit</i></button>
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
	watch: {
		action(newVal) {
			if (newVal != null) {
				this.activeCategory = null;
				this.activeTag = null;
				this.$emit("input", {
					action: newVal,
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
			}
		},
	},
	methods: {
		addCategory(category) {
			this.list.push(category);
		},
		categorySelect(category) {
			if (category == this.activeCategory) {
				this.activeCategory = null;
				this.action = "all";
			}
			this.activeCategory = category;
		},
	},
	created() {
		this.list = this.categories;
		if (typeof this.value == "object") {
			this.activeCategory = this.value.category;
		} else {
			this.action = this.value;
		}
	},
	data() {
		return {
			edit: false,
			list: [],
			action: "all",
			activeCategory: null,
			searchTag: "",
		};
	},
	mounted() {
		let data = {};
		if (this.activeCategory != null) {
			data.category = this.activeCategory;
		}
	},
	components: {
		CategoryItem,
		CategoriesModal,
	},
	props: {
		value: {
			default: "all",
		},
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
