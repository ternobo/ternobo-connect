<template>
	<div class="container" style="height: 80vh; display: flex; align-items: center">
		<div class="row pt-4">
			<div class="col-md-6">
				<h2>{{ title }}</h2>
				<p>{{ description }}</p>
			</div>
			<div class="col-md-6">
				<img src="/images/notfound.svg" />
			</div>
		</div>
	</div>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
export default {
	created() {},
	props: {
		status: Number,
	},
	computed: {
		title() {
			return {
				503: "503: سرویس دردسترس نیست",
				500: "500: خطای سمت سرور",
				404: "404: صفحه مورد نظر یافت نشد",
				403: "403: عدم دسترسی",
			}[this.status];
		},
		description() {
			return {
				503: "وب‌سایت درحال بروزرسانی است، به زودی بر می‌گردیم",
				500: "خطایی در سمت سرور رخ داده و ما در تلاش برای حل مشکل هستیم",
				404: "به نظر می‌رسه ما نمی‌توانیم صفحه‌ای که شما به دنبال آن هستید را پیدا کنیم می‌توانید به صفحه قبل بازگردید",
				403: "متاسفانه این سرویس در کشور شما دردسترس نیست",
			}[this.status];
		},
	},
	layout: AppLayout,
};
</script>

<style>
</style>
