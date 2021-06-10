<template>
	<div class="achievement-item" v-if="awards.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.choice("user-profile.award", 2) }}</h2>
				<div class="ms-2 badge-light">{{ awards.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="awards-list p-0" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="awards" ref="draggable" tag="ul" v-bind="dragOptions" v-model="awards" class="achievement-list" :disabled="!edit" handle=".hand-hover">
			<AwardItem :detailed="open" :class="{ 'edit w-100': edit }" @deleted="onDelete(index)" v-model="awards[index]" :edit="edit" v-for="(award, index) in awards" :page="page" :key="'award_' + award.id" />
		</draggable>
	</div>
</template>

<script>
import AwardItem from "./AwardItem";
import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.awards[index].name)) {
				this.deleteConfirmModal(`جایزه ${this.awards[index].name}`, index, this.awards);
			} else {
				this.awards.splice(index, 1);
			}
		},
		addAward() {
			this.awards.push({
				id: "award_" + _.uniqueId(),
			});
		},
		getData() {
			return this.awards;
		},
	},
	data() {
		return {
			drag: false,
			loading: false,
			awards: [],
		};
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			};
		},
	},
	created() {
		if (this.value != null) {
			this.awards = this.value;
		}
	},
	props: {
		value: {
			default: null,
			required: true,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
		edit: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	components: {
		AwardItem,
	},
};
</script>
