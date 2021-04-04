<template>
	<b-modal v-if="$store.state.user != null" v-model="showModal" no-close-on-esc no-close-on-backdrop @show="onShown" hide-footer no modal-class="new-post-modal" size="md" title="تولید محتوای تازه" :centered="true">
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
				<slider ref="sliderEditor" />
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
import { Mentionable } from "vue-mention";

import TagInput from "../inputs/TagInput";

import { Cropper } from "vue-advanced-cropper";

import FileInput from "../../Components/inputs/FileInput";
import Slider from "./Slides/Slider.vue";

export default {
	props: {
		post: {
			type: Object,
			default: undefined,
			required: false,
		},
	},
	methods: {
		submitPost() {
			let data = this.$refs.sliderEditor.getData();
			let formData = new FormData();
			data.forEach((item) => {
				item.content.forEach((slide) => {
					if (slide.content != "" && slide.content != null) {
						formData.append(`slides[][${slide.type}]`, slide.content);
					}
				});
			});
			axios
				.post("/posts", formData)
				.then((response) => {
					if (response.data.result) {
						this.toast("با موفقیت منتشر شد", "check", "text-success");
						this.$emit("update:show", false);
					} else {
						this.toast("خطا در ثبت اطلاعات");
					}
				})
				.catch((err) => {
					this.toast("خطا در ثبت اطلاعات");
				});
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
		FileInput,
		Slider,
	},
	mixins: [ModalMixin],
	name: "NewPostModal",
};
</script>
