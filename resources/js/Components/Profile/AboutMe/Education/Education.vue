<template>
	<div class="education">
		<div class="actions" v-if="edit && $root.isDesktop">
			<i class="material-icons hand-hover">unfold_more</i>
			<i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
		</div>
		<div class="detail">
			<div class="d-flex align-items-center flex-column ml-3" v-if="edit || $root.isDesktop">
				<lazy-image src="/images/school-profile.png" class="about-me--picture mb-2" v-if="$root.isDesktop" img-class="about-me--picture" />
				<button class="btn font-12 ml-1 follow-btn" @click="showMore = !showMore" v-if="edit && $root.isDesktop">
					{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
				</button>
			</div>
			<div class="w-100" v-if="!edit">
				<div class="about-me--company-info" v-if="!$root.isDesktop">
					<lazy-image src="/images/school-profile.png" class="about-me--picture--mobile mb-0" img-class="about-me--picture" />
					<div>
						<strong class="about-me--title">{{ val.school }}</strong>
						<div class="about-me--subtitle">
							<span class="degree bold"> {{ val.degree }} </span>
							<span class="degree"> {{ val.major }} </span>
						</div>
						<div class="about-me--subtitle">
							<span> {{ time_text }} </span>
						</div>
					</div>
				</div>
				<div v-else>
					<strong class="about-me--title">{{ val.school }}</strong>
					<div class="about-me--subtitle">
						<span class="degree bold"> {{ val.degree }} </span>
						<span class="degree"> {{ val.major }} </span>
					</div>
					<div class="about-me--subtitle">
						<span> {{ time_text }} </span>
					</div>
				</div>
				<p class="edu-description my-2" v-if="val.description != null && val.description.length > 0" :class="{ open: showMore }">
					{{ val.description }}
				</p>
				<p class="edu-description my-2" v-if="val.activities != null && val.activities.length > 0 && showMore">
					{{ val.activities }}
				</p>
				<span class="show--more" v-if="val.description != null && val.description.length > 468" @click="showMore = !showMore">مشاهده {{ showMore ? "کمتر" : "بیشتر ..." }}</span>
			</div>
			<div class="row w-100 m-0" v-else>
				<div class="w-100 d-flex justify-content-between align-content-end mb-2" v-if="!$root.isDesktop">
					<div class="actions">
						<i class="material-icons hand-hover">unfold_more</i>
						<i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
					</div>

					<lazy-image src="/images/company-profile.png" class="about-me--picture--mobile mb-0" img-class="about-me--picture" />

					<span class="font-10 d-flex align-items-end text-action" @click="showMore = !showMore">
						{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
					</span>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<MaterialTextField v-model="val.school" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="محل تحصیل"></MaterialTextField>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<MaterialTextField v-model="val.degree" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="مدرک تحصیلی"></MaterialTextField>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<MaterialTextField v-model="val.major" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="رشته تحصیلی"></MaterialTextField>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<MaterialTextField v-model="val.grade" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="معدل"></MaterialTextField>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<strong>تاریخ شروع <span class="text-action">*</span></strong>
					<DatePicker :hide-month="true" v-model="val.startDate" :max="{ year: year }"></DatePicker>
				</div>
				<div class="col-md-6" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }">
					<strong>تاریخ پایان <span class="text-action">*</span></strong>
					<DatePicker :hide-month="true" v-if="typeof val.endDate !== 'boolean' || val.endDate == false" v-model="val.endDate" :minYear="val.startDate ? val.startDate.year : 1357" :max="{ year: year }"></DatePicker>
					<input v-else type="text" readonly value="تا کنون" class="form-control w-75 bg-white" />
					<Checkbox v-model="val.endDate"> درحال تحصیل هستم </Checkbox>
				</div>
				<div class="col-md-12" :class="{ 'py-4': $root.isDesktop, 'py-2': !$root.isDesktop }" v-if="showMore">
					<strong>انجمن‌ها و فعالیت‌ها</strong>
					<div class="character-counter">
						<span class="counter tex-dark">{{ leftCharacterActivities }}</span>
						<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
							<div class="progress-bar" role="progressbar" :style="{ width: progressActivity }" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
					<textarea-autosize maxlength="500" class="form-control" v-model="val.activities"></textarea-autosize>
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
		</div>
	</div>
</template>

<script>
import PersianDate from "persian-date";
import DatePicker from "../../../inputs/DatePicker";
import MaterialTextField from "../../../inputs/MaterialTextField";
import Checkbox from "../../../inputs/Checkbox";

export default {
	created() {
		if (this.value.school) {
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

				if (newValue.activities != null) {
					this.progressActivity = (newValue.activities.length / 500) * 100 + "%";
					this.leftCharacterActivities = 500 - newValue.activities.length;
				}
			},
			deep: true,
		},
	},
	props: {
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
		time_text() {
			let startText = "";
			let endText = "تا کنون";
			if (this.val.startDate) {
				startText = new PersianDate([this.val.startDate.year]).format("YYYY");
			}

			if (typeof this.val.endDate == "object") {
				endText = new PersianDate([this.val.endDate.year]).format("YYYY");
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
			val: {
				id: "education_" + Math.round(new Date().getTime()),
				school: "",
				degree: "",
				major: "",
				grade: undefined,
				startDate: null,
				endDate: null,
				activities: "",
				description: "",
			},

			showMore: false,
			leftCharacter: 1000,
			leftCharacterActivities: 500,
			progressActivity: 0,
			progress: 0,
		};
	},
};
</script>
