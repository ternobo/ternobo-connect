<template>
	<div class="poll-block-container">
		<poll-settings-modal :poll.sync="poll" :show.sync="showModal"></poll-settings-modal>
		<div class="poll-not-setuped" v-if="poll == null">
			<h3 class="mb-5">{{ __.get("editor.poll-setup-title") }}</h3>
			<button class="btn btn-outlined btn-rounded" @click="showModal = true">{{ __.get("editor.poll-setup-button") }}</button>
		</div>
		<poll-preview :poll="poll" v-else></poll-preview>
		<button v-if="poll != null && !poll.id" @click="showModal = true" class="edit-poll btn btn-icon btn-outlined"><i class="material-icons-outlined">edit</i></button>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import PollPreview from "./PollPreview.vue";
import PollSettingsModal from "./PollSettingsModal.vue";
export default {
	components: { PollSettingsModal, PollPreview },
	methods: {
		...mapMutations(["showNewPostModal", "hideNewPostModal"]),
	},
	mounted() {
		if (this.content) {
			this.poll = typeof this.content == "string" ? JSON.parse(this.content) : this.content;
			if (this.poll.id) {
				this.$emit("update:meta", { poll_id: this.poll.id });
			}
		}
	},
	props: ["content"],
	watch: {
		poll() {
			this.$emit("update:content", this.poll);
		},
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
			poll: null,
			showModal: false,
		};
	},
};
</script>

<style>
</style>