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
					<MaterialTextField :placeholder="__.choice('user-profile.language', 1)" maxlength="52" :required="true" v-model="languageVal.name" class="material--sm w-100" input-class="w-100 py-1"></MaterialTextField>
				</div>
				<div>
					<tselect :dir="appDirection" :items="languageItems" v-model="languageVal.level" labelOption="label" valueOption="level"> {{ __.get("user-profile.proficiency") }} <span class="text-action">*</span> </tselect>
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
	computed: {
		languageItems() {
			return [
				{
					label: __.get("user-profile.elementary"),
					level: 1,
				},
				{
					label: __.get("user-profile.limited-working"),
					level: 2,
				},
				{
					label: __.get("user-profile.full-professional"),
					level: 3,
				},
				{
					label: __.get("user-profile.native"),
					level: 4,
				},
			];
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
			if (this.languageVal != null && this.languageVal.level != null) {
				this.languageVal.level = this.languageItems.filter((iterator) => iterator.level == this.languageVal.level.level)[0];
			}
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
