<template>
	<b-modal v-model="showModal" hide-footer title="افزودن وب‌سایت" no-close-on-backdrop size="md" :centered="true">
		<div class="add-webiste-container">
			<material-text-field :notValid="!isValid" placeholder="آدرس وب‌سایت" v-model="url" :maxlength="700" class="material--xsm w-100" inputClass="w-100"></material-text-field>
			<v-select class="dropdown-list w-50" placeholder="نوع وب‌سایت" dir="rtl" :searchable="false" v-model="type" label="name" :options="websiteOptions">
				<template #open-indicator="{ attributes }">
					<span v-bind="attributes">
						<i class="material-icons">keyboard_arrow_down</i>
					</span>
				</template>
				<template #no-options>موردی یافت نشد</template>
			</v-select>
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
			return this.websiteRegex.test(this.url);
		},
	},
	methods: {
		addWebsite() {
			if (this.isValid) {
				this.$emit("add", {
					url: this.url,
					option: this.type,
				});
				this.$emit("update:show", false);
			}
		},
	},
	props: ["websiteOptions"],
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
