<template>
	<div class="verification">
		<div class="d-flex flex-column align-items-center">
			<p>{{ __.get("settings.ts-des-6") }}</p>
			<div class="d-flex align-items-center">
				<otp-input input-class="w-100" class="text-center" @completed="$emit('action', code)" v-model="code" :numInputs="6" />
			</div>
			<div class="mt-4" style="width: 160px" v-if="type == 'phone'">
				<span
					class="clickable d-flex justify-content-between align-items-center font-14"
					:class="{
						'disabled text-muted': countdown > 0,
						'text-action': !(countdown > 0),
					}"
					@click="resend"
				>
					<span>{{ __.get("settings.resend") }}</span> <span>{{ countdown > 0 ? "(" + countdown + ")" : "" }}</span>
				</span>
			</div>
		</div>
		<div class="d-flex justify-content-end">
			<loading-button :disabled="code.length < 1" class="btn btn-primary" :loading="loading" @click.native="$emit('action', code)">{{ __.get("application.next") }}</loading-button>
		</div>
	</div>
</template>

<script>
import OtpInput from "../../OtpInput/OtpInput.vue";
export default {
	components: { OtpInput },
	props: ["type", "invalidCode", "loading"],
	mounted() {
		this.countDownTimer();
	},
	methods: {
		resend() {
			if (this.countdown <= 0) {
				this.countdown = this.resendtimes * 30;
				axios.post("/two-factor-auth/setup", {
					type: "phone",
				});
				this.countDownTimer();
			}
		},
		countDownTimer() {
			if (this.countdown > 0) {
				setTimeout(() => {
					this.countdown -= 1;
					this.countDownTimer();
				}, 1000);
			}
		},
	},
	data() {
		return {
			countdown: 30,
			resendtimes: 1,

			code: "",
		};
	},
};
</script>

<style>
</style>