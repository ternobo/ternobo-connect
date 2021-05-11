<template>
	<b-modal v-model="showModal" hide-footer title="ویرایش دسته‌بندی‌ها" size="md" :centered="true">
		<div class="add-category-container">
			<add-btn :disabled="!(input != null && input.length > 0)" @click="addCategory" class="add-btn-light-grey d-flex justify-content-center align-items-center">
				<i v-if="!loading" class="material-icons">add</i>
				<span style="height: 14px; width: 14px; border-width: 2px" v-if="loading" class="loadingspinner"></span>
			</add-btn>
			<input type="text" placeholder="دسته‌جدید را وارد کنید" maxlength="50" v-model="input" class="form-control text-input" />
		</div>
		<div class="edit-categories-list">
			<draggable @end="save" v-model="list" handle=".hand-hover">
				<category-item v-for="(category, index) in list" :key="'category_' + category.id" @deleted="doDelete(index)" :category="category"></category-item>
			</draggable>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import AddBtn from "../../buttons/AddBtn.vue";
import CategoryItem from "./CategoryItem";
export default {
	methods: {
		addCategory() {
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
			console.log(this.list.splice(index, 1));
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
