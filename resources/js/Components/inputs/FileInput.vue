<template>
<div>
    <input type="file" class="d-none" accept="image/jpeg, image/png, video/mp4, video/avi" ref="fileInput" v-on:change="change" />
    <div @click="open">
        <slot>
            <button class="btn btn-primary">File Select</button>
        </slot>
    </div>
</div>
</template>

<script>
export default {
    name: "FileInput",
    methods: {
        open() {
            this.$refs.fileInput.click();
        },
        change(e) {
            this.$emit("change", e);
        }
    },

}
</script>

<style>

</style>
