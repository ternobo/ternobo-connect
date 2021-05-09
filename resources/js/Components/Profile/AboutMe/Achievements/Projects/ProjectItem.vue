<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="d-flex justify-content-start" v-if="detailed">
				<div class="title">
					<a :href="val.link" v-if="val.link != null && val.link.length > 0"
						><strong>{{ val.name }}</strong></a
					>
					<span v-else
						><strong>{{ val.name }}</strong></span
					>
					<span class="font-12 text-muted">{{ time_text }}</span>
				</div>
				<p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<a :href="val.link" v-if="val.link != null && val.link.length > 0"
					><strong>{{ val.name }}</strong></a
				>
				<span v-else
					><strong>{{ val.name }}</strong></span
				>
			</div>
		</div>
		<div class="editItem" v-else>
			<div class="d-flex flex-column align-items-center ml-3" v-if="edit && $root.isDesktop">
				<div class="actions mx-0">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
				</div>
				<button class="mt-2 btn font-12 ml-1 follow-btn" @click="showMore = !showMore">
					{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
				</button>
			</div>

			<!--
            Content Edit
        !-->
			<div class="row w-100">
				<div class="col-md-12" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<div class="d-flex align-items-center w-100">
						<div class="ml-2" v-if="!$root.isDesktop">
							<div class="actions mx-0">
								<i class="material-icons hand-hover">unfold_more</i>
								<i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
							</div>
							<span class="mt-2 font-10 text-action clickable" @click="showMore = !showMore">
								{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
							</span>
						</div>
						<MaterialTextField v-model="val.name" :required="true" input-class="w-100" class="d-flex align-items-center material--sm p-0 col-md-6" placeholder="نام پروژه"></MaterialTextField>
					</div>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<strong>تاریخ شروع <span class="text-action">*</span></strong>
					<DatePicker v-model="val.startDate" :max="{ year: year }"></DatePicker>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<strong>تاریخ پایان <span class="text-action">*</span></strong>
					<DatePicker v-if="!noEndDate" v-model="val.endDate" :minYear="val.startDate ? val.startDate.year : 1357" :max="{ year: year }"></DatePicker>
					<input v-else type="text" readonly value="تا کنون" class="form-control w-75 bg-white" />
					<Checkbox v-model="noEndDate"> همچنان در حال کار بر روی این پروژه هستم </Checkbox>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }" v-if="showMore">
					<v-select :searchable="false" :placeholder="'مرتبط با'" class="datepicker-list w-75" dir="rtl" v-model="val.skill" :options="relatedTo">
						<template #open-indicator="{ attributes }">
							<span v-bind="attributes">
								<i class="material-icons">keyboard_arrow_down</i>
							</span>
						</template>
						<template #no-options>موردی یافت نشد</template>
					</v-select>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }" v-if="showMore">
					<MaterialTextField v-model="val.link" class="d-flex align-items-center material--sm" placeholder="لینک پروژه"></MaterialTextField>
				</div>
				<div class="col-md-12" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }" v-if="showMore">
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
export default {
	mixins: [AchievementsItem],
	created() {
		if (this.value.name) {
			this.val = this.value;
			if (this.val.endDate == true) {
				this.noEndDate = true;
			}
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
	},
	computed: {
		relatedTo() {
			let experience = this.page.about_data.experiences;
			let computed = [];
			experience.forEach((item, index) => {
				computed.push(item.title + " در " + item.company);
			});
			computed.push("دیگر");
			return computed;
		},
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
