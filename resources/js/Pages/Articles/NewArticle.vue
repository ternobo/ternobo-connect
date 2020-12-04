<template>
	<base-layout>
		<div class="new-article w-100">
			<CropperModal title="تصویر شاخص مقاله" :image="thumbnail" @cropped="onCropped" :show.sync="cropping"></CropperModal>
			<ArticleSettings ref="settings" @save="setSettings" :show.sync="showSettings"></ArticleSettings>
			<div class="cover-section clickable" @click="selectFile">
				<img :src="thumbnail" v-if="thumbnail !== undefined" />
				<div class="position-absolute" style="top: 16px; left: 16px" @click="thumbnail = undefined" v-if="thumbnail !== undefined">
					<button class="btn closebtn p-4"><i class="material-icons">close</i></button>
				</div>
			</div>

			<div class="editor-section border-bottom">
				<input type="text" v-model="title" class="font-24 border-0 form-control" placeholder="عنوان مقاله" />

				<ckeditor ref="editor" :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
			</div>
			<div class="actions-section">
				<loading-button @click.native="submit" :loading="loading" class="btn btn-primary w-100">ارسال</loading-button>
				<button class="btn button-transparent btn-transparent" @click="showSettings = true"><i class="material-icons text-muted">settings</i></button>
			</div>
		</div>
	</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import CropperModal from "../../Components/Modals/CropperModal";
import ArticleSettings from "../../Components/Modals/ArticleSettings";
import { Inertia } from "@inertiajs/inertia";

import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
	props: {
		article: {
			type: Object,
			default: undefined,
			required: false,
		},
	},
	methods: {
		selectFile() {
			if (this.thumbnail === undefined) {
				const $this = this;
				var el = document.createElement("input");
				el.type = "file";
				el.style.display = "none";
				document.body.append(el);
				el.click();
				el.addEventListener(
					"change",
					() => {
						if (el.files.length > 0) {
							const file = el.files[0];
							if (file.type.startsWith("image")) {
								let blobURL = URL.createObjectURL(file);
								$this.cover = file;
								$this.thumbnail = blobURL;
								$this.cropping = true;
							} else {
								$this.toast("فقط امکان انتخاب تصویر وجود دارد.");
							}
						}
						el.remove();
					},
					false
				);
			}
		},
		onCropped(cordinates, canvas) {
			canvas.toBlob((url) => (this.thumbnail = URL.createObjectURL(url)));
		},
		setSettings(settings) {
			this.tags = settings.tags;
			this.slug = settings.slug;
			if (settings.category != undefined && settings.category.id) {
				console.log(settings.category);
				this.category = settings.category.name;
			}
		},
		submit() {
			const formData = new FormData();
			if (this.cover !== null && this.cover !== undefined) {
				formData.append("media", this.cover);
			}

			if (this.title !== null && this.title !== undefined) {
				formData.append("title", this.title);
			} else {
				this.toast("عنوان مقاله اجباری است.");
			}

			if (this.content !== null && this.content !== undefined) {
				formData.append("text", this.content);
			} else {
				this.toast("محتوای مقاله اجباری است.");
			}

			if (this.slug !== null && this.slug !== undefined) {
				formData.append("slug", this.slug);
			}

			if (this.category !== null && this.category !== undefined) {
				formData.append("category", this.category);
			}
			formData.append("tags", JSON.stringify(this.tags));
			this.loading = true;

			var options = {
				method: "post",
				url: "/articles",
				data: formData,
			};

			if (this.article !== undefined) {
				formData.append("_method", "put");
				axios
					.post("/articles/" + this.article.id, formData)
					.then((response) => {
						if (response.data.result) {
							Inertia.visit(response.data.redirect);
						} else {
							this.handleError(this.data.errors);
						}
					})
					.then(() => (this.loading = false));
			} else {
				axios
					.post("/articles", formData)
					.then((response) => {
						if (response.data.result) {
							Inertia.visit(response.data.redirect);
						} else {
							this.handleError(this.data.errors);
						}
					})
					.then(() => (this.loading = false));
			}
		},
	},
	created() {
		if (this.article !== undefined) {
			this.title = this.article.title;
			this.content = this.article.text;
			if (this.article.medias !== null) {
				this.thumbnail = this.article.medias;
			}
			this.tags = this.article.tags;
			if (this.article.category !== null) {
				this.category = this.article.category.name;
			} else {
				this.category = undefined;
			}
			this.slug = this.article.slug;
		}

		// class VideoBlot extends BlockEmbed {
		// 	static create(url) {
		// 		let node = super.create();
		// 		node.setAttribute("src", url);
		// 		node.setAttribute("controls", "");
		// 		return node;
		// 	}

		// 	static value(node) {
		// 		return node.getAttribute("src");
		// 	}
		// }
		// VideoBlot.blotName = "video";
		// VideoBlot.tagName = "video";
		// // Quill.register(VideoBlot);
	},

	mounted() {
		if (this.article !== undefined) {
			this.$refs.settings.slug = this.slug;
			this.$refs.settings.category = this.category;
			this.$refs.settings.tags = this.tags;
		}
	},
	data() {
		return {
			title: null,
			content: "",
			cropping: false,
			thumbnail: undefined,
			slug: null,
			category: null,
			tags: [],
			cover: null,
			loading: false,
			showSettings: false,

			editor: ClassicEditor,
			editorConfig: {
				language: "fa",
			},
		};
	},
	components: {
		CropperModal,
		ArticleSettings,

		ckeditor: CKEditor.component,
	},
	layout: AppLayout,
};
</script>

<style lang="scss" scoped>
.quillWrapper {
	min-height: 100%;
	width: 100%;
	flex: 1 1 auto;
}

.new-article {
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 130px);
}

.editor-section {
	flex: 1 1 auto;
	background: #fff;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.cover-section {
	display: flex;
	align-items: center;
	justify-content: center;
	background: url(/images/uploadcover.svg) no-repeat;
	background-position: center;
	background-size: contain;
	cursor: pointer;
	height: 300px;
	position: relative;

	img {
		width: 100%;
		height: 300px;
		object-fit: cover;
	}
}

.actions-section {
	display: flex;
}
</style>
