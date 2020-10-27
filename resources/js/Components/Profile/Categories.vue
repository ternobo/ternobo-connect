<template>
<div class="card">
    <div class="card-body">
        <div class="title mb-3">
            <strong class="font-18">
                دسته‌بندی‌ها
            </strong>
        </div>

        <div class="actions-list" v-if="!article">
            <inertia-link class="action-item" href="?action=likes">
                <i class="material-icons">favorite_border</i> پسند‌ها
            </inertia-link>
            <inertia-link class="action-item" href="?action=comments">
                <i class="material-icons-outlined">comment</i> نظرات
            </inertia-link>
            <inertia-link class="action-item" href="?action=shares">
                <i class="material-icons-outlined">share</i> بازنشر‌ها
            </inertia-link>
        </div>

        <hr>

        <div class="categories">
            <div class="d-flex justify-content-between">
                <inertia-link :href="'/'+slug+'/category/all/' + location" class="text-light hover-dark">
                    <i class="material-icons">layers</i> همه‌ی مطالب
                </inertia-link>
                <i class="clickable text-light hover-dark material-icons-outlined">edit</i>
            </div>
            <ul class="pr-3 text-light border-right">
                <li v-for="category in categories" :key="category.id">
                    <inertia-link :href="'/'+slug+'/category/'+category.id + '/' +location">{{ category.name }}</inertia-link>
                </li>
            </ul>
        </div>

    </div>
</div>
</template>

<script>
export default {
    props: {
        categories: {
            type: Array,
            default: [],
            required: true
        },
        slug: {
            type: String,
            default: undefined,
            required: true
        },
        location: {
            type: String,
            default: undefined,
            required: true
        },
        article: {
            type: Boolean,
            default: false,
            required: false
        },

    },

}
</script>

<style lang="scss">
.actions-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .action-item {
        background: #EEE;
        padding: 5px 10px;
        border-radius: 32px;
        margin-left: 15px;
    }

    .action-item.active {
        background: #E0E0E0;
    }

    .action-item:not(:last-child) {
        margin-bottom: 15px;
    }

    ul {
        list-style: none;
    }
}
</style>
