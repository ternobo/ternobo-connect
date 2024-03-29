import LoadingButton from "../Components/buttons/LoadingButton";
import LazyImage from "../Components/LazyImage";
import Tab from "../Components/Tabs/Tab";
import Tabs from "../Components/Tabs/Tabs";
import BaseLayout from "../Layouts/BaseLayout";
import LeftSidbar from "../Layouts/LeftSidbar";
import RightSidebar from "../Layouts/RightSidebar";
import LazyloadDirective from "../Directives/LazyloadDirective";
import LoadingSpinner from "../Components/LoadingSpinner";
import CopyToClipboard from "../Directives/CopyToClipboard";
import TimeAgo from 'javascript-time-ago';
import numeral from "numeral";
import LanguageLink from "../Components/App/LanguageLink.vue";

// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
TimeAgo.addLocale(fa);


import MaterialTextField from "../Components/inputs/MaterialTextField";
import MaterialTextArea from "../Components/inputs/MaterialTextArea";
import ContenteditableMax from "../Directives/ContenteditableMax";
import ClickOutside from "../Directives/ClickOutside";
import PersianDate from 'persian-date';
import NumericOnly from "../Directives/NumericOnly";
import Skeleton from "../Components/Skeleton/Skeleton.vue";

window.PersianDate = PersianDate;

const TernoboApp = {};

var Sortable = require('sortablejs').default

TernoboApp.install = function (Vue, options) {
    Vue.component("AppHeader", () => import("../Components/App/header/AppHeader"));
    Vue.component("AppFooter", () => import("../Components/App/AppFooter"));

    Vue.component("dropdown-menu", () => import("../Components/Menues/dropdown/DropdownMenu.vue"));
    Vue.component("dropdown-item", () => import("../Components/Menues/dropdown/DropdonwItem.vue"));

    Vue.component("ConnetionButtons", () => import("../Components/buttons/ConnetionButtons.vue"));

    Vue.component("skeleton", Skeleton);

    Vue.component("MaterialTextField", MaterialTextField);
    Vue.component("MaterialTextArea", MaterialTextArea);

    Vue.component("tabs", Tabs);
    Vue.component("user-badges", () => import("../Components/UserBadge.vue"));
    Vue.component("tab", Tab);
    Vue.component("base-layout", BaseLayout);
    Vue.component("sidebar-left", LeftSidbar);
    Vue.component("sidebar-right", RightSidebar);
    Vue.component("user-card", () => import(/* webpackChunkName: "UserInfoCard" */ "../Components/Cards/UserInfoCard"));
    Vue.component("language-link", LanguageLink)
    Vue.component("likes-modal", () => import(/* webpackChunkName: "LikesModal" */ "../Components/Modals/LikesModal"));

    Vue.component("post-card", () => import("../Components/PostCard/PostCard"));
    Vue.component("people-suggestion", () => import("../Components/App/PeopleSuggestion"));
    Vue.component("spoiler", () => import("../Components/Spoiler"));
    Vue.component("loading-button", LoadingButton);
    Vue.component("lazy-image", LazyImage);
    Vue.component("loading-spinner", LoadingSpinner);
    Vue.component("new-post-card", () => import(/* webpackChunkName: "NewPostCard" */ "../Components/Cards/NewPostCard"));
    Vue.component("tselect", () => import(/* webpackChunkName: "Tselect" */ "../Components/Tselect"));
    Vue.component("textarea-autosize", () => import(/* webpackChunkName: "TextareaAutosize" */ "../Components/inputs/TextareaAutosize"));
    // Directives
    Vue.directive("lazyload", LazyloadDirective);
    Vue.directive("clipboard", CopyToClipboard);

    Vue.component('social-content', () => import("./SocialContent"));

    Vue.directive('numericOnly', NumericOnly);

    Vue.directive("max-contenteditable", ContenteditableMax)

    Vue.directive('click-outside', ClickOutside);

    Vue.directive('sortable', function (el, binding) {
        binding = binding || {}
        new Sortable(el, binding.value)
    });

    Vue.prototype.reverse = function (array) {
        return array.slice().reverse()
    };

    Vue.prototype.copyText = function (text) {
        return window.navigator.clipboard.writeText(text);
    };

    Vue.directive('reached', {
        inserted: function (el, binding) {
            let action = binding.value;
            let options = {
                rootMargin: '0px',
                threshold: 0.3
            }

            let observer = new IntersectionObserver(action, options);
            observer.observe(el);
        }
    });

    Vue.directive("no-space", function (el) {
        el.addEventListener("keydown", function (e) {
            if (e.which === 32)
                return e.preventDefault();
        }, false);

        el.addEventListener("change", function (e) {
            el.value = el.value.replace(/\s/g, "");
        }, false);

    })

    Vue.component('draggable', () => import(/* webpackChunkName: "draggable" */  "vuedraggable"));

    require("./TimeDate").default(Vue);

    Vue.prototype.formatNumber = function (number, format) {
        return numeral(number).format(format);
    };

    Vue.prototype.userURL = (user) => {
        return '/' + user.username;
    }

    Vue.prototype.toURL = (text) => {
        return text.startsWith("https://") || text.startsWith("http://") || text.startsWith("//") ? text : `http://${text}`;
    }

    Vue.prototype.assetURL = (text) => {
        return text.startsWith("https://") || text.startsWith("http://") || text.startsWith("/") ? text : `/${text}`;
    }

    const setup = function (vm) {
        Vue.prototype.toast = function (msessage, icon = 'error_outline', iconClass = 'text-warning') {
            this.$root.application.addToast({
                text: msessage,
                icon: icon,
                iconClass: iconClass,
            });
        };
        Vue.prototype.time = function (time) {
            const timeAgo = new TimeAgo('fa-FA');
            let timeAgoStr = timeAgo.format(Date.parse(time), 'fa_FA')
            return timeAgoStr == '۰ ثانیه پیش' ? 'هم‌اکنون' : timeAgoStr;
        };
        Vue.prototype.encodeQueryData = function (data) {
            const ret = [];
            for (let d in data)
                ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            return ret.join('&');
        };
    };

    Vue.mixin({
        data() {
            return {
                appDirection: window.document.body.dir,
                skeletonOptions: {
                    coverColor: "#C8C8C8",
                    profileColor: "#E0E0E0",
                    dafaultColor: "#EEEEEE"
                }
            }
        },
        beforeCreate() {
            setup(this);
        },
        methods: {
            confirmDialog(content, modalOptions = {}) {
                return this.$bvModal
                    .msgBoxConfirm(content, {
                        size: "sm",
                        okTitle: __.get("application.confirm"),
                        cancelTitle: __.get("application.cancel"),
                        hideHeaderClose: false,
                        cancelVariant: "transparent text-grey",
                        centered: true,
                        bodyClass: 'confirm-dialog-body',
                        ...modalOptions
                    })
            },
            deleteConfirmModal(itemName, index, arr) {
                const h = this.$createElement;
                let content = h("div", { domProps: { innerHTML: __.get("messages.delete-confirm", { attribute: itemName }) } })
                return this.$bvModal
                    .msgBoxConfirm(content, {
                        size: "sm",
                        okTitle: __.get("application.confirm"),
                        cancelTitle: __.get("application.cancel"),
                        hideHeaderClose: false,
                        cancelVariant: "transparent text-grey",
                        centered: true,
                        bodyClass: 'confirm-dialog-body',
                    }).then((value) => {
                        if (value) {
                            arr.splice(index, 1);
                        }
                    })
            },
            checkUser(id) {
                if (this.$store.state.user !== null) {
                    return this.$store.state.user.id == id;
                }
                return false;
            },
            handleError(errors, type = null) {
                Object.keys(errors).forEach((item) => {
                    let msg = errors[item].flat()[0];
                    if (type != null && type != undefined) {
                        msg = msg.replaceAll('{{ type }}', type);
                    }

                    this.$root.application.addToast({
                        text: msg,
                        icon: "cancel",
                        iconClass: "material-icons-outlined text-danger",
                    });
                });
            }
        },
    })

}


export default TernoboApp;
