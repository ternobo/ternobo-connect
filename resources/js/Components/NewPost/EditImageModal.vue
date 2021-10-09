<template>
	<b-modal v-model="showModal" hide-footer @show="hideNewPostModal" @hide="showNewPostModal" :title="__.choice('content/posts.image-detail', 2)" size="lg" modal-class="new-post-modal" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<div class="editimage-modal-content" ref="container">
			<div class="image-container">
				<img :src="image" ref="image" :style="{ transform: `rotate(${rotate}deg)` }" />
			</div>
			<div class="controls">
				<button class="btn btn-primary btn-icon btn-white" @click="rotateAction"><i class="material-icons">loop</i></button>
				<button class="btn btn-primary btn-icon btn-white" :class="{ 'text-action': showAlt }" @click="altTextAction"><i class="material-icons">link</i></button>
			</div>

			<!--- Alt Text Input !--->
			<div class="ternoboeditor--link-input" v-show="showAlt">
				<div class="controls">
					<input placeholder="Enter Alt" v-model="altText" />
					<button class="btn btn-text text-dark" :disabled="!Boolean(altText)" @click="showAlt = false"><i class="material-icons">subdirectory_arrow_left</i></button>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-center align-items-center mt-4 mb-2">
			<button class="btn btn-transparent font-14" @click="cancel">{{ __.get("application.cancel") }}</button>
			<button class="btn btn-primary font-14 w-100" @click="save">{{ __.get("application.save") }}</button>
		</div>
	</b-modal>
</template>

<script>
import { mapMutations } from "vuex";
import ModalMixin from "../../Mixins/Modal";
export default {
	mixins: [ModalMixin],
	props: ["value", "image"],
	methods: {
		...mapMutations(["showNewPostModal", "hideNewPostModal"]),

		cancel() {
			this.$emit("update:show", false);
		},
		save() {
			const width = this.$refs.image.clientWidth;
			const height = this.$refs.image.clientHeight;
			const rad = (this.rotate * Math.PI) / 180,
				sin = Math.sin(rad),
				cos = Math.cos(rad);

			const newHeight = Math.abs(width * sin) + Math.abs(height * cos),
				newWidth = Math.abs(height * sin) + +Math.abs(width * cos);

			this.$emit("input", {
				height: newHeight,
				width: newWidth,
				rotate: this.rotate,
				alt: this.alt,
			});
			this.$emit("update:show", false);
		},

		rotateAction() {
			if (this.rotate < 270) {
				this.rotate += 90;
			} else {
				this.rotate = 0;
			}

			const width = this.$refs.image.clientWidth;
			const height = this.$refs.image.clientHeight;
			const rad = (this.rotate * Math.PI) / 180,
				sin = Math.sin(rad),
				cos = Math.cos(rad);
			const newHeight = Math.abs(width * sin) + Math.abs(height * cos);
			this.$refs.container.style = `height: ${newHeight}px;`;

			if (this.rotate == 90 || this.rotate == 270) {
				this.$refs.image.style.height = this.$refs.image.clientWidth + "px";
			} else {
				this.$refs.image.style.height = null;
			}
		},
		altTextAction(e) {
			this.showAlt = !this.showAlt;
		},
	},
	data() {
		return {
			rotate: 0,
			altText: "",

			showAlt: false,
		};
	},
};
</script>
