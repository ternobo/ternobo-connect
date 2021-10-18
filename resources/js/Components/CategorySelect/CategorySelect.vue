<template>
	<div class="category-select" @click="showModal = true">
		<category-select-modal :categories.sync="categories" :selectedCategory.sync="selectedCategory" :show.sync="showModal"></category-select-modal>
		<i class="material-icons-outlined font-20">layers</i>
		<span>{{ selectedCategory == null ? __.choice("content/posts.category", 2) : selectedCategory.name }}</span>
	</div>
</template>

<script>
import CategorySelectModal from "./CategorySelectModal.vue";
export default {
	components: { CategorySelectModal },
	mounted() {
		if (this.$store.state.user) {
			if (this.$store.state.shared.currentPage.categories != null) {
				this.categories = this.$store.state.shared.currentPage.categories;
			}
		}
	},
	data() {
		return {
			showModal: false,
			selectedCategory: null,

			categories: [],
		};
	},
};
</script>

<style>
</style>