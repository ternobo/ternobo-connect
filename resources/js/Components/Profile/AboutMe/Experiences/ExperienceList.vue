<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex mb-3 aling-items-center justify-content-between">
            <h5>تجربیات</h5>
        </div>
        <div v-sortable="{ handle: '.sort' }">
            <Experience></Experience>
        </div>
    </div>
</div>
</template>

<script>
import Experience from "./Experience";
export default {
    components: {
        Experience
    }
}
</script>

<style>

</style>
