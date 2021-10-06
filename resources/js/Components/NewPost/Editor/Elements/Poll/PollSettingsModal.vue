<template>
	<b-modal v-model="showModal" hide-footer header-class="back-modal" body-class="poll-modal-body" :title="__.get('editor.poll-modal-title')" size="md" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<div class="question-container mb-4">
			<div class="poll-question-title">
				<strong>{{ __.get("editor.poll-modal-question") }}</strong>
				<text-length-progress :text="question" :maxlength="140" />
			</div>
			<input type="text" class="form-control" v-model="question" :placeholder="__.get('editor.poll-modal-question-ph')" />
		</div>

		<div class="poll-options">
			<strong class="poll-options-title">{{ __.get("editor.poll-modal-options") }}</strong>
			<ul>
				<li class="poll-option" v-for="(option, index) in options" :key="`item_id_${option.id}`">
					<div class="poll-question-title">
						<span></span>
						<text-length-progress :text="options[index].text" :maxlength="140" />
					</div>
					<div class="poll-option-input-group">
						<span class="marker">{{ marker[index] }}.</span>
						<input type="text" class="form-control" v-model="options[index].text" :placeholder="__.get('editor.poll-modal-question-ph')" />
					</div>
				</li>
			</ul>
			<div class="d-flex align-items-center mt-6">
				<button class="btn btn-secondary btn-icon me-3" @click="addOption"><i class="material-icons">add</i></button>
				<button class="btn btn-icon hover-danger btn-text" @click="deleteOption"><i class="material-icons-outlined">delete</i></button>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../../../Mixins/Modal";
import TextLengthProgress from "../../../../TextLengthProgress.vue";
import { v4 as uuidv4 } from "uuid";

export default {
	components: { TextLengthProgress },
	mixins: [ModalMixin],
	name: "PollSettingsModal",
	methods: {
		addOption() {
			this.options.push({ id: uuidv4(), text: "" });
		},
		deleteOption() {
			if (this.options.length > 1) {
				this.options.splice(this.options.length - 1, 1);
			}
		},
	},
	data() {
		return {
			question: "",

			marker: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],

			options: [{ id: 1, text: "" }],
		};
	},
};
</script>
