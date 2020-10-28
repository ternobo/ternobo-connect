<template>
<b-modal v-model='showModal' no-close-on-backdrop hide-footer title="دسته‌بندی مطالب" size="lg" :centered="true">
    <div class="d-flex align-items-center w-100 justify-content-center mb-3">
        <input class="form-control w-50" placeholder="نام دسته بندی">
        <button class="btn btn-primary">ثبت</button>
    </div>
    <div class="categorieslist" v-sortable="{ handle: '.sort',onUpdate: onUpdate }">

    </div>
</b-modal>
</template>

<script>
import ModalMixin from '../../Mixins/Modal';
import {
    Cropper
} from 'vue-advanced-cropper'
export default {
    methods: {
        saveData() {

        },
        onUpdate(event) {

        }
    },
    props: {
        categories: {
            default: [],
            required: true
        }
    },
    components: {
        Cropper
    },
    mixins: [ModalMixin],
};
</script>

<style>
</style>
