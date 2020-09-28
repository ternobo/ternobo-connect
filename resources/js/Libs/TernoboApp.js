import BaseLayout from "../Layouts/BaseLayout";
import LeftSidbar from "../Layouts/LeftSidbar";
import RightSidebar from "../Layouts/RightSidebar";
import Tabs from "../Components/Tabs/Tabs";
import Tab from "../Components/Tabs/Tab";
import UserInfoCard from "../Components/Cards/UserInfoCard";
import PostCard from "../Components/Cards/PostCard";
import PeopleSuggestion from "../Components/App/PeopleSuggestion";
import LoadingButton from "../Components/buttons/LoadingButton";

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

}

export default TernoboApp;