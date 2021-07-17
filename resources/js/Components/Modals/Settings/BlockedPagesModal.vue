<template>
	<b-modal v-model="showModal" hide-footer @show="onShown" :title="__.choice('application.like', 2)" size="md" :centered="true">
		<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
		<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-else-if="error">
			<div class="d-flex flex-column justify-center align-items-center w-100 err">
				<i @click="onShown" class="hover-dark text-muted material-icons-outlined">refresh</i>
				<br />
				<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
			</div>
		</div>
		<div class="likes-list" v-else v-infinite-scroll="loadMore" :infinite-scroll-distance="10">
			<transition-group name="flip-list">
				<div v-for="(page, index) in pages" :key="'like_' + page.id" class="like-item">
					<wire-link :href="'/' + page.slug" class="userinfo">
						<lazy-image class="mb-0" :class="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :loadingColor="skeletonOptions.profileColor" :imgClass="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :src="page.profile"></lazy-image>
						<div class="page-name d-flex flex-column">
							<strong> {{ page.name }} <i v-if="page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
							<span class="shortbio"> {{ page.short_bio }} </span>
						</div>
					</wire-link>
					<connetion-buttons v-if="page.slug != user.username" :blocked.sync="pages[index].blocked" :pageId="page.id"></connetion-buttons>
				</div>
			</transition-group>
			<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
		</div>
	</b-modal>
</template>

<script>
import { mapState } from "vuex";
import ConnetionButtons from "../../buttons/ConnetionButtons.vue";
import ModalMixin from "../../../Mixins/Modal";
import PagesListLoading from "../../Skeletons/PagesListLoading.vue";
export default {
	watch: {
		pagesPaginates(newValue) {
			this.pages = newValue.data;
			this.next_page_url = newValue.next_page_url;
		},
	},
	computed: {
		...mapState(["user"]),
	},
	data() {
		return {
			error: false,
			loading: true,
			pagesPaginates: null,
			pages: [],
			next_page_url: null,
			loadingMore: false,

			typeBasedData: {},
		};
	},
	methods: {
		loadMore($state) {
			const options = {
				method: "POST",
				url: this.next_page_url,
				data: this.typeBasedData,
			};
			axios(options)
				.then((response) => {
					const data = response.data.data;
					if (data) {
						this.pages = this.pages.concat(data.data);
						this.next_page_url = data.next_page_url;
						$state.loaded();
					}
				})
				.catch((error) => {
					this.next_page_url = options.url;
					$state.error();
				})
				.then(() => {
					if (this.next_page_url == null) {
						$state.complete();
					}
				});
		},
		onShown() {
			this.pages = true;
			this.loading = true;
			this.error = false;

			axios
				.get("/settings/blocked-pages")
				.then((response) => {
					this.pagesPaginates = response.data.data;
				})
				.catch((error) => {
					this.error = true;
				})
				.then(() => (this.loading = false));
		},
	},
	components: { PagesListLoading, ConnetionButtons },

	mixins: [ModalMixin],
	name: "BlockedPagesModal",
};
</script>

<style></style>
