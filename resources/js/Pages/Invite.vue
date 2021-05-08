<template>
	<base-layout>
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container">
			<div class="card">
				<div class="card-body">
					<div class="invite-links-header">
						<strong class="font-16 ml-1">لینک‌های دعوت شما: </strong>
						<strong class="font-14 text-muted"> {{ inviteLinks.length }} عدد</strong>
					</div>
					<div class="invite-links">
						<div class="invite" v-for="inviteLink in inviteLinks" :key="`invite_link_${inviteLink.id}`">
							<i class="material-icons-outlined invite-icon">confirmation_number</i>
							<input class="text-input-light" type="text" readonly :value="`${$APP_URL}/register?code=${inviteLink.code}`" />
							<button class="btn btn-action-light rounded-0 w-100" v-clipboard="`${$APP_URL}/register?code=${inviteLink.code}`">استفاده</button>
						</div>
					</div>
					<div class="invite-description">
						<strong class="font-16">لینک‌های دعوت چه هستند؟</strong>
						<ul>
							<li>لینک‌های دعوت کلیدهای ورود به ترنوبو هستند و شما تنها <b>دو لینک دعوت</b> دارید</li>
							<li>شما می‌توانید با ارسال لینک دعوت به دوستانتان آن‌ها را به ترنوبو دعوت کنید.</li>
						</ul>

						<div class="mt-3">
							<strong class="font-16">چند نکته مهم</strong>
							<ul>
								<li>پس از استفاده، امکان ایجاد لینک جدید وجود ندارد.</li>
								<li>خرید و فروش لینک دعوت <b>مجاز نبوده</b> و در صورت مشاهده، حساب کاربر متخلف / خریدار از دسترس خارج می‌شوند</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<sidebar-left v-if="!$root.isMobile">
			<app-footer class="sticky-aside"></app-footer>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppFooter from "../Components/App/AppFooter.vue";
import AppLayout from "../Layouts/AppLayout.vue";
import BaseLayout from "../Layouts/BaseLayout.vue";
export default {
	methods: {
		copyToClipboard(text) {
			if (window.clipboardData && window.clipboardData.setData) {
				// Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
				return window.clipboardData.setData("Text", text);
			} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
				var textarea = document.createElement("textarea");
				textarea.textContent = text;
				textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
				document.body.appendChild(textarea);
				textarea.select();
				try {
					return document.execCommand("copy"); // Security exception may be thrown by some browsers.
				} catch (ex) {
					console.warn("Copy to clipboard failed.", ex);
					return false;
				} finally {
					document.body.removeChild(textarea);
				}
			}
		},
	},
	layout: AppLayout,
	components: { BaseLayout, AppFooter },
	props: ["inviteLinks"],
};
</script>

<style>
</style>