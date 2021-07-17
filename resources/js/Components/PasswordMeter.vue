<template>
	<div class="password-strength">
		<b-progress dir="ltr">
			<b-progress-bar :value="progress" :variant="variant"></b-progress-bar>
		</b-progress>
		<span class="strength" :class="[`text-${variant}`]">{{ __.get(`application.password-strength.${status}`) }}</span>
	</div>
</template>

<script>
import PasswordMixin from "../Mixins/PasswordMixin";
export default {
	mixins: [PasswordMixin],
	data() {
		return {
			status: "short",
			variant: "danger",
		};
	},
	watch: {
		password(password) {
			let progress = this.passwordStrength(password);
			console.log(progress);
			let varient = "";
			if (password.length < 8) {
				varient = "danger";
				this.status = "short";
				this.$emit("update:good", false);
			} else if (progress < 30) {
				varient = "danger";
				this.status = "too-weak";
				this.$emit("update:good", false);
			} else if (30 <= progress && progress < 50) {
				varient = "progress-weak";
				this.status = "weak";
				this.$emit("update:good", false);
			} else if (50 <= progress && progress < 70) {
				varient = "progress-medium";
				this.status = "medium";
				this.$emit("update:good", true);
			} else if (70 <= progress && progress < 90) {
				varient = "success";
				this.status = "strong";
				this.$emit("update:good", true);
			} else if (90 <= progress && progress <= 100) {
				varient = "success";
				this.status = "very-strong";
				this.$emit("update:good", true);
			}
			this.variant = varient;
		},
	},
	computed: {
		progress() {
			return this.passwordStrength(this.password);
		},
	},
	props: ["password", "good"],
};
</script>