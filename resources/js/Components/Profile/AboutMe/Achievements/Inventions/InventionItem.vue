<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="d-flex justify-content-start" v-if="detailed">
				<div class="title">
					<a :href="val.link" v-if="val.link != null && val.link.length > 0" target="_blank">
						<strong>{{ val.name }}</strong>
					</a>
					<span v-else>
						<strong>{{ val.name }}</strong>
					</span>
					<span class="font-12 text-muted">{{ time_text }}</span>
					<span class="font-12 text-muted">{{ val.organization }} | {{ val.registerCode }}</span>
					<span class="font-12 text-muted">{{ val.organization }} | {{ val.status.label }}</span>
				</div>
				<p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<a :href="val.link" v-if="val.link != null && val.link.length > 0" target="_blank">
					<strong>{{ val.name }}</strong>
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
				<div>
					<MaterialTextField v-model="val.name" :required="true" class="material--sm" placeholder="نام اختراع"></MaterialTextField>
				</div>
				<div>
					<tselect :items="countries" dir="rtl" v-model="val.organization" style="min-width: 234px">اداره ثبت اختراع</tselect>
				</div>
				<div>
					<MaterialTextField v-model="val.registerCode" :required="true" class="material--sm" placeholder="شماره ثبت"></MaterialTextField>
				</div>
				<div v-if="showMore">
					<MaterialTextField v-model="val.link" class="material--sm" placeholder="لینک ثبت اختراع"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
					<tselect
						dir="rtl"
						style="min-width: 260px"
						v-model="val.status"
						labelOption="label"
						valueOption="id"
						:items="[
							{
								label: 'حق ثبت اختراع صادر شده',
								id: 1,
							},
							{
								label: 'حق ثبت اختراع درحال ثبت شدن است',
								id: 2,
							},
						]"
					>
						وضعیت
					</tselect>
				</div>
				<div v-if="showMore">
					<strong>تاریخ صدور ثبت اختراع</strong>
					<DatePicker class="mt-2" :showDays="true" v-model="val.date" :max="{ year: year, month: month }"></DatePicker>
				</div>
				<div class="col-md-12" v-if="showMore">
					<div class="d-flex align-items-center justify-content-between mb-3">
						<strong>توضیحات</strong>
						<div class="character-counter">
							<span class="counter tex-dark">{{ leftCharacter }}</span>
							<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
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
import CountriesFa from "../../../../../Libs/Countries-fa";

export default {
	mixins: [AchievementsItem],
	created() {
		if (this.value.name) {
			this.val = this.value;
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
		countries() {
			return CountriesFa.map((item) => item.fa_name);
		},
		time_text() {
			let dateText = "";
			if (typeof this.val.date == "object") {
				dateText = new PersianDate([this.val.date.year, this.val.date.month.id, this.val.date.day]).format("d MMMM YYYY");
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
				name: "",
				organization: null,
				registerCode: null,
				link: null,
				status: null,
				date: null,
				description: "",
			},

			showMore: false,
			leftCharacter: 1000,
			progress: 0,
		};
	},
};
</script>
