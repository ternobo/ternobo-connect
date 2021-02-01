<template>
	<base-layout>
		<div class="w-100" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loadingPage" infinite-scroll-distance="5">
			<p class="text-center font-18 text-muted">
				{{ total }} نتیجه جستجو برای <strong>{{ search }}</strong> یافت شد
			</p>

			<tabs :compact="true" :centered="true" class="justify-content-center" @selected="loadTabContent">
				<tab name="کاربران" id="page" :selected="currentTab === 'page'">
					<div class="row" v-if="currentTab === 'page'">
						<div class="col-md-6" v-for="(page, index) in data" :key="page.id + '_index_' + index">
							<div class="user">
								<div class="card mb-3">
									<div class="card-body py-2">
										<div class="people-sugestion border-0 d-flex justify-content-between align-items-center bg-white">
											<wire-link class="d-flex h-100 align-items-center w-100" :href="$APP_URL + '/' + page.slug">
												<lazy-image class="mb-0 ml-2" imgStyle="height: 80px; width: 80px" imgClass="rounded-circle" :src="page.profile" />
												<div class="d-flex ml-2 align-items-start flex-column justify-content-center">
													<span class="person-name"> {{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </span>
													<small class="text-muted"> {{ page.short_bio }}</small>
												</div>
											</wire-link>
											<ConnetionButtons :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
							<loading-spinner class="image__spinner" />
						</div>
						<div class="w-100" v-if="next_page_url === null && !loadingPage">
							<no-content>نتیجه بیشتری وجود ندارد</no-content>
						</div>
					</div>
				</tab>
				<tab name="مطالب" id="content" :selected="currentTab === 'content'">
					<div class="row" v-if="currentTab === 'content' && !loadingPage">
						<div class="col-md-6 mb-3" v-for="(post, index) in data" :key="post.id + '_index_' + index">
							<PostCard class="h-100 m-0" :post="post"></PostCard>
						</div>
					</div>
					<div class="w-100 d-flex justify-content-center py-3" v-if="loadingPage">
						<loading-spinner class="image__spinner" />
					</div>
					<div class="w-100" v-if="next_page_url === null && !loadingPage">
						<no-content>نتیجه بیشتری وجود ندارد</no-content>
					</div>
				</tab>
			</tabs>
		</div>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
import NoContent from "../Components/NoContent";
import PostCard from "../Components/PostCard/PostCard";

import ConnectionButton from "../Components/buttons/ConnectionButton";
import FollowButton from "../Components/buttons/FollowButton";
export default {
	created() {
		this.data = this.results.data;
		this.next_page_url = this.results.next_page_url;
		this.page = this.results.current_page;
		this.total = this.results.total;

		this.$store.commit("setSearch", this.search);

		if (this.currentTab == "page" && this.total < 1) {
			this.loadTabContent("content");
		}
	},
	data() {
		return {
			currentTab: "page",
			data: [],
			page: 1,
			next_page_url: undefined,
			loadingPage: false,
			total: 0,
		};
	},
	methods: {
		loadTabContent(tab) {
			if (tab !== this.currentTab) {
				this.data = [];
				this.currentTab = tab;

				const options = {
					method: "GET",
					headers: {
						"X-Inertia": "true",
					},
					url: this.$APP_URL + "/search?type=" + tab + "&q=" + this.search,
				};
				this.loadingPage = true;
				axios(options)
					.then((response) => {
						const data = response.data.props.results;
						if (data) {
							this.data = data.data;
							this.total = data.total;
							this.page = data.current_page;
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						this.next_page_url = options.url;
					})
					.then(() => {
						this.loadingPage = false;
					});
			}
		},
		loadMore() {
			if (!this.loadingPage && this.next_page_url !== null) {
				const $this = this;
				const options = {
					method: "GET",
					headers: {
						"X-Inertia": "true",
					},
					url: this.next_page_url,
				};
				this.loadingPage = true;
				axios(options)
					.then((response) => {
						const data = response.data.props.results;
						if (data) {
							$this.data = $this.data.concat(data.data);
							$this.page = data.current_page;
							$this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						this.next_page_url = options.url;
					})
					.then(() => {
						$this.loadingPage = false;
					});
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
		PostCard,
		FollowButton,
		ConnectionButton,
	},
	name: "Search",
	layout: AppLayout,
};
</script>
