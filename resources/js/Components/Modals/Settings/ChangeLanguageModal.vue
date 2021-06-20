<template>
	<b-modal v-model="showModal" hide-footer :title="__.get('settings.website-lang')" size="md" :centered="true">
		<div class="d-flex">
			<a lang="en" :href="appDirection != 'ltr' ? '/set-language?locale=en' : null" class="mx-2 d-flex align-items-center" :class="{ 'text-dark badge-bg-container': appDirection == 'ltr' }">
				<img src="/emoji/72x72/1f1fa-1f1f8.png" class="me-1" style="width: 24px; height: 24px" />
				English (US)
			</a>
			<a :href="appDirection != 'rtl' ? '/set-language?locale=fa' : null" class="mx-3 clickable d-flex align-items-center" :class="{ 'text-dark badge-bg-container': appDirection == 'rtl' }">
				<img src="/images/iran-flag.png" class="me-1" style="width: 24px; height: 24px" />
				فارسی (ایران)
			</a>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
export default {
	mixins: [ModalMixin],
	name: "ChangeLanguageModal",
};
</script>

<style></style>
