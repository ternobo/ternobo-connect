<template>
	<div class="feedback-label-container">
		<div class="feedback-label justify-content-center d-flex align-items-center" :class="[`feedback-color-label ${type}`, { clickable: this.shared.is_admin }]" @click="openChangeType"><slot></slot> <loading-spinner class="ms-1" style="height: 12px; width: 12px" v-if="loading"></loading-spinner></div>
		<transition name="slide">
			<div class="feedback-option-chnage" v-if="showTypeChange">
				<div v-for="status in feedbackLabels" @click="changeType(status)" :key="`option_item_${status}`" class="feedback-label justify-content-center d-flex" :class="[`feedback-color-label ${status} clickable`]">{{ getTypeText(status) }}</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			showTypeChange: false,
			loading: false,
		};
	},
	computed: {
		...mapState(["shared"]),
		feedbackLabels() {
			return ["voting", "scheduled", "done", "closed"].filter((item) => item != this.type);
		},
	},
	methods: {
		openChangeType() {
			if (this.shared.is_admin) {
				this.showTypeChange = !this.showTypeChange;
			}
		},
		changeType(type) {
			this.loading = true;
			this.showTypeChange = false;
			axios
				.post("/feedbacks/change-type", { feedback_id: this.feedbackId, type: type })
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:type", type);
					}
				})
				.catch((err) => {
					this.toast(__.get("messages.save-error"));
				})
				.then(() => {
					this.loading = false;
				});
		},
		getTypeText(type) {
			return __.get(`feedbacks.${type}`);
		},
	},
	props: {
		type: {
			type: String,
			default: "voting",
		},
		feedbackId: {
			default: -1,
		},
	},
};
</script>