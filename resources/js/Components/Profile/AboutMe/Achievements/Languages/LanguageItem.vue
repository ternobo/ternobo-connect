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
		<div class="achievement-edit-row" v-else>
			<div>
				<div class="delete-move-actions">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
				</div>
			</div>
			<div>
				<MaterialTextField placeholder="زبان" :required="true" v-model="languageVal.name" class="material--sm w-100" input-class="w-100 py-1"></MaterialTextField>
			</div>
			<div>
				<tselect
					dir="rtl"
					:items="[
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
					v-model="languageVal.level"
					labelOption="label"
					valueOption="level"
					>سطح</tselect
				>
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
