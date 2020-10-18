<template>
<div class="comments px-2" v-infinite-scroll="loadMore" :infinite-scroll-disabled="commentsLoading" infinite-scroll-distance="5">
    <new-comment :post="post" @submit="submit"></new-comment>
    <comment v-for="comment in comments" v-on:deleted="commentDelete" :comment="comment" :key="comment.id"></comment>
    <div class="d-flex w-100 justify-content-center align-items-center py-3" v-if="commentsLoading">
        <LoadingSpinner></LoadingSpinner>
    </div>
</div>
</template>

<script>
import LoadingSpinner from "../LoadingSpinner";
import Comment from "./Comment";
import NewComment from "./NewComment";
export default {
    methods: {
        submit(comment) {
            this.comments.unshift(comment);
        },
        commentDelete(comment) {
            const index = this.comments.indexOf(comment);
            if (index > -1) {
                this.comments.splice(index, 1);
                this.loadMore();
            }
        },
        loadMore() {
            if (this.next_page_url !== null && !this.commentsLoading) {
                this.commentsLoading = true;
                axios
                    .get(this.next_page_url)
                    .then((response) => {
                        const data = response.data;
                        if (data.result) {
                            this.next_page_url = data.data.next_page_url;
                            this.comments = this.comments.concat(data.data.data);
                        }
                        this.commentsLoading = false;
                    }).catch((error) => console.log(error))
                    .then(() => this.commentsLoading = false);
            }
        }
    },
    props: {
        post: {
            type: Number,
            default: undefined,
            required: true,
        },
    },
    mounted() {
        axios
            .get(this.$APP_URL + "/posts/" + this.post + "/comments")
            .then((response) => {
                const data = response.data;
                if (data.result) {
                    this.next_page_url = data.data.next_page_url
                    this.comments = data.data.data;
                }
                this.commentsLoading = false;

            }).catch((error) => console.log(error));
    },
    data() {
        return {
            commentsLoading: true,
            comments: undefined,
            next_page_url: null
        };
    },
    name: "CommentsList",
    components: {
        LoadingSpinner,
        Comment,
        NewComment
    }
};
</script>

<style>
</style>
