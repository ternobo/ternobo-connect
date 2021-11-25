<template>
	<base-layout>
		<component :is="headerComponnet" :followed="followed" :community="community" :tag="tag" :totalPosts="posts.total" />
		<div class="w-100">
			<div v-if="postsArray.length < 1">
				<no-content class="mt-8"> {{ __.get("messages.no-content-with-tag") }} </no-content>
			</div>
			<div v-if="postsArray.length > 0" class="posts" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
				<masonry v-if="!loadingPage" :cols="2" :gutter="32">
					<div v-for="(post, index) in postsArray" class="py-3" :key="post.id + '_index_' + index">
						<PostCard class="h-100 m-0" :post="post"></PostCard>
					</div>
				</masonry>
				<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
					<loading-spinner class="image__spinner" />
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
import LoadingButton from "../Components/buttons/LoadingButton.vue";

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
	name: "Tags",
	watch: {
		posts() {
			this.postsArray = this.posts.data;
		},
	},
	created() {
		if (this.community != null) {
			this.headerComponnet = () => import("../Components/Hashtag/CommunityTagHeader.vue");
		}
	},
	mounted() {
		this.postsArray = this.posts.data;
		this.page = this.posts.current_page;
		this.next_page_url = this.posts.next_page_url;
		this.$nextTick(() => {
			twemoji.parse(this.$refs.tagelem);
		});
	},
	data() {
		return {
			postsArray: [],
			page: 1,
			next_page_url: null,
			loadingPage: false,
			loading: false,

			headerComponnet: () => import("../Components/Hashtag/HashtagHeader.vue"),
		};
	},
	props: ["posts", "tag", "followed", "community"],
	components: {
		AppFooter,
		NoContent,
		PostCard,
	},
	layout: AppLayout,
	LoadingButton,
};
</script>
