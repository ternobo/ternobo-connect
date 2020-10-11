<template>
<div class="post-box" data-id="93" id="post-93">
    <div class="post-header pt-0">
        <a class="publisher" :href="'/'+post.page.slug">
            <img :src="post.page.profile" />
            <div>
                <strong>
                    {{ post.page.name }}
                </strong>
                <text class="text-muted font-12">
                    {{ post.page.short_bio }}
                </text>
                <span class="text-light font-10">
                    {{ post_time }}
                    <small class="text-light font-10" v-if="post.updated_at !== null">
                        ویرایش شده در {{ updated_at }}
                    </small>
                    <i class="material-icons-outlined font-14 text-light verical-middle">
                        {{ post.show === 'public'? 'public' : 'group' }}
                    </i>
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
                    <b-dropdown-item href="#">
                        <i class="material-icons text-muted">link</i> رونوشت پیوند این محتوا
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                        <div class="d-flex flex-column">
                            <span>
                                <i class="material-icons text-muted">link</i> رونوشت پیوند این محتوا
                            </span>
                            <small>
                                یو میو میو
                            </small>
                        </div>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </div>
    <inertia-link class="post-body clickale" :href="postSlug">
        <div class="images articleimg">
            <lazy-image style="min-height: 400px" class="m-0" alt="" :src="post.medias" />
        </div>
        <h4 class="mt-3 mb-0">{{ post.title }}</h4>
    </inertia-link>
    <div class="post-footer">
        <div class="tagandcate">
            <div class="tags">
                <inertia-link v-for="tag in post.tags" :key="tag" class="tag-item" :href="'/tags/' + tag">
                    {{ tag }}
                </inertia-link>
            </div>
            <inertia-link class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
                <i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
            </inertia-link>
        </div>
        <div class="images">

        </div>
        <div class="actions">
            <text class="font-08rem">

            </text>
            <div class="buttons">
                <i class="material-icons-outlined">sync</i>
                <i class="material-icons-outlined">comment</i>
                <i class="material-icons like" @click="like" :class="{ 'text-danger': liked }">{{ liked ? 'favorite': 'favorite_border' }}</i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import fa from 'javascript-time-ago/locale/fa'

TimeAgo.addLocale(fa)

export default {
    data() {
        return {
            liked: false
        }
    },
    created: function () {
        this.liked = this.post.is_liked;
    },
    methods: {
        like() {
            if (this.liked) {
                this.liked = false;
            } else {
                this.liked = true;
            }
            const $this = this;
            this.$axios({
                method: "post",
                url: this.$APP_URL + "/like/" + this.post.id
            }).catch((error) => {});
        }
    },
    name: "SimplePost",
    props: {
        post: {
            type: Object,
            default: undefined,
            required: true,
        }
    },
    computed: {
        post_time: function () {
            const timeAgo = new TimeAgo('fa-FA');
            return timeAgo.format(Date.parse(this.post.created_at), 'twitter') + " ● ";
        },
        postSlug: function () {
            const post_slug = this.post.id;
            if (this.post.slug.length > 0) {
                post_slug = this.post.slug;
            }
            const page_slug = this.post.page.slug;
            return this.$APP_URL + "/" + page_slug + "/" + post_slug;
        },
        updated_at: function () {
            if (this.post.updated_at !== null) {
                const timeAgo = new TimeAgo('fa-FA');
                return timeAgo.format(Date.parse(this.post.updated_at), 'twitter') + " ● ";
            }
            return "";
        }
    }
};
</script>
