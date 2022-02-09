<template>
	<div class="media-block" :class="{ 'p-0': content != null }">
		<edit-image-modal :show.sync="showImageEdit" :image="contentUrl" v-model="editResult"></edit-image-modal>
		<giphy-modal :show.sync="showGiphyModal" @select="selectGif" />
		<unsplash-model :show.sync="showUnsplashModal" @select="selectGif"></unsplash-model>
		<!--- Show Media End !-->
		<div v-if="content != null" class="w-100" style="overflow: hidden">
			<lazy-image class="mb-0" style="min-height: 150px" :style="{ transform: `rotate(${editResult.rotate}deg)` }" :src="contentUrl" />
		</div>
		<!--- Show Media End !-->

		<!--- Select Media !-->
		<div class="action-container" v-else>
			<span class="title text-center">
				<i class="material-icons-outlined">image</i>
				{{ __.get(`editor.image`) }}
			</span>

			<span class="font-12 text-dark-gray mt-0">{{ __.get(`editor.image-size`) }}</span>

			<div class="media-block__actions">
				<button class="btn btn-outlined btn-rounded" @click="selectMedia"><i class="material-icons-outlined me-2">cloud_upload</i> {{ __.get("application.upload") }}</button>
				<button class="btn btn-outlined btn-rounded" @click="showUnsplashModal = true"><img src="/images/unsplash-logo.svg" class="me-2" width="12" /> Unsplash</button>
				<button class="btn btn-outlined btn-rounded" @click="showGiphyModal = true"><img src="/images/giphy-logo.png" width="12" class="me-2" /> Giphy</button>
			</div>
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
import GiphyModal from "../../../Modals/ContentCreationEmbed/GiphyModal.vue";
import UnsplashModel from "../../../Modals/ContentCreationEmbed/UnsplashModel.vue";
import VideoPlayer from "../../../VideoPlayer/VideoPlayer.vue";
import EditImageModal from "../../EditImageModal.vue";
export default {
	data() {
		return {
			showImageEdit: false,
			isSpoiler: false,
			showGiphyModal: false,
			showUnsplashModal: false,
			editResult: {
				height: null,
				width: null,
				rotate: 0,
				alt: "",
			},
			metaData: {
				spoiler: false,
				rotate: 0,
				alt: "",
			},
		};
	},
	mounted() {
		this.metaData = this.meta;
	},
	components: {
		VideoPlayer,
		EditImageModal,
		Checkbox,
		GiphyModal,
		UnsplashModel,
	},
	computed: {
		contentUrl() {
			return typeof this.content == "object" && this.content != null ? URL.createObjectURL(this.content) : this.assetURL(this.content != null ? this.content : "");
		},
	},
	watch: {
		isSpoiler() {
			this.metaData.spoiler = true;
			this.$emit("update:meta", this.metaData);
		},
		editResult() {
			this.metaData.rotate = this.editResult.rotate;
			this.metaData.alt = this.editResult.alt;
			this.$emit("update:meta", this.metaData);
		},
	},
	methods: {
		selectGif(gif) {
			this.$emit("update:content", gif);
			this.showGiphyModal = false;
			this.showUnsplashModal = false;
		},
		selectMedia() {
			let fileChooser = document.createElement("input");
			fileChooser.type = "file";
			fileChooser.accept = `image/*`;
			fileChooser.onchange = (e) => {
				let file = e.target.files[0];
				if (file.type.startsWith(this.type) && !file.type.includes("svg+xml")) {
					this.$emit("update:content", file);
				} else {
					this.toast(__.get("messages.invalid-mime"));
				}
			};
			fileChooser.click();
		},
	},
	props: {
		meta: {
			default: () => {
				return { spoiler: false, rotate: 0, alt: "" };
			},
		},
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
