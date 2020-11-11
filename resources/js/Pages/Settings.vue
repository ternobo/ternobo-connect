<template>
<base-layout>
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

                    <div class="action">
                        <div class="content">
                            <section class="slugItem bg-white">
                                <div class="ml-2 d-flex align-items-center" style="direction: ltr;">
                                    <span class="mr-1">{{$APP_URL + '/' + $page.user.username}}</span>
                                </div>
                                <section class="icon"><i class="font-18 material-icons-outlined">copy</i></section>
                            </section>
                        </div>
                        <i class="btn material-icons-outlined">edit</i>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">perm_phone_msg</i>
                        <span>تلفن همراه</span>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">email</i>
                        <span>پست الکترونی</span>
                    </div>
                </div>
                <div class="setting-action">
                    <div class="name">
                        <i class="material-icons-outlined ml-2">vpn_key</i>
                        <span>رمز عبور</span>
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
import AppLayout from "../Layouts/AppLayout";

export default {
    name: "Settings",
    layout: AppLayout
}
</script>

<style>

</style>
