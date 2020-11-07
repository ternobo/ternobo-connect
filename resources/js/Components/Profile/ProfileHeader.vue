<template>
<div class="card">
    <UserInfoModal :user="page.user" v-if="canEdit" :show.sync="edit"></UserInfoModal>
    <ProfileCover :canChange="canEdit" :src="page.cover"></ProfileCover>
    <div class="card-body pb-0 d-flex justify-content-between pageinfo-card">
        <ProfileImage :canChange="canEdit" :src="page.profile"></ProfileImage>
        <div class="d-flex follow-buttons" v-if="!canEdit">
            <FollowButton :page="page.id"></FollowButton>
            <ConnectionButton v-if="page.type === 'personal'" :user="page.user_id"></ConnectionButton>
        </div>

    </div>
    <div class="card-body d-flex flex-column page-name">
        <div>
            <span class="d-flex align-items-center">
                <strong class="font-20">
                    {{ page.name }}
                    <i v-if="page.user.is_verified === 1" class="verificationcheck mr-1 font-20">check_circle</i>
                </strong>
                <i v-if="canEdit" class="mr-2 material-icons-outlined font-16 hover-dark clickable text-muted" @click="edit = true">edit</i>
            </span>
            <small class="font-14">{{ page.short_bio }}</small>
        </div>
    </div>
</div>
</template>

<script>
import ConnectionButton from "../buttons/ConnectionButton";
import FollowButton from "../buttons/FollowButton";
import ProfileCover from "./ProfileCover";
import ProfileImage from "./ProfileImage";
import UserInfoModal from "../Modals/UserInfoModal";

import MaterialTextField from "../inputs/MaterialTextField";

export default {
    methods: {
        save() {
            this.loading = true;
            axios.post("/usersave/profile", {
                firstname: this.firstName,
                lastname: this.lastName,
                short_bio: this.shortBio,
                gender: this.gender
            }).then((response) => {
                if (response.data.result) {
                    Inertia.reload();
                    this.$emit("saved");
                } else {
                    this.handleError(response.data.errors);
                }
                this.edit = false;
            }).catch((err) => {}).then(() => this.loading = false);
        },
        cancel() {
            this.firstName = this.page.user.first_name;
            this.lastName = this.page.user.last_name;
            this.shortBio = this.page.user.short_bio;
            this.gender = JSON.parse(this.page.user.gender);
            this.edit = false;
        }
    },
    created() {
        this.firstName = this.page.user.first_name;
        this.lastName = this.page.user.last_name;
        this.shortBio = this.page.user.short_bio;
        this.gender = JSON.parse(this.page.user.gender);
    },
    data() {
        return {
            loading: false,
            edit: false,
            firstName: null,
            lastName: null,
            shortBio: null,
            gender: null
        }
    },
    components: {
        FollowButton,
        ConnectionButton,
        ProfileImage,
        ProfileCover,
        UserInfoModal,
        MaterialTextField
    },
    props: {
        canEdit: {
            type: Boolean,
            default: false,
            required: false
        },
        page: {
            type: Object,
            default: undefined,
            required: true
        },

    },

}
</script>

<style>

</style>
