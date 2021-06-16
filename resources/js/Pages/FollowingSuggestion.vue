<template>
	<div class="login-page" v-infinite-scroll="loadNextPage" :infinite-scroll-disabled="loading_data">
		<div class="position-sticky" style="top: 0; z-index: 1000; background: #f5f5f5">
			<div class="login-header">
				<div class="logo-container">
					<div href="/" class="logodesktop" v-if="$root.isDesktop">
						<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
					</div>
					<div href="/" class="logo-sm" v-if="!$root.isDesktop">
						<img src="/images/logo.svg" class="ms-2" />
					</div>
					<span class="beta-badge">Beta</span>
				</div>
				<div class="login-header-menu">
					<div class="ms-2 followed-peoplenum">{{ followings }}/3</div>
					<loading-button :loading="loading" :disabled="followings < 3" class="btn btn-primary" @click.native="next">{{ __.get("application.done") }}</loading-button>
				</div>
			</div>
		</div>
		<div class="login-content flex-column">
			<div class="text-center my-4">
				<h2 class="font-18 mb-3">{{ __.get("follow-suggestion.suggestions-title") }}</h2>
				<p class="text-center" v-html="__.get('follow-suggestion.subtitle')"></p>
			</div>
			<pageinfocards-skeleton :count="12" v-if="loading_data"></pageinfocards-skeleton>
			<div class="row justify-content-center mt-12px" v-else>
				<div class="col-md-3 py-2" v-for="page in pages" :key="`page_id_${page.id}`">
					<page-info-card @followed="followings++" @unfollowed="followings--" :page="page" />
				</div>
				<div class="d-flex justify-content-center" v-if="loading_next_page">
					<loading-spinner :height="24" :width="24"></loading-spinner>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageInfoCard from "../Components/Cards/PageInfoCard.vue";
import LoadingSpinner from "../Components/LoadingSpinner.vue";
import PageinfocardsSkeleton from "../Components/Skeletons/PageinfocardsSkeleton.vue";

export default {
	components: { PageInfoCard, LoadingSpinner, PageinfocardsSkeleton },
	methods: {
		next() {
			window.location = "/feed";
		},
		loadNextPage() {
			if (!this.loading_next_page && this.next_page_url != null) {
				this.loading_next_page = true;
				axios
					.post(this.next_page_url)
					.then((response) => {
						this.pages = this.pages.concat(response.data.pages.data);
						this.followings = response.data.followings;
						this.next_page_url = response.data.pages.next_page_url;
					})
					.catch((err) => {
						this.toast(__.get("messages.connection-error"));
						console.log(err);
					})
					.then(() => {
						this.loading_next_page = false;
					});
			}
		},
	},
	data() {
		return {
			loading: false,
			pages: [],
			followings: 0,
			next_page_url: null,
			loading_data: false,
			loading_next_page: false,
		};
	},
	created() {
		this.loading_data = true;
		axios
			.post("/follow-people/get")
			.then((response) => {
				this.pages = response.data.pages.data;
				this.followings = response.data.followings;
				this.next_page_url = response.data.pages.next_page_url;
			})
			.catch((err) => {
				this.toast(__.get("messages.connection-error"));
				console.log(err);
			})
			.then(() => {
				this.loading_data = false;
			});
	},
	name: "FollowingSuggestion",
};
</script>

<style lang="scss" scoped>
.followed-peoplenum {
	letter-spacing: 5px;
}
.login-header-menu {
	align-items: center;
	margin: 0 !important;
	button {
		height: 40px;
	}
}
.login-header-menu > * {
	padding: 4px 32px !important;
}
</style>