<template>
	<b-modal v-if="$page.props.user != null" v-model="showModal" hide-footer hide-header size="md" :centered="true">
		<div>
			<div class="w-100 pr-2 mb-3 mt-2 d-flex align-items-center dir-ltr text-right text-action" dir="ltr">
				<i class="material-icons-outlined clickale p-1 text-grey font-18" @click="editLink = !editLink">{{ editLink ? "check" : "edit" }}</i>
				<span class="dir-ltr">Ternobo.com/{{ $page.props.user.username }}/</span>
				<input type="text" id="slug-input" v-no-space class="w-100 py-1 text-action dir-ltr text-left" v-model="slug" :class="{ 'border-0': !editLink }" name="slug" :readonly="!editLink" />
				<span style="direction: rtl; white-space: nowrap" class="py-1 px-2">پیوند : </span>
			</div>
			<tselect class="my-3" v-on:new-item="newCategory" :items="categories" value-option="name" :showNewItem="true" v-model="category" direction="rtl"> <i class="material-icons-outlined">layers</i> دسته‌بندی </tselect>
			<div>
				<tag-input class="w-100" v-model="tags" />
			</div>
		</div>
		<button style="marg" @click="save" class="btn btn-primary mt-4">ثبت</button>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import { Cropper } from "vue-advanced-cropper";
import TagInput from "../inputs/TagInput.vue";
export default {
	components: { TagInput },
	methods: {
		save() {
			const data = {
				slug: this.slug,
				tags: this.tags,
				category: this.category,
			};
			this.$emit("save", data);
			this.$emit("update:show", false);
		},
		newCategory(value) {
			this.categories.push({
				name: value,
				id: value,
			});
			axios.post("/categories", {
				name: value,
			});
		},
	},
	data() {
		return {
			slug: null,
			category: undefined,
			editLink: false,
			tags: [],
			categories: this.$page.props.currentPage.categories,
		};
	},

	mixins: [ModalMixin],
};
</script>
