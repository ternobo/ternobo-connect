<template>
	<base-layout class="justify-content-center" v-infinite-scroll="loadMoreComment" :infinite-scroll-disabled="commentsLoading" :infinite-scroll-distance="5">
		<sidebar-right v-if="$root.isDesktop">
			<user-card v-if="$store.state.user"></user-card>
		</sidebar-right>
		<div class="content-container">
			<div class="card p-0">
				<post-card class="shadow-0" style="margin-bottom: 0 !important" :post="post" @deleted="onDelete" :has-comment="false"></post-card>
				<div class="comments px-3 py-3 m-0" style="max-height: max-content" v-if="$store.state.user">
					<new-comment :post="post.id" @submit="submitComment"></new-comment>
					<comment v-for="comment in comments" v-on:deleted="commentDelete" :comment="comment" :key="'comment_' + comment.id"></comment>
					<div class="d-flex w-100 justify-content-center align-items-center py-3" v-if="commentsLoading">
						<LoadingSpinner></LoadingSpinner>
					</div>
				</div>
			</div>
		</div>
		<sidebar-left v-if="!$root.isMobile">
			<AppFooter class="sticky-aside"></AppFooter>
		</sidebar-left>
	</base-layout>
</template>

<script>
// Load locale-specific relative date/time formatting rules.
import AppLayout from "../Layouts/AppLayout";
import PersianDate from "persian-date";

import PostMenu from "../Components/Menues/PostMenu.vue";

import LoadingSpinner from "../Components/LoadingSpinner";
import Comment from "../Components/Comments/Comment";
import NewComment from "../Components/Comments/NewComment";
import PostCard from "../Components/PostCard/PostCard.vue";

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
		onDelete() {
			this.$store.state.ternoboWireApp.visit("/feed");
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
			this.confirmDialog(this.__.get("messages.delete-confirm")).then((value) => {
				if (value) {
					axios.delete(this.$APP_URL + "/articles/" + this.post.id);
					this.$store.state.ternoboWireApp.visit("/feed");
				}
			});
		},
		like() {
			if (this.liked) {
				this.liked = false;
			} else {
				this.liked = true;
			}
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
		PostMenu,

		LoadingSpinner,
		Comment,
		PostCard,
		NewComment,
	},
};
</script>
