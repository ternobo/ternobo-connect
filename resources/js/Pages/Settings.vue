<template>
<base-layout>
    <UsernameModal :show.sync="showUsernameModal" @updated="reload" :value="$page.user.username"></UsernameModal>
    <email-modal :show.sync="showEmailModal" @updated="updateEmail" :value="email"></email-modal>
    <phone-number-modal :show.sync="showPhoneModal" @updated="updatePhone" :value="phone"></phone-number-modal>
    <PasswordModal :show.sync="showPasswordMdal"></PasswordModal>

    <div class="sidebar-right">
        <div class="card p-0">
            <div class="settings-item">
                <i class="material-icons-outlined ml-2">account_circle</i>
                <span>حساب کاربری</span>
            </div>
            <div class="settings-item">
                <i class="material-icons-outlined ml-2">privacy_tip</i>
                <span>حریم خصوصی</span>
            </div>
            <div class="settings-item">
                <i class="material-icons-outlined ml-2">account_circle</i>
                <span>درباره ترنوبو</span>
            </div>
        </div>
    </div>
    <div class="content-container-full">
        <h2 class="font-20">ورود و امنیت</h2>
        <div class="card">
            <div class="card-body py-0 px-4">
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">account_circle</i>
                        <span>نام کاربری</span>
                    </div>

                    <div class="d-flex align-items-center">
                        <div class="content">
                            <section class="slugItem">
                                <div class="ml-2 d-flex align-items-center" style="direction: ltr;">
                                    <span class="mr-1">{{$APP_URL + '/' + $page.user.username}}</span>
                                </div>
                                <section class="icon"><i class="font-18 material-icons-outlined">copy</i></section>
                            </section>
                        </div>
                        <i class="btn setting-btn material-icons-outlined mr-3" @click="showUsernameModal = true">edit</i>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">perm_phone_msg</i>
                        <span>تلفن همراه</span>
                    </div>

                    <div class="d-flex align-items-center">
                        <div class="content">
                            <span class="mr-1">{{ phone }}</span>
                        </div>
                        <i class="btn setting-btn material-icons-outlined mr-3" @click="showPhoneModal = true">edit</i>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">email</i>
                        <span>پست الکترونی</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="content">
                            <span class="mr-1">{{ email }}</span>
                        </div>
                        <i class="btn setting-btn material-icons-outlined mr-3" @click="showEmailModal = true">edit</i>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">vpn_key</i>
                        <span>رمز عبور</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="btn setting-btn material-icons-outlined mr-3" @click="showPasswordMdal = true">edit</i>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">privacy_tip</i>
                        <span>احراز هویت 2 مرحله‌ای</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</base-layout>
</template>

<script>
import {
    Inertia
} from '@inertiajs/inertia';
import AppLayout from "../Layouts/AppLayout";

export default {
    created() {
        axios.post("/auth/get-info").then((response) => {
            this.phone = response.data.phone;
            this.email = response.data.email;
        })
    },
    methods: {
        reload() {
            Inertia.reload({
                only: ['user']
            });
        },
        updateEmail(email) {
            this.email = email;
        },
        updatePhone(phone) {
            this.phone = phone;
        }
    },
    data() {
        return {
            showUsernameModal: false,
            showPhoneModal: false,
            showEmailModal: false,
            showPasswordMdal: false,

            phone: null,
            email: null
        }
    },
    name: "Settings",
    layout: AppLayout,
    components: {
        UsernameModal: () => import("../Components/Modals/Settings/UsernameModal"),
        EmailModal: () => import("../Components/Modals/Settings/EmailModal"),
        PasswordModal: () => import("../Components/Modals/Settings/PasswordModal"),
        PhoneNumberModal: () => import("../Components/Modals/Settings/PhoneNumberModal"),

    }
}
</script>

<style>

</style>
