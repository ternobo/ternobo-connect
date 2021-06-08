<template>
	<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
		<div class="w-100" v-if="!edit">
			<div class="achievement-name detailed" v-if="detailed">
				<span class="title">
					{{ val.name }}
				</span>
				<div class="achievement-details" v-if="showDetails">
					<span v-if="Boolean(val.skill)">{{ val.skill.name }}</span>
					<span v-if="Boolean(val.from)">{{ val.from }}</span>
					<span v-if="Boolean(time_text)">{{ time_text }}</span>
				</div>
				<p class="achievement-description" v-if="val.description != null && val.description.length > 0">
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
				<div>
					<MaterialTextField v-model="val.name" maxlength="52" :required="true" class="material--sm" placeholder="عنوان"></MaterialTextField>
				</div>
				<div>
					<tselect :dir="appDirection" :items="page.skills" maxlength="52" labelOption="name" valueOption="name" v-model="val.skill" style="min-width: 234px">مرتبط با</tselect>
				</div>
				<div v-if="showMore">
					<strong>{{ __.get("user-profile.issue-date") }}</strong>
					<DatePicker class="mt-3" v-model="val.date" maxlength="52" :max="{ year: year, month: month }"></DatePicker>
				</div>
				<div class="d-flex align-items-end" v-if="showMore">
					<MaterialTextField v-model="val.from" maxlength="52" class="material--sm" :placeholder="__.get('user-profile.issuer')"></MaterialTextField>
				</div>
				<div class="col-md-12" v-if="showMore">
					<div class="d-flex align-items-center justify-content-between mb-3">
						<strong>{{ __.get("user-profile.description") }}</strong>
						<div class="character-counter">
							<span class="counter tex-dark">{{ leftCharacter }}</span>
							<div class="progress me-1 mb-0" style="width: 100px; height: 5px">
								<div class="progress-bar" role="progressbar" :style="{ width: progress }" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
						</div>
					</div>
					<textarea-autosize maxlength="1000" class="form-control" v-model="val.description"></textarea-autosize>
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
		showDetails() {
			let val = this.val;
			return Boolean(val.skill) || this.time_text.length > 0 || Boolean(val.from);
		},
		time_text() {
			let startText = "";
			if (typeof this.val.date == "object" && this.val.date != null) {
				startText = new PersianDate([this.val.date?.year, this.val.date?.month.id]).format("MMMM YYYY");
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
				id: null,
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
