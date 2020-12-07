<template>
<div class="bg-light-blue dropndown-btn" style="height: fit-content;" :class="{'active':open}">
    <button class="add-to-resume-btn" @click="open = !open">
        <i class="material-icons">add</i>
    </button>
    <transition name="slide">
        <ul class="items" v-if="open">
            <li v-for="item in items" :key="'dropdown_'+item.id" @click="$emit('click',item.id);open=false">{{ item.name }}</li>
        </ul>
    </transition>
</div>
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        },

    },

}
</script>

<style lang="scss" scoped>
.active {
    i {
        transform: rotate(-45deg);
    }
}
</style>
