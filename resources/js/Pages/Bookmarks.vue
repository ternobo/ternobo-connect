<template>
<base-layout>
    <sidebar-right>
        <!-- Here is Right Sidebar !-->
    </sidebar-right>
    <div class="content-container">
        <!-- TODO !-->
    </div>
    <sidebar-left>
        <user-card></user-card>
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";

export default {
    name: "bookmarks",
    props: {
        posts: {
            type: Object,
            default: undefined
        }
    },
        layout: AppLayout

}
</script>

<style>

</style>
