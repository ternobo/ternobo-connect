<template>
	<div class="category-item" :class="{ disabled: !edit && disabled }">
		<div class="category-content">
			<div class="actions">
				<i class="material-icons-outlined text-light hover-dark p-1" :class="{ 'hand-hover': !edit && !disabled }">unfold_more</i>
				<i class="material-icons-outlined text-light hover-danger p-1 clickable" @click="doDelete()">delete</i>
			</div>
			<span class="category-badge" v-if="!edit">{{ name }}</span>
			<input type="text" maxlength="50" v-else class="form-controller text-input--xsm" v-model="name" />
		</div>
		<div class="edit-actions">
			<div v-if="edit && !loading" class="save-edit-action-icons">
				<i class="material-icons text-superlight hover-danger" @click="(edit = false), (name = category.name)">close</i>
				<i class="btn btn-edit material-icons-outlined font-16 p-0" @click="updateName" style="width: 24px; height: 24px; display: flex; align-items: center">check</i>
			</div>
			<loading-spinner height="24" width="24" v-else-if="loading"></loading-spinner>
			<i class="material-icons-outlined category-edit-action-icon clickable" v-else @click="edit = true">edit</i>
		</div>
	</div>
</template>

<script>
export default {
	watch: {
		edit() {
			this.$emit("editChanged", this.edit);
		},
	},
	methods: {
		doDelete() {
			if (!this.edit && !this.disabled) {
				this.confirmDialog(`از حذف دسته‌بندی ${this.name} اطمینان دارید؟`).then((value) => {
					if (value) {
						axios.delete(this.$APP_URL + "/categories/" + this.category.id, {
							value: this.category.name,
						});
					}
				});
			}
		},
		updateName() {
			if (!this.edit && !this.disabled) {
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
			}
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
		disabled: {
			default: false,
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
