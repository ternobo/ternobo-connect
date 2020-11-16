<template>
<b-modal v-model='showModal' hide-footer title="تغییر رمزعبور" size="md" :centered="true">
    <div class="d-flex flex-column align-items-center">
        <div class="d-flex w-100 flex-column" style="align-items:center">
            <material-text-field class="material--sm w-50 mx-1 text-right mb-4" input-class="w-100" v-model="current_password" type="password" name="current_password" placeholder="رمزعبور فعلی" />

            <material-text-field class="material--sm w-50 mx-1 text-right mb-4" input-class="w-100" v-model="password" type="password" name="password" placeholder="رمزعبور" />
            <material-text-field class="material--sm w-50 mx-1 text-right" input-class="w-100" v-model="password_repeat" type="password" name="password" placeholder="تکرار رمزعبور" />
        </div>
        <div class="mt-5">
            <p class="font-18">نکات امنیتی</p>
            <ul style="list-style: none" class="font-14 p-0">
                <li>
                    رمزعبور حداقل ۸ کاراکتر باشد
                </li>
                <li>
                    بهتر است که از حروف کوچک، بزرگ و سمبل‌ها در رمزعبور خود استفاده کنید.
                </li>
            </ul>
        </div>
        <LoadingButton :loading="loading" class="btn btn-dark mx-auto mt-4 w-50" @click.native="savePassword">تایید</LoadingButton>
    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../../Mixins/Modal';
import LoadingButton from '../../buttons/LoadingButton.vue';
import LoadingSpinner from '../../LoadingSpinner.vue';
export default {
    methods: {
        savePassword() {
            var data = new FormData();
            if (this.password === this.password_repeat) {
                data.append("currentpassword", this.current_password);
                data.append("password", this.password);
                var config = {
                    method: 'post',
                    url: this.$APP_URL + '/auth/change-password',
                    data: data
                };

                axios(config)
                    .then((response) => {
                        if (response.data.result) {
                            this.loading = false;
                            this.$emit("update:show", false);
                            window.location = this.$APP_URL;
                        } else {
                            this.toast("رمزعبور فعلی نامعتبر است.");
                        }
                    })
                    .catch((error) => {
                        this.loading = false;
                    });
            } else {
                this.toast("رمزعبور و تاییدیه آن برابر نیست");
            }
        }
    },
    props: {
        value: {
            default: null
        },
    },
    mounted() {
        this.phone = this.value;
    },

    data() {
        return {
            loading: false,
            current_password: null,
            password: null,
            password_repeat: null,
        }
    },
    components: {
        LoadingButton,
        LoadingSpinner
    },
    mixins: [ModalMixin],
    name: "PasswordModal",
};
</script>

<style>
</style>
