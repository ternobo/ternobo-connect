<template>
<div class="no-content">
    <slot>
        هیچ محتوایی وجود ندارد
    </slot>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.no-content {
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: 10px;
    color: #C8C8C8;
    padding: 15px 0;

    &::before {
        width: 100%;
        height: 1px;
        background: #c8c8c8;
        content: " ";
    }

    &::after {
        width: 100%;
        height: 1px;
        background: #c8c8c8;
        content: " ";
    }
}
</style>
