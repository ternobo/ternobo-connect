<template>
	<b-modal v-model="showModal" hide-footer title="زبان نمایش" size="md" :centered="true">
		<div class="d-flex">
			<div class="mx-3 clickable">
				<img src="/images/iran-flag.png" style="width: 24px; height: 24px" />
				فارسی (ایران)
			</div>
			<div class="mx-2 text-muted disabled">
				<img src="/emoji/72x72/1f1fa-1f1f8.png" style="width: 24px; height: 24px" />
				English (US)
			</div>
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
