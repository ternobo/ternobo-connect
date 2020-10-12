<template>
<base-layout>
    <sidebar-left>
    </sidebar-left>
    <div class="content-container-full">
        <div class="card">
            <lazy-image :src="page.cover" class="card-img-top page-cover" />
            <div class="card-body pageinfo-card">
                <div class="profile">
                    <lazy-image :src="page.profile" class="rounded-circle profile clickale" />
                    <span style="opacity: 0">camera</span>
                </div>
            </div>
        </div>
    </div>
</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
export default {
    name: "UserProfile",
    props: {
        page: {
            type: Object,
            default: undefined,
        },
    },
    layout: AppLayout
}
</script>

<style>
</style>
