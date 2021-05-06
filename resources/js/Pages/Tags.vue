<template>
	<base-layout>
		<div class="d-flex p-3 justify-content-center">
			<div class="tag-card">فا</div>
		</div>
		<div class="w-100">
			<div v-if="postsArray.length < 1">
				<no-content> هیچ محتوایی با این برچسب منتشر نشده </no-content>
			</div>
			<div v-if="postsArray.length > 0" class="posts" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
				<div class="row">
					<div class="col-md-6" v-for="(post, index) in postsArray" :key="'post_item_' + index">
						<PostCard :post="post"></PostCard>
					</div>
				</div>
				<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
					<loading-spinner class="image__spinner" />
				</div>
				<div v-if="next_page_url === null && !loadingPage">
					<no-content> محتوای بیشتری وجود ندارد </no-content>
				</div>
			</div>
		</div>
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
				let url = this.next_page_url;
				this.loadingPage = true;
				this.$store.state.ternoboWireApp
					.getData(this.next_page_url, false)
					.then((response) => {
						const data = response.data.posts;
						if (data) {
							this.postsArray = this.postsArray.concat(data.data);
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						this.next_page_url = url;
						console.error(error);
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
	},
	name: "Bookmarks",
	watch: {
		posts(newValue) {
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
