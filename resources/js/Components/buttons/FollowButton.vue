<template>
	<LoadingButton v-if="canShowFollow" :loading="loading" class="btn btn-secondary" :class="{ 'btn-followed-connected': followed }" @click.native="follow">
		<slot v-bind:followed="followed">
			{{ followed ? unfollowText : followText }}
		</slot>
	</LoadingButton>
</template>

<script>
import { mapState } from "vuex";
import LoadingButton from "./LoadingButton";

export default {
	mounted() {
		if (this.$store.state.user !== null) {
			this.page_id = this.page.id;
			if (this.$store.state.shared.followings.includes(this.page_id)) {
				this.followed = true;
			}
		}
	},
	data() {
		return {
			loading: false,
			followed: false,

			page_id: -1,
		};
	},
	props: {
		followText: {
			default: __.get("application.follow"),
		},
		unfollowText: {
			default: __.get("application.following"),
		},
		page: {
			default: undefined,
			required: true,
		},
	},
	computed: {
		...mapState(["user", "shared"]),
		canShowFollow() {
			return this.user !== null && this.user.personal_page_id != this.page_id && this.shared.fullAccess;
		},
	},
	methods: {
		follow() {
			this.loading = true;
			if (!this.followed) {
				var config = {
					method: "post",
					url: this.$APP_URL + "/follow/" + this.page_id,
				};

				axios(config)
					.then((response) => {
						if (response.data.result) {
							this.loading = false;
							this.$store.commit("addFollower", parseInt(this.page_id));
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
				this.confirmDialog(__.get("messages.unfollow-user")).then((value) => {
					if (value) {
						var config = {
							method: "post",
							url: this.$APP_URL + "/unfollow/" + this.page_id,
						};
						axios(config)
							.then((response) => {
								if (response.data.result) {
									this.loading = false;
									this.followed = false;
									this.$emit("unfollowed");
									this.$store.commit("unfollow", this.$store.state.shared.followings.indexOf(this.page_id));
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
					} else {
						this.loading = false;
					}
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
