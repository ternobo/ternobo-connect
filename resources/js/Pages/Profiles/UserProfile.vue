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
        <tabs class="py-3">
            <tab name="درباره من" :selected="true">
                <Biography :value="page.about"></Biography>
                <ExperienceList class="mt-3"></ExperienceList>
            </tab>
            <tab name="فعالیت‌ها">
                <Biography :value="page.about"></Biography>
            </tab>
            <tab name="مقالات">
                <Biography :value="page.about"></Biography>
            </tab>
            <tab name="تماس به من">
                <Biography :value="page.about"></Biography>
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

export default {
    name: "UserProfile",
    props: {
        page: {
            type: Object,
            default: undefined,
        },
    },
    components: {
        FollowButton,
        ConnectionButton,
        Biography,
        ExperienceList,
        ProfileImage,
        ProfileCover
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
