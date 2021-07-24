<template>
	<div class="achievement-item" v-if="tests.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.choice("user-profile.test", 2) }}</h2>
				<div class="ms-2 badge-light">{{ tests.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="tests-list p-0" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="tests" ref="draggable" tag="ul" v-bind="dragOptions" v-model="tests" class="achievement-list" :disabled="!edit" handle=".hand-hover">
			<TestItem :detailed="open" :class="{ 'edit w-100': edit }" ref="tests" @deleted="onDelete(index)" v-model="tests[index]" :edit="edit" v-for="(test, index) in tests" :page="page" :key="'test_' + test.id" />
		</draggable>
	</div>
</template>

<script>
import TestItem from "./TestItem";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.tests[index].name)) {
				this.deleteConfirmModal(`${__.choice("user-profile.test", 1)} ${this.tests[index].name}`, index, this.tests);
			} else {
				this.tests.splice(index, 1);
			}
		},
		addTest() {
			this.tests.push({
				id: "test_" + _.uniqueId(),
			});
			this.$nextTick(() => {
				this.scrollToElement(this.$refs.tests[this.tests.length - 1].$el, 180);
			});
		},
		getData() {
			return this.tests;
		},
	},
	data() {
		return {
			drag: false,
			loading: false,
			tests: [],
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
			this.tests = this.value;
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
		TestItem,
	},
};
</script>
