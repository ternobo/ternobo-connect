<template>
<div class="comment">
    <div class="bg-light">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <img :src="comment.page.profile" class="profile-md">
                <div class="pr-2 d-flex flex-column discripPro">
                    <span class="name">{{ comment.page.name }}</span>
                    <span class="roll" v-if="comment.page.short_bio">{{ comment.page.short_bio }}</span>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <span>{{ comment_time }}</span>
                <i class="material-icons">more_vert</i>
            </div>

        </div>
        <div class="mx-3 py-3 text-justify">
            <span>
                {{ comment.text }}
            </span>
        </div>

    </div>
    <div class="d-flex align-content-center justify-content-between pt-2">
        <span v-html="comment.likedBy"></span>
        <div class="actions">
            <i class="material-icons-outlined">
                insert_comment
            </i>
            <i class="material-icons-outlined">
                favorite_border
            </i>
        </div>

    </div>
</div>
</template>

<script>
export default {
    computed: {
        comment_time() {

        },
    },
    props: {
        comment: {
            type: Object,
            default: undefined,
            required: true
        }
    },
    name: "Comment"
}
</script>
