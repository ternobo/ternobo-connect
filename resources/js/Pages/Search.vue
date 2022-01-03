<template>
	<base-layout>
		<div class="w-100">
			<p class="text-center font-16 mb-4" v-html="__.get('messages.search-result-found', { number: total, search: search })"></p>

			<tabs :compact="true" :centered="true" class="justify-content-center">
				<tab :name="__.choice('application.user', 2)" id="page" :selected="currentTab === 'page'">
					<infinite-scroll @initalLoad="onLoad" :endpoint="`/search/get?q=${search}&type=user`" method="get" #default="{ items, loading }">
						<div class="row pt-3" v-if="!loading">
							<div class="col-md-6 pb-3" v-for="(page, index) in items" :key="page.id + '_index_' + index">
								<div class="card">
									<div class="card-body">
										<profile-peeking :showBadges="true" position="bottom" class="w-100 d-block p-0" :page="page"></profile-peeking>
									</div>
								</div>
							</div>
						</div>
						<div class="row pt-3" v-else>
							<div class="col-md-6 mb-4" v-for="i in 4" :key="`post_loading_skeleton_${i}`">
								<div class="card">
									<div class="card-body">
										<page-skeleton></page-skeleton>
									</div>
								</div>
							</div>
						</div>
					</infinite-scroll>
				</tab>
				<tab :name="__.choice('application.post', 2)" id="content" :selected="currentTab === 'content'">
					<infinite-scroll @initalLoad="onLoad" :endpoint="`/search/get?q=${search}&type=content`" method="get" #default="{ items, loading }">
						<masonry v-if="!loading" :cols="2" :gutter="32">
							<div v-for="post in items" class="py-3" :key="post.id">
								<PostCard class="h-100 m-0" :post="post"></PostCard>
							</div>
						</masonry>

						<div class="row pt-3" v-else>
							<div class="col-md-6 mb-4" v-for="i in 4" :key="`post_loading_skeleton_${i}`">
								<post-skeleton></post-skeleton>
							</div>
						</div>
					</infinite-scroll>
				</tab>
				<tab :name="__.get('user-profile.tags')" id="tags" :selected="currentTab === 'tags'">
					<infinite-scroll @initalLoad="onLoad" :endpoint="`/search/get?q=${search}&type=tags`" method="get" #default="{ items, loading }">
						<masonry v-if="!loading" :cols="2" :gutter="32">
							<div v-for="tag in items" class="py-3" :key="tag.id">
								<tag-card :tag="tag"></tag-card>
							</div>
						</masonry>

						<div class="row pt-3" v-else>
							<div class="col-md-6 mb-4" v-for="i in 4" :key="`post_loading_skeleton_${i}`">
								<post-skeleton></post-skeleton>
							</div>
						</div>
					</infinite-scroll>
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
import ProfilePeeking from "../Components/App/ProfilePeeking/ProfilePeeking.vue";
import InfiniteScroll from "../Components/InfiniteScroll.vue";
import TagCard from "../Components/Search/TagCard.vue";
export default {
	destroyed() {
		this.$store.commit("setSearch", "");
	},
	data() {
		return {
			currentTab: "page",
			total: 0,
			firstLoad: false,
		};
	},
	methods: {
		onLoad(info) {
			this.total = info.total;

			if (this.total == 0 && !this.firstLoad) {
				if (this.currentTab == "page") {
					this.currentTab = "content";
				} else if (this.current == "content") {
					this.currentTab = "tags";
					this.firstLoad = true;
				}
			} else {
				this.firstLoad = true;
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
		ProfilePeeking,
		InfiniteScroll,
		TagCard,
	},
	name: "Search",
	layout: AppLayout,
};
</script>
