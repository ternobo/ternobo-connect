import PeopleSuggestion from "../Components/App/PeopleSuggestion";
import LoadingButton from "../Components/buttons/LoadingButton";
import PostCard from "../Components/PostCard/PostCard.vue";
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
import NewPostModal from "../Components/Modals/NewPostModal";
import TextareaAutosize from "../Components/inputs/TextareaAutosize";
import CopyToClipboard from "../Directives/CopyToClipboard";
import {
    Tselect
} from "tselect";

const TernoboApp = {};

TernoboApp.install = function (Vue, options) {
    Vue.component("tabs", Tabs);
    Vue.component("tab", Tab);
    Vue.component("base-layout", BaseLayout);
    Vue.component("sidebar-left", LeftSidbar);
    Vue.component("sidebar-right", RightSidebar);
    Vue.component("user-card", UserInfoCard);
    Vue.component("post-card", PostCard);
    Vue.component("people-suggestion", PeopleSuggestion);
    Vue.component("loading-button", LoadingButton);
    Vue.component("lazy-image", LazyImage);
    Vue.component("loading-spinner", LoadingSpinner);
    Vue.component("new-post-card", NewPostCard);
    Vue.component("new-post-modal", NewPostModal);
    Vue.component("tselect", Tselect);
    Vue.component("textarea-autosize", TextareaAutosize);

    // Directives
    Vue.directive("lazyload", LazyloadDirective);
    Vue.directive("clipboard", CopyToClipboard);

    const setup = function(vm) {
        Vue.prototype.toast = function (msessage) {
            vm.$bvToast.toast(msessage, {
                noCloseButton: true,
                toaster: "b-toaster-bottom-left",
                bodyClass: ["bg-dark", "text-right", "text-white"],
                solid: true
            });
        }
    };

    Vue.mixin({
        beforeCreate() {
            setup(this);
        },
        methods: {
            handleError(errors){
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