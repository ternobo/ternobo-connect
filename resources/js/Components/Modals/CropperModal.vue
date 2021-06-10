<template>
	<b-modal v-model="showModal" no-close-on-backdrop hide-footer :title="title" size="lg" :centered="true">
		<div class="pb-3">
			<cropper class="cropper" check-orientation default-boundaries="fill" imageRestriction="stencil" ref="cropper" :autoZoom="true" priority="coordinates" :moveImage="{ touch: true, mouse: true }" :src="image" :stencil-props="{ aspectRatio: aspectRatio }"></cropper>
		</div>
		<div class="w-100 align-items-center justify-content-end pt-3 px-2 d-flex">
			<button class="btn btn-primary" @click="cropImage">{{ __.get("settings.confirm") }}</button>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import { Cropper } from "vue-advanced-cropper";
export default {
	methods: {
		cropImage() {
			const { canvas, coordinates } = this.$refs.cropper.getResult();
			canvas.toBlob((blob) => {
				this.$emit("cropped", coordinates, canvas);
				this.$emit("update:show", false);
			});
		},
	},
	props: {
		image: {
			default: undefined,
			required: true,
		},
		aspectRatio: {
			default: 16 / 12,
			required: false,
		},
		title: {
			type: String,
			default: undefined,
			required: true,
		},
	},
	components: {
		Cropper,
	},
	mixins: [ModalMixin],
};
</script>

<style>
</style>
