<template>
	<div class="media-block" :class="{ 'p-0 border-0': content != null }">
		<!--- Show Media End !-->
		<div v-if="content != null" class="w-100" style="overflow: hidden">
			<video-player :src="contentUrl" class="mb-0 w-100"></video-player>
		</div>
		<!--- Show Media End !-->

		<!--- Select Media !-->
		<div class="action-container" v-else>
			<span class="title text-center">
				<i class="material-icons-outlined">play_circle</i>
				{{ __.get(`editor.video`) }}
			</span>
			<span class="font-12 text-dark-gray mt-0">{{ __.get(`editor.video-format`) }}</span>

			<div class="media-block__actions">
				<button class="btn btn-outlined btn-rounded" @click="selectMedia"><i class="material-icons-outlined me-2">cloud_upload</i> {{ __.get("application.upload") }}</button>
				<button class="btn btn-outlined btn-rounded" @click="$emit('convertType', 'embed')"><img src="/images/embeds/youtube.svg" width="16" class="me-2" /> {{ __.get("editor.embed.youtube") }}</button>
				<button class="btn btn-outlined btn-rounded" @click="$emit('convertType', 'embed')"><img src="/images/embeds/aparat.svg" width="16" class="me-2" /> {{ __.get("editor.embed.aparat") }}</button>
				<button class="btn btn-outlined btn-rounded" @click="$emit('convertType', 'embed')"><img src="/images/embeds/vimeo.svg" width="16" class="me-2" /> {{ __.get("editor.embed.vimeo") }}</button>
			</div>
		</div>
		<!--- Select Media End !-->
	</div>
</template>

<script>
import Checkbox from "../../../inputs/Checkbox.vue";
import VideoPlayer from "../../../VideoPlayer/VideoPlayer.vue";
import EditImageModal from "../../EditImageModal.vue";
export default {
	components: {
		VideoPlayer,
		EditImageModal,
		Checkbox,
	},
	computed: {
		contentUrl() {
			return typeof this.content == "object" && this.content != null ? URL.createObjectURL(this.content) : `/${this.content}`;
		},
	},
	methods: {
		checkDuration(file) {
			let video = document.createElement("video");
			video.preload = "metadata";
			video.src = window.URL.createObjectURL(file);
			video.onloadedmetadata = () => {
				URL.revokeObjectURL(video.src);
				var duration = video.duration;
				if (duration <= 20 * 60) {
					this.$emit("update:content", file);
				} else {
					this.toast(__.get("validation.invalid_duration", { attribute: __.get("validation.attributes.video"), max: 20 }));
				}
			};
		},
		selectMedia() {
			let fileChooser = document.createElement("input");
			fileChooser.type = "file";
			fileChooser.accept = `video/mp4, video/mkv`;

			fileChooser.onchange = (e) => {
				let file = e.target.files[0];
				if (file.type.startsWith("video")) {
					this.checkDuration(file);
				} else {
					this.toast(__.get("messages.invalid-mime"));
				}
			};
			fileChooser.click();
		},
	},
	props: {
		content: {
			default: null,
		},
	},
};
</script>

<style>
</style>
