<template>
<div class="post-box" data-id="93" id="post-93">
    <div class="post-header pt-0">
        <a class="publisher" href="https://ternobo.com/soroosh">
            <img src="https://ternobo.com/profiles/wiOsB8OZiyONOBiC6xC77ME1fzX3zNDPaELATd8i.jpeg" />
            <div>
                <strong>
                    {{ post.page.name }}
                </strong>
                <text class="text-muted font-12">
                    {{ post.page.short_bio }}
                </text>
                <span class="text-light font-10">
                    <small class="text-light font-10"> </small>
                    <i class="material-icons-outlined font-14 text-light verical-middle">public</i>
                </span>
            </div>
        </a>
        <div class="actions position-relative">
            <i class="material-icons clickale text-muted hover-dark" onclick="Ternobo.bookmark('93', this)">bookmark_border</i>
            <div>
                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                    <template v-slot:button-content>
                        <i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
                    </template>
                    <b-dropdown-item href="#">Action</b-dropdown-item>
                    <b-dropdown-item href="#">Another action</b-dropdown-item>
                    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </div>
    <div class="post-body">
        <pre class="text" id="posteditable-93">
        {{ post.text }}
        </pre>
    </div>
    <div class="post-footer">
        <div class="tagandcate">
            <div class="tags">
                <a v-for="tag in post.tags" :key="tag" class="tag-item" href="https://ternobo.com/tags/کسب‌وکار">
                    {{ tag }}
                </a>
            </div>
            <a class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
                <i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
            </a>
        </div>
        <div class="images">

        </div>
        <div class="actions">
            <text class="font-08rem">

            </text>
            <div class="buttons">
                <i class="material-icons-outlined" onclick="Ternobo.showSharePost('93', this)">sync</i>
                <i class="material-icons-outlined" onclick="openComments(this)">comment</i>
                <i class="material-icons like" onclick="likePost(this)" data-post="93">favorite_border</i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "PostCard",
    props: {
        post: {
            type: Object,
            default: undefined,
            required: true,
        },
    },
};
</script>

<style>
</style>
