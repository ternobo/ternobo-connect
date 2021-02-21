<template>
	<b-modal v-model="showModal" hide-footer hide-header body-class="p-0" size="md" :centered="true">
		<div class="file-send-preview">
			<div class="file-detail">
				<i class="material-icons file-icon">insert_drive_file</i>
				<span class="file-name">{{ file.name }}</span>
			</div>
			<div class="caption">
				<material-text-field inputClass="w-100" class="material--sm" placeholder="توضیحات" v-model="caption"></material-text-field>
			</div>
			<div class="d-flex actions">
				<button class="btn btn-transparent text-light">لغو</button>
				<button class="btn btn-primary">تایید</button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import MaterialTextField from "../inputs/MaterialTextField.vue";
export default {
	data() {
		return {
			caption: null,
		};
	},
	methods: {
		cancel() {
			this.$emit("canceled");
			this.$emit("show:update", false);
		},
		send() {
			this.$emit("ok", this.caption);
			this.$emit("show:update", false);
		},
	},
	components: { MaterialTextField },
	props: ["file"],
	mixins: [ModalMixin],
	name: "SendFileModal",
};
</script>

<style>
</style>
