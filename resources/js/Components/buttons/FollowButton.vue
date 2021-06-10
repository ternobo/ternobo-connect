<template>
	<LoadingButton v-if="$store.state.user !== null && user.personal_page_id != page_id" :loading="loading" class="btn follow-btn" :class="{ 'btn-followed-connected': followed }" @click.native="follow">{{ text }}</LoadingButton>
</template>

<script>
import { mapState } from "vuex";
import LoadingButton from "./LoadingButton";

export default {
	mounted() {
		if (this.$store.state.user !== null) {
			let page = this.page;
			this.page_id = page;
			if (this.$store.state.shared.followings.includes(String(page))) {
				this.followed = true;
				this.text = this.__.get("application.following");
				this.$emit("followed");
			} else {
				this.text = this.__.get("application.follow");
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
	computed: {
		...mapState(["user"]),
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
						if (response.data.result) {
							this.loading = false;
							this.$store.commit("addFollower", String(this.page_id));
							this.text = this.__.get("application.following");
							this.followed = true;
							this.$emit("followed");
						} else {
							const errors = response.data.errors;
							this.handleError(errors);
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
						if (response.data.result) {
							this.loading = false;
							this.text = this.__.get("application.follow");
							this.followed = false;
							this.$emit("unfollowed");
							this.$store.commit("unfollow", this.$store.state.shared.followings.indexOf(String(this.page_id)));
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
						console.log(error);
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
