<template>
	<div class="achievement-item" v-if="courses.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.choice("user-profile.course", 2) }}</h2>
				<div class="ms-2 badge-light">{{ courses.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="courses-list p-0" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="courses" ref="draggable" tag="ul" v-bind="dragOptions" v-model="courses" class="achievement-list" :disabled="!edit" handle=".hand-hover">
			<courseItem :detailed="open" :class="{ 'edit w-100': edit }" @deleted="onDelete(index)" v-model="courses[index]" :edit="edit" v-for="(course, index) in courses" :page="page" :key="'course_' + course.id" />
		</draggable>
	</div>
</template>

<script>
import CourseItem from "./CourseItem";
import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.courses[index].name)) {
				this.deleteConfirmModal(`دوره ${this.courses[index].name}`, index, this.courses);
			} else {
				this.courses.splice(index, 1);
			}
		},
		addCourse() {
			this.courses.push({
				id: "course_" + _.uniqueId(),
				name: null,
				code: null,
				skill: null,
			});
		},
		getData() {
			return this.courses;
		},
	},
	data() {
		return {
			drag: false,
			loading: false,
			courses: [],
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
			this.courses = this.value;
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
		CourseItem,
	},
};
</script>
