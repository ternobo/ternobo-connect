<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex mb-3 aling-items-center justify-content-between">
            <h5>تجربیات</h5>
        </div>
        <div v-sortable="{ handle: '.sort',onUpdate: onUpdate }">
            <Experience :edit="edit"></Experience>
            <Experience :edit="edit"></Experience>
        </div>
    </div>
</div>
</template>

<script>
import Experience from "./Experience";
export default {
    methods: {
        onUpdate(event) {
            console.log(event);
        }
    },

    props: {
        edit: {
            type: Boolean,
            default: false
        },

    },
    components: {
        Experience
    }
}
</script>

<style>

</style>
