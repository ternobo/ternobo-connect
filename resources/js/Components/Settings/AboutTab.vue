<template>
	<div>
		<CookiesModal :show.sync="showCookiesModal"></CookiesModal>
		<LawsModal :show.sync="showLawsModal"></LawsModal>
		<div class="card">
			<div class="settings-card-body">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">gavel</i>
						<span>{{ __.get("application.comuunity-guidelines") }}</span>
					</div>
					<button class="btn setting-btn btn-subtle btn-icon btn-md" @click="showLawsModal = true">
						<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
					</button>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">
							<img src="/images/socials/discord.png" />
						</i>
						<span>{{ __.get("application.discord") }}</span>
					</div>
					<a class="btn setting-btn btn-subtle btn-icon btn-md" href="https://discord.gg/unXsnGHsNj" target="_blank" @click="showLawsModal = true">
						<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
					</a>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">
							<img src="/images/socials/trello.svg" width="24" />
						</i>
						<span>{{ __.get("application.trello") }}</span>
					</div>
					<a class="btn setting-btn btn-subtle btn-icon btn-md" href="https://trello.com/b/Vku6XmjN/ternobo" target="_blank" @click="showLawsModal = true">
						<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
					</a>
				</div>
				<!-- <div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">privacy_tip</i>
						<span>سیاست صیانت از حریم خصوصی</span>
					</div>
					<i class="setting-btn material-icons-outlined ms-4">keyboard_arrow_left</i>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">category</i>
						<span>شرایط خدمات</span>
					</div>
					<i class="setting-btn material-icons-outlined ms-4">keyboard_arrow_left</i>
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
