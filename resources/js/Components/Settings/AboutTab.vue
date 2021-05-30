<template>
	<div>
		<CookiesModal :show.sync="showCookiesModal"></CookiesModal>
		<LawsModal :show.sync="showLawsModal"></LawsModal>

		<h2 class="font-18 font-demibold mb-4">امنیت اطلاعات</h2>
		<div class="card">
			<div class="settings-card-body">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">gavel</i>
						<span>قوانین و مقررات</span>
					</div>
					<i class="btn setting-btn material-icons-outlined ms-3" @click="showLawsModal = true">keyboard_arrow_left</i>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">build_circle</i>
						<span>کوکی‌ها</span>
					</div>
					<i class="btn setting-btn material-icons-outlined ms-3" @click="showCookiesModal = true">keyboard_arrow_left</i>
				</div>
				<!-- <div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">privacy_tip</i>
						<span>سیاست صیانت از حریم خصوصی</span>
					</div>
					<i class="btn setting-btn material-icons-outlined ms-3">keyboard_arrow_left</i>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">category</i>
						<span>شرایط خدمات</span>
					</div>
					<i class="btn setting-btn material-icons-outlined ms-3">keyboard_arrow_left</i>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showCookiesModal: false,
			showLawsModal: false,
		};
	},
	components: {
		CookiesModal: () => import("../Modals/CookiesModal"),
		LawsModal: () => import("../Modals/LawsModal"),
	},
};
</script>

<style>
</style>
