<template>
	<li class="category-item">
		<span class="clickable" ref="name"><i class="material-icons">layers</i> {{ category.name }}</span>
	</li>
</template>

<script>
export default {
	methods: {
		async doDelete() {
			const res = await this.$dialog.warning({
				text: "از حذف  " + this.category.name + " اطمینان دارید؟",
				title: "حذف دسته بندی",
				actions: {
					false: "لغو",
					true: {
						text: "تایید",
						variant: "primary",
						handle: async () => {
							axios.delete(this.$APP_URL + "/categories/" + this.category.id, {
								value: this.$refs.name.textContent,
							});
							this.$el.remove();
						},
					},
				},
			});
		},
		doEdit() {
			if (this.editName) {
				axios.put(this.$APP_URL + "/categories/" + this.category.id, {
					value: this.$refs.name.textContent,
				});
				this.editName = false;
			} else {
				this.editName = true;
			}
		},
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
			editName: false,
		};
	},
};
</script>

<style>
</style>
