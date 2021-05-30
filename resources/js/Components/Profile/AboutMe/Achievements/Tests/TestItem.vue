<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="achievement-name detailed" v-if="detailed">
				<span class="title">
					{{ val.name }}
				</span>
				<div class="achievement-details">
					<span v-if="time_text.length > 0">{{ time_text }}</span>
					<span style="width: max-content" v-if="val.score && val.score.length > 0">
						<div style="width: max-content" class="badge-blue">
							<span>{{ val.score }}</span>
						</div>
					</span>
					<span v-if="val.skill">{{ val.skill.name }}</span>
				</div>
				<p class="achievement-description" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<span>
					{{ val.name }}
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
				<div>
					<MaterialTextField v-model="val.name" maxlength="52" :required="true" class="material--sm" placeholder="عنوان"></MaterialTextField>
				</div>
				<div>
					<tselect dir="rtl" v-model="val.skill" maxlength="52" :items="page.skills" style="min-width: 234px">مرتبط با</tselect>
				</div>
				<div v-if="showMore">
					<strong>تاریخ آزمون</strong>
					<DatePicker class="mt-3" v-model="val.date" :max="{ year: year, month: month }"></DatePicker>
				</div>
				<div class="d-flex align-items-end" v-if="showMore">
					<MaterialTextField v-model="val.score" maxlength="15" class="material--sm" placeholder="نمره"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
					<div class="d-flex align-items-center justify-content-between mb-3">
						<strong>توضیحات</strong>
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
import Tselect from "../../../../Tselect.vue";
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
		Tselect,
	},
	computed: {
		showDetails() {
			let val = this.val;
			return Boolean(val.skill) || Boolean(val.score);
		},
		time_text() {
			let dateText = "";
			if (typeof this.val.date == "object" && this.val.date != null) {
				dateText = new PersianDate([this.val.date.year, this.val.date.month.id]).format("MMMM YYYY");
			}
			return dateText;
		},
		now() {
			return new PersianDate(new Date()).toLocale("en").format("L");
		},
		month() {
			return new PersianDate().month();
		},
		year() {
			return new PersianDate().year();
		},
	},
	data() {
		return {
			val: {
				id: null,
				name: "",
				skill: null,
				date: null,
				score: null,
				description: "",
			},

			showMore: false,
			leftCharacter: 1000,
			progress: 0,
		};
	},
};
</script>
