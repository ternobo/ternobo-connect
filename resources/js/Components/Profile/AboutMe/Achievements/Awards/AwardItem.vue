<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="d-flex justify-content-start" v-if="detailed">
				<div class="title">
					<span>
						<strong>{{ val.name }}</strong>
					</span>
					<span v-if="val.from != null && val.from.length > 0" class="text-muted">{{ val.from }}</span>
					<span class="font-12 text-muted">{{ time_text }}</span>
					<span v-if="val.skill != null && val.skill.name != undefined && val.skill != null" class="text-muted">
						<strong>{{ val.skill.name }}</strong>
					</span>
				</div>
				<p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
					{{ val.description }}
				</p>
			</div>
			<div class="achievement-name" v-else>
				<span>
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
					<MaterialTextField v-model="val.name" :required="true" class="material--sm" placeholder="عنوان"></MaterialTextField>
				</div>
				<div v-if="showMore">
					<strong>تاریخ صدور</strong>
					<DatePicker class="mt-3" v-model="val.startDate" :max="{ year: year, month: month }"></DatePicker>
				</div>
				<div class="d-flex align-items-end" v-if="showMore">
					<MaterialTextField v-model="val.from" class="material--sm" placeholder="صادر کننده"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
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
import ShowMore from "../ShowMore.vue";
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
