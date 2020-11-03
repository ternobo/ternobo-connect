<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-24">دستاورد‌ها</h2>
            <DropdownBtn v-if="edit" :items="[
            { id: 1, name: 'زبان' },
            { id: 2, name: 'پروژه' },
            { id: 3, name: 'انتشارات' },
            { id: 4, name: 'اختراع' },
            { id: 5, name: 'دوره' },
            { id: 6, name: 'جایزه' },
            { id: 7, name: 'آزمون' },
          ]" @click="addNew"></DropdownBtn>
        </div>

        <LanguagesList ref="langs" :edit="edit" :page="page"></LanguagesList>
        <ProjectsList ref="projects" :edit="edit" :page="page"></ProjectsList>
        <PublishList ref="publishs" :edit="edit" :page="page"></PublishList>
        <AwardsList ref="awards" :edit="edit" :page="page"></AwardsList>

    </div>
</div>
</template>

<script>
import LanguagesList from "./Languages/LanguagesList";
import ProjectsList from "./Projects/ProjectsList";
import PublishList from "./Publishs/PublishList";
import AwardsList from "./Awards/AwardsList";

import DropdownBtn from "../../../buttons/DropdownBtn";

export default {
    methods: {
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
                    this.$refs.awards.addPublish();
                    break;
            }
        }
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

        DropdownBtn,
    },
};
</script>

<style>
</style>
