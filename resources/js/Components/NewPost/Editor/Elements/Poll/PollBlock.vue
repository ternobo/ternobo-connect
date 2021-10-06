<template>
	<div class="poll-block-container">
		<poll-settings-modal :show.sync="showModal"></poll-settings-modal>
		<div class="poll-not-setuped">
			<h3 class="mb-5">{{ __.get("editor.poll-setup-title") }}</h3>
			<button class="btn btn-outlined btn-rounded" @click="showModal = true">{{ __.get("editor.poll-setup-button") }}</button>
		</div>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import PollSettingsModal from "./PollSettingsModal.vue";
export default {
	components: { PollSettingsModal },
	methods: {
		...mapMutations(["showNewPostModal", "hideNewPostModal"]),
	},
	watch: {
		showModal() {
			if (this.showModal) {
				this.hideNewPostModal();
			} else {
				this.showNewPostModal();
			}
		},
	},
	data() {
		return {
			showModal: false,
		};
	},
};
</script>

<style>
</style>