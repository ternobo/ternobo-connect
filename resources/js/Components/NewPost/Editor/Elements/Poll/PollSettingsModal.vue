<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer ignore-enforce-focus-selector=".vpd-counter input" header-class="back-modal" body-class="poll-modal-body" :modal-class="{ 'opacity-0': showDatepicker }" :title="__.get('editor.poll-modal-title')" size="md" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<div class="question-container mb-5">
			<div class="poll-question-titlemb-3">
				<strong class="font-18">{{ __.get("editor.poll-modal-question") }}</strong>
			</div>
			<div class="poll-question-title">
				<text-length-progress :text="question" :maxlength="140" />
			</div>
			<input type="text" maxlength="140" class="form-control" v-model="question" :placeholder="__.get('editor.poll-modal-question-ph')" />
		</div>

		<div class="poll-options">
			<strong class="poll-options-title">{{ __.get("editor.poll-modal-options") }}</strong>
			<ul>
				<li class="poll-option" v-for="(option, index) in options" :key="`item_id_${option.id}`">
					<div class="poll-question-title">
						<text-length-progress :text="options[index].text" :maxlength="40" />
					</div>
					<div class="poll-option-input-group">
						<span class="marker">{{ index + 1 }}.</span>
						<input type="text" class="form-control" maxlength="40" v-model="options[index].text" :placeholder="__.get('editor.poll-modal-question-ph')" />
					</div>
				</li>
			</ul>
			<div class="d-flex align-items-center mt-6">
				<button class="btn btn-secondary rounded-4 btn-icon me-3" :disabled="options.length >= 5" @click="addOption"><i class="material-icons">add</i></button>
				<button class="btn btn-icon hover-danger btn-text" @click="deleteOption" v-if="canDelete"><i class="material-icons-outlined">delete</i></button>
			</div>

			<div class="d-flex align-items-center mt-5 mb-3">
				<checkbox v-model="enableDatePicker" class="m-0">
					<strong class="font-18 text-dark">{{ __.get("editor.poll-duration") }}</strong>
				</checkbox>
			</div>

			<button class="btn btn-text-cta" :disabled="!enableDatePicker" @click="showDatepicker = true">
				<i class="material-icons-outlined font-20 me-2">date_range</i>
				<span v-if="expiredAt != null">{{ expireDateToShow }}</span>
				<span class="font-size-sm font-demibold" v-else>{{ __.get("editor.poll-duration-ph") }}</span>
			</button>

			<input hidden v-model="expiredAt" id="poll-enddate-input" />
			<date-picker :showNowBtn="false" :show="showDatepicker" append-to="body" element="poll-enddate-input" @close="showDatepicker = false" v-model="expiredAt" format="YYYY/MM/DD HH:mm" :locale="shared.locale" :min="minDate" compact-time type="datetime" color="#FFF">
				<i slot="next-month" class="material-icons-outlined">keyboard_arrow_right</i>
				<i slot="prev-month" class="material-icons-outlined">keyboard_arrow_left</i>

				<template v-slot:close-btn>
					<i class="material-icons-outlined">close</i>
				</template>

				<template v-slot:header-date>
					{{ __.get("editor.poll-duration") }}
				</template>
			</date-picker>
		</div>
		<modal-footer-buttons :showCancel="false" @ok="save" @cancel="$emit('update:show', false)" class="mt-8" :okLoading="false" :okText="__.get('application.save')" :cancelText="__.get('application.cancel')" cancelClass="btn-text" :okDisabled="!canSave" okClass="btn-primary" />
	</b-modal>
</template>

<script>
import ModalMixin from "../../../../../Mixins/Modal";
import TextLengthProgress from "../../../../TextLengthProgress.vue";
import { v4 as uuidv4 } from "uuid";
import ModalFooterButtons from "../../../../Modals/ModalFooterButtons.vue";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import { mapState } from "vuex";
import Checkbox from "../../../../inputs/Checkbox.vue";

export default {
	components: { TextLengthProgress, ModalFooterButtons, datePicker: VuePersianDatetimePicker, Checkbox },
	mixins: [ModalMixin],
	name: "PollSettingsModal",
	methods: {
		addOption() {
			if (this.options.length < 5) {
				this.options.push({ id: uuidv4(), text: "" });
			}
		},
		deleteOption() {
			if (this.options.length > 2) {
				this.options.splice(this.options.length - 1, 1);
			}
		},
		save() {
			this.$emit("update:poll", {
				question: this.question,
				options: this.options,
				expiredAt: this.expiredAt,
			});
			this.$emit("update:show", false);
		},
		onShow() {
			if (this.poll != null) {
				this.question = this.poll.question;
				this.options = this.poll.options;
				this.expiredAt = this.poll.expiredAt;
			}
		},
	},
	computed: {
		...mapState(["shared"]),
		canDelete() {
			return this.options.length > 2;
		},
		canSave() {
			return this.options.filter((item) => item.text.length < 1).length == 0 && this.question.length > 0;
		},
		expireDateToShow() {
			return moment(this.expiredAt).locale(this.shared.locale).format("YYYY MMMM DD HH:mm");
		},
	},

	props: ["poll"],
	data() {
		return {
			minDate: this.getFormatedDateTime(),

			showDatepicker: false,

			question: "",
			expiredAt: null,

			enableDatePicker: false,

			options: [
				{ id: 1, text: "" },
				{ id: 2, text: "" },
			],
		};
	},
};
</script>


<style>
.vpd-wrapper {
	background: transparent !important;
}
.vpd-actions button {
	font-family: "Vazir", "Open Sans";
}
</style>