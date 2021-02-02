require('./bootstrap');
import Vue from 'vue';

import {
    plugin,
} from 'wire-js';
import PortalVue from 'portal-vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'
import TProgress from "./Libs/TProgress";
import VueCircle from 'vue2-circle-progress'
import infiniteScroll from 'vue-infinite-scroll'
import TernoboApp from "./Libs/TernoboApp";
import App from "./Layouts/App";
import '@trevoreyre/autocomplete-vue/dist/style.css'
import Dialog from 'bootstrap-vue-dialog/dist/bootstrap-vue-dialog';
import InfiniteLoading from 'vue-infinite-loading';
import Application from "./Application.vue";
import Vuex from "vuex";

Vue.use(InfiniteLoading, { /* options */ });

Vue.prototype.window = window.window;

Vue.use(Dialog);

vSelect.props.components.default = () => ({
    Deselect: {
        render: createElement => createElement('i',
            {
                attrs: { class: 'material-icons' }
            }, ''),
    },
    OpenIndicator: {
        render: createElement => createElement('i',
            {
                attrs: { class: 'material-icons' }
            }, 'keyboard_arrow_down'),
    },
});

// Install V-Select
Vue.component('v-select', vSelect);

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//use Vuex
Vue.use(Vuex);

/// Install TernoboApp
Vue.use(plugin);
Vue.use(PortalVue);

Vue.use(TernoboApp);

// Install Infinite Scroll
Vue.use(infiniteScroll);

Vue.component("vue-circle", VueCircle);

Vue.prototype.$APP_URL = window.APP_URL;
Vue.prototype.$axios = axios;

const app = document.getElementById('app');

window.TProgress = TProgress;

Vue.prototype.seen_content = [];
Vue.prototype.seen_request = [];
if (user_id) {
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
}

let instanceData = JSON.parse(document.body.dataset.wire);
document.body.dataset.wire = "";
let component = instanceData.component;
const vue_app = new Vue({
    store: require("./store").default,
    render: (h) =>
        h(Application, {
            props: {
                initialData: {
                    data: instanceData.data,
                    shared: instanceData.shared
                },
                initialComponent: component,
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
            url: window.location.pathname
        }
    }
}).$mount(app);
if (user_id) {
    const notificationChannel = window.Echo.private("notification." + window.user_id);
    notificationChannel.listen("NotificationEvent", function (data) {
        if (vue_app.$page) {
            let event = new CustomEvent('notification:new', {
                bubbles: true,
                detail: {
                    notification: data.message
                }
            });
            document.dispatchEvent(event);
            vue_app.$store.state.notifications_count += 1;
        }
    });
}
window.addEventListener('popstate', () => {
    vue_app.url = window.location.pathname;
});

document.addEventListener('ternobo:navigate', event => {
    console.log("hello");
    vue_app.url = event.detail.location;
    TProgress.start();
});
document.addEventListener("ternobo:loaded", event => {
    vue_app.url = window.location.pathname;
});

document.addEventListener("ternobo:finish", event => {
    setTimeout(() => TProgress.done(), 500);
});
