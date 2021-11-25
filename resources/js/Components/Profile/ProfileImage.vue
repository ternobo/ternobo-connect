<template>
	<div class="profile-box" :class="[size]">
		<CropperModal :title="__.get('user-profile.crop-profile-title')" :show.sync="crop" v-if="canChange" :aspect-ratio="1 / 1" :image="image" @cropped="upload"></CropperModal>
		<input type="file" class="d-none" v-if="canChange" ref="imageFile" @change="imageSelect" />

		<lazy-image :loadingColor="skeletonOptions.profileColor" :src="picture" img-class="rounded-circle" class="mb-0" :class="size" />
		<div class="edit-icons" v-if="canChange && !loading && showIcons">
			<i class="material-icons-outlined camera-btn clickable" @click="openFileSelect">camera_alt</i>
			<i class="material-icons-outlined camera-btn clickable mt-1" v-if="showDeleteImage" @click="deleteProfile">delete</i>
		</div>
		<div class="position-absolute d-flex align-items-center justify-content-center" style="inset: 3px; border-radius: 50%; background: rgba(0, 0, 0, 0.5)" v-if="loading">
			<loading-spinner></loading-spinner>
		</div>
	</div>
</template>

<script>
import CropperModal from "../Modals/CropperModal";

export default {
	watch: {
		src(newValue) {
			this.picture = newValue;
		},
	},
	created() {
		this.picture = this.src;
	},
	props: {
		showIcons: {
			type: Boolean,
			default: true,
			required: false,
		},
		uploadOnCrop: {
			type: Boolean,
			default: true,
		},
		canChange: {
			type: Boolean,
			default: false,
			required: false,
		},
		src: {
			type: String,
			default: undefined,
			required: true,
		},
		size: {
			type: String,
			default: "profile-xxlg",
			required: false,
		},
	},
	methods: {
		openFileSelect() {
			if (this.canChange) {
				this.$refs.imageFile.click();
			}
		},
		deleteProfile() {
			this.loading = true;
			axios
				.post("/delete-profile")
				.then((response) => {
					if (response.data.result) {
						let data = response.data;
						if (data.url) {
							this.picture = data.url;
							this.$store.dispatch("loadUser");
							this.$store.state.ternoboWireApp.reload();
						}
						this.$emit("updated");
					} else {
						this.toast(__.get("messages.profile-delete-error"));
					}
				})
				.catch((err) => {
					console.log(err);
					this.toast(__.get("messages.profile-delete-error"));
				})
				.then(() => (this.loading = false));
		},
		imageSelect(event) {
			var input = event.target;
			if (input.files && input.files[0]) {
				let file = event.target.files[0];
				var filetype = file.type;
				let blobURL = URL.createObjectURL(file);
				if (filetype.startsWith("image")) {
					this.file = file;
					this.image = blobURL;
					this.crop = true;
				} else {
					this.toast("فایل انتخابی تصویر نیست!");
				}
			}
		},
		upload(cordinates, canvas) {
			if (this.uploadOnCrop) {
				this.loading = true;
				const formData = new FormData();
				formData.append("profile", this.file);
				formData.append("sizes", JSON.stringify(cordinates));
				formData.append("json", true);
				axios
					.post(this.$APP_URL + "/setprofile", formData)
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.$store.dispatch("loadUser");
							if (data.url) {
								this.picture = data.url;
							}
							this.$emit("updated");
						} else {
							const errors = data.errors;
							this.handleError(errors);
						}
					})
					.then(() => (this.loading = false));
			} else {
				this.picture = canvas.toDataURL("image/jpeg", 1.0);
				this.$emit("ready", { file: this.file, sizes: cordinates });
			}
		},
	},
	computed: {
		showDeleteImage() {
			return !this.picture.endsWith("/img/woman-profile.png") && !this.picture.endsWith("/img/man-profile.png");
		},
	},
	data() {
		return {
			crop: false,
			image: "",
			file: null,
			loading: false,
			picture: "",
		};
	},

	components: {
		CropperModal,
	},
};
</script>
