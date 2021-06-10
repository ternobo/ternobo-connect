<template>
	<b-modal v-model="showModal" hide-footer :title="__.choice('content/posts.category', 2)" header-class="category-select-modal" modal-class="new-post-modal" size="md" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<div class="new-post">
			<div class="selections">
				<div class="add-category-container w-100 mb-0">
					<input type="text" @keypress.enter="addCategory" :placeholder="__.get('content/posts.create-category')" maxlength="52" v-model="input" class="form-control text-input" />
					<add-btn :disabled="!(input != null && input.length > 0) || loading" @click="addCategory" class="add-btn-light-grey d-flex justify-content-center align-items-center">
						<i v-if="!loading" class="material-icons">add</i>
						<span style="height: 14px; width: 14px; border-width: 2px" v-if="loading" class="loadingspinner"></span>
					</add-btn>
				</div>
			</div>
		</div>
		<div class="category-selection-list">
			<span class="category-badge clickable font-16 font-demibold" v-for="category in categories" :key="`category_id_item_${category.id}`" @click="selectCategory(category)" :class="{ active: selected.id == category.id }">{{ category.name }}</span>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import AddBtn from "../buttons/AddBtn.vue";
export default {
	components: { AddBtn },
	mixins: [ModalMixin],
	name: "CategorySelectModal",
	props: {
		categories: {
			require: false,
			default: () => [],
		},
		selectedCategory: {
			require: false,
			default: null,
		},
	},
	computed: {
		selected() {
			return this.selectedCategory != null ? this.selectedCategory : {};
		},
	},
	data() {
		return {
			input: null,
			loading: false,
		};
	},
	methods: {
		selectCategory(category) {
			if (this.selectedCategory?.id == category.id) {
				this.$emit("update:selectedCategory", null);
			} else {
				this.$emit("update:selectedCategory", category);
			}
			this.$emit("update:show", false);
		},
		addCategory() {
			if (!this.loading && Boolean(this.input)) {
				this.loading = true;
				axios
					.post("/categories", {
						name: this.input,
					})
					.then((response) => {
						this.input = null;
						if (response.data.result) {
							this.$emit("update:categories", [...this.categories, response.data.category]);
						} else {
							this.handleError(response.data.errors);
						}
						this.loading = false;
					});
			}
		},
	},
};
</script>

<style>
</style>
