<template>
	<div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading_next_page" infinite-scroll-distance="5">
		<div class="d-flex align-items-center justify-content-between py-2 donations-header">
			<h1 class="font-18 mb-0">حمایت‌ها</h1>

			<div class="d-flex">
				<tselect
					style="width: 171px"
					class="tselect-filter"
					dir="rtl"
					:items="[
						{ name: 'همه', value: 'all', icon: 'filter_alt' },
						{ name: 'از طرف شما', value: 'my', icon: 'filter_alt' },
						{ name: 'برای شما', value: 'my', icon: 'filter_alt' },
					]"
					:showNewItem="false"
					v-model="type"
				>
				</tselect>

				<tselect
					style="width: 171px"
					class="tselect-filter mr-3"
					dir="rtl"
					:items="[
						{ name: 'جدید‌ترین‌ها', value: 'desc', icon: 'filter_list' },
						{ name: 'قدیمی‌ترین‌ها', value: 'asc', icon: 'filter_list' },
					]"
					:showNewItem="false"
					v-model="order"
				>
				</tselect>
			</div>
		</div>
		<div class="donations-list">
			<div v-if="loading">
				<donation-skeleton v-for="i in 5" :key="`item_${i}`"></donation-skeleton>
			</div>
			<div v-else>
				<donation-item v-for="donation in donations" :key="`donation_item_${donation.id}`" :tip="donation"></donation-item>

				<div class="w-100 d-flex justify-content-center py-3" v-if="loading_next_page">
					<loading-spinner class="image__spinner" />
				</div>
				<div v-if="next_page_url === null && !loading_next_page && donations.length > 20">
					<no-content>حمایت بیشتری وجود ندارد</no-content>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NoContent from "../NoContent.vue";
import Tselect from "../Tselect.vue";
import DonationItem from "./DonationItem/DonationItem";
import DonationSkeleton from "./DonationItem/DonationSkeleton.vue";
export default {
	data() {
		return {
			loading: true,
			donations: [],

			next_page_url: null,
			loading_next_page: false,

			order: { name: "جدید‌ترین‌ها", value: "desc", icon: "filter_list" },
			type: { name: "همه", value: "all", icon: "filter_alt" },
		};
	},
	components: { DonationSkeleton, DonationItem, Tselect, NoContent },
	computed: {
		filter() {
			return {
				sort: this.order.value,
				my_tips: this.type.value == "my",
			};
		},
	},
	watch: {
		filter() {
			this.loading = true;
			axios
				.post("/donations", { filter: this.filter })
				.then((response) => {
					this.donations = response.data.data;
					this.next_page_url = response.data.links.next;
				})
				.catch((err) => {
					this.toast("خطا در برقراری ارتباط");
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	methods: {
		loadMore() {
			if (!this.loading_next_page && this.next_page_url != null) {
				this.loading_next_page = true;
				axios
					.post(this.next_page_url, { filter: this.filter })
					.then((response) => {
						this.donations = response.data.data;
						this.next_page_url = response.data.links.next;
					})
					.catch((err) => {
						this.toast("خطا در برقراری ارتباط");
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
			.post("/donations", { filter: this.filter })
			.then((response) => {
				this.donations = response.data.data;
				this.next_page_url = response.data.links.next;
			})
			.catch((err) => {
				this.toast("خطا در برقراری ارتباط");
			})
			.then(() => {
				this.loading = false;
			});
	},
};
</script>

<style>
</style>