<template>
<div>
    <transition name="fade">
        <InertiaApp v-bind="$props"></InertiaApp>
    </transition>
</div>
</template>

<script>
import {
    InertiaApp
} from '@inertiajs/inertia-vue';
import App from "./Layouts/App";
import {
    Inertia
} from '@inertiajs/inertia'

export default {
    props: ['initialPage', 'resolveComponent', 'transformProps'],
    components: {
        InertiaApp,
    }
}
</script>

<style lang="scss">
@import "../sass/application/app.scss";
</style>
