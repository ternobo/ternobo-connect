<template>
	<div class="d-flex flex-column">
		<strong> تایید هویت دو مرحله‌ای توسط اپلیکیشن </strong>

		<ul class="mt-3 p-0">
			<li>اپلیکیشن <span class="text-action">تایید هویت</span>، یا یک اپلیکیشن تایید هویت به انتخاب خودتان نصب کنید.</li>
			<li>اپلیکیشن را اجرا و سپس QRCode زیر اسکن کنید</li>
		</ul>

		<div class="w-100 my-3 d-flex justify-content-center">
			<img :src="qr" style="max-width: 130px" v-if="qr != null" />
			<skeleton :height="'130px'" :width="'130px'" v-else></skeleton>
		</div>

		<div class="d-flex justify-content-between align-items-end my-4">
			<div>
				<label class="mt-4 mb-3">کد نمایان شده را اینجا وارد کنید</label>
				<material-text-field placeholder="کد را وارد کنید" v-model="code"></material-text-field>
			</div>
			<div class="d-flex">
				<button class="btn text-grey button-transparent" @click="$emit('cancel')">لغو</button>
				<loading-button class="btn btn-primary" :disabled="code.length < 1" :loading="loading" @click.native="verify">تایید</loading-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		axios
			.post("/two-factor-auth/setup", {
				type: "app",
			})
			.then((response) => {
				this.qr = response.data.qr_code;
			});
	},
	methods: {
		verify() {
			if (this.code != null && this.code.length > 0) {
				this.loading = true;
				axios
					.post("/two-factor-auth/enable", {
						type: "app",
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

			code: "",
			qr: null,
		};
	},
};
</script>

<style></style>
