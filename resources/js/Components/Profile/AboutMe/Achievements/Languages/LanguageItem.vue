<template>
	<li :class="{ detailed: detailed }" v-if="language != undefined">
		<div class="language-name" v-if="!edit">
			<div class="d-flex" v-if="detailed">
				<span>
					{{ languageVal.name }}
				</span>

				<div class="mr-4 badge-success">
					{{ language.level.label }}
				</div>
			</div>
			<span v-else>
				{{ languageVal.name }}
			</span>
		</div>
		<div class="editItem" v-else>
			<div class="actions mx-0" v-if="edit">
				<i class="material-icons hand-hover">unfold_more</i>
				<i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
			</div>
			<div class="language-edit-input">
				<MaterialTextField placeholder="زبان" :required="true" v-model="languageVal.name" class="material--sm w-100" input-class="w-100 py-1"></MaterialTextField>
				<v-select
					:searchable="false"
					class="datepicker-list"
					:placeholder="'تسلط'"
					dir="rtl"
					v-model="language.level"
					:options="[
						{
							label: 'مبتدی',
							level: 1,
						},
						{
							label: 'متوسط',
							level: 2,
						},
						{
							label: 'حرفه‌ای',
							level: 3,
						},
						{
							label: 'زبان مادری',
							level: 4,
						},
					]"
				>
					<template #no-options>موردی یافت نشد</template>
				</v-select>
			</div>
		</div>
	</li>
</template>

<script>
import RadioButton from "../../../../inputs/RadioButton";

import AchievementsItem from "../../../../../Mixins/AchievementsItem";
export default {
	mixins: [AchievementsItem],
	components: {
		RadioButton,
	},
	watch: {
		languageVal() {
			this.$emit("input", this.languageVal);
		},
	},
	methods: {
		doDelete() {
			this.$emit("deleted");
		},
	},
	created() {
		if (this.language != undefined && this.language != null) {
			this.languageVal = this.language;
		}
	},
	data() {
		return {
			languageVal: null,
		};
	},
	props: {
		language: {
			type: Object,
			default: undefined,
		},
	},
};
</script>
