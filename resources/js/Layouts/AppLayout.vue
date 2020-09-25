<template>
<div id="app">
    <AppHeader></AppHeader>
    <slot></slot>
</div>
</template>

<script>
import AppHeader from "../Components/App/header/AppHeader";
export default {
    name: "AppLayout",
    components: {
        AppHeader
    }
};
</script>

<style>
</style>
