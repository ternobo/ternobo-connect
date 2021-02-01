<template>
	<b-modal v-if="$store.state.user != null" v-model="showModal" :no-close-on-backdrop="isCropping" hide-footer body-class="px-3 pb-2" size="md" title="بازنشر محتوا" :centered="true">
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
						<textarea-autosize :min-height="201" v-model="text" rows="8" placeholder="اگر در خویش میل نوشتن سراغ کردی باید سه چیز در تو باشد. شناختی، هنری و سحری (جبران خلیل جبران)" class="w-100 autoresize autodirection" maxlength="2500"></textarea-autosize>
						<div class="character-counter">
							<span class="counter tex-dark">{{ leftCharacter }}</span>
							<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
								<div class="progress-bar" role="progressbar" :style="{ width: txtlen }" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="mediatag">
					<div class="tags pr-0 pb-3">
						<tag-input class="w-100" v-model="tags" />
					</div>
				</div>
				<div class="media pl-2">
					<input type="hidden" name="sizes" value="" id="postimage-options" />
				</div>
				<div class="border my-2">
					<component :is="componentType" class="shadow-0" :post="post" :show-menu="false"></component>
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
import { Cropper } from "vue-advanced-cropper";
import { Inertia } from "@inertiajs/inertia";
import FileInput from "../../Components/inputs/FileInput";
import TagInput from "../inputs/TagInput.vue";

export default {
	props: {
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	methods: {
		newCategory(value) {
			this.categories.push({
				name: value,
				id: value,
			});
			axios.post("/categories", {
				name: value,
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
				formData.append("category", this.category.value);
			}
			formData.append("type", this.showType.value);
			formData.append("tags", JSON.stringify(this.tags));
			if (this.file !== undefined) {
				formData.append("media", this.file);
				if (this.cropCordinates !== undefined) {
					formData.append("sizes", JSON.stringify(this.cropCordinates));
				}
			}
			axios
				.post(this.$APP_URL + "/share/" + this.post.id, formData)
				.then((response) => {
					const data = response.data;
					if (data.result) {
						Inertia.reload({
							only: ["posts"],
						});
						this.$emit("update:show", false);
					} else {
						const errors = data.errors;
						this.handleError(errors);
					}
				})
				.catch((error) => {})
				.then(() => (this.loading = false));
		},
	},
	watch: {
		text(newValue) {
			this.txtlen = (newValue.length / 2500) * 100 + "%";
			this.leftCharacter = 2500 - newValue.length;
		},
	},
	mounted() {
		if (this.$store.state.user !== null) {
			if (this.post.type === "article") {
				this.componentType = require("../PostCard/ArticleCard").default;
			}
			this.showType = this.showTypesItems[0];
		}
	},
	data() {
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
			categories: this.$store.state.currentPage != null ? this.$store.state.currentPage.categories : [],
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

			componentType: require("../PostCard/SimplePost").default,
		};
	},
	components: {
		Cropper,
		FileInput,
		TagInput,
	},
	mixins: [ModalMixin],
	name: "ReshareModal",
};
</script>

<style></style>
