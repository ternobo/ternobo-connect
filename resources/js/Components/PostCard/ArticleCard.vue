<template>
<div class="post-box" data-id="93" id="post-93">
    <EmbedCodeModal :show.sync='showEmbed'></EmbedCodeModal>
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
                    <b-dropdown-item v-clipboard="$APP_URL+'/posts/'+post.id">
                        <i class="material-icons text-dark">link</i>
                        <strong>رونوشت پیوند این محتوا</strong>
                    </b-dropdown-item>
                    <b-dropdown-item @click.native="showEmbed = true">
                        <div class="d-flex align-items-center">
                            <i class="material-icons ml-2 text-dark">code</i>
                            <div>
                                <div>
                                    <strong>
                                        دریافت کد امبد
                                    </strong>
                                </div>
                                <small class="text-muted">
                                    کد امبد را کپی کرده و در وب‌سایت خودتان قرار دهید.
                                </small>
                            </div>
                        </div>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <div class="d-flex align-items-center">
                            <i class="material-icons-outlined ml-2 text-dark">report</i>
                            <div>
                                <div>
                                    <strong>
                                        گزارش تخلف
                                    </strong>
                                </div>
                                <small class="text-muted">
                                    این دیدگاه در تضاد با قوانین ترنوبو است
                                </small>
                            </div>
                        </div>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <div class="d-flex align-items-center">
                            <i class="material-icons ml-2 text-dark">not_interested</i>
                            <div>
                                <div>
                                    <strong>
                                        دنبال نکردن {{ post.page.name }}
                                    </strong>
                                </div>
                                <small class="text-muted">
                                    دیگر محتوای {{ post.page.name }} را تماشا نکنید.
                                </small>
                            </div>
                        </div>
                    </b-dropdown-item>
                    <b-dropdown-item class="hover-danger" v-if="post.page.user_id = $page.user.id">
                        <div class="d-flex align-items-center">
                            <i class="material-icons-outlined ml-2 text-dark">delete_sweep</i>
                            <div>
                                <div>
                                    حذف کردن
                                </div>
                            </div>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </div>
    <inertia-link class="post-body clickale" :href="postSlug">
        <div class="images articleimg" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
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
import EmbedCodeModal from "../Modals/EmbedCodeModal";
// Load locale-specific relative date/time formatting rules.
import fa from 'javascript-time-ago/locale/fa'

TimeAgo.addLocale(fa)

export default {
    data() {
        return {
            liked: false,
            showEmbed: false,
        }
    },
    created: function () {
        this.liked = this.post.is_liked;
    },
    components: {
        EmbedCodeModal
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
