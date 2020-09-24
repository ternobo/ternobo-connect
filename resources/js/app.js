require('./bootstrap');

import Vue from 'vue';

import { InertiaApp } from '@inertiajs/inertia-vue';
import { InertiaForm } from 'laravel-jetstream';
import PortalVue from 'portal-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from "./Layouts/App";
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(InertiaApp);
Vue.use(InertiaForm);
Vue.use(PortalVue);

const app = document.getElementById('app');

new Vue({
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
        }
    }
}).$mount(app);
