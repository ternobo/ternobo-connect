require('./bootstrap');

import Vue from 'vue';

import { InertiaApp } from '@inertiajs/inertia-vue';
import { InertiaForm } from 'laravel-jetstream';
import PortalVue from 'portal-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from "./Layouts/App";
import vSelect from 'vue-select'
import TProgress from "./Libs/TProgress";
import VueCircle from 'vue2-circle-progress'
import infiniteScroll from 'vue-infinite-scroll'
import TernoboApp from "./Libs/TernoboApp";
import Application from "./Application";

Vue.prototype.window = window.window;

// Install V-Select
Vue.component('v-select', vSelect);

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Install InertiaApp
Vue.use(InertiaApp);
Vue.use(InertiaForm);
Vue.use(PortalVue);

Vue.use(TernoboApp);

// Install Infinite Scroll
Vue.use(infiniteScroll)

Vue.component("vue-circle", VueCircle);

Vue.prototype.$APP_URL = window.APP_URL;
Vue.prototype.$axios = axios;

const app = document.getElementById('app');

window.TProgress = TProgress;

Vue.prototype.seen_content = [];
Vue.prototype.seen_request = [];

setInterval(() => {
    const seen_request = Vue.prototype.seen_request;
    if (seen_request.length > 0) {
        axios.post("/seenPost", {
            posts: seen_request
        }).then(() => {
            Vue.prototype.seen_request = [];
        })
    }
}, 3000);

const vue_app = new Vue({
    render: (h) =>
        h(Application, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
                transformProps: function (props) {
                    this.$emit('changeProps', props)
                    return props;
                },
                resolveComponent: (name) => {
                    const module = require(`./Pages/${name}`).default;
                    if (!module.layout) {
                        // there is no Layout defined, set the default layout
                        module.layout = App;
                    }
                    return module;
                },
            },
        }),
    data() {
        return {
            isMobile: window.matchMedia("(max-width: 600px)").matches,
            isTablet: window.matchMedia("(max-width: 960px)").matches,
            isDesktop: window.matchMedia("(min-width: 961px)").matches,
            user: window.user,
            url: window.location.pathname
        }
    }
}).$mount(app);

window.addEventListener('popstate', () => {
    vue_app.url = window.location.pathname;
});

document.addEventListener('inertia:start', event => {
    vue_app.url = event.detail.visit.url;
    TProgress.start();
});
document.addEventListener("inertia:finish", event => {
    vue_app.url = window.location.pathname;
    setTimeout(() => TProgress.done(), 500);
});
