require('./bootstrap');

import Vue from 'vue';

import { InertiaApp } from '@inertiajs/inertia-vue';
import { Inertia } from '@inertiajs/inertia';
import { InertiaForm } from 'laravel-jetstream';
import PortalVue from 'portal-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from "./Layouts/App";
import Tabs from "./Components/Tabs/Tabs";
import Tab from "./Components/Tabs/Tab";
import vSelect from 'vue-select'
import TProgress from "./Libs/TProgress";

Vue.component('v-select', vSelect);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(InertiaApp);
Vue.use(InertiaForm);
Vue.use(PortalVue);

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);

Vue.prototype.$APP_URL = window.APP_URL;

const app = document.getElementById('app');

document.addEventListener('inertia:start', event => {
    TProgress.start();
});
document.addEventListener("inertia:success", event => {
    setTimeout(() => TProgress.done(), 500);
});


window.TProgress = TProgress;

const vue_app = new Vue({
    render: (h) =>
        h(InertiaApp, {
            props: {
                initialPage: JSON.parse(app.dataset.page),
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
            isTablet: window.matchMedia("(max-width: 768px)").matches,
            isDesktop: window.matchMedia("(min-width: 769px)").matches,
            user: window.user
        }
    }
}).$mount(app);