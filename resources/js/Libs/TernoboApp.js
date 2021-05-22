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

// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
TimeAgo.addLocale(fa);


import MaterialTextField from "../Components/inputs/MaterialTextField";
import MaterialTextArea from "../Components/inputs/MaterialTextArea";

import PersianDate from 'persian-date';

import Skeleton from "../Components/Skeleton/Skeleton.vue";

import TextareaParser from "../Components/NewPost/Editor/TextareaParser";

window.PersianDate = PersianDate;

const TernoboApp = {};

var Sortable = require('sortablejs').default

TernoboApp.install = function (Vue, options) {
    Vue.component("AppHeader", () => import("../Components/App/header/AppHeader"));
    Vue.component("AppFooter", () => import("../Components/App/AppFooter"));

    Vue.component("ConnetionButtons", () => import("../Components/buttons/ConnetionButtons.vue"));

    Vue.component("skeleton", Skeleton);

    Vue.component("MaterialTextField", MaterialTextField);
    Vue.component("MaterialTextArea", MaterialTextArea);

    Vue.component("tabs", Tabs);
    Vue.component("tab", Tab);
    Vue.component("base-layout", BaseLayout);
    Vue.component("sidebar-left", LeftSidbar);
    Vue.component("sidebar-right", RightSidebar);
    Vue.component("user-card", () => import(/* webpackChunkName: "UserInfoCard" */ "../Components/Cards/UserInfoCard"));

    Vue.component("likes-modal", () => import(/* webpackChunkName: "LikesModal" */ "../Components/Modals/LikesModal"));

    Vue.component("post-card", () => import("../Components/PostCard/PostCard"));
    Vue.component("people-suggestion", () => import("../Components/App/PeopleSuggestion"));
    Vue.component("loading-button", LoadingButton);
    Vue.component("lazy-image", LazyImage);
    Vue.component("loading-spinner", LoadingSpinner);
    Vue.component("new-post-card", () => import(/* webpackChunkName: "NewPostCard" */ "../Components/Cards/NewPostCard"));
    Vue.component("tselect", () => import(/* webpackChunkName: "Tselect" */ "../Components/Tselect"));
    Vue.component("textarea-autosize", () => import(/* webpackChunkName: "TextareaAutosize" */ "../Components/inputs/TextareaAutosize"));
    // Directives
    Vue.directive("lazyload", LazyloadDirective);
    Vue.directive("clipboard", CopyToClipboard);

    Vue.component('social-content', {
        template: '<component v-bind:is="transformed"></component>',
        props: ['text'],
        methods: {
            convertHashTags: function (content) {
                content = content.replace(/\B#(\S+)/gu, "<wire-link href='/tags/$1' class='text-action'>#$1</wire-link>").replace(/\B@(\w+)/gu, "<wire-link href='/$1' class='mention-item'>@$1</wire-link>");
                const spanned = `<pre class='post-content--text'>${content}</pre>`
                return spanned;
            }
        },
        computed: {
            transformed() {
                const template = this.convertHashTags(this.text);
                return {
                    template: template,
                    props: this.$options.props
                }
            }
        }
    })

    Vue.directive('numericOnly', {
        bind(el) {
            el.addEventListener('keydown', (e) => {
                var code = (e.which) ? e.which : e.keyCode;
                if (code > 31 && (code < 48 || code > 57) && !(code <= 105 && code >= 96)) {
                    e.preventDefault();
                }
            })
        }
    })

    Vue.directive('click-outside', {
        inserted: function (el, binding, vnode) {
            el.clickOutsideEvent = function (event) {
                // here I check that click was outside the el and his children
                if (!(el == event.target || el.contains(event.target))) {
                    // and if it did, call method provided in attribute value
                    vnode.context[binding.expression](event);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function (el) {
            document.body.removeEventListener('click', el.clickOutsideEvent)
        },
    });

    Vue.directive('sortable', function (el, binding) {
        binding = binding || {}
        var sortable = new Sortable(el, binding.value)
    });

    Vue.prototype.reverse = function (array) {
        return array.slice().reverse()
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

    Vue.component('date-picker', () => import(/* webpackChunkName: "vue-persian-datetime-picker" */ "vue-persian-datetime-picker"));

    Vue.component('draggable', () => import(/* webpackChunkName: "draggable" */  "vuedraggable"));

    Vue.prototype.yearsFrom = function (startYear, to) {
        var currentYear = to || new PersianDate().year(), years = [];
        startYear = startYear || 1980;
        while (currentYear >= startYear) {
            years.push(currentYear--);
        }
        return years;
    }

    Vue.prototype.formatTime = function (time, format) {
        return new PersianDate(time).format(format);
    }

    Vue.prototype.months = function (to) {
        to = to || 12;
        let months = [];
        for (let i = 1; i <= to; i++) {
            months.push(
                {
                    label: new PersianDate()._monthName(i),
                    id: i
                }
            );
        }
        return months;
    }

    Vue.prototype.formatNumber = function (number, format) {
        return numeral(number).format(format);
    };

    Vue.prototype.userURL = (user) => {
        return '/' + user.username;
    }

    Vue.prototype.toURL = (text) => {
        return text.startsWith("https://") || text.startsWith("http://") || text.startsWith("//") ? text : `http://${text}`;
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
                        okTitle: "تایید",
                        cancelTitle: "لغو",
                        hideHeaderClose: false,
                        cancelVariant: "transparent text-grey",
                        centered: true,
                        bodyClass: 'confirm-dialog-body',
                        ...modalOptions
                    })
            },
            deleteConfirmModal(itemName, index, arr) {
                const h = this.$createElement;
                let content = ["ایا از حذف ", h("strong", {}, [itemName]), " اطمینان دارید؟"]
                return this.$bvModal
                    .msgBoxConfirm(content, {
                        size: "sm",
                        okTitle: "تایید",
                        cancelTitle: "لغو",
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
                    let msg = errors[item][0];
                    if (type != null && type != undefined) {
                        msg = msg.replaceAll('{{ type }}', type);
                    }

                    this.$root.application.addToast({
                        text: msg
                    });
                });
            }
        },
    })

}


export default TernoboApp;
