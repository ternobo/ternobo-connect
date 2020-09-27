import BaseLayout from "../Layouts/BaseLayout";
import SidebarLeft from "../Layouts/SidebarLeft";
import SidebarRight from "../Layouts/SidebarRight";
import Tabs from "../Components/Tabs/Tabs";
import Tab from "../Components/Tabs/Tab";
import UserInfoCard from "../Components/Cards/UserInfoCard";
import PostCard from "../Components/Cards/PostCard";
import PeopleSuggestion from "../Components/App/PeopleSuggestion";

const TernoboApp = {};

TernoboApp.install = function (Vue, options) {
    Vue.component("tabs", Tabs);
    Vue.component("tab", Tab);
    Vue.component("base-layout", BaseLayout);
    Vue.component("sidebar-left", SidebarLeft);
    Vue.component("sidebar-right", SidebarRight);
    Vue.component("user-card", UserInfoCard);
    Vue.component("post-card", PostCard);
    Vue.component("people-suggestion", PeopleSuggestion);

}

export default TernoboApp;