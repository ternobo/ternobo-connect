<template>
	<b-modal v-model="showModal" @show="onShow" @hide="showNewPostModal" header-class="back-modal" title-class="d-flex align-items-center" hide-footer size="lg" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<template #modal-title> <img src="/images/unsplash-logo.svg" width="16" class="me-2" /> Unsplash</template>
		<div class="input-group-icon mb-4">
			<input v-model="search" :placeholder="__.get('application.search')" class="form-control fill rounded" />
			<i v-if="loading"><loading-spinner :width="20" :height="20"></loading-spinner></i>
			<i class="material-icons" v-else>search</i>
		</div>
		<div class="giphy-modal__list">
			<masonry :cols="2" :gutter="12">
				<div v-for="photo in photos" :key="`photo_id_${photo.id}`" class="w-100 mt-0 clickable mb-3" @click="$emit('select', photo.urls.regular)">
					<lazy-image imgStyle="height: 200px" :src="photo.urls.regular" class="d-flex justify-content-center m-0" />
				</div>
			</masonry>
			<infinite-loading v-if="showInfinite" @infinite="infiniteHandler"></infinite-loading>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import { createApi } from "unsplash-js";
import InternalModalsMixin from "../../NewPost/Mixins/InternalModalsMixin";

const unsplash = createApi({
	accessKey: process.env.MIX_UNSPLASH_ACCESS_KEY,
});

export default {
	mixins: [ModalMixin, InternalModalsMixin],
	name: "UnsplashModel",
	data() {
		return {
			search: "",

			loading: false,
			photos: [],
			currentPage: 1,
			searchTimeout: null,
			showInfinite: false,
		};
	},
	watch: {
		search() {
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				this.currentPage = 1;
				this.loading = true;
				unsplash.search
					.getPhotos({
						query: this.search,
						page: this.currentPage,
						perPage: 25,
					})
					.then((result) => {
						if (result.errors) {
							console.log("error occurred: ", result.errors[0]);
							this.loading = false;
						} else {
							this.photos = result.response.results;
							this.loading = false;
						}
					});
			}, 400);
		},
	},
	methods: {
		onShow() {
			this.currentPage = 1;
			this.hideNewPostModal();
			this.loadFromUnsplash();
		},
		infiniteHandler($state) {
			this.currentPage++;
			if (this.search.length > 0) {
				this.loading = true;
				unsplash.search
					.getPhotos({
						query: this.search,
						page: this.currentPage,
						perPage: 25,
					})
					.then((result) => {
						if (result.errors) {
							console.log("error occurred: ", result.errors[0]);
							$state?.error();
						} else {
							this.photos = this.photos.concat(result.response.results);
							this.loading = false;
							$state?.loaded();
						}
					});
			} else {
				unsplash.photos
					.list({
						page: this.currentPage,
						perPage: 25,
					})
					.then((result) => {
						if (result.errors) {
							console.log("error occurred: ", result.errors[0]);
							$state?.error();
						} else {
							this.photos = this.photos.concat(result.response.results);
							this.loading = false;
							$state?.loaded();
						}
					});
			}
		},

		loadFromUnsplash() {
			unsplash.photos
				.list({
					page: this.currentPage,
					perPage: 25,
				})
				.then((result) => {
					if (result.errors) {
						console.log("error occurred: ", result.errors[0]);
					} else {
						this.photos = result.response.results;
						this.showInfinite = true;
					}
				});
		},
	},
};
</script>