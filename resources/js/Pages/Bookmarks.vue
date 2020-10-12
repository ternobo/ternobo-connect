<template>
<base-layout>
    <sidebar-right>
        <!-- Here is Right Sidebar !-->
    </sidebar-right>
    <div class="content-container">
        <!-- TODO !-->
        <Comment></Comment>
    </div>
    <!-- <sidebar-left>
        <user-card></user-card>
    </sidebar-left> -->
</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import Comment from "../Components/Comments/Comment";

export default {
    name: "bookmarks",
    props: {
        posts: {
            type: Object,
            default: undefined
        }
    },
        components: {
        Comment,
    },
        layout: AppLayout

}
</script>

<style>

</style>
