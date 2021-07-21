<template>
	<div class="comment-item">
		<report-modal :show.sync="showReport" type="comment" :comment-id="comment.id"></report-modal>
		<likes-modal :item="comment.id" type="comment" :show.sync="showLikes"></likes-modal>

		<div class="reply-to-container" v-if="replyTo != undefined && comment.replyto.page">
			<span>
				<i class="material-icons">reply</i> {{ __.get("content/comments.reply-to") }} <strong class="font-demibold">{{ comment.replyto.page.name }}</strong>
			</span>
		</div>

		<div class="comment" v-if="!deleted">
			<div class="comment-header">
				<wire-link :href="'/' + comment.page.slug" class="d-flex align-items-center">
					<img :src="comment.page.profile" class="profile-xsm" />
					<div class="pagedetail">
						<span class="name">
							<strong> {{ comment.page.name }} <i v-if="comment.page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
						</span>
						<small class="short-bio" v-if="comment.page.short_bio">
							{{ comment.page.short_bio }}
						</small>
					</div>
				</wire-link>
				<div class="d-flex align-items-center">
					<span class="comment-time">{{ comment_time }}</span>
					<div>
						<dropdown-menu size="lg" variant="white" toggle-class="text-decoration-none" no-caret>
							<template v-slot:button class="p-0">
								<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
							</template>
							<dropdown-item v-if="!checkUser(comment.page.user_id)">
								<div class="d-flex align-items-center" @click="showReport = true">
									<i class="material-icons-outlined text-dark">report</i>
									<div>
										<div>
											<strong> {{ __.choice("content/report.report", 1) }} </strong>
										</div>
									</div>
								</div>
							</dropdown-item>
							<dropdown-item @click="deleteComment" v-if="checkUser(comment.page.user_id)">
								<div class="d-flex align-items-center">
									<i class="material-icons-outlined">delete_sweep</i>
									<div>
										<div>
											{{ __.get("application.delete") }}
										</div>
									</div>
								</div>
							</dropdown-item>
						</dropdown-menu>
					</div>
				</div>
			</div>
			<div class="comment-body" ref="body">
				{{ comment.text }}
			</div>
		</div>

		<div class="w-100 d-flex align-content-center justify-content-between pt-2">
			<div>
				<div @click="showLikes = true" class="d-flex post-likes-text text-muted clickable" v-if="comment.mutual_likes != null && comment.mutual_likes.length > 0">
					<span class="me-1">{{ __.get("content/posts.liked-text") }}</span>
					<wire-link v-if="comment.mutual_likes[0]" :href="'/' + comment.mutual_likes[0].page.slug" class="text-dark">
						<strong class="text-light">{{ comment.mutual_likes[0].page.name }}</strong>
					</wire-link>
					<div v-if="comment.mutual_likes.length > 1">
						<span class="ms-1">{{ __.get("contnet/posts.and") }}</span>
						<wire-link v-if="comment.mutual_likes[1]" :href="'/' + comment.mutual_likes[0].page.slug" class="text-dark">
							<strong class="text-light">{{ comment.mutual_likes[1].page.name }}</strong>
						</wire-link>
					</div>
					<span class="mx-1" v-if="comment.mutual_likes.length > 2"> {{ __.get("contnet/posts.and") }} ... </span>
				</div>
			</div>
			<div class="actions">
				<small class="clickable me-1" @click="loadReplies(false)" v-if="replies_count > 0 && replyTo == undefined">
					<strong :class="{ 'text-muted': !showReplies, 'text-dark': showReplies }"> {{ replies_count }} {{ __.choice("application.comment", replies_count) }} </strong>
				</small>
				<i @click="loadReplies" :class="{ 'material-icons-outlined': !showReplies || !showNewComment, 'material-icons text-dark': showReplies && showNewComment }" class="hover-dark clickable"> insert_comment </i>
				<i @click="likeComment" v-if="!checkUser(comment.page.user_id)" class="hover-dark clickable material-icons" :class="{ 'text-danger': liked }">
					{{ liked ? "favorite" : "favorite_border" }}
				</i>
			</div>
		</div>

		<transition name="slide">
			<div class="comment-replies" v-if="showReplies">
				<new-comment @submit="submit" v-if="showNewComment" :post="comment.post_id" :reply-to="comment.id"></new-comment>
				<div class="replies" v-if="replyTo === undefined">
					<comment v-on:replied="submit" :reply-to="comment.id" v-for="reply in replies" v-on:deleted="commentDelete" :comment="reply" :key="reply.id"></comment>
					<div class="w-100 d-flex p-2 justify-content-center align-items-center" v-if="repliesLoading">
						<comments-loading></comments-loading>
					</div>
				</div>
				<div class="w-100 d-flex align-items-center justify-content-center p-2">
					<loading-button v-if="next_page_url !== null" @click.native="loadMore" class="btn btn-outline-dark" :loading="loadingMore">{{ __.get("application.load-more") }}</loading-button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import NewComment from "./NewComment";
import LoadingSpinner from "../LoadingSpinner";

import ReportModal from "../Modals/ReportModal.vue";
import LikesModal from "../Modals/LikesModal.vue";
import CommentSkeleton from "../Skeletons/CommentSkeleton.vue";
import CommentsLoading from "../Skeletons/CommentsLoading.vue";

export default {
	mounted() {
		this.liked = this.comment.is_liked;
		this.replies_count = this.comment.replies_count;
		twemoji.parse(this.$refs.body);
	},
	data() {
		return {
			deleted: false,
			showReply: false,
			replies: [],
			replies_count: 0,
			repliesLoading: true,
			showReplies: false,
			next_page_url: null,
			loadingMore: false,
			liked: false,

			showReport: false,

			showNewComment: false,
			showLikes: false,
		};
	},
	methods: {
		commentDelete() {
			const index = this.comments.indexOf(comment);
			if (index > -1) {
				this.comments.splice(index, 1);
				this.loadMore();
			}
		},
		likeComment() {
			if (this.liked) {
				this.liked = false;
			} else {
				this.liked = true;
			}
			axios.post(this.$APP_URL + "/comments/" + this.comment.id + "/like");
		},
		loadReplies(newComment = true) {
			if (this.showReplies && !this.showNewComment && newComment) {
				this.showNewComment = newComment;
			} else {
				this.showNewComment = newComment;
				this.showReplies = !this.showReplies;
			}

			if (this.showReplies) {
				this.repliesLoading = true;
				axios
					.post(this.$APP_URL + "/comments/" + this.comment.id + "/replies")
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.next_page_url = data.data.next_page_url;
							this.replies = data.data.data;
						}
						this.repliesLoading = false;
					})
					.catch((error) => console.log(error))
					.then(() => (this.repliesLoading = false));
			}
		},
		deleteComment() {
			this.deleted = true;
			axios
				.delete("/posts/" + this.comment.post_id + "/comments/" + this.comment.id)
				.then((response) => {
					this.$emit("deleted", this.comment);
				})
				.catch((error) => console.log(error));
		},
		loadMore() {
			if (this.next_page_url !== null && !this.loadingMore) {
				this.loadingMore = true;
				axios
					.get(this.next_page_url)
					.then((response) => {
						const data = response.data;
						if (data.result) {
							this.next_page_url = data.data.next_page_url;
							this.replies = this.replies.concat(data.data.data);
						}
						this.loadingMore = false;
					})
					.catch((error) => console.log(error))
					.then(() => (this.loadingMore = false));
			}
		},
		submit(comment) {
			if (this.replyTo !== undefined) {
				this.$emit("replied", comment);
			} else {
				this.replies.unshift(comment);
				this.replies_count++;
				setTimeout(() => {
					const theComment = this.$el;
					this.$parent.$el.scrollTop += theComment.getBoundingClientRect().top;
				}, 300);
			}
		},
	},
	computed: {
		comment_time() {
			return this.timeAgo(this.comment.created_at);
		},
	},
	components: {
		NewComment,
		LoadingSpinner,
		ReportModal,
		LikesModal,
		CommentSkeleton,
		CommentsLoading,
	},
	props: {
		replyTo: {
			default: undefined,
			required: false,
		},
		comment: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	name: "Comment",
};
</script>