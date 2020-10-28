<template>
<div class="categoryitem">
    <div class="info">
        <i class="material-icons-outlined text-light hover-dark p-1 hand-hover">menu</i>
        <i class="material-icons-outlined text-light hover-danger p-1 clickale">delete_sweep</i>
        <i class="material-icons-outlined text-light mr-2">edit</i>
        <span>{{ category.name }}</span>
    </div>
    <div class="postcount text-muted">
        {{ category.post_num }} نوشته
    </div>
</div>
</template>

<script>
export default {
    props: {
        category: {
            type: Object,
            default: undefined,
            required: true
        },

    },

}
</script>

<style>

</style>
