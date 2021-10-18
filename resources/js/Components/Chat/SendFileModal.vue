<template>
	<b-modal v-model="showModal" hide-footer hide-header body-class="p-0" size="md" :centered="true">
		<div class="file-send-preview">
			<div class="file-detail">
				<img v-if="type == 'image'" :src="url" class="w-100" />
				<video controls v-else-if="type == 'video'" :src="url" class="w-100" />
				<audio controls v-else-if="type == 'audio'" :src="url" class="w-100" />
				<div class="d-flex" v-else>
					<i class="material-icons file-icon">insert_drive_file</i>
					<span class="file-name">{{ file.name }}</span>
				</div>
			</div>
			<div class="caption">
				<material-text-field v-if="type == 'image' || type == 'video' || type == 'audio'" inputClass="w-100" class="material--sm" placeholder="توضیحات" v-model="captionVal"></material-text-field>
			</div>
			<div class="d-flex actions">
				<button class="btn btn-transparent text-gray-medium-dark" @click="cancel">لغو</button>
				<button class="btn btn-primary" @click="send">تایید</button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import MaterialTextField from "../inputs/MaterialTextField.vue";
export default {
	watch: {
		captionVal(newValue) {
			this.$emit("update:caption", newValue);
		},
	},
	data() {
		return {
			captionVal: null,
		};
	},
	mounted() {
		this.captionVal = this.caption;
	},
	computed: {
		url() {
			return URL.createObjectURL(this.file);
		},
		type() {
			if (this.file.type.startsWith("image")) {
				return "image";
			} else if (this.file.type.startsWith("video")) {
				return "video";
			} else if (this.file.type.startsWith("audio")) {
				return "audio";
			}
			return "file";
		},
	},
	methods: {
		cancel() {
			this.$emit("canceled");
			this.$emit("update:show", false);
		},
		send() {
			this.$emit("send", this.caption);
			this.$emit("update:show", false);
		},
	},
	components: { MaterialTextField },
	props: ["file", "caption"],
	mixins: [ModalMixin],
	name: "SendFileModal",
};
</script>

<style>
</style>
