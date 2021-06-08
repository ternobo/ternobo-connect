<template>
	<div class="achievement-item" v-if="projects.length > 0">
		<div class="achievement-header">
			<div class="achievement-title" @click="toggleDetailed">
				<h2 class="mb-0 about-me--card--subtitle">{{ __.choice("user-profile.project", 2) }}</h2>
				<div class="ms-2 badge-light">{{ projects.length }}</div>
			</div>
			<i class="material-icons open-achievements" v-if="!edit" :class="{ active: open }" @click="toggleDetailed">keyboard_arrow_down</i>
		</div>
		<ul class="projects-list p-0" v-if="loading">
			<li>
				<skeleton :count="4" :heigth="25" />
			</li>
		</ul>
		<draggable group="projects" ref="draggable" tag="ul" v-bind="dragOptions" v-model="projects" class="achievement-list" :disabled="!edit" handle=".hand-hover">
			<ProjectItem :detailed="open" :class="{ 'edit w-100': edit }" @deleted="onDelete(index)" v-model="projects[index]" :edit="edit" v-for="(project, index) in projects" :page="page" :key="'project_' + project.id" />
		</draggable>
	</div>
</template>

<script>
import ProjectItem from "./ProjectItem";
import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
	mixins: [AchievementsMxixin],
	methods: {
		onDelete(index) {
			if (Boolean(this.projects[index].name)) {
				this.deleteConfirmModal(`پروژه ${this.projects[index].name}`, index, this.projects);
			} else {
				this.projects.splice(index, 1);
			}
		},
		addProject() {
			this.projects.push({
				id: "project_" + _.uniqueId(),
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
					element.id = _.uniqueId();
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
		ProjectItem,
	},
};
</script>
