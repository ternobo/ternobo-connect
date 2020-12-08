<template>
	<b-modal v-model="showModal" hide-footer modal-class="slide-up" size="md" :centered="true">
		<template #modal-header>
			<div class="w-100 d-flex justify-content-between">
				<div>
					<i class="material-icons-outlined btn d-flex align-items-center justify-content-center btn-edit" v-if="checkUser(pageId)" @click="$emit('edit')">edit</i>
				</div>
				<div class="slideup-title">
					<i class="material-icons">layers</i>
					دسته‌بندی‌ها
				</div>
				<i class="material-icons ml-1" @click="$emit('update:show', false)">check</i>
			</div>
		</template>

		<p class="font-10">توجه داشته باشید که فقط <strong class="text-dark">یک دسته بندی</strong> را می‌توانید به عنوان فیلتر استفاده کنید.</p>

		<ul class="categories-list-mobile">
			<li v-for="category in categories" :class="{ active: category === activeCategory }" :key="'mobile_category_' + category.id">
				<i class="material-icons close-icon text-muted" @click="$emit('update:activeCategory', null)" v-if="category == activeCategory">close</i>
				<div @click="$emit('update:activeCategory', category)"><i class="material-icons-outlined">layers</i> {{ category.name }}</div>
			</li>
		</ul>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
export default {
	props: {
		categories: {
			type: Array,
			default: [],
			required: true,
		},
		pageId: {
			type: Number,
			default: 0,
			required: true,
		},
		activeCategory: {
			default: null,
		},
	},
	mixins: [ModalMixin],
	name: "CategoriesList",
};
</script>

<style>
</style>
