<template>
	<loading-button class="btn btn-block" :loading="loading" @click.native="unblockUser">{{ __.get("user-profile.unblock") }}</loading-button>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
		};
	},

	methods: {
		unblockUser() {
			this.loading = true;
			axios
				.delete(`/block/${this.page}`)
				.then((response) => {
					if (response.data.result) {
						this.$emit("unblocked");
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.then(() => (this.loading = false));
		},
	},
	props: ["page"],
};
</script>