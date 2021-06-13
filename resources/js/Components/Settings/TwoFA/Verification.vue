<template>
	<div class="verification">
		<div class="d-flex flex-column align-items-center">
			<p>{{ __.get("settings.ts-des-6") }}</p>
			<div class="d-flex align-items-center">
				<otp-input input-class="w-100" class="material--sm mx-1 text-center" @completed="$emit('action', code)" v-model="code" :numInputs="6" />
				<i class="material-icons-outlined" :class="{ 'text-danger': invalidCode }">verified_user</i>
			</div>
			<div class="mt-3" v-if="type == 'phone'">
				<span
					class="clickable font-14"
					:class="{
						'disabled text-muted': countdown > 0,
						'text-action': !(countdown > 0),
					}"
					@click="resend"
				>
					{{ __.get() }} {{ countdown > 0 ? "(" + countdown + ")" : "" }}
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