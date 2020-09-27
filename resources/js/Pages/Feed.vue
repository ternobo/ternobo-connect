<template>
<base-layout>
    <sidebar-right>
        <div class="card">
            <div class="card-body px-2 py-1">
                <people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
            </div>
        </div>
    </sidebar-right>
    <div class="content-container">

    </div>
    <sidebar-left>
        <user-card></user-card>
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";

export default {
    name: "Feed",
    props: {
        posts: {
            type: Object,
            default: undefined
        },
        pages: {
            type: Array,
            defautl: undefined
        }
    },
    layout: AppLayout
};
</script>

<style>
</style>
