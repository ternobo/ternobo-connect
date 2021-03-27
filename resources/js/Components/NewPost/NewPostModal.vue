<template>
	<b-modal v-if="$store.state.user != null" v-model="showModal" :no-close-on-backdrop="isCropping" @show="onShown" hide-footer body-class="pb-2" size="md" title="تولید محتوای تازه" :centered="true">
		<div action="/posts" data-ajax method="POST" data-reload="1" enctype="multipart/form-data" class="w-100">
			<div class="new-post position-relative">
				<div class="selections">
					<div class="userinfo col-lg-4 p-0">
						<lazy-image :src="$store.state.user.profile" class="profile-sm" img-class="profile-sm" loading="lazy" />
						<strong>{{ $store.state.user.name }}</strong>
					</div>
					<div class="categoryandtype">
						<div class="mx-1 col-lg-5 p-0">
							<tselect :items="showTypesItems" :showNewItem="false" v-model="showType" direction="rtl"></tselect>
						</div>
						<div class="ml-1 p-0 col-lg-7">
							<tselect v-on:new-item="newCategory" :items="categories" value-option="name" :showNewItem="true" v-model="category" direction="rtl"> <i class="material-icons-outlined">layers</i> دسته‌بندی </tselect>
						</div>
					</div>
				</div>
				<div class="text px-0">
					<div class="textarea">
						<Editor />
						<div class="character-counter">
							<span class="counter tex-dark">{{ leftCharacter }}</span>
							<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
								<div class="progress-bar" role="progressbar" :style="{ width: txtlen }" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="mediatag">
					<div id="mediaPreview" class="position-relative" v-if="image !== undefined || video !== undefined">
						<div class="topleftactions">
							<button class="closebtn" @click="rotateImage" v-if="isCropping" style="height: 30px; width: 30px; padding: 3px"><i class="material-icons">rotate_left</i></button>
							<button class="closebtn" v-if="image !== undefined || video !== undefined" @click="removeMedia"><i class="material-icons font-22">close</i></button>
						</div>
						<cropper v-if="isCropping" class="cropper" ref="cropper" :src="image" :stencil-props="{ aspectRatio: 16 / 12 }"></cropper>
						<video class="w-100" v-if="video !== undefined && video !== null" :src="video" controls></video>

						<img class="w-100" v-if="isCroppingDone" ref="cropResult" />

						<div v-if="isCropping && image !== undefined && image !== null" class="w-100 d-flex justify-content-center mb-3 position-relative">
							<div class="cropperactions">
								<button type="button" @click="cropImage">تایید</button>
								<button type="button" @click="isCropping = false">لغو</button>
							</div>
						</div>
					</div>
					<div class="d-flex justify-content-end align-items-center my-2">
						<file-input v-on:change="imageSelect">
							<span class="text-grey hover-dark d-flex align-items-center clickable" v-b-tooltip.hover title="افزودن ویدیو / تصویر">
								<i class="material-icons-outlined hover-dark">crop_original</i>
							</span>
						</file-input>
						<span class="splitor-line mx-2"></span>
						<a class="text-grey hover-dark d-flex align-items-center font-12 disabled"><i class="material-icons-outlined disabled">article</i></a>
					</div>
					<div class="tags pr-0 pb-3">
						<TagInput class="w-100" v-model="tags" />
					</div>
				</div>
				<div class="media pl-2">
					<input type="hidden" name="sizes" value="" id="postimage-options" />
				</div>
				<div class="submit position-relative">
					<loading-button :loading="loading" class="btn btn-primary" @click.native="submitPost" style="margin-bottom: -8px"> ارسال </loading-button>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import { Mentionable } from "vue-mention";

import TagInput from "../inputs/TagInput";

import { Cropper } from "vue-advanced-cropper";
import Editor from "./Editor/Index";

import FileInput from "../../Components/inputs/FileInput";

export default {
	props: {
		post: {
			type: Object,
			default: undefined,
			required: false,
		},
	},
	methods: {
		async loadMentions(searchText = null) {
			this.loadingMentions = true;
			this.mentionItems = await new Promise((resolve) => {
				let data = {};
				if (searchText != null) {
					data.q = searchText;
				}
				axios.post("/slugsearch", data).then((response) => {
					resolve(response.data.pages);
				});
			});
			this.loadingMention = false;
		},
		onShown() {
			if (this.post) {
				if (this.post.category != null) {
					this.category = this.post.category;
				}

				this.text = this.post.text.replace("&zwnj;", "‌");
				if (this.post.show == "private") {
					this.showType = this.showTypesItems[1];
				}

				this.tags = this.post.tags;
				if (this.post.medias) {
					if (this.post.media_type.startsWith("video")) {
						this.video = this.post.medias;
					} else {
						this.isCroppingDone = true;

						this.image = this.post.medias;
						this.$nextTick(() => {
							this.$refs.cropResult.src = this.image;
						});
					}
				}
			}
		},

		newCategory(value) {
			this.categories.push({
				name: value,
				id: value,
			});
			axios
				.post("/categories", {
					name: value,
				})
				.then(() => {
					this.$store.commit("addCategory", { name: value, id: value });
				});
		},
		cropImage() {
			this.isCroppingDone = true;
			this.isCropping = false;
			const { canvas, coordinates } = this.$refs.cropper.getResult();
			canvas.toBlob((blob) => {
				this.$refs.cropResult.src = URL.createObjectURL(blob);
				this.cropCordinates = coordinates;
			});
		},
		rotateImage() {
			var image = document.createElement("img");
			image.crossOrigin = "anonymous";
			image.src = this.image;
			image.onload = () => {
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");

				if (image.width > image.height) {
					canvas.width = image.height;
					canvas.height = image.width;
					ctx.translate(image.height, image.width / image.height);
				} else {
					canvas.height = image.width;
					canvas.width = image.height;
					ctx.translate(image.height, image.width / image.height);
				}
				ctx.rotate(Math.PI / 2);
				ctx.drawImage(image, 0, 0);
				this.image = canvas.toDataURL();
			};
		},
		removeMedia() {
			this.isCroppingDone = false;
			if (this.$refs.cropResult) {
				this.$refs.cropResult.src = "";
			}
			this.file = false;
			this.image = undefined;
			this.video = undefined;
		},
		imageSelect(event) {
			var input = event.target;
			if (input.files && input.files[0]) {
				let file = event.target.files[0];
				var filetype = file.type;
				let blobURL = URL.createObjectURL(file);
				if (filetype.startsWith("image")) {
					this.file = file;
					this.video = undefined;
					this.image = blobURL;
					this.isCropping = true;
				} else if (filetype.startsWith("video")) {
					this.isCropping = false;
					this.file = file;
					this.image = undefined;
					this.video = blobURL;
				}
			}
		},

		submitPost() {
			this.loading = true;
			const formData = new FormData();
			formData.append("text", this.text);
			if (this.category) {
				formData.append("category", this.category.name);
			}
			formData.append("type", this.showType.value);
			formData.append("tags", JSON.stringify(this.tags));

			if (this.file !== undefined) {
				formData.append("media", this.file);
				if (this.cropCordinates !== undefined) {
					formData.append("sizes", JSON.stringify(this.cropCordinates));
				}
			}

			if (this.post) {
				formData.append("_method", "PUT");
				axios
					.post(this.$APP_URL + "/posts/" + this.post.id, formData)
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.$store.state.ternoboWireApp.reload({
								only: ["posts"],
							});
							this.$emit("done");
							this.$emit("update:show", false);

							this.text = undefined;
							this.category = undefined;
							this.tags = [];
							this.txtlen = "0%";
							this.image = undefined;
							this.video = undefined;
							this.file = undefined;
							this.cropCordinates = undefined;
							this.loading = false;
							this.leftCharacter = 2500;
						} else {
							const errors = data.errors;
							this.handleError(errors);
						}
					})
					.catch((error) => {})
					.then(() => (this.loading = false));
			} else {
				axios
					.post(this.$APP_URL + "/posts", formData)
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.$store.state.ternoboWireApp.reload({
								only: ["posts"],
							});
							this.$emit("done");
							this.$emit("update:show", false);

							this.text = undefined;
							this.category = undefined;
							this.tags = [];
							this.txtlen = "0%";
							this.image = undefined;
							this.video = undefined;
							this.file = undefined;
							this.cropCordinates = undefined;
							this.loading = false;
							this.leftCharacter = 2500;
						} else {
							const errors = data.errors;
							this.handleError(errors);
						}
					})
					.catch((error) => {})
					.then(() => (this.loading = false));
			}
		},

		initialData() {
			return {
				showTypesItems: [
					{
						name: "همه",
						value: "public",
						icon: "public",
					},
					{
						name: "فقط دوستان",
						value: "private",
						icon: "group",
					},
				],
				showType: undefined,
				category: undefined,
				text: undefined,
				categories: [],
				tags: [],
				txtlen: "0%",
				isCropping: false,
				isCroppingDone: false,
				image: undefined,
				video: undefined,
				file: undefined,
				cropCordinates: undefined,
				loading: false,
				leftCharacter: 2500,

				loadingMention: false,
				mentionItems: [],
			};
		},
	},
	watch: {
		text(newValue) {
			if (newValue) {
				this.txtlen = (newValue.length / 2500) * 100 + "%";
				this.leftCharacter = 2500 - newValue.length;
			}
		},
	},
	mounted() {
		this.showType = this.showTypesItems[0];

		if (this.$store.state.user) {
			if (this.$store.state.shared.currentPage.categories != null) {
				this.categories = this.$store.state.shared.currentPage.categories;
			}
		}
	},
	data() {
		return this.initialData();
	},
	components: {
		Cropper,
		TagInput,
		Mentionable,
		Editor,
		FileInput,
	},
	mixins: [ModalMixin],
	name: "NewPostModal",
};
</script>