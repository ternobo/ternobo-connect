<template>
	<div>
		<LawsModal :show.sync="showLaws"></LawsModal>
		<div class="sticky-aside d-flex align-items-center flex-column">
			<langdropdown
				class="mb-3"
				:dir="appDirection"
				:value="{ label: 'فارسی', value: 'fa', icon: '/images/iran-flag.png' }"
				:items="[
					{ label: 'فارسی', value: 'fa', icon: '/images/iran-flag.png' },
					{ label: 'English', value: 'en', icon: '/img/en.png' },
				]"
			>
				<template v-slot:selected="{ item }">
					<div class="d-flex justify-content-between align-items-center w-100">
						<span class="font-14"> {{ item.label }}</span>
						<img :src="item.icon" />
					</div>
				</template>

				<template v-slot:item="{ item }">
					<div class="d-flex justify-content-between align-items-center w-100">
						<span class="font-14"> {{ item.label }}</span>
						<img :src="item.icon" style="width: 24px; height: 24px" />
					</div>
				</template>
			</langdropdown>
			<div class="app-footer">
				<div class="sidemenu-links d-flex justify-content-center align-items-center mb-2">
					<a class="text-muted hover-dark me-3" @click="showLaws = true">قوانین و مقررات</a>
					<a class="text-muted hover-dark" href="https://ternobo.info" target="_blank">درباره ما</a>
				</div>
				<div class="copyright-text d-flex justify-content-center align-items-center">
					<img src="/favicon.png" class="ms-1" style="max-width: 16px" />
					<span class="ms-1 me-2">ترنوبو</span>© ۱۳۹۹
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Langdropdown from "../Langdropdown";
export default {
	data() {
		return {
			showLaws: false,
		};
	},
	components: {
		LawsModal: () =>
			import(
				/* webpackChunkName: "LawsModal" */
				"../Modals/LawsModal"
			),
		Langdropdown,
	},
};
</script>

<style>
</style>
