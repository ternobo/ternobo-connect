<template>
<base-layout>
    <sidebar-right>
        <user-card></user-card>
    </sidebar-right>
    <div class="content-container">
        <new-post-card class="mb-3"></new-post-card>
        <div class="posts">
            <PostCard v-for="post in posts.data" :key="post.id" :post="post"></PostCard>
        </div>
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
import AppLayout from "../Layouts/AppLayout";
import PostCard from "../Components/PostCard/PostCard";

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
    components: {
        PostCard
    },
    layout: AppLayout
};
</script>

<style>
</style>
