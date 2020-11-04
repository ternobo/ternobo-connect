<template>
<base-layout class="justify-content-center bg-white">
    <div class="col-md-8 pb-4 article">
        <div class="row m-0">
            <!-- post img -->
            <div class="col-12 px-0">
                <img class="w-100" v-if="post.medias !== null" :src="post.medias" alt="post image">
            </div>
        </div>
        <div class="mt-4">
            <h1 class="font-title ">{{ post.title }}</h1>
        </div>
        <div class="mt-2"><span class="text-muted">{{ post_time }}</span></div>
        <div class="mt-2 px-0 pb-5 noselect ql-editor" style="word-break: break-word;height:auto" v-html="post.text"></div>
        <div class="tagandcate mt-3">
            <div class="tags">
                <inertia-link v-for="(tag, index) in post.tags" :key="tag + '_POST_TAG_' + post.id + '_' + index" class="tag-item" :href="'/tags/' + tag">
                    {{ tag }}
                </inertia-link>
            </div>
            <inertia-link class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
                <i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
            </inertia-link>
        </div>
        <div class="my-3 py-2 border-top border-bottom">
            <div><span class="publisher-title-size text-muted">منتشر شده توسط</span></div>
            <div class="d-flex justify-content-between flex-lg-row flex-column align-items-center ml-1 mt-2">
                <inertia-link class="d-flex align-items-center text-dark" :href="'/'+post.page.slug">
                    <lazy-image :src="post.page.profile" img-class="profile-md" class="ml-2 mb-0" alt="profile-image" />
                    <div class="d-flex flex-column">
                        <strong>{{ post.page.name }}</strong>
                        <small class="text-muted" v-if="post.page.short_bio !== null && post.page.short_bio.length > 0">{{ post.page.short_bio }}</small>
                        <small class="text-light font-10" v-if="post.created_at !== post.created_at">{{ update_time }}</small>
                    </div>
                </inertia-link>
                <div class="actions">
                    <div class="d-flex flex-lg-row align-items-center">
                        <span class="ml-2">{{ userposts }} مقاله </span>
                        <inertia-link :href="'/articles/'+post.id+'/edit'" class="btn btn-outline-primary" v-if="CheckUser(post.page.user_id)">ویرایش</inertia-link>
                    </div>
                </div>
            </div>
        </div>
        <Comments style="margin: -0.5rem;" :post="post.id"></Comments>
    </div>
</base-layout>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import fa from 'javascript-time-ago/locale/fa'
import AppLayout from "../../Layouts/AppLayout";
import PersianDate from "persian-date";
import Comments from "../../Components/Comments/CommetsList";
import {
    Quill
} from "vue2-editor";
export default {
    mounted() {
        var ColorClass = Quill.import('attributors/class/color');
        var SizeStyle = Quill.import('attributors/style/size');
        Quill.register(ColorClass, true);
        Quill.register(SizeStyle, true);
        document.body.style.background = "#FFF";
    },
    name: "Article",
    props: {
        post: {
            type: Object,
            default: undefined
        },
        userposts: {
            default: 0
        },

    },
    destroyed() {
        document.body.style.removeProperty("background");
    },
    computed: {
        post_time: function () {
            return new PersianDate(Date.parse(this.post.created_at)).format("D MMMM YYYY");
        },
        update_time: function () {
            return new PersianDate(Date.parse(this.post.updated_at)).format("D MMMM YYYY");
        }
    },
    layout: AppLayout,
    components: {
        Comments
    }
}
</script>
