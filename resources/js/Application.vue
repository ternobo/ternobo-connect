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

export default {
    props: ['initialPage', 'resolveComponent', 'transformProps'],
    components: {
        InertiaApp,
    },
}
</script>

<style lang="scss">
</style>
