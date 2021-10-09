<template>
	<div class="about-me">
		<div v-if="canShow()">
			<Biography v-if="checkUser(this.page.user_id) || (about != null && about.length > 0)" v-model="about" :edit="edit"></Biography>
			<!-- <ExperienceList v-if="showExperiences" ref="experiences" class="mt-4" :edit="edit"></ExperienceList>
			<EducationsList v-if="showExperiences" ref="educations" class="mt-4" :edit="edit"></EducationsList> -->
			<Skills v-if="showSkills" ref="skills" :edit="edit" :page="page" class="mt-4"></Skills>
			<AchievementsCard v-if="showAchievements" ref="achievements" class="mt-4" :edit="edit" :page="page"></AchievementsCard>
		</div>
		<div class="w-100 d-flex align-items-center py-5 justify-content-center" v-else>
			<span class="text-center w-100 font-18 text-grey"> {{ __.get("messages.no-data") }}</span>
		</div>
	</div>
</template>

<script>
import Biography from "./Biography";
import ExperienceList from "./Experiences/ExperienceList";
import Skills from "./Skills/Skills";
import EducationsList from "./Education/EducationsList";
import AchievementsCard from "./Achievements/AchievementsCard";
export default {
	created() {
		this.about = this.page.about;
	},
	computed: {
		showSkills() {
			if (this.checkUser(this.page.user_id) || (this.page.skills != null && this.page.skills.length > 0)) {
				return true;
			}
			return false;
		},
		showExperiences() {
			if (this.checkUser(this.page.user_id) || (this.page.about_data != null && this.page.about_data.experiences != null && this.page.about_data.experiences.length > 0)) {
				return true;
			}
			return false;
		},
		showEducations() {
			if (this.checkUser(this.page.user_id) || (this.page.about_data != null && this.page.about_data.educations != null && this.page.about_data.educations.length > 0)) {
				return true;
			}
			return false;
		},
		showAchievements() {
			if (this.checkUser(this.page.user_id) || (this.page.about_data != null && this.page.about_data.achievements != null)) {
				return true;
			}
			return false;
		},
	},
	mounted() {
		if (this.$refs.experiences) {
			this.$refs.experiences.loading = true;
		}
		if (this.$refs.educations) {
			this.$refs.educations.loading = true;
		}
		if (this.page.about_data != null) {
			if (this.$refs.experiences) {
				this.$refs.experiences.experiences = this.page.about_data.experiences;
			}
			if (this.$refs.educations) {
				this.$refs.educations.educations = this.page.about_data.educations;
			}
			if (this.$refs.achievements) {
				this.$refs.achievements.achievements = this.page.about_data.achievements;
			}
		}
		if (this.$refs.experiences) {
			this.$refs.experiences.loading = false;
		}
		if (this.$refs.educations) {
			this.$refs.educations.loading = false;
		}
	},
	methods: {
		canShow() {
			return this.showSkills || this.showExperiences || this.showEducations || this.checkUser(this.page.user_id) || (this.about != null && this.about.length > 0);
		},
		getData() {
			return {
				about: this.about,
				// experiences: this.$refs.experiences.getData(),
				// educations: this.$refs.educations.getData(),
				skills: this.$refs.skills.getData(),
				achievements: this.$refs.achievements.getData(),
			};
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
	data() {
		return {
			about: "",
		};
	},
	components: {
		Biography,
		ExperienceList,
		Skills,
		EducationsList,
		AchievementsCard,
	},
};
</script>

<style>
</style>
