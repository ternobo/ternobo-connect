<template>
<div v-show="isActive">
    <slot></slot>
</div>
</template>

<script>
export default {
    watch: {
        isActive() {
            this.$emit("selected", this.name);
        },
    },
    name: "Tab",
    props: {
        name: {
            required: true
        },
        icon: {
            default: undefined
        },
        selected: {
            default: false
        }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
}
</script>

<style>

</style>
