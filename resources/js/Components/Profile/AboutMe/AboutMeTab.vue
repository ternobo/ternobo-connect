<template>
<div>
    <Biography v-model="about" :edit="edit"></Biography>
    <ExperienceList ref="experiences" class="mt-3" :edit="edit"></ExperienceList>
    <EducationsList ref="educations" class="mt-3" :edit="edit"></EducationsList>
    <Skills ref="skills" :edit="edit" :page="page" class="mt-3"></Skills>
    <AchievementsCard ref="achievements" class="mt-3" :edit="edit" :page="page"></AchievementsCard>
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
    mounted() {
        if (this.page.about_data != null) {
            this.$refs.experiences.experiences = this.page.about_data.experiences;
            this.$refs.educations.educations = this.page.about_data.educations;
            this.$refs.achievements.achievements = this.page.about_data.achievements;
        }
    },
    methods: {
        getData() {
            return {
                about: this.about,
                experiences: this.$refs.experiences.getData(),
                educations: this.$refs.educations.getData(),
                skills: this.$refs.skills.getData(),
                achievements: this.$refs.achievements.getData()
            }
        }
    },
    props: {
        page: {
            type: Object,
            default: undefined,
            required: true
        },
        edit: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    data() {
        return {
            about: "",
        }
    },
    components: {
        Biography,
        ExperienceList,
        Skills,
        EducationsList,
        AchievementsCard,
    }

}
</script>

<style>

</style>
