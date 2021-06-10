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
				<div class="achievement-details">
					<span v-if="time_text.length > 0">{{ time_text }}</span>
					<span> {{ val.organization }} - {{ val.registerCode }} </span>
					<span v-if="val.status">{{ val.status.label }}</span>
				</div>
				<p class="achievement-description" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<a class="title" :href="toURL(val.link)" v-if="val.link != null && val.link.length > 0" target="_blank">
					{{ val.name }}
				</a>
				<span class="title" v-else>
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
					<MaterialTextField v-model="val.name" maxlength="52" :required="true" class="material--sm" placeholder="نام اختراع"></MaterialTextField>
				</div>
				<div>
					<tselect :items="countries" :required="true" maxlength="52" :dir="appDirection" v-model="val.organization" style="min-width: 234px">اداره ثبت اختراع</tselect>
				</div>
				<div>
					<MaterialTextField v-model="val.registerCode" maxlength="52" :required="true" class="material--sm" placeholder="شماره ثبت"></MaterialTextField>
				</div>
				<div v-if="showMore">
					<MaterialTextField v-model="val.link" maxlength="52" class="material--sm" placeholder="لینک ثبت اختراع"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
					<tselect
						:dir="appDirection"
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
					<DatePicker class="mt-2" v-model="val.date" :max="{ year: year, month: month }"></DatePicker>
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
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

import AchievementsItem from "../../../../../Mixins/AchievementsItem";
import ShowMore from "../ShowMore.vue";
import Tselect from "../../../../Tselect.vue";
import CountriesFa from "../../../../../Libs/Countries-fa";
import CountriesEn from "../../../../../Libs/Countries-en";

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
		countries() {
			if (lang == "en") {
				return CountriesEn;
			}
			return CountriesFa.map((item) => item.fa_name);
		},
		time_text() {
			return this.formatTime(this.date, "YYYY MMMM");
		},
		month() {
			return this.currentMonth();
		},
		year() {
			return this.currentYear();
		},
	},
	data() {
		return {
			val: {
				id: null,
				name: "",
				organization: "",
				registerCode: "",
				link: "",
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
