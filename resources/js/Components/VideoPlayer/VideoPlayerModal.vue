<template>
	<b-modal v-model="showModal" body-class="p-0 d-flex" hide-footer hide-header size="lg" :centered="true">
		<video class="w-100" controls :src="src"></video>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	mixins: [ModalMixin],
	props: ["src"],
};
</script>

<style>
</style>
