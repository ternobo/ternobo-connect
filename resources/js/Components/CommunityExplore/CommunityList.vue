<template>
	<div class="community-category-group">
		<infinite-scroll endpoint="/communities" :config="config" #default="{ items, loading }" method="GET">
			<community-category-skeleton v-if="loading"></community-category-skeleton>
			<div class="explore-page-content row" v-else>
				<div class="col-md-3 mb-6" v-for="community in items" :key="`community_id_${community.id}`">
					<community-info-card :community="community"></community-info-card>
				</div>
			</div>
		</infinite-scroll>
	</div>
</template>

<script>
import LoadingTextButton from "../buttons/LoadingTextButton.vue";
import InfiniteScroll from "../InfiniteScroll.vue";
import CommunityCategorySkeleton from "./CommunityCategorySkeleton.vue";
import CommunityInfoCard from "./CommunityInfoCard.vue";
export default {
	data() {
		return {
			loading: true,
			error: false,

			communities: [],
			next_page_url: null,
			loadingNextPage: false,
		};
	},
	watch: {
		category() {
			this.loadData();
		},
	},
	mounted() {
		this.loadData();
	},
	computed: {
		config() {
			return { params: { category: this.category?.id } };
		},
	},
	methods: {
		loadData() {
			this.loading = true;
			axios
				.get(`/communities`, { params: { category: this.category?.id } })
				.then((response) => {
					const responseData = response.data.data;
					this.loading = false;
					this.communities = responseData.data;
					this.next_page_url = responseData.links.next;
				})
				.catch((err) => {
					this.error = true;
					console.log(err);
				});
		},
		loadNextPage() {
			this.loadingNextPage = true;
			axios
				.get(this.next_page_url, { params: { category: this.category?.id } })
				.then((response) => {
					const responseData = response.data.data;
					this.loadingNextPage = false;
					this.communities = this.communities.concat(responseData.data);
					this.next_page_url = responseData.links.next;
				})
				.catch((err) => {
					this.error = true;
					console.log(err);
				});
		},
	},
	props: ["category"],
	components: { CommunityCategorySkeleton, LoadingTextButton, CommunityInfoCard, InfiniteScroll },
};
</script>
