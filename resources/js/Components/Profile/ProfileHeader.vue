<template>
<div class="card">
    <ProfileCover :canChange="canEdit" :src="page.cover"></ProfileCover>
    <div class="card-body pb-0 d-flex justify-content-between pageinfo-card">
        <ProfileImage :canChange="canEdit" :src="page.profile"></ProfileImage>
        <div class="d-flex follow-buttons" v-if="!canEdit">
            <FollowButton :page="page.id"></FollowButton>
            <ConnectionButton v-if="page.type === 'personal'" :user="page.user_id"></ConnectionButton>
        </div>

        <div class="d-flex" v-if="canEdit && edit">
            <button class="btn button-transparent rounded-circle" v-if="edit" @click="cancel"><i class="material-icons">close</i></button>
            <button :disabled="loading" class="d-flex btn btn-edit" @click="save">
                ذخیره
                <span style="height: 14px;width: 14px;border-width: 2px;" v-if="loading" class="mr-2 loadingspinner"></span>
            </button>
        </div>

    </div>
    <div class="card-body d-flex flex-column page-name">
        <div v-if="edit">
            <div class="row align-items-start">
                <div class="col-md-3">
                    <MaterialTextField class="material--sm w-100" input-class="w-100" :value="firstName" v-model="firstName" :required="true" placeholder="نام"></MaterialTextField>
                </div>
                <div class="col-md-3 mt-3 mt-md-0">
                    <MaterialTextField class="material--sm w-100" input-class="w-100" :value="lastName" v-model="lastName" :required="true" placeholder="نام خانوادگی"></MaterialTextField>
                </div>
                <div class="col-md-4 mt-3 mt-md-0">
                    <MaterialTextField class="material--sm w-100" input-class="w-100" :value="shortBio" v-model="shortBio" placeholder="عنوان"></MaterialTextField>
                    <span class="text-muted font-12">این عنوان زیر نام شما نمایش داده می‌شود.</span>
                </div>
                <div class="col-md-2 mt-3 mt-md-0">
                    <v-select class="dropdown-list" :placeholder="'جنسیت'" dir="rtl" v-model="gender" :options="[{label: 'زن', code: '1'},{label: 'مرد', code: '2'},{label: 'تراجنسی', code: '3'}]"></v-select>
                </div>
            </div>
        </div>
        <div v-else>
            <span class="d-flex align-items-center">
                <strong class="font-20">
                    {{ page.name }}
                    <i v-if="page.user.is_verified === 1" class="verificationcheck mr-1 font-20">check_circle</i>
                </strong>
                <i v-if="canEdit" class="mr-2 material-icons-outlined font-16 text-muted" @click="edit = true">edit</i>
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
