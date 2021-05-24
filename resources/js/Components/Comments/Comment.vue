<template>
	<div class="comment-item">
		<report-modal :show.sync="showReport" type="comment" :comment-id="comment.id"></report-modal>
		<likes-modal :item="comment.id" type="comment" :show.sync="showLikes"></likes-modal>

		<div class="reply-to-container" v-if="replyTo != undefined && comment.replyto.page">
			<span>
				<i class="material-icons">reply</i> پاسخ به <strong class="font-demibold">{{ comment.replyto.page.name }}</strong>
			</span>
		</div>
		<div class="comment" v-if="!deleted">
			<div class="comment-header">
				<wire-link :href="'/' + comment.page.slug" class="d-flex align-items-center">
					<img :src="comment.page.profile" class="profile-sm" />
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
						<b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
							<template v-slot:button-content class="p-0">
								<i class="material-icons openmenu clickale text-muted hover-dark">more_vert</i>
							</template>
							<b-dropdown-item v-if="!checkUser(comment.page.user_id)">
								<div class="d-flex align-items-center" @click="showReport = true">
									<i class="material-icons ml-2 text-dark">link</i>
									<div>
										<div>
											<strong> گزارش تخلف </strong>
										</div>
										<small class="text-muted"> این دیدگاه در تضاد با قوانین ترنوبو است </small>
									</div>
								</div>
							</b-dropdown-item>
							<b-dropdown-item @click="deleteComment" v-if="checkUser(comment.page.user_id)">
								<div class="d-flex hover-danger align-items-center">
									<i class="material-icons-outlined ml-2">delete_sweep</i>
									<div>
										<div>
											<strong> حذف </strong>
										</div>
									</div>
								</div>
							</b-dropdown-item>
						</b-dropdown>
					</div>
				</div>
			</div>
			<div class="comment-body">
				{{ comment.text }}
			</div>
		</div>

		<div class="w-100 d-flex align-content-center justify-content-between pt-2">
			<div>
				<div @click="showLikes = true" class="d-flex post-likes-text text-muted clickable" v-if="comment.mutual_likes != null && comment.mutual_likes.length > 0">
					<span class="ml-1">پسندیده شده توسط</span>
					<wire-link v-if="comment.mutual_likes[0]" :href="'/' + comment.mutual_likes[0].page.slug" class="text-dark">
						<strong class="text-light">{{ comment.mutual_likes[0].page.name }}</strong>
					</wire-link>
					<div v-if="comment.mutual_likes.length > 1">
						<span class="mr-1">و</span>
						<wire-link v-if="comment.mutual_likes[1]" :href="'/' + comment.mutual_likes[0].page.slug" class="text-dark">
							<strong class="text-light">{{ comment.mutual_likes[1].page.name }}</strong>
						</wire-link>
					</div>
					<span class="mx-1" v-if="comment.mutual_likes.length > 2"> و ... </span>
				</div>
			</div>
			<div class="actions">
				<small class="clickable ml-1" @click="loadReplies(false)" v-if="comment.replies_count > 0 && replyTo == undefined">
					<strong :class="{ 'text-muted': !showReplies, 'text-dark': showReplies }"> {{ comment.replies_count }} پاسخ </strong>
				</small>
				<i @click="loadReplies" :class="{ 'material-icons-outlined': !showReplies || !showNewComment, 'material-icons': showReplies && showNewComment }" class="hover-dark clickable"> insert_comment </i>
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
						<loading-spinner></loading-spinner>
					</div>
				</div>
				<div class="w-100 d-flex align-items-center justify-content-center p-2">
					<loading-button v-if="next_page_url !== null" @click.native="loadMore" class="btn btn-outline-dark" :loading="loadingMore">بارگیری بیشتر</loading-button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import NewComment from "./NewComment";
import TimeAgo from "javascript-time-ago";
import LoadingSpinner from "../LoadingSpinner";
// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
import ReportModal from "../Modals/ReportModal.vue";
import LikesModal from "../Modals/LikesModal.vue";

TimeAgo.addLocale(fa);
export default {
	mounted() {
		this.liked = this.comment.is_liked;
	},
	data() {
		return {
			deleted: false,
			showReply: false,
			replies: [],
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
				setTimeout(() => {
					const theComment = this.$el;
					this.$parent.$el.scrollTop += theComment.getBoundingClientRect().top;
				}, 300);
			}
		},
	},
	computed: {
		comment_time() {
			const timeAgo = new TimeAgo("fa-FA");
			return timeAgo.format(Date.parse(this.comment.created_at), "twitter");
		},
	},
	components: {
		NewComment,
		LoadingSpinner,
		ReportModal,
		LikesModal,
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