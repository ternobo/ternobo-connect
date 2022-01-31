<template>
	<div class="media-block" :class="{ 'p-0': content != null }">
		<edit-image-modal :show.sync="showImageEdit" :image="contentUrl" v-model="editResult"></edit-image-modal>

		<!--- Show Media End !-->
		<div v-if="content != null" class="w-100" style="overflow: hidden">
			<lazy-image v-if="type == 'image'" class="mb-0" style="min-height: 150px" :style="{ transform: `rotate(${editResult.rotate}deg)` }" :src="contentUrl" />
			<video-player v-else :src="contentUrl" class="mb-0 w-100"></video-player>
		</div>
		<!--- Show Media End !-->

		<!--- Select Media !-->
		<div class="action-container" v-else>
			<span class="title text-center">
				<i class="material-icons-outlined">{{ type == "image" ? "image" : "play_circle" }}</i>
				{{ __.get(`editor.${type == "image" ? "image" : "video"}`) }}
			</span>
			<div v-html="type == 'image' ? __.get(`editor.image-size`) : __.get(`editor.video-format`)"></div>
			<button class="btn btn-outlined btn-rounded w-100" @click="selectMedia"><i class="material-icons-outlined me-2">cloud_upload</i> {{ __.get("application.upload") }}</button>
		</div>
		<!--- Select Media End !-->

		<!--- Media Settings !-->
		<button class="btn btn-rounded btn-primary btn-white btn-icon edit-image-icon" v-if="type == 'image' && content != null" @click="showImageEdit = true">
			<i class="material-icons-outlined">create</i>
		</button>
		<div class="spoiler-alert-check clickable" @click="isSpoiler = !isSpoiler" v-if="content != null">
			<checkbox v-model="isSpoiler" />
			<span>{{ __.get("content/posts.spoiler-alert") }}</span>
		</div>
		<!--- Media Settings !-->
	</div>
</template>

<script>
import Checkbox from "../../../inputs/Checkbox.vue";
import VideoPlayer from "../../../VideoPlayer/VideoPlayer.vue";
import EditImageModal from "../../EditImageModal.vue";
export default {
	data() {
		return {
			showImageEdit: false,
			isSpoiler: false,
			editResult: {
				height: null,
				width: null,
				rotate: 0,
				alt: "",
			},
		};
	},
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
	watch: {
		isSpoiler() {
			this.$emit("update:meta", { spoiler: this.isSpoiler, rotate: this.editResult.rotate, alt: this.editResult.alt });
		},
		editResult() {
			this.$emit("update:meta", { spoiler: this.isSpoiler, rotate: this.editResult.rotate, alt: this.editResult.alt });
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
