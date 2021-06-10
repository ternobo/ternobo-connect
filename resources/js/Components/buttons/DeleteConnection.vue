<template>
	<loading-button class="btn btn-transparent text-muted" v-on:click.native="postapi">رد درخواست</loading-button>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
		};
	},
	props: {
		connectionId: {
			default: undefined,
			required: true,
		},
	},
	name: "DeleteConnection",
	methods: {
		postapi: function () {
			this.loading = true;
			var data = new FormData();
			data.append("connection_id", this.connectionId);

			var config = {
				method: "post",
				url: this.$APP_URL + "/connection/delete",
				data: data,
			};
			axios(config)
				.then((response) => {
					this.$emit("delete");
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style>
</style>
