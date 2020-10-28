<template>
<div class="container-fluid">
    <LoginModal :show.sync="showLogin"></LoginModal>
    <LawsModal :show.sync="showLaws"></LawsModal>
    <SignupModal :show.sync="showSignup"></SignupModal>
    <b-sidebar id="sidebar" title="" backdrop-variant="dark" bg-variant="white" right backdrop shadow>
        <div class="px-3 py-2">
            <div class="w-100 d-flex justify-content-between align-items-center p-2" style="overflow-x: hidden">
                <button class="btn btn-transparent text-dark text-right px-0 w-100" @click="showLaws = !showLaws">قوانین و مقررات</button>
            </div>
            <div class="w-100 d-flex justify-content-between align-items-center p-2" style="overflow-x: hidden">
                <label>نمایش پس زمینه</label>
                <switches v-model="hasBG"></switches>
            </div>
        </div>
    </b-sidebar>
    <div class="header px-3 d-flex justify-content-between align-items-center">
        <div class="menu d-flex">
            <div class="clickable" v-b-toggle.sidebar><i class="material-icons header-btn" :class="{'text-dark': !hasBG, 'text-white': hasBG}">menu</i></div>
            <div class="mr-2 d-flex align-items-center">
                <h1 class="font-16 mb-0" :class="{'text-dark': !hasBG, 'text-white': hasBG}" ref="typewritingdescript"></h1>
            </div>
        </div>
        <div class="d-flex">
            <inertia-link v-if="$root.user" :class="{'text-dark': !hasBG, 'text-white': hasBG}" href="/feed">
                <i class="navheader-icon material-icons-outlined" :class="{'text-dark': !hasBG, 'text-white': hasBG}">home</i>
            </inertia-link>

            <button v-if="!$root.user" class="btn btn-transparent border-left" :class="{'text-dark': !hasBG}" @click="showLogin = !showLogin">ورود</button>
            <button v-if="!$root.user" class="btn btn-transparent" :class="{'text-dark': !hasBG}" @click="showSignup = !showSignup">ثبت‌نام</button>
        </div>
    </div>
    <div class="search-section" :class="{noBG: !hasBG}">
        <form action="/search" id="searchform" autocomplete="off">
            <div class="content-body d-flex justify-content-center align-items-center flex-column">
                <div class="col-md-6 d-flex justify-content-center align-items-center flex-column">
                    <img src="/images/logo-type.svg" class="thelogo" style="max-with: 350px" v-if="hasBG" />
                    <img src="/images/logo-type-dark.svg" class="thelogo" style="max-with: 350px" v-if="!hasBG" />
                    <autocomplete style="min-width: 270px" :search="search" id="searchforminput" class="w-100 mt-3" autocomplete="off" required type="text" name="q" placeholder="هر چیزی که در جستن آنی، " />
                </div>
            </div>
        </form>
    </div>
    <div class="footer p-3 d-flex justify-content-between align-items-center">
        <div class="bg-downloader d-flex" @mouseenter="showDownloader = true" @mouseleave="showDownloader = false">
            <i class="material-icons-outlined text-white">image</i>
            <div class="d-flex py-2 copyright-bg px-4 bg-dark align-items-center text-white" v-if="showDownloader">
                <div class="d-flex flex-column justify-content-center">
                    <b class="my-1" style="font-size: 0.8rem;">علی اطیابی</b>
                    <small style="font-size: 0.8rem;">تهران، تهران ایران</small>
                </div>
                <a class="d-flex align-items-center" download href="/images/search-background-2x.jpg"><i class="material-icons text-white ml-5" style="margin-left: -5px;">get_app</i></a>
            </div>
        </div>
        <div class="clickable showlanding" :class="{'bg-dark':!hasBG }" v-on:click="showLanding = true;">
            <i class="material-icons font-38" :class="{'text-white':!hasBG }">flight_land</i>
        </div>
        <img src="/images/logo-en.svg" class="thelogo" v-if="hasBG" style="width: 110px;">
        <img src="/images/logo-en-dark.svg" class="thelogo" v-if="!hasBG" style="width: 110px;">

    </div>
    <transition name="slide">
        <landing v-if="showLanding" :articles="articles"></landing>
    </transition>
</div>
</template>

<script>
import Switches from 'vue-switches';
import LawsModal from "../Components/Modals/LawsModal";
import AppHeader from "../Components/App/header/AppHeader";
import Landing from "../Components/App/Landing";
import LoginModal from "../Components/Modals/LoginModal";
import SignupModal from "../Components/Modals/SignupModal";
import App from "../Layouts/App";
import {
    Inertia
} from '@inertiajs/inertia';
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
    methods: {
        search(input) {
            const element = document.getElementById("searchforminput").parentElement;
            element.style.position = "unset";
            if (element.getElementsByClassName("autocomplete-result-list").length > 0) {
                element.getElementsByClassName("autocomplete-result-list")[0].style.width = element.getBoundingClientRect().width + "px";
                element.getElementsByClassName("autocomplete-result-list")[0].style.marginTop = "-14px";
            }

            if (input.length < 2) {
                return []
            }
            return new Promise((resolve, reject) => {
                axios.post(this.$APP_URL + "/search", {
                    q: input
                }).then((response) => {
                    if (response.data.result) {
                        resolve(response.data.suggestions);
                    } else {
                        resolve([]);
                    }
                })
            });
        }
    },
    data() {
        return {
            showLanding: false,
            showDownloader: false,
            hasBG: true,
            showLogin: false,
            showLaws: false,
            showSignup: false
        }
    },
    watch: {
        showLanding: function () {
            setTimeout(function () {
                window.scrollTo(0, 800);
            }, 500);
        }
    },
    mounted() {
        const $this = this;
        var i = 0;
        var txt = 'شبکه اجتماعی متخصصین';
        var speed = 130;

        function typeWriter() {
            if (i < txt.length) {
                $this.$refs.typewritingdescript.innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    },
    props: {
        articles: {
            type: Array,
            default: undefined,
        },
    },
    layout: App,
    name: "Welcome",
    components: {
        LawsModal,
        AppHeader,
        Landing,
        Switches,
        LoginModal,
        SignupModal,
        Autocomplete
    },
};
</script>

<style lang="scss" scoped>
.searchbox {
    input {
        height: 42px;
    }
}

#searchform {
    position: relative;
    z-index: 2;
    width: 100%;
}

.header {
    position: fixed;
    top: 0;
    z-index: 2;
    transition: all .3s !important;
    width: 100%;
    left: 0;
    padding: .9rem 1rem !important;
    right: 0;
}

.noBG {
    background: #FFF !important;
}

.noBG::before {
    background: #FFF !important;
}

.search-section {
    position: relative;
    background: url("/images/search-background-2x.jpg");
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 -1rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.showlanding {
    background: #f5f5f5;
    padding: 15px 12px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: absolute;
    left: 50%;
    right: 50%;
    bottom: 0;
    width: 62px;
    margin-left: -31px;
    margin-right: -31px;
    margin-bottom: 0;
}

.search-section::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.footer {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
}
</style>
