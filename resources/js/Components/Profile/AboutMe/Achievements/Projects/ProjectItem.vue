<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="achievement-name detailed" v-if="detailed">
				<a class="title" :href="toURL(val.link)" v-if="val.link != null && val.link.length > 0" target="_blank">
					{{ val.name }}
				</a>
				<span class="title" v-else>
					{{ val.name }}
				</span>
				<div class="achievement-details" v-if="time_text.length > 0">
					<span>{{ time_text }}</span>
				</div>
				<p class="achievement-description" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<a :href="toURL(val.link)" v-if="val.link != null && val.link.length > 0" target="_blank">
					<strong>{{ val.name }} </strong>
				</a>
				<span v-else>
					<strong>{{ val.name }}</strong>
				</span>
			</div>
		</div>
		<div class="achievement-edit" v-else>
			<div class="actions-container">
				<div class="delete-move-actions">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
				</div>
				<show-more v-model="showMore" />
			</div>
			<div class="achievement-edit-row">
				<div class="col-md-12">
					<MaterialTextField v-model="val.name" maxlength="52" :required="true" input-class="w-75" class="material--sm" :placeholder="__.get('user-profile.project-name')"></MaterialTextField>
				</div>
				<div>
					<strong>{{ __.get("user-profile.start-date") }} <span class="text-action">*</span></strong>
					<DatePicker class="mt-3" v-model="val.startDate" :max="{ year: yearNow }"></DatePicker>
				</div>
				<div>
					<strong>{{ __.get("user-profile.end-date") }} <span class="text-action">*</span></strong>
					<DatePicker class="mt-3" :disabled="val.noEndDate" v-model="val.endDate" :noYearPlaceholder="__.get('validation.start_date_not_selected')" :minYear="val.startDate ? val.startDate.year : 1357" :max="{ year: year }"></DatePicker>
					<Checkbox class="mb-0" v-model="val.noEndDate"> {{ __.get("user-profile.currently-working-project") }} </Checkbox>
				</div>
				<div class="col-md-6" v-if="showMore">
					<MaterialTextField v-model="val.link" maxlength="52" class="material--sm" :placeholder="__.get('user-profile.project-url')"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
					<div class="d-flex align-items-center justify-content-between mb-3">
						<strong>{{ __.get("application.description") }}</strong>
						<div class="character-counter">
							<span class="counter tex-dark">{{ leftCharacter }}</span>
							<div class="progress me-1 mb-0" style="width: 100px; height: 5px">
								<div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
						</div>
					</div>
					<textarea-autosize maxlength="1000" class="form-control" v-model="val.description"></textarea-autosize>
				</div>
			</div>
			<!--
            Content Edit End
        !-->
		</div>
	</li>
</template>

<script>
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

import AchievementsItem from "../../../../../Mixins/AchievementsItem";
import ShowMore from "../ShowMore.vue";
export default {
	mixins: [AchievementsItem],
	created() {
		if (this.value) {
			this.val = {
				...this.val,
				...this.value,
			};
		}
	},
	watch: {
		val: {
			handler(newValue) {
				this.$emit("input", newValue);
				if (newValue.description != null) {
					this.progress = (newValue.description.length / 1000) * 100 + "%";
					this.leftCharacter = 1000 - newValue.description.length;
				}
			},
			deep: true,
		},
	},
	props: {
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
		value: {
			type: Object,
			default: null,
		},
		edit: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	components: {
		MaterialTextField,
		Checkbox,
		DatePicker,
		ShowMore,
	},
	computed: {
		time_text() {
			let startText = "";
			let endText = this.__.get("user-profile.present");
			if (Boolean(this.val.startDate)) {
				startText = this.formatTime(this.val.startDate, "YYYY MMMM");
			}

			if (!this.val.noEndDate) {
				endText = this.formatTime(this.val.endDate, "YYYY MMMM");
			}
			return (startText.length > 0 ? startText + " - " : "") + endText;
		},
		yearNow() {
			return this.currentYear();
		},
		month() {
			return this.currentMonth();
		},
		year() {
			return this.currentYear() + 5;
		},
	},
	data() {
		return {
			val: {
				id: null,
				name: "",
				skill: undefined,
				startDate: null,
				endDate: false,
				noEndDate: false,

				link: "",
				description: "",
			},

			showMore: false,
			leftCharacter: 1000,
			progress: 0,
		};
	},
};
</script>
