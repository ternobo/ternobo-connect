<template>
	<LoadingButton v-if="$store.state.user !== null" :loading="loading" class="btn follow-btn" :class="{ 'btn-followed-connected': followed }" @click.native="follow">{{ text }}</LoadingButton>
</template>

<script>
import LoadingButton from "./LoadingButton";

export default {
	mounted() {
		if (this.$store.state.user !== null) {
			let page = this.page;
			this.page_id = page;
			if (this.$store.state.shared.followings.includes(String(page))) {
				this.followed = true;
				this.text = "دنبال شده";
				this.$emit("followed");
			}
		}
	},
	data() {
		return {
			loading: false,
			followed: false,
			text: "دنبال کردن",

			page_id: -1,
		};
	},
	props: {
		page: {
			type: Number,
			default: undefined,
			required: true,
		},
	},
	methods: {
		follow() {
			const $this = this;
			this.loading = true;
			if (!this.followed) {
				var config = {
					method: "post",
					url: this.$APP_URL + "/follow/" + this.page,
				};

				axios(config)
					.then((response) => {
						// console.log(response.data);
						if (response.data.result) {
							this.loading = false;
							this.$store.commit("addFollower", this.page_id);
							this.text = "دنبال شده";
							this.followed = true;
							this.$emit("followed");
						} else {
							const errors = response.data.errors;
							Object.keys(errors).forEach((item, index) => {
								this.$bvToast.toast(errors[item][0], {
									noCloseButton: true,
									toaster: "b-toaster-bottom-left",
									bodyClass: ["bg-dark", "text-right", "text-white"],
									solid: true,
								});
							});
						}
						this.loading = false;
					})
					.catch((error) => {
						this.loading = false;
					});
			} else {
				var config = {
					method: "post",
					url: this.$APP_URL + "/unfollow/" + this.page,
				};

				axios(config)
					.then((response) => {
						// console.log(response.data);
						if (response.data.result) {
							this.loading = false;
							this.text = "دنبال کردن";
							this.followed = false;
							this.$emit("unfollowed");
							this.$store.commit("unfollow", this.$store.state.followings.indexOf(this.page_id));
						} else {
							const errors = response.data.errors;
							Object.keys(errors).forEach((item, index) => {
								this.$bvToast.toast(errors[item][0], {
									noCloseButton: true,
									toaster: "b-toaster-bottom-left",
									bodyClass: ["bg-dark", "text-right", "text-white"],
									solid: true,
								});
							});
						}
						this.loading = false;
					})
					.catch(function (error) {
						this.loading = false;
					});
			}
		},
	},
	components: {
		LoadingButton,
	},
};
</script>

<style>
</style>
