<template>
	<div class="comment-item">
		<report-modal :show.sync="showReport" type="comment" :comment-id="comment.id"></report-modal>
		<likes-modal :item="comment.id" type="comment" :show.sync="showLikes"></likes-modal>

		<div class="reply-to-container" v-if="replyTo != undefined && comment.replyto.page">
			<span>
				{{ __.get("content/comments.reply-to") }} <strong class="text-grey-600 font-demibold">{{ comment.replyto.page.name }}</strong>
			</span>
		</div>

		<div class="comment">
			<div class="comment-header">
				<wire-link :href="'/' + comment.page.slug" class="d-flex align-items-center">
					<img :src="comment.page.profile" class="profile-xxsm" />
					<div class="pagedetail">
						<span class="name">
							{{ comment.page.name }}
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
								<i class="material-icons openmenu clickale text-muted hover-dark font-20">more_horiz</i>
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
			<div class="comment-body" dir="auto">
				<span>
					<span class="donate-badge" v-if="comment.tip_amount != null"> <i class="material-icons-outlined">savings</i> IRT {{ formatNumber(comment.tip_amount, "0,0") }}</span>
				</span>
				<span dir="auto">
					<social-content :text="comment.text" :tags="comment.tags" />
				</span>
			</div>
			<div class="comment-footer">
				<div>
					<div @click="showLikes = true" class="likes clickable" v-if="comment.mutual_likes != null && comment.mutual_likes.length > 0">
						<span class="me-1">{{ __.get("content/posts.liked-text") }} </span>
						<wire-link v-if="comment.mutual_likes[0]" :href="'/' + comment.mutual_likes[0].page.slug" class="profile-text">{{ comment.mutual_likes[0].page.name }} </wire-link>
						<span v-if="comment.mutual_likes.length > 1">
							<span>{{ __.get("content/posts.and") }} </span>
							<wire-link v-if="comment.mutual_likes[1]" :href="'/' + comment.mutual_likes[0].page.slug" class="profile-text">{{ comment.mutual_likes[1].page.name }} </wire-link>
						</span>
						<span class="mx-1" v-if="comment.mutual_likes.length > 2"> {{ __.get("content/posts.and") }} ... </span>
					</div>
				</div>
				<div class="actions">
					<span class="replies-text clickable" @click="loadReplies">{{ replies_count > 0 ? replies_count : "" }} {{ __.choice("content/comments.reply", replies_count == 0 ? 1 : replies_count) }}</span>
					<i @click="likeComment" v-if="!checkUser(comment.page.user_id)" class="hover-dark clickable material-icons font-20 ms-12px" :class="{ 'text-danger': liked }">
						{{ liked ? "favorite" : "favorite_border" }}
					</i>
				</div>
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
				<div class="w-100 d-flex align-items-center justify-content-center p-2" v-if="next_page_url !== null">
					<loading-button v-if="next_page_url !== null" @click.native="loadMore" class="btn btn-transparent font-12" :loading="loadingMore">{{ __.get("application.load-more") }}</loading-button>
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
		this.replies_count = this.comment.replies_count ? this.comment.replies_count : 0;
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
		loadReplies() {
			this.showNewComment = true;
			this.repliesLoading = true;
			this.showReplies = !this.showReplies;
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