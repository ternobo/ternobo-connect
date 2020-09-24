<template>
<div class="container-fluid">
    <div class="search-section"></div>
    <landing :articles="articles"></landing>
</div>
</template>

<script>
import LawsModal from "../Components/Modals/LawsModal";
import AppHeader from "../Components/App/header/AppHeader";
import Landing from "../Components/App/Landing";
export default {
    props: {
        articles: {
            type: Array,
            default: undefined
        },

    },
    created() {
        console.log(this);
    },
    name: "Welcome",
    components: {
        LawsModal,
        AppHeader,
        Landing
    },
};
</script>

<style>
</style>
