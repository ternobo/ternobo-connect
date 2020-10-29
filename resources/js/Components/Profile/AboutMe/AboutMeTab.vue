<template>
<div>
    <Biography :value="page.about" v-model="about" :edit="edit"></Biography>
    <ExperienceList class="mt-3" :edit="edit"></ExperienceList>
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
        ExperienceList: () => import("./Experiences/ExperienceList")
    }

}
</script>

<style>

</style>
