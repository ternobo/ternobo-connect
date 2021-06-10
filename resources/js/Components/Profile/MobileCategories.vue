<template>
	<b-modal v-model="showMenu" hide-footer title="" modal-class="slide-up" body-class="p-0" size="md" :centered="true">
		<template #modal-header>
			<h5 class="modal-title">
				<i class="material-icons-outlined">layers</i>
				<span> {{ __.choice("content/posts.category", 2) }} </span>
			</h5>
			<button @click="$emit('update:show', false)" type="button" class="close">×</button>

			<div class="filter-action-check">
				<i class="material-icons">check</i>
			</div>
		</template>
		<p>توجه داشته باشید که فقط<strong>یک دسته بندی</strong> را می‌توانید به عنوان فیلتر استفاده کنید.</p>

		<ul class="mobile-categories">
			<li v-for="category in categories" :key="'category_' + category.id">{{ category.name }}</li>
		</ul>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	props: {
		categories: {
			type: Array,
			default: [],
			required: true,
		},
	},
	mixins: [ModalMixin],
	name: "MobileCategories",
};
</script>

<style></style>
