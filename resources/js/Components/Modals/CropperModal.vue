<template>
<b-modal v-model='showModal' no-close-on-backdrop hide-footer :title="title" size="lg" :centered="true">
    <cropper class="cropper" ref="cropper" :src="image" :stencil-props="{ aspectRatio: aspectRatio }"></cropper>
    <div class="w-100 align-items-center py-3 px-2 d-flex">
        <button class="btn btn-primary" @click="cropImage">تایید</button>
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
        cropImage() {
            const {
                canvas,
                coordinates
            } = this.$refs.cropper.getResult();
            canvas.toBlob((blob) => {
                this.$emit("cropped", coordinates, canvas);
                this.$emit("update:show", false)
            });
        },
    },
    props: {
        image: {
            default: undefined,
            required: true
        },
        aspectRatio: {
            default: 16 / 12,
            required: false
        },
        title: {
            type: String,
            default: undefined,
            required: true
        },
    },
    components: {
        Cropper
    },
    mixins: [ModalMixin],
};
</script>

<style>
</style>
