<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="d-flex justify-content-start" v-if="detailed">
				<div class="title">
					<span
						><strong>{{ val.name }}</strong></span
					>
					<span v-if="val.from != null && val.from.length > 0" class="text-muted">{{ val.from }}</span>
					<span class="font-12 text-muted">{{ time_text }}</span>
					<span v-if="val.skill != null && val.skill.name != undefined && val.skill != null" class="text-muted"
						><strong>{{ val.skill.name }}</strong>
					</span>
				</div>
				<p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<span
					><strong>{{ val.name }}</strong></span
				>
			</div>
		</div>
		<div class="editItem" v-else>
			<div class="d-flex flex-column align-items-center ml-3" v-if="$root.isDesktop">
				<div class="actions mx-0" v-if="edit">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
				</div>
				<button class="mt-2 btn font-12 ml-1 follow-btn" v-if="$root.isDesktop" @click="showMore = !showMore">
					{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
				</button>
				<span v-else class="text-action clickable font-10 mt-2" @click="showMore = !showMore">
					{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
				</span>
			</div>

			<!--
            Content Edit
        !-->
			<div class="row w-100 m-0">
				<div class="col-md-6 py-4">
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
						<MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="عنوان"></MaterialTextField>
					</div>
				</div>

				<!--
                More Content
             !-->
				<div class="col-md-6 py-4" v-if="showMore">
					<v-select :placeholder="'مرتبط با'" class="datepicker-list w-75" dir="rtl" v-model="val.skill" label="name" :options="page.user.skills">
						<template #open-indicator="{ attributes }">
							<span v-bind="attributes">
								<i class="material-icons">keyboard_arrow_down</i>
							</span>
						</template>
						<template #no-options>موردی یافت نشد</template>
					</v-select>
				</div>
				<div class="col-md-6 py-4" v-if="showMore">
					<MaterialTextField v-model="val.from" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="صادر کننده"></MaterialTextField>
				</div>
				<div class="col-md-6 py-4" v-if="showMore">
					<strong>تاریخ صدور</strong>
					<DatePicker v-model="val.startDate" :max="{ year: year, month: month }"></DatePicker>
				</div>
				<div class="col-md-12 py-4" v-if="showMore">
					<strong>توضیحات</strong>
					<div class="character-counter">
						<span class="counter tex-dark">{{ leftCharacter }}</span>
						<div class="progress ml-1 mb-0" style="width: 100px; height: 5px">
							<div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
					<textarea-autosize maxlenth="1000" class="form-control" v-model="val.description"></textarea-autosize>
				</div>
				<!--
                End More Content
            !-->
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
	},
	computed: {
		time_text() {
			let startText = "";
			if (typeof this.val.startDate == "object") {
				startText = new PersianDate([this.val.startDate.year, this.val.startDate.month.id]).format("MMMM YYYY");
			}
			return startText;
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
				skill: null,
				from: null,
				date: null,
				link: null,
				description: "",
			},

			showMore: false,
			leftCharacter: 1000,
			progress: 0,
		};
	},
};
</script>
