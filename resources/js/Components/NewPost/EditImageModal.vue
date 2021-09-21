<template>
	<b-modal v-model="showModal" hide-footer :title="__.choice('content/posts.image-detail', 2)" modal-class="category-select-modal" :centered="true">
		<template #modal-header-close> arrow_back </template>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	mixins: [ModalMixin],
	name: "CategorySelectModal",
	data() {
		return {
			loading: false,
		};
	},
};
</script>
