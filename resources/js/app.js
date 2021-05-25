require('./bootstrap');
import Vue from 'vue';
window.maxlengthContentEditableLib = require('maxlength-contenteditable').maxlengthContentEditable;
import {
    plugin,
} from 'ternobowire-js';
import PortalVue from 'portal-vue'
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
import VueMasonry from 'vue-masonry-css';

Vue.use(VueMasonry);
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

Vue.component("vue-circle", VueCircle);

Vue.prototype.$APP_URL = window.APP_URL;
Vue.prototype.$axios = axios;

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

let isSocketConnected = false;

document.addEventListener('ternobo:userloaded', event => {
    let notification = new Audio("/sounds/notification1.mp3")

    let user = event.detail.user;

    if (user) {
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
        ;
        window.Echo.connector.socket.on("connection", () => {
            Echo.connector.socket.emit("clientInfo", { user_id: user.id, name: user.username });
        })
    }

    if (user && !isSocketConnected) {
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
        if (window.hasOwnProperty("Notification")) {
            Notification.requestPermission();
        }
        const notificationChannel = window.Echo.private("notifications." + user.id);
        notificationChannel.listen("NotificationEvent", function (data) {
            let notificationEvent = new CustomEvent('notification:new', {
                bubbles: true,
                detail: {
                    notification: data.message
                }
            });
            document.dispatchEvent(notificationEvent);
            vue_app.$store.state.notifications_count += 1;
        });

        const chatChannel = window.Echo.private("ternobo-chat.user." + user.id);
        chatChannel.listen("\\Ternobo\\TernoboChat\\Events\\MessageEvent", function (data) {
            if (!data.muted) {
                if (vue_app.$store.state.url != "/chats") {
                    vue_app.$store.commit("addUnreadMessage");
                }
                notification.play();
                if (window.hasOwnProperty("Notification") && Notification.permission == 'granted') {
                    new Notification(data.message.sender.name, {
                        body: data.message.sender.name + ": " + (data.message.text != null ? data.message.text : data.message.type),
                        icon: window.location.origin + '/favicon-32x32.png'
                    });
                }
            }
            let messageEvent = new CustomEvent('message:new', {
                bubbles: true,
                detail: {
                    message: data.message
                }
            });
            document.dispatchEvent(messageEvent);
        });
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
