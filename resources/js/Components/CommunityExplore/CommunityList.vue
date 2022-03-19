<template>
	<div class="community-category-group">
		<div class="community-category-group__filters" v-if="category == null">
			<search-input v-model="search" inputClass="fill rounded" :placeholder="__.get('application.search')" />

			<div class="d-flex align-items-center">
				<strong class="me-3 text-nowrap text-dark">{{ __.get("application.sort-by") }}</strong>
				<tselect
					class="community-category-group__filters--sort tselect-lg tselect-filter"
					:items="[
						{ name: __.get('community.activity'), value: 'activity' },
						{ name: __.get('community.post'), value: 'posts' },
					]"
					v-model="sort"
				></tselect>
			</div>
		</div>
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
import SearchInput from "../inputs/SearchInput.vue";
import Tselect from "../Tselect.vue";
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

			search: "",
			sort: { name: __.get("community.activity"), value: "activity" },
		};
	},
	mounted() {
		this.loadData();
	},
	computed: {
		config() {
			return { params: { category: this.category?.id, search: this.search, sort: this.sort?.value } };
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
	components: {
		CommunityCategorySkeleton,
		LoadingTextButton,
		CommunityInfoCard,
		InfiniteScroll,
		SearchInput,
		Tselect,
	},
};
</script>