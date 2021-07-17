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

<style lang="scss" scoped>
@import "../../../sass/application/_variables.scss";
.btn-block {
	background: #f5f5f5;
	color: #191919;
	font-size: 14px;
	font-weight: 600;
	width: 164px;
	@media screen and (max-width: $sm-size) {
		width: 100%;
	}
}
</style>