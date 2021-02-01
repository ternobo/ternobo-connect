<template>
	<LoadingButton v-if="$store.state.user !== null" :loading="loading" class="btn connect-btn" :class="{ 'btn-followed-connected': connected, 'btn-connection-waiting': waiting }" @click.native="connect">{{ text }}</LoadingButton>
</template>

<script>
import { Inertia } from "@inertiajs/inertia";
import LoadingButton from "./LoadingButton";

export default {
	created() {
		if (this.$store.state.user !== null) {
			let user = this.user;
			if (typeof user != "number") {
				user = parseInt(user);
			}

			if (this.$store.state.connectedPeople.includes(user)) {
				this.connected = true;
				this.text = "متصل شده";
				this.$emit("connected");
			} else if (this.$store.state.waitingConnections.includes(user)) {
				this.waiting = true;
				this.text = "انتظار تایید";
			}
		}
	},
	data() {
		return {
			loading: false,
			connected: false,
			waiting: false,
			followed: true,
			text: "متصل شدن",
		};
	},
	props: {
		user: {
			default: undefined,
			required: true,
		},
	},
	methods: {
		connect() {
			const $this = this;
			this.loading = true;
			if (!this.connected && !this.waiting) {
				var config = {
					method: "post",
					url: this.$APP_URL + "/connect/" + this.user,
				};

				axios(config)
					.then(function (response) {
						// console.log(response.data);
						if (response.data.result) {
							$this.loading = false;
							$this.$store.state.connectedPeople.push($this.user);
							$this.text = "انتظار تایید";
							$this.waiting = true;
						} else {
							const errors = response.data.errors;
							Object.keys(errors).forEach(function (item, index) {
								$this.$bvToast.toast(errors[item][0], {
									noCloseButton: true,
									toaster: "b-toaster-bottom-left",
									bodyClass: ["bg-dark", "text-right", "text-white"],
									solid: true,
								});
							});
						}
						$this.loading = false;
					})
					.catch(function (error) {
						$this.loading = false;
					});
			} else {
				var config = {
					method: "post",
					url: this.$APP_URL + "/disconnect/" + this.user,
				};

				axios(config)
					.then(function (response) {
						// console.log(response.data);
						if (response.data.result) {
							$this.loading = false;
							$this.text = "متصل شدن";

							if ($this.$store.state.connectedPeople.indexOf($this.user) != -1) {
								$this.$store.state.connectedPeople.splice($this.$store.state.connectedPeople.indexOf($this.user), 1);
							} else if ($this.$store.state.waitingConnections.indexOf($this.user) != -1) {
								$this.$store.state.waitingConnections.splice($this.$store.state.waitingConnections.indexOf($this.user), 1);
							}

							$this.connected = false;
							$this.waiting = false;
							$this.$emit("disconnected");
						} else {
							const errors = response.data.errors;
							Object.keys(errors).forEach(function (item, index) {
								$this.$bvToast.toast(errors[item][0], {
									noCloseButton: true,
									toaster: "b-toaster-bottom-left",
									bodyClass: ["bg-dark", "text-right", "text-white"],
									solid: true,
								});
							});
						}
						$this.loading = false;
					})
					.catch(function (error) {
						console.log(error);
						$this.loading = false;
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
