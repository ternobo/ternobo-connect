<template>
	<li class="achievement">
		<div class="w-100" v-if="!edit">
			<div class="d-flex justify-content-start" v-if="detailed">
				<div class="title">
					<a :href="val.link" v-if="val.link != null && val.link.length > 0" target="_blank"> </a>
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
					<MaterialTextField v-model="val.name" :required="true" inputClass="w-100" class="material--sm" placeholder="عنوان"></MaterialTextField>
				</div>
				<div>
					<MaterialTextField v-model="val.publisher" inputClass="w-100" class="material--sm" placeholder="نام ناشر"></MaterialTextField>
				</div>
				<div>
					<strong>تاریخ انتشار <span class="text-action">*</span></strong>
					<DatePicker class="mt-3" v-model="val.date" :max="{ year: year, month: month }"></DatePicker>
				</div>
				<div class="col-md-6 d-flex align-items-end" v-if="showMore">
					<MaterialTextField v-model="val.link" class="material--sm" placeholder="لینک ناشر"></MaterialTextField>
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
					<textarea-autosize class="form-control" v-model="val.description"></textarea-autosize>
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
import ShowMore from "../ShowMore.vue";

export default {
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
					this.progress = (newValue.description.length / 2500) * 100 + "%";
					this.leftCharacter = 2500 - newValue.description.length;
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
		detailed: {
			type: Boolean,
			default: false,
			required: false,
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
			if (this.val.startDate) {
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
				publisher: undefined,
				date: null,
				link: "",
				description: "",
			},

			showMore: false,
			leftCharacter: 2500,
			progress: 0,
		};
	},
};
</script>
