<template>
<b-modal v-model='showModal' hide-footer title="ثبت / ویرایش ایمیل" size="md" :centered="true">
    <div class="d-flex justify-content-between align-items-center">
        <LoadingButton class="btn btn-dark" :loading="loading" @click.native="sendVcode()">ثبت</LoadingButton>
        <input type="tel" class="form-control mx-1 text-left" :readonly="verification_step" v-model="email" placeholder="example@ternobo.com">
    </div>
    <transition name="slide">
        <div v-if="verification_step">
            <label class="ml-1 mt-2 text-left clickable" @click="verification_step=false">ایمیل اشتباه است؟</label>

            <div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
                <label class="w-100">کد تایید خود ‌را وارد کنید</label>
                <div class="input-group-icon">
                    <input type="tel" class="form-control mx-1 text-center" v-model="code" placeholder="111111" maxlength="6">
                    <i class="material-icons-outlined">verified_user</i>
                </div>
            </div>
            <LoadingButton :loading="loading" class="btn btn-dark mx-3 mt-4 w-50" @click.native="verifyCode">بعدی</LoadingButton>
        </div>
    </transition>
</b-modal>
</template>

<script>
import ModalMixin from '../../../Mixins/Modal';
import LoadingButton from '../../buttons/LoadingButton.vue';
import LoadingSpinner from '../../LoadingSpinner.vue';
export default {
    methods: {
        sendVcode() {
            this.loading = true;
            const $this = this;
            var data = new FormData();
            data.append('email', this.email);

            var config = {
                method: 'post',
                url: this.$APP_URL + '/auth/verification',
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.result) {
                        this.verification_step = true;
                    } else {
                        const errors = response.data.errors;
                        this.handleError(errors);
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.loading = false;
                });
        },
        verifyCode() {
            this.loading = true;
            var data = new FormData();
            data.append('code', this.code);

            var config = {
                method: 'post',
                url: this.$APP_URL + '/auth/verify-email',
                data: data
            };

            axios(config)
                .then((response) => {
                    if (response.data.result) {
                        this.$emit("update:show", false);
                        this.$emit("updated", this.email);
                    } else {
                        this.toast("کد تایید نامعتبر است");
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.loading = false;
                });

        }
    },
    props: {
        value: {
            default: null,
        },
    },
    mounted() {
        this.email = this.value;
    },

    data() {
        return {
            loading: false,
            code: null,
            verification_step: false,
            email: null
        }
    },
    components: {
        LoadingButton,
        LoadingSpinner
    },
    mixins: [ModalMixin],
    name: "EmailModal",
};
</script>

<style>
</style>
