<template>
	<b-modal v-model="showModal" hide-footer title="افزودن وب‌سایت" no-close-on-backdrop size="md" :centered="true">
		<div class="add-webiste-container">
			<div class="flex-container">
				<material-text-field placeholder="آدرس وب‌سایت" v-model="url" :notValid="!isValid" :maxlength="700" class="material--sm w-100" inputClass="w-100"></material-text-field>
				<tselect dir="rtl" v-model="type" valueOption="name" :items="websiteOptions"> نوع وب‌سایت </tselect>
			</div>
			<div class="mt-2 position-absolute">
				<small class="text-danger font-16" v-if="!notAdded">این وب‌سایت قبلا افزوده شده</small>
			</div>
		</div>

		<div class="d-flex justify-content-end">
			<button class="btn btn-primary" :disabled="!isValid" @click="addWebsite">افزودن</button>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import MaterialTextField from "../../inputs/MaterialTextField.vue";
export default {
	components: { MaterialTextField },
	computed: {
		isValid() {
			return this.websiteRegex.test(this.url) && this.notAdded;
		},
		notAdded() {
			return this.websites.filter((website) => website.url == this.url).length < 1;
		},
	},
	methods: {
		addWebsite() {
			if (this.isValid && this.type) {
				this.$emit("add", {
					url: this.url,
					option: this.type,
				});
				this.url = "";
				this.type = null;
				this.$emit("update:show", false);
			}
		},
	},
	props: ["websiteOptions", "websites"],
	data() {
		return {
			websiteRegex: /^(https?:\/\/)?([\w\d-_]+)\.([\w\d-_\.]+)\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
			url: "",
			type: null,
		};
	},
	mixins: [ModalMixin],
	name: "AddWebsiteModal",
};
</script>

<style>
</style>
