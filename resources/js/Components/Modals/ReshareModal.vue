<template>
	<b-modal v-if="$page.props.user != null" v-model="showModal" no-close-on-backdrop hide-footer size="md" title="تولید محتوای تازه" :centered="true">
		<div action="/posts" data-ajax method="POST" data-reload="1" enctype="multipart/form-data" class="w-100">
			<div class="new-post position-relative">
				<div class="selections">
					<div class="userinfo col-lg-4 p-0">
						<lazy-image :src="$page.props.user.profile" class="profile m-0" loading="lazy" />
						<strong>{{ $page.props.user.name }}</strong>
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
					<div id="mediaPreview" class="position-relative">
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
					<div class="tags pt-2 pr-0 pb-3">
						<div class="d-flex align-items-center justify-content-between mb-2">
							<div class="w-100 d-flex flex-column">
								<span class="font-18 bold">برچسب‌ها</span>
								<span class="text-muted bold font-11">حداکثر ۳ برچست</span>
							</div>
						</div>
						<div class="d-flex align-items-center">
							<v-select class="w-100" dir="rtl" v-model="tags" taggable multiple push-tags>
								<template #open-indicator>
									<span></span>
								</template>
							</v-select>
							<div class="d-flex align-items-center">
								<file-input v-on:change="imageSelect">
									<a class="text-grey d-flex align-items-center clickable" v-b-tooltip.hover title="افزودن ویدیو / تصویر">
										<i class="material-icons-outlined text-grey">crop_original</i>
									</a>
								</file-input>
								<span class="splitor-line mx-2"></span>
								<inertia-link href="/articles/create" class="text-grey d-flex align-items-center font-12" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="افزودن مقاله"><i class="material-icons-outlined text-grey">article</i></inertia-link>
							</div>
						</div>
					</div>
				</div>
				<div class="border my-2" style="margin: 0 -24px">
					<component :is="componentType" class="shadow-0" style="margin-bottom: 0 !important" :post="post" :show-menu="false"></component>
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
		if (this.$page.props.user !== null) {
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
			categories: this.$page.props.currentPage != null ? this.$page.props.currentPage.categories : [],
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
	},
	mixins: [ModalMixin],
	name: "ReshareModal",
};
</script>

<style>
</style>
