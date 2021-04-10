<template>
	<b-modal v-if="$store.state.user != null" v-model="showModal" @show="shown" no-close-on-esc no-close-on-backdrop hide-footer no modal-class="new-post-modal" size="md" title="تولید محتوای تازه" :centered="true">
		<div action="/posts" data-ajax method="POST" data-reload="1" enctype="multipart/form-data" class="w-100">
			<div class="new-post position-relative">
				<div class="selections">
					<div class="d-flex align-items-center">
						<lazy-image :src="$store.state.user.profile" class="profile-sm mb-0 ml-2" img-class="profile-sm" loading="lazy" />
						<strong>{{ $store.state.user.name }}</strong>
					</div>
					<div class="categoryandtype">
						<div class="ml-1 p-0 col-lg-7">
							<tselect v-on:new-item="newCategory" :items="categories" value-option="name" :showNewItem="true" v-model="category" direction="rtl"> <i class="material-icons-outlined">layers</i> دسته‌بندی </tselect>
						</div>
					</div>
				</div>
				<slider v-model="content" @delete="onSlideDelete" ref="sliderEditor" />
				<div class="d-flex justify-content-center align-items-center">
					<loading-button class="btn btn-transparent button-transparent text-muted font-14"> پیش نویس </loading-button>
					<loading-button :loading="loading" class="btn btn-primary font-14" @click.native="submitPost"> انتشار </loading-button>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import TagInput from "../inputs/TagInput";
import FileInput from "../../Components/inputs/FileInput";
import Slider from "./Slides/Slider.vue";

import uuidv4 from "uuid";
import isUUID from "is-uuid";

export default {
	props: {
		post: {
			type: Object,
			default: null,
			required: false,
		},
	},
	methods: {
		onSlideDelete(id) {
			if (!isUUID.v4(id)) {
				this.deletedSlides.push(id);
			}
		},
		newCategory(value) {
			if (!this.categories.filter((item) => item.name == value).length > 0) {
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
			} else {
				this.toast("نام دسته بندی تکراری است");
			}
		},
		shown() {
			this.deletedSlides = [];
			if (this.post) {
				let content = _.cloneDeep(this.post.slides);
				for (let i = 0; i < content.length; i++) {
					let item = content[i];
					item.icon = "more_horiz";
					let items = item.content;
					for (let i = 0; i < items.length; i++) {
						let elem = items[i];
						if (elem.type == "media") {
							item.icon = "image";
							break;
						} else {
							item.icon = "text_fields";
						}
					}
					item.active = false;
				}
				content[0].active = true;
				this.content = content;
			}
		},
		submitPost() {
			this.loading = true;
			let data = this.content;
			let formData = new FormData();
			data.forEach((item, index) => {
				for (let slide of item.content) {
					if (slide.content != "" && slide.content != null) {
						if (slide.type == "media" && typeof slide.content != "object") {
							continue;
						}
						formData.append(`slides[${index}][${slide.type}]`, slide.content);
					}
				}
				if (this.post && !isUUID.v4(item.id)) {
					formData.append(`slides[${index}][id]`, item.id);
				}
			});
			if (this.category) {
				formData.append("category", this.category.name);
			}

			if (this.post) {
				formData.append("deletedSlides", JSON.stringify(this.deletedSlides));
				formData.append("_method", "PUT");
			}

			let url = this.post != null ? `/posts/${this.post.id}` : "/posts";

			let requestConfig = {
				method: "post",
				url: url,
				data: formData,
			};

			axios(requestConfig)
				.then((response) => {
					if (response.data.result) {
						this.toast("با موفقیت منتشر شد", "check", "text-success");
						this.$emit("update:show", false);
						this.$store.state.ternoboWireApp.reload();
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((err) => {
					this.toast("خطا در ثبت اطلاعات");
				})
				.then(() => {
					this.loading = false;
				});
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
		if (this.$store.state.user) {
			if (this.$store.state.shared.currentPage.categories != null) {
				this.categories = this.$store.state.shared.currentPage.categories;
			}
		}
	},
	data() {
		return {
			categories: [],
			category: undefined,
			loading: false,
			deletedSlides: [],
			content: [{ id: uuidv4(), content: [], icon: "more_horiz", active: true }],
		};
	},
	components: {
		TagInput,
		FileInput,
		Slider,
	},
	mixins: [ModalMixin],
	name: "NewPostModal",
};
</script>
