<template>
<div id="app">
    <AppHeader></AppHeader>
    <transition mode="out-in" name="fade">
        <slot></slot>
    </transition>
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
