<template>
	<base-layout class="justify-content-center" v-infinite-scroll="loadMoreComment" :infinite-scroll-disabled="commentsLoading" :infinite-scroll-distance="5">
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container">
            <post-card :post="post" :has-comment="false"></post-card>
        </div>
		<sidebar-left v-if="!$root.isMobile">
			<div class="card" style="margin-bottom: 24px" v-if="pages != undefined && pages != null && pages.length > 0">
				<div class="card-body px-2 py-1">
					<people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
				</div>
			</div>
			<AppFooter class="sticky-aside"></AppFooter>
		</sidebar-left>
	</base-layout>
</template>

<script>
import TimeAgo from "javascript-time-ago";
// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
import AppLayout from "../Layouts/AppLayout";
import PersianDate from "persian-date";

import ReshareModal from "../Components/Modals/ReshareModal.vue";
import PostMenu from "../Components/Menues/PostMenu.vue";
import { Inertia } from "@inertiajs/inertia";

import LoadingSpinner from "../Components/LoadingSpinner";
import Comment from "../Components/Comments/Comment";
import NewComment from "../Components/Comments/NewComment";
import PostCard from '../Components/PostCard/PostCard.vue';

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
				text: "آیا از حذف این محتوا اطمینان دارید؟",
				title: "حذف محتوا",
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
		this.$refs.articleText.oncopy = (event) => {
			event.preventDefault();
		};

		this.liked = this.post.is_liked;
		document.body.style.background = "#FFF";
		document.querySelector("#app > .header > .container").style.background = "#FFF";

		var div = document.createElement("div");
		div.innerHTML = "<link id='article-style' href='/css/article.css' rel='stylesheet' />";
		document.head.append(div.firstChild);
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
		document.querySelector("#article-style").remove();

		document.querySelector("#app > .header > .container").style.removeProperty("background");
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
</scri,
PostCardpt>
