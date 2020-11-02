<template>
<div>
    <Biography :value="page.about" v-model="about" :edit="edit"></Biography>
    <ExperienceList class="mt-3" :edit="edit"></ExperienceList>
    <EducationsList class="mt-3" :edit="edit"></EducationsList>
    <Skills :edit="edit" :page="page" class="mt-3"></Skills>
</div>
</template>

<script>
export default {
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
            experiences: [],
            skills: [],
            achievements: [],
        }
    },
    components: {
        Biography: () => import("./Biography"),
        ExperienceList: () => import("./Experiences/ExperienceList"),
        Skills: () => import("./Skills/Skills"),
        EducationsList: () => import("./Education/EducationsList")

    }

}
</script>

<style>

</style>
