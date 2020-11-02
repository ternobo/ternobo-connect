<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-24">دستاورد‌ها</h2>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit">
                <i class="material-icons">add</i>
            </button>
        </div>

        <LanguagesList :edit="edit" :page="page"></LanguagesList>

    </div>
</div>
</template>

<script>
import LanguagesList from "./Languages/LanguagesList";
export default {
    props: {
        page: {
            type: Object,
            default: undefined,
            required: true
        },
        edit: {
            type: Boolean,
            default: false,
            required: false
        },
    },
    components: {
        LanguagesList
    }
}
</script>

<style>

</style>
