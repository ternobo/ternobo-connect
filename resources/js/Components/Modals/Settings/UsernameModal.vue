<template>
	<b-modal v-model="showModal" hide-footer body-class="modal-signup" title="ویرایش نام کاربری" size="md" :centered="true">
		<div>
			<div class="d-flex justify-content-between align-items-center">
				<div class="input-group-icon">
					<i class="material-icons ml-2" v-if="!loading" :class="{ 'text-danger': !valid, 'text-success': valid }">{{ valid ? "check_circle_outline" : "highlight_off" }}</i>
					<material-text-field :no-space="true" placeholder="نام کاربری" v-model="username" :required="true" @blur="checkValidation" :maxlength="30" class="material--sm">
						<loading-spinner style="height: 24px; width: 24px; left: 16px; top: 24%; border-width: 2px" v-if="loading" class="position-absolute"></loading-spinner>
					</material-text-field>
				</div>
				<loading-button :disabled="loading || !valid" class="btn btn-primary signup-save-btn" @click.native="save" :loading="saveLoading">ثبت</loading-button>
			</div>
			<div class="d-flex flex-column mt-4">
				<span class="font-demibold font-14 mb-3">پیشنهادات ما</span>
				<div class="d-flex">
					<span v-for="suggestion in suggestions" class="category-badge font-demibold py-2 px-3 text-dark font-14 clickable" style="border-radius: 16px; margin-left: 12px" :key="'username_suggestion_' + suggestion" @click="username = suggestion">{{ suggestion }}</span>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
export default {
	methods: {
		save() {
			this.saveLoading = true;
			axios
				.post("/settings/set-username", {
					username: this.username,
				})
				.then((response) => {
					if (response.data.result) {
						this.$emit("updated", response.data.username);
						this.$emit("update:show", false);
					} else {
						this.handleError(response.data.errors);
					}
				})
				.catch((error) => {
					this.error("خطا در بر فراری ارتباط");
				})
				.then(() => (this.saveLoading = false));
		},
		checkValidation() {
			this.loading = true;
			axios
				.post("/settings/check-username", {
					username: this.username,
				})
				.then((response) => {
					this.valid = response.data.valid;
				})
				.catch((error) => {
					this.error("خطا در بر فراری ارتباط");
				})
				.then(() => (this.loading = false));
		},
	},
	props: {
		value: {
			type: String,
			default: null,
			required: true,
		},
	},
	mounted() {
		this.username = this.value;
		axios.post("/settings/suggest-username").then((response) => {
			this.suggestions = response.data.list;
		});
	},

	data() {
		return {
			loading: false,
			saveLoading: false,
			valid: true,
			username: null,
			suggestions: [],
		};
	},
	components: {
		LoadingButton,
		LoadingSpinner,
	},
	mixins: [ModalMixin],
	name: "UsernameModal",
};
</script>

<style></style>
