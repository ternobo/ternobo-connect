<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="d-flex justify-content-start" v-if="detailed">
				<div class="title">
					<a :href="val.link" v-if="val.link != null && val.link.length > 0">
						<strong>{{ val.name }}</strong>
					</a>
					<span v-else>
						<strong>{{ val.name }}</strong>
					</span>
					<span class="font-12 text-muted">{{ time_text }}</span>
				</div>
				<p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<a :href="val.link" v-if="val.link != null && val.link.length > 0">
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
					<MaterialTextField v-model="val.name" :required="true" input-class="w-75" class="material--sm" placeholder="نام پروژه"></MaterialTextField>
				</div>
				<div>
					<strong>تاریخ شروع <span class="text-action">*</span></strong>
					<DatePicker class="mt-3" v-model="val.startDate" :max="{ year: year }"></DatePicker>
				</div>
				<div>
					<strong>تاریخ پایان <span class="text-action">*</span></strong>
					<DatePicker class="mt-3" :disabled="noEndDate" v-model="val.endDate" :minYear="val.startDate ? val.startDate.year : 1357" :max="{ year: year }"></DatePicker>
					<Checkbox class="mb-0" v-model="noEndDate"> همچنان در حال کار بر روی این پروژه هستم </Checkbox>
				</div>
				<div class="col-md-6" v-if="showMore">
					<MaterialTextField v-model="val.link" class="material--sm" placeholder="لینک پروژه"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
					<strong>توضیحات</strong>
					<div class="character-counter">
						<span class="counter tex-dark">{{ leftCharacter }}</span>
						<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
							<div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
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
import PersianDate from "persian-date";
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

import AchievementsItem from "../../../../../Mixins/AchievementsItem";
import ShowMore from "../ShowMore.vue";
export default {
	mixins: [AchievementsItem],
	created() {
		if (this.value.name) {
			this.val = this.value;
			if (typeof this.val.endDate == "boolean" || !this.val.endDate.year) {
				this.val.endDate = true;
				this.noEndDate = true;
			}
		}
	},
	watch: {
		val: {
			handler(newValue) {
				if (typeof this.val.endDate == "boolean" || !this.val.endDate.year) {
					this.val.endDate = true;
					this.noEndDate = true;
				}
				this.$emit("input", newValue);

				if (newValue.description != null) {
					this.progress = (newValue.description.length / 1000) * 100 + "%";
					this.leftCharacter = 1000 - newValue.description.length;
				}
			},
			deep: true,
		},
		noEndDate() {
			if (this.noEndDate) {
				this.val.endDate = true;
			}
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
			let endText = "تا کنون";
			if (typeof this.val.startDate == "object") {
				startText = new PersianDate([this.val.startDate.year, this.val.startDate.month.id]).format("MMMM YYYY");
			}

			if (typeof this.val.endDate == "object") {
				endText = new PersianDate([this.val.endDate.year, this.val.endDate.month.id]).format("MMMM YYYY");
			}
			return (startText.length > 0 ? startText + " - " : "") + endText;
		},
		now() {
			return new PersianDate(new Date()).toLocale("en").format("L");
		},
		year() {
			return new PersianDate().year() + 5;
		},
	},
	data() {
		return {
			noEndDate: false,
			val: {
				name: "",
				skill: undefined,
				startDate: null,
				endDate: false,

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
