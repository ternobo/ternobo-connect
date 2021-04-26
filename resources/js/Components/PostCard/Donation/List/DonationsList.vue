<template>
	<div class="donations-list">
		<donation-item v-for="donation in donations" :key="`post_donation_item_${donation.id}`" :tip="donation" />
		<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
	</div>
</template>

<script>
import DonationItem from "./DonationItem.vue";
export default {
	components: { DonationItem },
	data() {
		return {
			loading: false,
			loading_next_page: false,

			donations: [],
			next_page_url: "",
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