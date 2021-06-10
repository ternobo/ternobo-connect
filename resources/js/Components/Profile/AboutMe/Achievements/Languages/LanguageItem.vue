<template>
	<li :class="{ detailed: detailed }" v-if="value">
		<div class="language-name" v-if="!edit">
			<div class="d-flex" v-if="detailed">
				<span>
					{{ languageVal.name }}
				</span>

				<div class="ms-4 badge-blue">
					{{ languageVal.level.label }}
				</div>
			</div>
			<span v-else>
				{{ languageVal.name }}
			</span>
		</div>
		<div class="achievement-edit" v-else>
			<div class="actions-container">
				<div class="delete-move-actions">
					<i class="material-icons hand-hover">unfold_more</i>
					<i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
				</div>
			</div>
			<div class="achievement-edit-row">
				<div>
					<MaterialTextField placeholder="زبان" maxlength="52" :required="true" v-model="languageVal.name" class="material--sm w-100" input-class="w-100 py-1"></MaterialTextField>
				</div>
				<div>
					<tselect
						:dir="appDirection"
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
						>سطح <span class="text-action">*</span></tselect
					>
				</div>
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
		if (this.value) {
			this.languageVal = this.value;
		}
	},
	data() {
		return {
			languageVal: null,
		};
	},
	props: {
		value: {
			type: Object,
			default: undefined,
		},
	},
};
</script>
