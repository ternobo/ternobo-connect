<template>
	<b-modal v-model="showModal" hide-footer body-class="modal-signup" :title="__.get('settings.change-username')" size="md" :centered="true">
		<div class="py-3">
			<div class="d-flex justify-content-between align-items-end">
				<div class="input-group-icon">
					<i class="material-icons me-2" v-if="!loading" :class="{ 'text-danger': !valid && !notChanged, 'text-success': valid && !notChanged, 'text-superlight': notChanged }">{{ valid ? "check_circle_outline" : "highlight_off" }}</i>
					<material-text-field :no-space="true" :placeholder="__.get('application.username')" v-model="username" :required="true" @blur="checkValidation" :maxlength="30">
						<loading-spinner style="height: 24px; width: 24px; left: 16px; top: 24%; border-width: 2px" v-if="loading" class="position-absolute"></loading-spinner>
					</material-text-field>
				</div>
				<loading-button :disabled="loading || !valid || notChanged" class="btn btn-primary signup-save-btn" @click.native="save" :loading="saveLoading">{{ __.get("application.save") }}</loading-button>
			</div>
			<div class="d-flex flex-column mt-3 pt-3">
				<span class="font-demibold font-14 mb-3">{{ __.get("settings.our-suggestions") }}</span>
				<div class="d-flex">
					<span v-for="suggestion in suggestions" class="category-badge font-demibold py-2 px-3 text-dark font-14 clickable" style="border-radius: 15px; margin-left: 12px" :key="'username_suggestion_' + suggestion" @click="username = suggestion">{{ suggestion }}</span>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
import { mapState } from "vuex";
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
	computed: {
		...mapState(["user"]),
		notChanged() {
			return this.user.username == this.username;
		},
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
