<template>
<div>
    <Biography :value="page.about" v-model="about" :edit="edit"></Biography>
    <ExperienceList ref="experiences" class="mt-3" :edit="edit"></ExperienceList>
    <EducationsList ref="educations" class="mt-3" :edit="edit"></EducationsList>
    <Skills ref="skills" :edit="edit" :page="page" class="mt-3"></Skills>
    <AchievementsCard ref="achievements" class="mt-3" :edit="edit" :page="page"></AchievementsCard>
</div>
</template>

<script>
export default {
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
        Biography: () => import("./Biography"),
        ExperienceList: () => import("./Experiences/ExperienceList"),
        Skills: () => import("./Skills/Skills"),
        EducationsList: () => import("./Education/EducationsList"),
        AchievementsCard: () => import("./Achievements/AchievementsCard")
    }

}
</script>

<style>

</style>
