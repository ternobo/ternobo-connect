<template>
<div class="post-box" v-if="post !== undefined">
    <ReshareModal :post="post" :show.sync="showReshare"></ReshareModal>
    <EmbedCodeModal :post="post" :show.sync='showEmbed'></EmbedCodeModal>
    <div class="post-header pt-0">
        <inertia-link class="publisher" :href="'/'+post.page.slug">
            <lazy-image class="mb-0" :src="post.page.profile" />
            <div>
                <strong>
                    {{ post.page.name }}
                </strong>
                <text class="text-muted font-12">
                    {{ post.page.short_bio }}
                </text>
                <span class="text-light font-10">
                    {{ post_time }}
                    <small class="text-light font-10" v-if="post.updated_at !== post.created_at">
                        ویرایش شده در {{ updated_at }}
                    </small>
                    <i class="material-icons-outlined font-14 text-light verical-middle">
                        {{ post.show === 'public'? 'public' : 'group' }}
                    </i>
                </span>
            </div>
        </inertia-link>
        <div class="actions position-relative" v-if="showMenu">
            <i class="material-icons clickale text-muted hover-dark" @click="bookmark">{{ bookmarked ? 'bookmark' : 'bookmark_border' }}</i>
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
    <div class="post-body">
        <pre class="text" id="posteditable-93">{{ post.text }}</pre>
    </div>
    <div class="post-footer">
        <div class="tagandcate">
            <div class="tags">
                <a v-for="tag in post.tags" :key="tag" class="tag-item" :href="'/tags/' + tag">
                    {{ tag }}
                </a>
            </div>
            <a class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
                <i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
            </a>
        </div>
        <div class="images" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
            <lazy-image style="min-height: 400px" class="m-0" alt="" :src="post.medias" />
        </div>
        <div class="actions" v-if="showMenu">
            <div class="font-08rem">

            </div>
            <div class="buttons">
                <i class="material-icons-outlined" @click="showReshare = true">sync</i>
                <i :class="{'material-icons-outlined':!openComment,'material-icons': openComment}" v-on:click="openComment = !openComment">comment</i>
                <i class="material-icons like" @click="like" :class="{ 'text-danger': liked }">{{ liked ? 'favorite': 'favorite_border' }}</i>
            </div>
        </div>
    </div>

    <transition name="slide">
        <div v-if="openComment">
            <CommentsList :post="post.id"></CommentsList>
        </div>
    </transition>
</div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import CommentsList from "../Comments/CommetsList";
import EmbedCodeModal from "../Modals/EmbedCodeModal";

// Load locale-specific relative date/time formatting rules.
import fa from 'javascript-time-ago/locale/fa'
import ReshareModal from "../Modals/ReshareModal";

TimeAgo.addLocale(fa)

export default {
    data() {
        return {
            liked: false,
            bookmarked: false,
            openComment: false,
            showEmbed: false,
            showReshare: false,
        }
    },
    created: function () {
        this.liked = this.post.is_liked;
        this.bookmarked = this.post.is_bookmarked;

    },
    mounted() {
        let options = {
            root: null,
            threshold: 1.0
        }
        const $this = this;
        let observer = new IntersectionObserver(function () {
            if (!$this.seen_content.includes($this.post.id)) {
                $this.seen_content.push($this.post.id);
                $this.seen_request.push($this.post.id);
            }
        }, options);
        observer.observe(this.$el);
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
        },
        bookmark() {
            if (this.bookmarked) {
                this.bookmarked = false;
            } else {
                this.bookmarked = true;
            }
            const $this = this;
            this.$axios({
                method: "post",
                url: this.$APP_URL + "/bookmark/" + this.post.id
            }).catch((error) => {});
        }
    },
    name: "SimplePost",
    components: {
        "CommentsList": CommentsList,
        "EmbedCodeModal": EmbedCodeModal,
        "ReshareModal": ReshareModal
    },
    props: {
        showMenu: {
            type: Boolean,
            default: true,
            required: false
        },
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

<style>
</style>
