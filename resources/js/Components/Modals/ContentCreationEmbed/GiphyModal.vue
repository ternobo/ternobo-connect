<template>
	<b-modal v-model="showModal" @show="onShow" @hide="showNewPostModal" header-class="back-modal" title-class="d-flex align-items-center" hide-footer size="lg" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<template #modal-title> <img src="/images/giphy-logo.png" width="16" class="me-2" /> Gifs by Giphy</template>
		<div class="input-group-icon mb-4">
			<input v-model="search" class="form-control fill rounded" />
			<i v-if="loading"><loading-spinner :width="20" :height="20"></loading-spinner></i>
			<i class="material-icons" v-else>search</i>
		</div>
		<masonry :cols="2" :gutter="12" class="giphy-modal__list">
			<div v-for="gif in gifs" :key="`gif_id_${gif.id}`" class="w-100 mt-0 clickable mb-3" @click="$emit('select', gif.images.fixed_height.url)">
				<img style="height: 200px" :src="gif.images.fixed_height.url" loading="lazy" />
			</div>
		</masonry>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import { GiphyFetch } from "@giphy/js-fetch-api";
import InternalModalsMixin from "../../NewPost/Mixins/InternalModalsMixin";
const giphy = new GiphyFetch(process.env.MIX_GIPHY_API_KEY);

export default {
	mixins: [ModalMixin, InternalModalsMixin],
	name: "GiphyModal",
	data() {
		return {
			search: "",

			loading: false,
			gifs: [],
			currentPage: 1,
			searchTimeout: null,
		};
	},
	computed: {
		apiKey() {
			return process.env.MIX_GIPHY_API_KEY;
		},
	},
	watch: {
		search() {
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				this.loadFromGiphy();
			}, 400);
		},
	},
	methods: {
		onShow() {
			this.hideNewPostModal();
			this.loadFromGiphy();
		},
		loadFromGiphy() {
			this.loading = true;

			if (this.search.length > 0) {
				giphy
					.search(this.search)
					.then((response) => {
						this.gifs = response.data;
						this.loading = false;
					})
					.catch((err) => {
						this.loading = false;
						console.log(err);
					});
			} else {
				giphy
					.trending()
					.then((response) => {
						this.gifs = response.data;
						this.loading = false;
					})
					.catch((err) => {
						this.loading = false;
						console.log(err);
					});
			}
		},
	},
};
</script>