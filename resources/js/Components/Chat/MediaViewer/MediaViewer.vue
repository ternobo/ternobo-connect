<template>
	<div class="media-viewer">
		<div class="filters">
			<div class="clickable filter" @click="type = 'media'" :class="{ active: type == 'media' }">
				<i class="material-icons-outlined">image</i>
				رسانه‌ها
			</div>
			<div class="clickable filter" @click="type = 'document'" :class="{ active: type == 'document' }">
				<i class="material-icons-outlined">file_copy</i>
				پرونده
			</div>
		</div>
		<div class="media-list loading" v-if="loading">
			<loading-spinner></loading-spinner>
		</div>
		<div class="media-list" v-else-if="type == 'media' && media.length > 0">
			<media-item v-for="item in media" :key="'media_item_id_' + item.id" :media="item"></media-item>
		</div>
		<div class="document-list" v-else-if="type == 'document' && media.length > 0">
			<document-item class="mb-3" v-for="item in media" :key="'document_item_id_' + item.id" :document="item"></document-item>
		</div>
		<div class="media-list loading" v-else>
			<div class="d-flex align-items-center justify-content-center flex-column w-100 h-100">
				<i class="material-icons-outlined text-superlight font-32">sentiment_dissatisfied</i>
				<span class="text-superlight font-16 no-chat-selected">{{ type == "document" ? "پرونده‌ای یافت نشد" : "رسانه‌ای یافت نشد" }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import LoadingSpinner from "../../LoadingSpinner.vue";
import DocumentItem from "./DocumentItem.vue";
import MediaItem from "./MediaItem.vue";
export default {
	watch: {
		type(newVal) {
			this.loading = true;
			axios
				.post("/media/get", { chat_id: this.chatId, type: newVal })
				.then((response) => {
					let data = response.data;
					this.media = data.media.data;
					this.next_page_url = data.media.next_page_url;
				})
				.catch((err) => {})
				.then(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.loading = true;
		axios
			.post("/media/get", { chat_id: this.chatId, type: this.type })
			.then((response) => {
				let data = response.data;
				this.media = data.media.data;
				this.next_page_url = data.media.next_page_url;
			})
			.catch((err) => {})
			.then(() => {
				this.loading = false;
			});
	},
	components: { MediaItem, LoadingSpinner, DocumentItem },
	data() {
		return {
			type: "media",

			loading: false,

			media: [],
			next_page_url: null,
			loading_next_page: null,
		};
	},
	props: ["chatId"],
};
</script>

<style>
</style>
