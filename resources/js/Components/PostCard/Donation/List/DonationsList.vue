<template>
	<div class="donations-list" :class="{ 'd-flex align-items-center p-3 justify-content-center': loading || donations.length < 1 }">
		<loading-spinner v-if="loading"></loading-spinner>
		<span class="font-20 text-superlight" v-else-if="donations.length < 1">هیچ حمایتی ثبت نشده</span>
		<donation-item v-for="donation in donations" :key="`post_donation_item_${donation.id}`" :tip="donation" />
		<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
	</div>
</template>

<script>
import LoadingSpinner from "../../../LoadingSpinner.vue";
import DonationItem from "./DonationItem.vue";
export default {
	components: { DonationItem, LoadingSpinner },
	data() {
		return {
			loading: false,
			loading_next_page: false,

			donations: [],
			next_page_url: null,
		};
	},
	methods: {
		loadMore() {
			if (this.next_page_url != null && !this.loading_next_page) {
				this.loading_next_page = true;
				axios
					.post(this.next_page_url)
					.then((response) => {
						this.donations = response.data.data;
						this.next_page_url = response.data.links.next;
					})
					.catch((err) => {
						console.log(err);
						this.loadMore();
						this.toast("خطا در دریافت اطلاعات");
					})
					.then(() => {
						this.loading_next_page = false;
					});
			}
		},
	},
	mounted() {
		this.loading = true;
		axios
			.post(`/posts/${this.post}/donations`)
			.then((response) => {
				this.donations = response.data.data;
				this.next_page_url = response.data.links.next;
			})
			.catch((err) => {
				console.log(err);
				this.toast("خطا در دریافت اطلاعات");
			})
			.then(() => {
				this.loading = false;
			});
	},

	props: ["post"],
};
</script>

<style>
</style>