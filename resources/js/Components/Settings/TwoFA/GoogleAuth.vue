<template>
	<div class="d-flex flex-column">
		<strong> تایید هویت دو مرحله‌ای توسط اپلیکیشن </strong>

		<ul>
			<li>اپلیکیشن <span class="text-action">تایید هویت ترنوبو</span>، یا یک اپلیکیشن تایید هویت به انتخاب خودتان نصب کنید.</li>
			<li>اپلیکیشن را اجرا و سپس کوی‌آر کد زیر اسکن کنید</li>
		</ul>

		<div class="w-100 d-flex justify-content-center">
			<img :src="qr" style="max-width: 130px" v-if="qr != null" />
			<skeleton :height="'130px'" :width="'130px'" v-else></skeleton>
		</div>

		<span class="my-4">کد نمایان شده را اینجا وارد کنید</span>

		<material-text-field placeholder="کد را وارد کنید" class="material--sm" v-model="code"></material-text-field>

		<div class="d-flex justify-content-end">
			<button class="btn button-transparent" @click="$emit('cancel')">لغو</button>
			<loading-button class="btn btn-primary" :loading="loading" @click.native="verify">تایید</loading-button>
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

			code: null,
			qr: null,
		};
	},
};
</script>

<style></style>
