<template>
	<div class="password-strength">
		<b-progress dir="ltr">
			<b-progress-bar :value="progress" :variant="variant"></b-progress-bar>
		</b-progress>
		<span class="strength" :class="[`text-${variant}`]">{{ text }}</span>
	</div>
</template>

<script>
import { passwordStrength } from "../Libs/PasswordSrength.js";
export default {
	data() {
		return {
			variant: "danger",
		};
	},
	watch: {
		password(password) {
			let progress = passwordStrength(password).id * 25;
			let varient = "danger";
			switch (progress) {
				case 0:
					varient = "danger";
					break;
				case 25:
					varient = "progress-weak";
					break;
				case 50:
					varient = "progress-medium";
					break;
				case 75:
					varient = "success";
					break;
				case 100:
					varient = "success";
					break;
			}
			this.variant = varient;
		},
	},
	computed: {
		progress() {
			return passwordStrength(this.password).id * 25;
		},
		text() {
			return __.get(`application.password-strength.${passwordStrength(this.password).value}`);
		},
	},
	props: ["password"],
};
</script>