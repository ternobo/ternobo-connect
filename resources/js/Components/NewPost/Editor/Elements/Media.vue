<template>
	<div class="media-item" :class="{ 'p-0': content != null }">
		<div v-if="content != null" class="w-100">
			<lazy-image v-if="type == 'image'" class="mb-0" style="min-height: 150px" :src="contentUrl" />
			<video-player v-else :src="contentUrl" class="mb-0 w-100"></video-player>
		</div>
		<div class="action-container" v-else>
			<span class="title text-center">
				<i class="material-icons-outlined">{{ type == "image" ? "image" : "play_circle" }}</i>
				{{ __.get(`editor.${type == "image" ? "picture" : "video"}`) }}
			</span>
			<div v-html="__.get(`editor.media-upload-description`)"></div>
			<button class="btn btn-rounded-outline w-100" @click="selectMedia"><i class="material-icons-outlined">cloud_upload</i> {{ __.get("application.upload") }}</button>
		</div>
	</div>
</template>

<script>
import VideoPlayer from "../../../VideoPlayer/VideoPlayer.vue";
export default {
	components: { VideoPlayer },
	computed: {
		contentUrl() {
			return typeof this.content == "object" ? URL.createObjectURL(this.content) : `${this.content}`;
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
				console.log(duration);
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
			if (this.type == "video") {
				fileChooser.accept = `video/mp4, video/mkv`;
			} else {
				fileChooser.accept = `${this.type}/*`;
			}

			fileChooser.onchange = (e) => {
				let file = e.target.files[0];
				if (file.type.startsWith(this.type) && !file.type.includes("svg+xml")) {
					if (this.type == "video") {
						this.checkDuration(file);
					} else {
						this.$emit("update:content", file);
					}
				} else {
					this.toast(__.get("messages.invalid-mime"));
				}
			};
			fileChooser.click();
		},
	},
	props: {
		type: {
			default: null,
		},
		content: {
			default: null,
		},
	},
};
</script>

<style>
</style>
