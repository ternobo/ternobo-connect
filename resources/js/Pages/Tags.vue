<template>
	<base-layout>
		<component :is="headerComponnet" :followed="followed" :community="community" :tag="tag" :totalPosts="posts.meta.total" />
		<div class="w-100">
			<tabs compact>
				<tab name="Posts" :selected="true">
					<content-tab :tag="tag" />
				</tab>
				<tab name="Tags"></tab>
				<tab name="Users"></tab>
			</tabs>
		</div>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import AppFooter from "../Components/App/AppFooter";
import NoContent from "../Components/NoContent";
import PostCard from "../Components/PostCard/PostCard";
import ContentTab from "../Components/Tag/Tabs/ContentTab.vue";

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
		ContentTab,
	},
	layout: AppLayout,
};
</script>
