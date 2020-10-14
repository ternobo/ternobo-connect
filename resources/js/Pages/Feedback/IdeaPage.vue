<template>
<base-layout>
    <div class="content-container-right">
        <div class="w-100 d-flex justify-content-end align-items-center py-3">
            <inertia-link class="text-grey" href='/ideas'>
                بازگشت
                <i class="material-icons">keyboard_backspace</i>
            </inertia-link>
        </div>
        <FeedbackCard :idea="idea"></FeedbackCard>
    </div>
    <sidebar-left>
        <div class="card">
            <div class="card-body px-2 py-1">
                <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
            </div>
        </div>
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import NoContent from "../../Components/NoContent";
import FeedbackCard from "../../Components/Feedback/FeedbackCard";

export default {
    props: {
        pages: {
            type: Array,
            default: undefined
        },
        idea: {
            type: Object,
            default: undefined
        },

    },
    components: {
        NoContent,
        FeedbackCard
    },
    name: "Ideapage",
    layout: AppLayout
}
</script>

<style>

</style>
