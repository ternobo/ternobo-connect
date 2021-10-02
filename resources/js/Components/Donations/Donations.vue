<template>
	<div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading_next_page" infinite-scroll-distance="5">
		<div class="d-flex align-items-start justify-content-between donations-header">
			<span>{{ __.choice("tips.tip", 2) }}</span>

			<div class="d-flex">
				<tselect
					style="width: 171px"
					class="tselect-filter tselect-lg"
					:dir="appDirection"
					:items="[
						{ name: __.get('tips.all'), value: 'all' },
						{ name: __.get('tips.from-you'), value: 'my' },
						{ name: __.get('tips.for-you'), value: 'forme' },
					]"
					:showNewItem="false"
					v-model="type"
				>
					<template #icon>
						<i class="material-icons">filter_alt</i>
					</template>
				</tselect>

				<tselect
					style="width: 171px"
					class="tselect-filter tselect-lg ms-4"
					:dir="appDirection"
					:items="[
						{ name: __.get('tips.newest'), value: 'desc' },
						{ name: __.get('tips.oldest'), value: 'asc' },
					]"
					:showNewItem="false"
					v-model="order"
				>
					<template #icon>
						<i class="material-icons">filter_list</i>
					</template>
				</tselect>
			</div>
		</div>
		<div class="donations-list">
			<div v-if="loading">
				<donation-skeleton v-for="i in 5" :key="`item_${i}`"></donation-skeleton>
			</div>
			<div v-else>
				<transition-group name="flip-list">
					<donation-item v-for="donation in donations" :key="`donation_item_${donation.id}`" :tip="donation"></donation-item>
				</transition-group>
				<div class="w-100 d-flex justify-content-center py-3" v-if="loading_next_page">
					<loading-spinner class="image__spinner" />
				</div>
				<div v-if="next_page_url === null && !loading_next_page && donations.length > 20">
					<no-content>{{ __.get("messages.no-more-tip") }}</no-content>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
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

			order: { name: __.get("tips.newest"), value: "desc", icon: "filter_list" },
			type: { name: __.get("tips.all"), value: "all" },
		};
	},
	components: { DonationSkeleton, DonationItem, Tselect, NoContent },
	computed: {
		...mapState(["user"]),
		filter() {
			return {
				sort: this.order.value,
				my_tips: this.type.value,
			};
		},
	},
	watch: {
		filter() {
			this.loading = true;
			axios
				.post("/tips", { filter: this.filter })
				.then((response) => {
					this.donations = response.data.data;
					this.next_page_url = response.data.links.next;
				})
				.catch((err) => {
					this.toast(__.get("messages.connection-error"));
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
						this.donations = this.donations.concat(response.data.data);
						this.next_page_url = response.data.links.next;
					})
					.catch((err) => {
						this.toast(__.get("messages.connection-error"));
					})
					.then(() => {
						this.loading_next_page = false;
					});
			}
		},
	},
	mounted() {
		this.loading = true;
		Echo.private(`user.${this.user.id}`).listen("DonateEvent", (data) => {
			if (this.order.value == "desc") {
				if ((this.type.value == "my" && data.tip.donate_by_me) || this.type.value == "all" || (this.type.value == "forme" && !data.tip.donate_by_me)) {
					this.donations.unshift(data.tip);
				}
			} else {
				if ((this.type.value == "my" && data.tip.donate_by_me) || this.type.value == "all" || (this.type.value == "forme" && !data.tip.donate_by_me)) {
					this.donations.push(data.tip);
				}
			}
		});
		axios
			.post("/tips", { filter: this.filter })
			.then((response) => {
				this.donations = response.data.data;
				this.next_page_url = response.data.links.next;
			})
			.catch((err) => {
				this.toast(__.get("messages.connection-error"));
			})
			.then(() => {
				this.loading = false;
			});
	},
};
</script>

<style>
</style>