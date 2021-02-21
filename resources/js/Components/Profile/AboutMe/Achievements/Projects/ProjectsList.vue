<template>
	<div v-if="projects.length > 0">
		<div class="py-3">
			<div class="d-flex mb-2 align-items-center clickable justify-content-between" @click="showDetailed">
				<div class="d-flex align-items-center mb-3">
					<h2 class="mb-0 about-me--card--subtitle">پروژه‌ها</h2>
					<div class="mr-2 badge-light">{{ projects.length }}</div>
				</div>
				<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }">arrow_drop_down</i>
			</div>
			<ul class="projects-list p-0" v-if="loading">
				<li>
					<Skeleton :count="4" :heigth="25" />
				</li>
			</ul>
			<draggable group="projects" ref="draggable" tag="ul" v-bind="dragOptions" v-model="projects" class="achievement-list p-0" :disabled="!edit" handle=".hand-hover">
				<ProjectItem :detailed="open" :class="{ 'edit w-100': edit }" @deleted="onDelete(index)" v-model="projects[index]" :edit="edit" v-for="(project, index) in projects" :page="page" :key="'project_' + project.id" />
			</draggable>
		</div>
	</div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import ProjectItem from "./ProjectItem";
import { v4 as uuidv4 } from "uuid";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			this.projects.splice(index, 1);
		},
		addProject() {
			this.projects.push({
				id: "project_" + uuidv4(),
			});
		},
		getData() {
			return this.projects;
		},
	},
	data() {
		return {
			drag: false,
			loading: false,
			projects: [],
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
			this.projects = this.value;
			this.projects.forEach((element) => {
				if (!element.id) {
					element.id = uuidv4();
				}
			});
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
		Skeleton,
		ProjectItem,
	},
};
</script>
