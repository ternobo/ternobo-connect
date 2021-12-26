<template>
	<loading-button class="btn" @click="follow" :class="{ 'btn-secondary': !isFollowed }" :loading="loading">{{ isFollowed ? __.get("application.following") : __.get("application.follow") }}</loading-button>
</template>

<script>
export default {
	props: ["followed", "tag"],
	mounted() {
		this.isFollowed = this.followed;
	},
	methods: {
		follow() {
			this.loading = true;
			axios
				.post(`/tags/${this.tag}/follow`)
				.then((response) => {
					this.isFollowed = response.data.follow;
				})
				.catch((err) => {
					console.log(err);
					this.toast(__.get("messages.connection-error"));
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	data() {
		return {
			loading: false,
			isFollowed: false,
		};
	},
};
</script>

<style>
</style>