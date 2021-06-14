<template>
	<div class="d-flex flex-column">
		<verification @action="verify" :loading="loading" type="phone"></verification>
	</div>
</template>

<script>
import Verification from "./Verification.vue";
export default {
	components: { Verification },
	mounted() {
		this.loading = true;
		axios
			.post("/two-factor-auth/setup", {
				type: "phone",
			})
			.then((response) => {
				this.loading = false;
				if (!response.data.result) {
					this.toast(__.get("messages.connection-error"));
					this.$emit("update:verification", true);
				}
			})
			.catch((err) => {
				console.log(err);
				this.toast(__.get("messages.connection-error"));
			})
			.then(() => {
				this.loading = false;
			});
	},
	methods: {
		verify(code) {
			if (code != null && code.length > 0) {
				this.loading = true;
				axios
					.post("/two-factor-auth/enable", {
						type: "phone",
						code: code,
					})
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.$emit("enabled", JSON.parse(data.recovery));
							this.$emit("update:verification", false);
						} else {
							this.toast(__.get("messages.invalid-code"));
						}
						this.loading = false;
					})
					.catch((err) => (this.loading = false));
			}
		},
	},

	data() {
		return {
			loading: false,
			resendtimes: 1,
		};
	},
};
</script>

<style></style>
