<template>
	<b-modal v-model="showModal" hide-footer :title="__.get('content/posts.edit-categories')" size="md" :centered="true">
		<div class="add-category-container">
			<input type="text" :readonly="disabled" @keypress.enter="addCategory" :placeholder="__.get('content/posts.create-category')" maxlength="52" v-model="input" class="form-control text-input" />
			<add-btn :disabled="!(input != null && input.length > 0) || loading || disabled" @click="addCategory" class="add-btn-light-grey d-flex justify-content-center align-items-center">
				<i v-if="!loading" class="material-icons">add</i>
				<span style="height: 14px; width: 14px; border-width: 2px" v-if="loading" class="loadingspinner"></span>
			</add-btn>
		</div>
		<div class="edit-categories-list">
			<draggable v-bind="dragOptions" @end="save" v-model="list" handle=".hand-hover">
				<category-item v-for="(category, index) in list" :key="'category_' + category.id" :disabled="disabled" @deleted="doDelete(index)" @editChanged="editChanged" :category.sync="list[index]"></category-item>
			</draggable>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import AddBtn from "../../buttons/AddBtn.vue";
import CategoryItem from "./CategoryItem";
export default {
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			};
		},
	},
	methods: {
		editChanged(edit) {
			this.disabled = edit;
			this.$emit("update:categories", this.list);
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
							this.$emit("categoryAdded", response.data.category);
						}
						this.loading = false;
					});
			}
		},
		save() {
			this.list.forEach((item, index) => {
				item.sort_place = index;
				axios.post(this.$APP_URL + "/categories/sort/" + item.id, {
					order: index,
				});
			});
			this.$emit("update:categories", this.list);
		},
		doDelete(index) {
			this.categories.splice(index, 1);
			this.$emit("update:categories", this.list);
		},
	},
	created() {
		this.list = this.categories;
	},
	watch: {},
	data() {
		return {
			list: [],
			input: null,
			loading: false,

			disabled: false,
		};
	},
	components: {
		CategoryItem,
		AddBtn,
	},
	props: {
		categories: {
			type: Array,
			default: () => {
				return [];
			},
			required: true,
		},
	},
	mixins: [ModalMixin],
	name: "CategoriesModal",
};
</script>

<style>
</style>
