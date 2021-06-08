<template>
	<b-modal v-model="showModal" hide-footer modal-class="slide-up" size="md" :centered="true">
		<template #modal-header>
			<div class="w-100 d-flex justify-content-between">
				<div>
					<div class="d-flex align-items-center" v-if="checkUser(pageId)">
						<i class="material-icons-outlined text-muted" v-if="edit" @click="cancelEdit">close</i>
						<i class="material-icons-outlined btn d-flex align-items-center justify-content-center btn-edit" @click="saveEdit">{{ edit ? "check" : "edit" }}</i>
					</div>
				</div>
				<div class="slideup-title">
					<i class="material-icons me-1">layers</i>
					{{ __.get("user-profile.tags") }}
				</div>
				<div>
					<i class="material-icons" @click="$emit('update:show', false)" v-if="!edit">check</i>
				</div>
			</div>
		</template>

		<p class="font-10">توجه داشته باشید که فقط <strong class="text-dark">یک برچسب</strong> را می‌توانید به عنوان فیلتر استفاده کنید.</p>

		<ul class="categories-list-mobile profile-tags tags flex-column align-items-start">
			<li class="tag-item" v-for="tag in tags" :class="{ active: tag === activeTag && !edit }" :key="'mobile_tag_' + tag">
				<i class="material-icons close-icon text-muted" @click="$emit('select', null)" v-if="tag == activeTag && !edit">close</i>

				<i class="material-icons close-icon text-danger" @click="$emit('remove', tag)" v-if="edit">delete_outline</i>

				<div @click="$emit('select', tag)"><i class="material-icons-outlined">layers</i> {{ tag }}</div>
			</li>
		</ul>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
export default {
	methods: {
		cancelEdit() {
			this.edit = false;
			this.$emit("cancel");
		},
		saveEdit() {
			if (this.edit) {
				this.edit = false;
				this.$emit("save");
			} else {
				this.edit = true;
			}
		},
	},
	data() {
		return {
			edit: false,
		};
	},
	props: {
		tags: {
			type: Array,
			default: [],
			required: true,
		},
		pageId: {
			type: Number,
			default: 0,
			required: true,
		},
		activeTag: {
			default: null,
		},
	},
	mixins: [ModalMixin],
	name: "TagsList",
};
</script>

<style>
</style>
