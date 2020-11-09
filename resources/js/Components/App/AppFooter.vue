<template>
<div>
    <LawsModal :show.sync="showLaws"></LawsModal>
    <div class="sticky-aside d-flex align-items-center flex-column">
        <Langdropdown style="max-width: 200px" class="dropdown-list clickable mb-3" dir="rtl" :value="{label: 'فارسی', value: 'fa', 'icon':'/img/iranicon.png'}" :items="[
            {label: 'فارسی', value: 'fa','icon':'/img/iranicon.png'},{label: 'English', value: 'en','icon':'/img/en.png','disabled':true}]">
            <template v-slot:selected="{ item }">
                <div class="d-flex justify-content-between w-100">
                    <span> {{ item.label }}</span>
                    <img :src='item.icon' style="width:16px;height:16px" />
                </div>
            </template>

            <template v-slot:item="{ item }">
                <div class="d-flex justify-content-between px-2 w-100">
                    <span> {{ item.label }}</span>
                    <img :src='item.icon' style="width:16px;height:16px" />
                </div>
            </template>
        </Langdropdown>
        <div class="d-lg-block d-none text-muted">
            <div class="sidemenu-links d-flex justify-content-center align-items-center mb-1">
                <a class="text-muted hover-dark clickable ml-3" @click="showLaws=true">قوانین و مقررات</a>
                <a class="text-muted hover-dark" href="https://ternobo.info" target="_blank">درباره ما</a>
            </div>
            <div class="copyright-text d-flex justify-content-center align-items-center">
                <img src="/favicon.png" class="mr-1" style="max-width: 15px">
                <span class="mr-1">ترنوبو</span> © ۱۳۹۹
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Langdropdown from "../Langdropdown";
export default {
    data() {
        return {
            showLaws: false
        }
    },
    components: {
        "LawsModal": () => import(
            /* webpackChunkName: "LawsModal" */
            "../Modals/LawsModal"
        ),
        Langdropdown
    }
}
</script>

<style>

</style>
