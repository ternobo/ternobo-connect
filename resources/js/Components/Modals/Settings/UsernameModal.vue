<template>
	<b-modal v-model="showModal" hide-footer body-class="modal-signup" title="ویرایش نام کاربری" size="md" :centered="true">
		<div>
			<div class="d-flex justify-content-between align-items-center">
				<loading-button :disabled="loading || !valid" class="btn btn-primary signup-save-btn" @click.native="save" :loading="saveLoading">ثبت</loading-button>
				<div class="d-flex align-items-center">
					<i class="material-icons ml-2" :class="{ 'text-danger': !valid, 'text-success': valid }">{{ valid ? "check_circle_outline" : "highlight_off" }}</i>
					<material-text-field :no-space="true" placeholder="نام کاربری" v-model="username" :required="true" @blur="checkValidation" :maxlength="30" class="material--sm">
						<loading-spinner style="left: 0; height: 10px; width: 10px; border-width: 2px" v-if="loading" class="position-absolute"></loading-spinner>
					</material-text-field>
				</div>
			</div>
			<div class="d-flex justify-content-end pt-3">
				<span class="text-muted font-16 ml-4">پیشنهادات ما</span>
				<ul dir="ltr" class="text-left p-0">
					<li v-for="suggestion in suggestions" class="clickable" :key="'username_suggestion_' + suggestion" @click="username = suggestion">- {{ suggestion }}</li>
				</ul>
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
				.post("/auth/set-username", {
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
				.post("/auth/check-username", {
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
		axios.post("/auth/suggest-username").then((response) => {
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
