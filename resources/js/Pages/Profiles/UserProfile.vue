<template>
<base-layout>
    <sidebar-left>

    </sidebar-left>
    <div class="content-container-full">
        <div class="card">
            <ProfileCover :canChange="page.user_id == this.$root.user.id" :src="page.cover"></ProfileCover>
            <div class="card-body pb-0 d-flex justify-content-between pageinfo-card">
                <ProfileImage :canChange="page.user_id == this.$root.user.id" :src="page.profile"></ProfileImage>
                <div class="d-flex follow-buttons" v-if="page.user_id != this.$root.user.id">
                    <FollowButton :page="page.id"></FollowButton>
                    <ConnectionButton v-if="page.type === 'personal'" :user="page.user_id"></ConnectionButton>
                </div>
            </div>
            <div class="card-body d-flex flex-column page-name">
                <span class="d-flex align-items-center">
                    <strong class="font-20">
                        {{ page.name }}
                        <i v-if="page.user.is_verified === 1" class="verificationcheck mr-1 font-20">check_circle</i>
                    </strong>
                    <i v-if="page.user_id == this.$root.user.id" class="mr-2 material-icons-outlined font-16 text-muted">edit</i>
                </span>
                <small class="font-14">{{ page.short_bio }}</small>
            </div>
        </div>

        <tabs class="py-3" :state-tab='true'>
            <template slot="custom-item" v-if="canEdit">
                <div>
                    <button class="btn button-transparent rounded-circle" v-if="edit" @click="cancelEdit"><i class="material-icons">close</i></button>
                    <button class="btn btn-edit" v-html="edit ? 'ذخیره' : 'ویرایش اطلاعات <i class=\'material-icons-outlined\'>edit</i>'" @click="doEdit"></button>
                </div>
            </template>
            <tab name="درباره من" :href="'/'+page.slug" :selected="location==='about'||location==='home'">
                <Biography :value="page.about" v-model="about" :edit="edit"></Biography>
                <ExperienceList class="mt-3" :edit="edit"></ExperienceList>
            </tab>
            <tab name="فعالیت‌ها" :href="'/'+page.slug+'/activities'" :selected="location==='activities'">
                <div class="row">
                    <div class="col-md-4">

                    </div>
                    <div class="col-md-8">
                        <NewPostCard></NewPostCard>
                        <div class="posts"></div>
                    </div>
                </div>
            </tab>
            <tab name="مقالات" :href="'/'+page.slug+'/articles'" :selected="location==='articles'">
            </tab>
            <tab name="تماس با من" :href="'/'+page.slug+'/contact'" :selected="location==='contact'">
            </tab>
        </tabs>
    </div>
</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import ProfileImage from "../../Components/Profile/ProfileImage";
import ProfileCover from "../../Components/Profile/ProfileCover";

import ConnectionButton from "../../Components/buttons/ConnectionButton";
import FollowButton from "../../Components/buttons/FollowButton";
import Biography from "../../Components/Profile/AboutMe/Biography";
import ExperienceList from "../../Components/Profile/AboutMe/Experiences/ExperienceList";

import NewPostCard from "../../Components/Cards/NewPostCard";
export default {
    methods: {
        doEdit() {
            this.edit = !this.edit;

        },
        cancelEdit() {

        }
    },
    data() {
        return {
            edit: false,
            about: null,
            experiences: [],
            skills: [],
            categories: [],

        }
    },
    computed: {
        canEdit() {
            return this.page.user_id == this.$root.user.id;
        }
    },
    name: "UserProfile",
    props: {
        page: {
            type: Object,
            default: undefined,
        },
        location: {
            type: String,
            default: "home",
        },
    },
    components: {
        FollowButton,
        ConnectionButton,
        Biography,
        ExperienceList,
        ProfileImage,
        ProfileCover,
        NewPostCard
    },
    layout: AppLayout
}
</script>

<style>
.tabs ul li {
    width: auto;
}
</style>

<style lang="scss" scoped>
.page-cover {
    min-height: 40px;
}
</style>
