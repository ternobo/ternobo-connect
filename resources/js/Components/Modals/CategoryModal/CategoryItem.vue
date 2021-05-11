<template>
	<div class="category-item">
		<div class="category-content">
			<div class="actions">
				<i class="material-icons-outlined text-light hover-dark p-1 hand-hover">unfold_more</i>
				<i class="material-icons-outlined text-light hover-danger p-1 clickable" @click="doDelete()">delete</i>
			</div>
			<span class="category-badge" v-if="!edit">{{ name }}</span>
			<input type="text" maxlength="50" v-else class="form-controller text-input--xsm" v-model="name" />
		</div>
		<div class="edit-actions">
			<div v-if="edit && !loading" class="d-flex align-items-center">
				<i class="material-icons text-superlight hover-danger" @click="(edit = false), (name = category.name)">close</i>
				<i class="btn btn-edit material-icons-outlined font-16 p-0" @click="updateName" style="width: 24px; height: 24px; display: flex; align-items: center">check</i>
			</div>
			<loading-spinner height="24" width="24" v-else-if="loading"></loading-spinner>
			<i class="material-icons-outlined text-grey clickable" v-else @click="edit = true">edit</i>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		async doDelete() {
			await this.$dialog.confirm({
				text: "از حذف  " + this.category.name + " اطمینان دارید؟",
				title: "حذف دسته بندی",
				actions: {
					false: "لغو",
					true: {
						text: "تایید",
						variant: "primary",
						handle: async () => {
							axios.delete(this.$APP_URL + "/categories/" + this.category.id, {
								value: this.category.name,
							});
							this.$emit("deleted");
						},
					},
				},
			});
		},
		updateName() {
			this.loading = true;
			axios
				.put(`/pages/categories/${this.category.id}`, {
					value: this.name,
				})
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:name", this.name);
						this.edit = false;
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((err) => {
					console.log(err);
					this.toast("خطا در تغییر نام دسته‌بندی");
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.name = this.category.name;
	},
	props: {
		category: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	data() {
		return {
			order: 0,
			edit: false,

			loading: false,

			name: "",
		};
	},
};
</script>

<style>
</style>
