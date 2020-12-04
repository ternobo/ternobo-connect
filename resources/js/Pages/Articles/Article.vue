<template>
	<base-layout class="justify-content-center bg-white" v-infinite-scroll="loadMoreComment" :infinite-scroll-disabled="commentsLoading" :infinite-scroll-distance="5">
		<likes-modal :item="post.id" :show.sync="showLikes"></likes-modal>
		<reshare-modal :post="post" :show.sync="showReshare"></reshare-modal>

		<div class="col-md-8 pb-4 article">
			<div class="row m-0">
				<!-- post img -->
				<div class="col-12 px-0">
					<img class="w-100" v-if="post.medias !== null" :src="post.medias" alt="post image" />
				</div>
			</div>
			<div class="article-title-section">
				<h1 class="article-title">{{ post.title }}</h1>
				<span class="article-time">{{ post_time }}</span>
			</div>
			<div class="article-text noselect ck ck-content" dir="rtl" style="word-break: break-word; height: auto" v-html="post.text"></div>
			<div class="tagandcate">
				<div class="tags">
					<inertia-link v-for="(tag, index) in post.tags" :key="tag + '_POST_TAG_' + post.id + '_' + index" class="tag-item" :href="'/tags/' + tag">
						{{ tag }}
					</inertia-link>
				</div>
				<inertia-link class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
					<i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
				</inertia-link>
			</div>
			<div class="article-actions">
				<div>
					<div @click="showLikes = true" class="d-flex text-muted clickable" v-if="post.mutual_likes != null && post.mutual_likes.length > 0">
						<span class="ml-1">پسندیده شده توسط</span>
						<inertia-link v-if="post.mutual_likes[0]" :href="'/' + post.mutual_likes[0].page.slug" class="text-dark">
							<strong class="text-light">{{ post.mutual_likes[0].page.name }}</strong>
						</inertia-link>
						<div v-if="post.mutual_likes.length > 1">
							<span class="mr-1">و</span>
							<inertia-link v-if="post.mutual_likes[1]" :href="'/' + post.mutual_likes[0].page.slug" class="text-dark">
								<strong class="text-light">{{ post.mutual_likes[1].page.name }}</strong>
							</inertia-link>
						</div>
						<span class="mx-1" v-if="post.mutual_likes.length > 2"> و ... </span>
					</div>
				</div>
				<div class="d-flex align-items-center">
					<i class="material-icons-outlined" @click="showReshare = true">sync</i>
					<i class="material-icons like" @click="like" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
				</div>
			</div>
			<div class="my-3 py-2 border-top border-bottom">
				<div><span class="publisher-title-size text-muted">منتشر شده توسط</span></div>
				<div class="d-flex justify-content-between flex-lg-row flex-column align-items-center ml-1 mt-2">
					<inertia-link class="d-flex align-items-center text-dark" :href="'/' + post.page.slug">
						<lazy-image :src="post.page.profile" img-class="profile-md" class="ml-2 mb-0" alt="profile-image" />
						<div class="d-flex flex-column">
							<strong>{{ post.page.name }}</strong>
							<small class="text-muted" v-if="post.page.short_bio !== null && post.page.short_bio.length > 0">{{ post.page.short_bio }}</small>
							<small class="text-light font-10" v-if="post.created_at !== post.created_at">{{ update_time }}</small>
						</div>
					</inertia-link>
					<div class="d-flex align-items-center">
						<div class="d-flex flex-lg-row align-items-center">
							<span class="ml-2">{{ userposts }} مقاله </span>
							<inertia-link :href="'/articles/' + post.id + '/edit'" class="btn btn-outline-primary" v-if="checkUser(post.page.user_id)">ویرایش</inertia-link>
						</div>
						<post-menu :post="post" @edit="Inertia.visit('/articles/' + post.id + '/edit')" @deleted="doDelete"></post-menu>
					</div>
				</div>
			</div>

			<div class="comments px-2" style="margin: -0.5rem; max-height: max-content !important">
				<new-comment :post="post.id" @submit="submitComment"></new-comment>
				<comment v-for="comment in comments" v-on:deleted="commentDelete" :comment="comment" :key="'comment_' + comment.id"></comment>
				<div class="d-flex w-100 justify-content-center align-items-center py-3" v-if="commentsLoading">
					<LoadingSpinner></LoadingSpinner>
				</div>
			</div>
		</div>
	</base-layout>
</template>

<script>
import TimeAgo from "javascript-time-ago";
// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
import AppLayout from "../../Layouts/AppLayout";
import PersianDate from "persian-date";

import ReshareModal from "../../Components/Modals/ReshareModal.vue";
import PostMenu from "../../Components/Menues/PostMenu.vue";
import { Inertia } from "@inertiajs/inertia";

import LoadingSpinner from "../../Components/LoadingSpinner";
import Comment from "../../Components/Comments/Comment";
import NewComment from "../../Components/Comments/NewComment";

export default {
	methods: {
		submitComment(comment) {
			this.comments.unshift(comment);
		},
		commentDelete(comment) {
			const index = this.comments.indexOf(comment);
			if (index > -1) {
				this.comments.splice(index, 1);
				this.loadMore();
			}
		},
		loadMoreComment() {
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
					})
					.catch((error) => console.log(error))
					.then(() => (this.commentsLoading = false));
			}
		},

		async doDelete() {
			const res = await this.$dialog.confirm({
				text: "آیا از حذف این مقاله اطمینان دارید؟",
				title: "حذف مقاله",
				actions: {
					false: "لغو",
					true: {
						text: "تایید",
						variant: "primary",
						handle: async () => {
							axios.delete(this.$APP_URL + "/articles/" + this.post.id);
							Inertia.visit("/feed");
						},
					},
				},
			});
		},
		like() {
			if (this.liked) {
				this.liked = false;
			} else {
				this.liked = true;
			}
			const $this = this;
			this.$axios({
				method: "post",
				url: this.$APP_URL + "/like/" + this.post.id,
			}).catch((error) => {});
		},
	},
	data() {
		return {
			liked: false,
			showReshare: false,
			showLikes: false,

			commentsLoading: true,
			comments: undefined,
			next_page_url: null,
		};
	},
	mounted() {
		this.liked = this.post.is_liked;
		document.body.style.background = "#FFF";

		axios
			.get(this.$APP_URL + "/posts/" + this.post.id + "/comments")
			.then((response) => {
				const data = response.data;
				if (data.result) {
					this.next_page_url = data.data.next_page_url;
					this.comments = data.data.data;
				}
				this.commentsLoading = false;
			})
			.catch((error) => console.log(error));
	},
	name: "Article",
	props: {
		post: {
			type: Object,
			default: undefined,
		},
		userposts: {
			default: 0,
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
		},
	},
	layout: AppLayout,
	components: {
		ReshareModal,
		PostMenu,

		LoadingSpinner,
		Comment,
		NewComment,
	},
};
</script>
