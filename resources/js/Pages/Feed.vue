<template>
	<base-layout>
		<sidebar-right v-if="$root.isDesktop">
			<user-card></user-card>
		</sidebar-right>
		<div class="content-container">
			<new-post-card @posted="postAdded" class="mb-4"></new-post-card>
			<transition-group name="flip-list" tag="div" class="posts" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
				<PostCard v-for="post in postsArray" :key="'post_item_' + uuidV4(post)" :post="post"></PostCard>
			</transition-group>
			<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
				<loading-spinner class="image__spinner" />
			</div>
			<div v-if="next_page_url === null && !loadingPage">
				<no-content></no-content>
			</div>
		</div>
		<sidebar-left v-if="$root.isDesktop">
			<div class="card" style="margin-bottom: 16px" v-if="pages != undefined && pages != null && pages.length > 0">
				<div class="people-suggestion-card-body card-body">
					<people-suggestion v-for="page in pages" :page="page" :key="page.id"></people-suggestion>
				</div>
			</div>
			<AppFooter class="sticky-aside"></AppFooter>
		</sidebar-left>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import PostCard from "../Components/PostCard/PostCard";
import NoContent from "../Components/NoContent";
import AppFooter from "../Components/App/AppFooter";
import { TernoboWire } from "ternobowire-js";

export default {
	watch: {
		posts(newValue) {
			this.postsArray = this.posts.data;
		},
	},
	created() {
		this.postsArray = this.posts.data;
		this.page = this.posts.current_page;
		this.next_page_url = this.posts.links.next;
	},
	data() {
		return {
			postsArray: [],
			page: 1,
			next_page_url: undefined,
			loadingPage: false,
		};
	},
	methods: {
		uuidV4(post) {
			return "post_id_" + post.id;
		},
		postAdded(post) {
			this.postsArray.unshift(post);
		},
		loadMore() {
			if (!this.loadingPage && this.next_page_url !== null) {
				this.loadingPage = true;
				let next_url = this.next_page_url;
				TernoboWire.getInstance(this)
					.getData(next_url, false)
					.then((response) => {
						let data = response.posts;
						this.postsArray = this.postsArray.concat(data.data);
						this.next_page_url = data.links.next;
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
	name: "Feed",
	props: {
		posts: {
			type: Object,
		},
		pages: {
			type: Array,
		},
	},
	components: {
		PostCard,
		NoContent,
		AppFooter,
	},
	layout: AppLayout,
};
</script>

<style></style>
