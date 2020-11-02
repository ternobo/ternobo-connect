<template>
<div>
    <div class="d-flex mb-2 aling-items-center justify-content-between">
        <h3 class="font-18">زبان‌ها</h3>
    </div>
    <ul class="languages-list p-0">
        <li>
            <Skeleton :count="4" :heigth="25" />
        </li>
    </ul>
</div>
</template>

<script>
import {
    Skeleton
} from 'vue-loading-skeleton';
export default {
    components: {
        Skeleton
    }
}
</script>

<style>

</style>
