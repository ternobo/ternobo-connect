<template>
	<base-layout>
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container">
			<div v-if="postsArray.length < 1">
				<no-content> هیچ محتوایی را نشان نکرده‌اید </no-content>
			</div>
			<div v-if="postsArray.length > 0" class="posts" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
				<PostCard v-for="(post, index) in postsArray" :key="'post_item_' + index" :post="post.post"></PostCard>
				<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
					<loading-spinner class="image__spinner" />
				</div>
				<div v-if="next_page_url === null && !loadingPage">
					<no-content> محتوای نشان شده بیشتری وجود ندارد </no-content>
				</div>
			</div>
		</div>
		<sidebar-left v-if="$root.isDesktop">
			<app-footer class="sticky-aside"></app-footer>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import AppFooter from "../Components/App/AppFooter";
import NoContent from "../Components/NoContent";
import PostCard from "../Components/PostCard/PostCard";

export default {
	methods: {
		loadMore() {
			if (!this.loadingPage && this.next_page_url !== null) {
				this.loadingPage = true;
				let next_url = this.next_page_url;
				TernoboWire.getInstance(this)
					.getData(next_url, false)
					.then((response) => {
						let data = response.posts;
						this.postsArray = this.postsArray.concat(data.data);
						this.next_page_url = data.next_page_url;
					})
					.catch((error) => {
						console.log(error);
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
	},
	name: "Bookmarks",
	watch: {
		posts() {
			this.postsArray = this.posts.data;
		},
	},
	mounted() {
		this.postsArray = this.posts.data;
		this.page = this.posts.current_page;
		this.next_page_url = this.posts.next_page_url;
	},
	data() {
		return {
			postsArray: [],
			page: 1,
			next_page_url: null,
			loadingPage: false,
		};
	},
	props: {
		posts: {
			type: Object,
			default: undefined,
		},
	},
	components: {
		AppFooter,
		NoContent,
		PostCard,
	},
	layout: AppLayout,
};
</script>

<style>
</style>
