require('./bootstrap');
import Vue from 'vue';
window.maxlengthContentEditableLib = require('maxlength-contenteditable').maxlengthContentEditable;
import {
    plugin,
} from 'ternobowire-js';
import PortalVue from 'portal-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import TProgress from "./Libs/TProgress";
import infiniteScroll from 'vue-infinite-scroll'
import TernoboApp from "./Libs/TernoboApp";
import App from "./Layouts/App";
import InfiniteLoading from 'vue-infinite-loading';
import Application from "./Application.vue";
import Vuex from "vuex";
import VueMasonry from 'vue-masonry-css';
import Lang from 'lang.js';
import InfiniteError from "./Components/InfiniteError";
import { scrollToElement } from "./Libs/WindowUtils";
import setupNotifications from "./NotifcationsHandler";

Vue.use(VueMasonry);

Vue.prototype.window = window;

// Install BootstrapVue
Vue.use(BootstrapVue, { "BModal": { "headerCloseContent": 'close' } })
Vue.use(IconsPlugin)

//use Vuex
Vue.use(Vuex);

/// Install TernoboApp
Vue.use(plugin);
Vue.use(PortalVue);
Vue.use(TernoboApp);

// Install Infinite Scroll
Vue.use(infiniteScroll);

Vue.prototype.$APP_URL = window.APP_URL;
Vue.prototype.$axios = axios;
Vue.prototype.scrollToElement = scrollToElement;

var twitter = require('twitter-text')
window.twitter = twitter;

axios.get(`/translations.js?version=${Date.now()}`).then((response) => {
    eval(response.data);


    Vue.use(InfiniteLoading, {
        slots: {
            noMore: '',
            error: InfiniteError, // you also can pass a Vue component as a slot
        },
    });

    Vue.prototype.__ = new Lang();
    Vue.prototype.__.setMessages(window.trans);
    Vue.prototype.__.setLocale(lang);

    window.__ = Vue.prototype.__;

    const app = document.getElementById('app');

    window.TProgress = TProgress;
    Vue.prototype.seen_content = [];
    Vue.prototype.seen_request = [];

    let dataToken = (document.body.dataset.wire);
    document.body.dataset.wire = "";
    const vue_app = new Vue({
        store: require("./store").default,
        render: (h) =>
            h(Application, {
                props: {
                    dataToken: dataToken,
                    resolveComponent: (component) => import(`./Pages/${component}`),
                },
            }),
        data() {
            return {
                application: null,
                isMobile: window.matchMedia("(max-width: 600px)").matches,
                isTablet: window.matchMedia("(max-width: 960px)").matches,
                isDesktop: window.matchMedia("(min-width: 961px)").matches,
                layout: App,
            }
        },
        mounted() {
            this.$store.commit("updateUrl");
        },
    }).$mount(app);
    window.addEventListener('popstate', () => {
        vue_app.$store.commit("updateUrl");
    });

    setupNotifications(vue_app);

    document.addEventListener('ternobo:userloaded', event => {
        let user = event.detail.user;
        if (user) {
            setInterval(() => {
                const seen_request = Vue.prototype.seen_request;
                if (seen_request.length > 0) {
                    axios.post("/seenPost", {
                        posts: seen_request
                    }).then(res => { })
                        .then(() => {
                            Vue.prototype.seen_request = [];
                        })
                }
            }, 3000);
        }
    });

    document.addEventListener('ternobo:navigate', event => {
        TProgress.start();
    });
    document.addEventListener("ternobo:loaded", event => {
        vue_app.$store.commit("updateUrl");
        var el = document.createElement('html');
        el.innerHTML = "<head>" + vue_app.$store.state.shared.SEO + "</head>";
        let title = el.getElementsByTagName("title")[0].text
        document.title = title;
        twemoji.parse(document.body)
    });

    document.addEventListener("ternobo:finish", event => {
        setTimeout(() => TProgress.done(), 500);
    });
});