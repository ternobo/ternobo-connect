<template>
<div class="row mx-1 mt-3">
    <div class="sidebar-right">
        <div class="card">
            <div class="card-body px-2 py-1">
                <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
            </div>
        </div>
    </div>
    <div class="content-container">

    </div>
    <div class="sidebar-left">
        <div class="card sticky-aside pb-4">
            <img class="card-img-top page-cover" style="height: auto;" src="https://ternobo.com/profiles/FQGDgu8XRzpw73qGv0EuJnL2A5TCetHZi2PWT8pr.jpeg">
            <a href="/soroosh" class="userinfo-card">
                <div class="d-flex flex-column align-items-center">
                    <div class="profile-image">
                        <vue-circle :progress="25" :size="90" empty-fill="#F5F5F5" :show-percent="false" :start-angle="-Math.PI/2" fill="#0898DF">
                            <img src="https://ternobo.com/profiles/wiOsB8OZiyONOBiC6xC77ME1fzX3zNDPaELATd8i.jpeg">
                        </vue-circle>
                    </div>
                    <strong class="text-black">سروش تن‌زاده <i class="verificationcheck">check_circle</i> </strong>
                    <small class="text-muted">مدیر فناوری و موسس ترنوبو</small>
                </div>
                <div class="done-precent d-flex">
                    <strong class="text-white">۱۰۰%</strong>
                </div>
            </a>
        </div>
    </div>
</div>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import PeopleSuggestion from "../Components/App/PeopleSuggestion";

export default {
    name: "Feed",
    props: {
        posts: {
            type: Object,
            default: undefined
        },
        pages: {
            type: Array,
            defautl: undefined
        }
    },
    components: {
        PeopleSuggestion
    },
    layout: AppLayout
};
</script>

<style>
</style>
