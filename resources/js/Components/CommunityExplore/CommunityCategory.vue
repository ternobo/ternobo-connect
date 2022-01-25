<template>
	<div class="community-category-group">
		<div class="title mb-7 d-flex align-items-center justify-content-center w-100">
			<img width="32" class="me-3" :src="`/${category.icon}`" />
			<h2 class="m-0">{{ category.name }}</h2>
		</div>
		<community-category-skeleton v-if="loading"></community-category-skeleton>
		<div class="explore-page-content row" v-else>
			<div class="col-md-3 mb-6" v-for="community in communities" :key="`community_id_${community.id}`">
				<community-info-card :community="community"></community-info-card>
			</div>
			<loading-text-button @click="loadNextPage" :loading="loadingNextPage" v-if="next_page_url != null">{{ __.get("application.show-more") }}</loading-text-button>
		</div>
	</div>
</template>

<script>
import LoadingTextButton from "../buttons/LoadingTextButton.vue";
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
	mounted() {
		this.loading = true;
		axios
			.get(`/communities/${this.category.id}`)
			.then((response) => {
				const responseData = response.data.data;
				this.loading = false;
				this.communities = responseData.data;
				this.next_page_url = responseData.next_page_url;
			})
			.catch((err) => {
				this.error = true;
				console.log(err);
			});
	},
	methods: {
		loadNextPage() {
			this.loadingNextPage = true;
			axios
				.get(this.next_page_url)
				.then((response) => {
					const responseData = response.data.data;
					this.loadingNextPage = false;
					this.communities = this.communities.concat(responseData.data);
					this.next_page_url = responseData.next_page_url;
				})
				.catch((err) => {
					this.error = true;
					console.log(err);
				});
		},
	},
	props: ["category"],
	components: { CommunityCategorySkeleton, LoadingTextButton, CommunityInfoCard },
};
</script>
