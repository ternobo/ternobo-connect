import LoadingButton from "../Components/buttons/LoadingButton";
import UserInfoCard from "../Components/Cards/UserInfoCard";
import LazyImage from "../Components/LazyImage";
import Tab from "../Components/Tabs/Tab";
import Tabs from "../Components/Tabs/Tabs";
import BaseLayout from "../Layouts/BaseLayout";
import LeftSidbar from "../Layouts/LeftSidbar";
import RightSidebar from "../Layouts/RightSidebar";
import LazyloadDirective from "../Directives/LazyloadDirective";
import LoadingSpinner from "../Components/LoadingSpinner";
import NewPostCard from "../Components/Cards/NewPostCard";
import CopyToClipboard from "../Directives/CopyToClipboard";
import {
    Tselect
} from "tselect";
import TimeAgo from 'javascript-time-ago';

const TernoboApp = {};

var Sortable = require('sortablejs').default

TernoboApp.install = function (Vue, options) {
    Vue.component("AppHeader", () => import("../Components/App/header/AppHeader"));
    Vue.component("AppFooter", () => import("../Components/App/AppFooter"));
    Vue.component("tabs", Tabs);
    Vue.component("tab", Tab);
    Vue.component("base-layout", BaseLayout);
    Vue.component("sidebar-left", LeftSidbar);
    Vue.component("sidebar-right", RightSidebar);
    Vue.component("user-card", UserInfoCard);
    Vue.component("post-card", () => import("../Components/PostCard/PostCard"));
    Vue.component("people-suggestion", () => import("../Components/App/PeopleSuggestion"));
    Vue.component("loading-button", LoadingButton);
    Vue.component("lazy-image", LazyImage);
    Vue.component("loading-spinner", LoadingSpinner);
    Vue.component("new-post-card", NewPostCard);
    Vue.component("new-post-modal", () => import("../Components/Modals/NewPostModal"));
    Vue.component("tselect", Tselect);
    Vue.component("textarea-autosize", () => import("../Components/inputs/TextareaAutosize"));
    // Directives
    Vue.directive("lazyload", LazyloadDirective);
    Vue.directive("clipboard", CopyToClipboard);

    Vue.directive('sortable', function (el, binding) {
        binding = binding || {}
        var sortable = new Sortable(el, binding)
    })

    Vue.directive("no-space", function(el){
        el.addEventListener("keydown",function(e){
            if (e.which === 32)
                return e.preventDefault();
        },false);

        el.addEventListener("change",function(e){
            el.value = el.value.replace(/\s/g, "");
        },false);

    })

    Vue.component('date-picker', () => import("vue-persian-datetime-picker"));



    const setup = function (vm) {
        Vue.prototype.toast = function (msessage) {
            vm.$bvToast.toast(msessage, {
                noCloseButton: true,
                toaster: "b-toaster-bottom-left",
                bodyClass: ["bg-dark", "text-right", "text-white"],
                solid: true
            });
        };
        Vue.prototype.time = function (time) {
            const timeAgo = new TimeAgo('fa-FA');
            return timeAgo.format(Date.parse(time), 'twitter');

        }
    };

    Vue.mixin({
        beforeCreate() {
            setup(this);
        },
        methods: {
            handleError(errors) {
                const $this = this;
                Object.keys(errors).forEach(function (item) {
                    $this.$bvToast.toast(errors[item][0], {
                        noCloseButton: true,
                        toaster: "b-toaster-bottom-left",
                        bodyClass: ["bg-dark", "text-right", "text-white"],
                        solid: true
                    });
                })
            }
        },
    })

}


export default TernoboApp;
