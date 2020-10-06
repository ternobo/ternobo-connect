<template>
<base-layout class="justify-content-center">
    <div class="content-container">
        <div class="row m-0">
            <!-- post img -->
            <div class="col-12 px-0">
                <img class="w-100" :src="post.medias" alt="post image">
            </div>
        </div>
        <div class="mt-4">
            <h1 class="font-title ">{{ post.title }}</h1>
        </div>
        <div class="mt-2"><span class="text-muted">{{ post_time }}</span></div>
        <div class="mt-2 pb-5 border-bottom noselect" v-html="post.text">
        </div>
    </div>
</base-layout>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import fa from 'javascript-time-ago/locale/fa'
import AppLayout from "../../Layouts/AppLayout";
export default {
    name: "Article",
    props: {
        post: {
            type: Object,
            default: undefined
        },

    },
    computed: {
        post_time: function () {
            const timeAgo = new TimeAgo('fa-FA');
            return timeAgo.format(Date.parse(this.post.created_at), 'approximate');
        }
    },
    layout: AppLayout
}
</script>

<style>

</style>
