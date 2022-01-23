<template>
	<b-modal v-model="showModal" hide-footer :title="__.get('settings.autodeactivate')" size="sm" :centered="true">
		<div class="d-flex flex-column">
			<div class="pb-7">
				<radio-button
					class="flex-column align-items-start"
					v-model="val"
					:values="[
						{ value: 1, label: __.choice('settings.autodeactivate-month', 1, { month: 1 }) },
						{ value: 6, label: __.choice('settings.autodeactivate-month', 6, { month: 6 }) },
						{ value: 12, label: __.choice('settings.autodeactivate-year', 1, { year: 1 }) },
					]"
				></radio-button>
			</div>
			<p>
				{{ __.get("settings.autodeactivate-desc") }}
			</p>
			<modal-footer-buttons okClass="btn-primary w-100" :okLoading="loading" :showCancel="false" @ok="save" />
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import RadioButton from "../../inputs/RadioButton.vue";
import ModalFooterButtons from "../ModalFooterButtons.vue";
export default {
	props: ["value"],
	components: { ModalFooterButtons, RadioButton },
	data() {
		return {
			loading: false,
			val: 6,
		};
	},
	watch: {
		value() {
			this.val = this.value;
		},
	},
	methods: {
		save() {
			this.loading = true;
			axios
				.post("/settings/set-autodeactivation", { value: this.val })
				.then(() => {
					this.$emit("update:show", false);
					this.$emit("input", this.val);
				})
				.catch((err) => console.log(err))
				.then(() => (this.loading = false));
		},
	},
	mixins: [ModalMixin],
	name: "SelfDeactivation",
};
</script>

<style>
</style>
