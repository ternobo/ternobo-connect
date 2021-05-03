<template>
	<div class="register-page" v-infinite-scroll="loadNextPage" :infinite-scroll-disabled="loading_data">
		<div class="position-sticky" style="top: 0; z-index: 1000">
			<div class="register-header">
				<div class="d-flex align-items-center">
					<loading-button :loading="loading" :disabled="followings < 3" class="btn btn-primary" @click.native="next">بعدی</loading-button>
					<div class="mr-2 followed-peoplenum">{{ followings }}/3</div>
				</div>
				<img src="/images/logo.svg" />
			</div>
		</div>
		<div class="register-content flex-column">
			<div class="text-center my-4">
				<h2 class="font-18">پیشنهاد دنبال کردن</h2>
				<p class="text-center">برای بهترین تجربه استفاده از خدمات حداقل <b>۳ نفر</b> را دنبال کنید.</p>
			</div>
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-md-3 py-2" v-for="page in pages" :key="`page_id_${page.id}`">
						<page-info-card @followed="followings++" @unfollowed="followings--" :page="page" />
					</div>
					<loading-spinner v-if="loading_data"></loading-spinner>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PageInfoCard from "../Components/Cards/PageInfoCard.vue";
import LoadingSpinner from "../Components/LoadingSpinner.vue";

export default {
	components: { PageInfoCard, LoadingSpinner },
	methods: {
		next() {
			window.location = "/feed";
		},
		loadNextPage() {
			if (!this.loading_data && this.next_page_url != null) {
				this.loading_data = true;
				axios
					.post(this.next_page_url)
					.then((response) => {
						this.pages = this.pages.concat(response.data.pages.data);
						this.followings = response.data.followings;
						this.next_page_url = response.data.pages.next_page_url;
					})
					.catch((err) => {
						this.toast("خطا در برقراری ارتباط");
						console.log(err);
					})
					.then(() => {
						this.loading_data = false;
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
				this.toast("خطا در برقراری ارتباط");
				console.log(err);
			})
			.then(() => {
				this.loading_data = false;
			});
	},
	name: "FollowingSuggestion",
};
</script>

<style>
</style>
