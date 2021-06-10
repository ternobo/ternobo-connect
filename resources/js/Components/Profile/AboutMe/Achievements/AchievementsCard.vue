<template>
	<div class="card achievments-card">
		<div class="card-body" v-if="mounted">
			<div class="about-me--card-title-container">
				<h2 class="about-me--card-title">{{ __.get("user-profile.achievements") }}</h2>
				<DropdownBtn
					v-if="edit"
					:items="[
						{ id: 1, name: __.choice('user-profile.language', 1) },
						{ id: 2, name: __.choice('user-profile.project', 1) },
						{ id: 3, name: __.choice('user-profile.publication', 1) },
						{ id: 4, name: __.choice('user-profile.patent', 1) },
						{ id: 5, name: __.choice('user-profile.course', 1) },
						{ id: 6, name: __.choice('user-profile.award', 1) },
						{ id: 7, name: __.choice('user-profile.test', 1) },
					]"
					@click="addNew"
				></DropdownBtn>
			</div>

			<LanguagesList :value="this.achievements.langs" ref="langs" :edit="edit" :page="page"></LanguagesList>
			<ProjectsList :value="this.achievements.projects" ref="projects" :edit="edit" :page="page"></ProjectsList>
			<PublishList :value="this.achievements.publishs" ref="publishs" :edit="edit" :page="page"></PublishList>
			<InventionsList :value="this.achievements.inventions" ref="inventions" :edit="edit" :page="page"></InventionsList>
			<CoursesList :value="this.achievements.courses" ref="courses" :edit="edit" :page="page"></CoursesList>
			<AwardsList :value="this.achievements.awards" ref="awards" :edit="edit" :page="page"></AwardsList>
			<TestsList :value="this.achievements.tests" ref="tests" :edit="edit" :page="page"></TestsList>

			<div class="w-100 text-center" v-if="this.achievements.langs < 1 && this.achievements.projects < 1 && this.achievements.publishs < 1 && this.achievements.awards < 1 && this.achievements.courses < 1 && this.achievements.inventions < 1 && this.achievements.tests < 1">
				<span class="font-16 text-superlight">هیچ دستاوردی ثبت نشده</span>
			</div>
		</div>
	</div>
</template>

<script>
import LanguagesList from "./Languages/LanguagesList";
import ProjectsList from "./Projects/ProjectsList";
import PublishList from "./Publishs/PublishList";
import AwardsList from "./Awards/AwardsList";
import CoursesList from "./Courses/CoursesList";
import InventionsList from "./Inventions/InventionsList";
import TestsList from "./Tests/TestsList";

import DropdownBtn from "../../../buttons/DropdownBtn";

export default {
	mounted() {
		if (this.achievements == null) {
			this.achievements = {
				langs: null,
				projects: null,
				publishs: null,
				inventions: null,
				courses: null,
				awards: null,
				tests: null,
			};
			this.mounted = true;
		}
	},
	data() {
		return {
			achievements: null,
			mounted: false,
		};
	},
	methods: {
		getData() {
			return {
				langs: this.$refs.langs.getData(),
				projects: this.$refs.projects.getData(),
				publishs: this.$refs.publishs.getData(),
				inventions: this.$refs.inventions.getData(),
				courses: this.$refs.courses.getData(),
				awards: this.$refs.awards.getData(),
				tests: this.$refs.tests.getData(),
			};
		},
		addNew(item) {
			switch (item) {
				case 1:
					this.$refs.langs.addLanguege();
					break;
				case 2:
					this.$refs.projects.addProject();
					break;
				case 3:
					this.$refs.publishs.addPublish();
					break;
				case 4:
					this.$refs.inventions.addInvention();
					break;
				case 5:
					this.$refs.courses.addCourse();
					break;
				case 6:
					this.$refs.awards.addAward();
					break;
				case 7:
					this.$refs.tests.addTest();
					break;
			}
		},
	},
	props: {
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
		LanguagesList,
		ProjectsList,
		PublishList,
		AwardsList,
		CoursesList,
		InventionsList,
		TestsList,

		DropdownBtn,
	},
};
</script>

<style></style>
