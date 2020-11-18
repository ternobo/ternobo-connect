<template>
	<div class="d-flex flex-column">
		<div>
			<div class="d-flex justify-content-between align-content-center">
				<strong> یک کد تایید برای شما ارسال شد </strong>

				<span>{{ phone }}</span>
			</div>
			<div class="d-flex justify-content-between mt-4 align-items-end">
				<material-text-field placeholder="کد را وارد کنید" class="material--sm" v-model="code"></material-text-field>

				<div class="d-flex justify-content-end" style="height: min-content">
					<button class="btn button-transparent" @click="$emit('cancel')">لغو</button>
					<loading-button class="btn btn-primary" :loading="loading" @click.native="verify">تایید</loading-button>
				</div>
			</div>

			<div class="mt-2">
				<span
					class="clickable"
					:class="{
						'disabled text-muted': countdown > 0,
						'text-action': !(countdown > 0),
					}"
					@click="resend"
					>ارسال مجدد {{ countdown > 0 ? "(" + countdown + ")" : "" }}</span
				>
			</div>
		</div>
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
		resend() {
			if (!(this.countdown > 0)) {
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
							this.toast("کد تایید نامعتبر است");
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

			code: null,
			qr: null,

			countdown: 30,

			resendtimes: 1,
		};
	},
};
</script>

<style></style>
