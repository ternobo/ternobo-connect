<template>
	<base-layout>
		<div class="w-100" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
			<p class="text-center font-16 mb-4 text-muted" v-html="__.get('messages.search-result-found', { number: total, search: search })"></p>

			<tabs :compact="true" :centered="true" class="justify-content-center" @selected="loadTabContent">
				<tab :name="__.choice('application.user', 2)" id="page" :selected="currentTab === 'page'">
					<div class="row pt-3" v-if="!loadingPage">
						<div class="col-md-6 pb-3" v-for="(page, index) in data" :key="page.id + '_index_' + index">
							<div class="card">
								<div class="card-body">
									<people-suggestion class="p-0" :page="page"></people-suggestion>
								</div>
							</div>
						</div>
						<div class="col-md-12 d-flex justify-content-center py-3" v-if="loading_more">
							<loading-spinner class="image__spinner" />
						</div>
					</div>
					<div class="row pt-3" v-else>
						<div class="col-md-6 mb-3" v-for="i in 4" :key="`post_loading_skeleton_${i}`">
							<div class="card">
								<div class="card-body">
									<page-skeleton></page-skeleton>
								</div>
							</div>
						</div>
					</div>
				</tab>
				<tab :name="__.choice('application.post', 2)" id="content" :selected="currentTab === 'content'">
					<masonry v-if="!loadingPage" :cols="2" :gutter="32">
						<div v-for="(post, index) in data" class="py-3" :key="post.id + '_index_' + index">
							<PostCard class="h-100 m-0" :post="post"></PostCard>
						</div>
					</masonry>

					<div class="row pt-3" v-else>
						<div class="col-md-6 mb-3" v-for="i in 4" :key="`post_loading_skeleton_${i}`">
							<post-skeleton></post-skeleton>
						</div>
					</div>
					<div class="col-md-12 d-flex justify-content-center py-3" v-if="loading_more">
						<loading-spinner class="image__spinner" />
					</div>
					<div class="w-100" v-if="next_page_url === null && !loadingPage && total.total > 20">
						<no-content>{{ __.get("messages.no-more-result") }}</no-content>
					</div>
				</tab>
			</tabs>
		</div>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import NoContent from "../Components/NoContent";
import PostCard from "../Components/PostCard/PostCard";
import PeopleSuggestion from "../Components/App/PeopleSuggestion.vue";
import PostSkeleton from "../Components/Skeletons/PostSkeleton.vue";
import PageSkeleton from "../Components/Skeletons/PageSkeleton.vue";
export default {
	created() {
		this.data = this.results.data;
		this.next_page_url = this.results.next_page_url;
		this.page = this.results.current_page;
		this.total = this.results.total;

		this.$store.commit("setSearch", this.search);

		if (this.currentTab == "page" && this.total < 1) {
			this.loadTabContent("content");
		}
	},
	data() {
		return {
			currentTab: "page",
			data: [],
			page: 1,
			next_page_url: undefined,
			loadingPage: false,
			total: 0,

			loading_more: false,
		};
	},
	methods: {
		loadTabContent(tab) {
			if (tab !== this.currentTab) {
				this.data = [];
				this.currentTab = tab;
				this.loadingPage = true;
				let prevUrl = this.next_page_url;
				axios({
					method: "GET",
					params: {
						q: this.search,
						type: tab,
					},
					url: this.$APP_URL + "/search",
					headers: {
						"X-TernoboWire": true,
						Accept: "text/html, application/xhtml+xml",
						"X-Requested-With": "XMLHttpRequest",
					},
				})
					.then((response) => {
						const data = response.data.data.results;
						if (data) {
							this.data = data.data;
							this.total = data.total;
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						this.next_page_url = prevUrl;
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
		loadMore() {
			if (!this.loading_more && this.next_page_url !== null) {
				this.loading_more = true;
				this.$store.state.ternoboWireApp
					.getData(this.next_page_url, false)
					.then((response) => {
						const data = response.results;
						if (data) {
							this.data = this.data.concat(data.data);
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						this.next_page_url = prevUrl;
					})
					.then(() => {
						this.loading_more = false;
					});
			}
		},
	},
	props: {
		search: {
			type: String,
			default: undefined,
		},
		results: {
			type: Object,
			default: undefined,
		},
	},
	components: {
		NoContent,
		PeopleSuggestion,
		PostCard,
		PostSkeleton,
		PageSkeleton,
	},
	name: "Search",
	layout: AppLayout,
};
</script>
