<template>
<b-modal v-model='showModal' hide-footer title="ویرایش مشخصات کاربری" :centered="true">
    <div class="row">
        <div class="col-md-6">
            <MaterialTextField class="material--sm w-100" input-class="w-100" :value="firstName" v-model="firstName" :required="true" placeholder="نام"></MaterialTextField>
        </div>
        <div class="col-md-6">
            <MaterialTextField class="material--sm w-100" input-class="w-100" :value="lastName" v-model="lastName" :required="true" placeholder="نام خانوادگی"></MaterialTextField>
        </div>
        <div class="col-md-12 mt-3">
            <MaterialTextField class="material--sm w-100" input-class="w-100" :value="shortBio" v-model="shortBio" placeholder="عنوان"></MaterialTextField>
        </div>
        <div class="col-md-12 mt-3">
            <MaterialTextArea :min-height="150" class="w-100" input-class="w-100" :value="Biography" v-model="Biography" placeholder="بیوگرافی"></MaterialTextArea>
        </div>
        <div class="col-md-12 mt-3">
            <v-select :placeholder="'جنسیت'" dir="rtl" v-model="gender" :options="[{label: 'زن', code: '1'},{label: 'مرد', code: '2'},{label: 'تراجنسی', code: '3'}]"></v-select>
        </div>
        <div class="col-md-12 d-flex justify-content-center align-items-center mt-3" style="margin-bottom: -16px">
            <loading-button class="btn btn-dark px-4" :loading="loading" @click.native="save">ثبت</loading-button>
        </div>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
import MaterialTextField from "../inputs/MaterialTextField";
import MaterialTextArea from "../inputs/MaterialTextArea";
import {
    Inertia
} from '@inertiajs/inertia';

export default {
    props: {
        user: {
            type: Object,
            default: undefined,
            required: true
        },

    },
    created() {
        this.firstName = this.user.first_name;
        this.lastName = this.user.last_name;
        this.shortBio = this.user.short_bio;
        this.Biography = this.user.page.about;
        this.gender = {
            code: this.user.gender,
        }
        switch (this.user.gender) {
            case '1':
                this.gender.label = 'زن';
                break;
            case '2':
                this.gender.label = 'مرد';
                break;
            case '3':
                this.gender.label = 'تراجنسی';
                break;

        }

    },
    data() {
        return {
            firstName: "",
            lastName: "",
            shortBio: "",
            Biography: "",
            gender: "",
            loading: false
        }

    },
    methods: {
        save() {
            this.loading = true;
            axios.post("/usersave/profile", {
                firstname: this.firstName,
                lastname: this.lastName,
                short_bio: this.shortBio,
                about: this.Biography,
                gender: this.gender
            }).then((response) => {
                if (response.data.result) {
                    this.$emit("update:show", false);
                    Inertia.reload();
                    this.$emit("saved");
                } else {
                    this.handleError(response.data.errors);
                }
            }).catch((err) => {}).then(() => this.loading = false);
        }
    },

    mixins: [ModalMixin],
    components: {
        MaterialTextField,
        MaterialTextArea
    },
    name: "LoginModal"
}
</script>

<style>

</style>
