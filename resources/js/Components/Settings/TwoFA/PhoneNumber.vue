<template>
	<div class="d-flex flex-column">
		<verification @action="verify" :loading="loading" type="phone"></verification>
	</div>
</template>

<script>
export default {
	props: {
		phone: {
			type: String,
			default: undefined,
			required: true,
		},
	},
	created() {
		axios.post("/two-factor-auth/setup", {
			type: "phone",
		});
	},
	mounted() {
		this.countDownTimer();
	},
	methods: {
		verify() {
			if (this.code != null && this.code.length > 0) {
				this.loading = true;
				axios
					.post("/two-factor-auth/enable", {
						type: "phone",
						code: this.code,
					})
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.$emit("enabled", JSON.parse(data.recovery));
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
