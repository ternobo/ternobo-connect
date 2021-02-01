<template>
	<div class="position-relative card" v-if="$store.state.user != null">
		<new-post-modal @done="$emit('done')" :show.sync="showPostModal"></new-post-modal>
		<div class="new-post-body">
			<div class="text d-flex align-items-center">
				<lazy-image img-class="profile-sm" class="profile-sm ml-2 mb-0" loading="lazy" :src="$store.state.user.profile" />
				<div class="w-100 clickable" style="border-radius: 15px; background: #f5f5f5; padding: 8px 12px" @click="showPostModal = true">
					<span class="new-post--placeholder">
						{{ "به چی فکر می‌کنی " + $store.state.user.first_name + "؟" }}
					</span>
				</div>
			</div>
			<div class="d-flex text-muted align-items-center justify-content-between new-post-actions">
				<a class="new-post--action clickable" @click="showPostModal = true"><i class="material-icons-outlined">crop_original</i> رسانه </a>
				<wire-link href="/articles/create" class="new-post--action"> <i class="material-icons-outlined">article</i> مقاله </wire-link>
				<a class="new-post--action disabled"><i class="material-icons-outlined">poll</i> نظر سنجی </a>
			</div>
		</div>
	</div>
</template>

<script>
import NewPostModal from "../Modals/NewPostModal.vue";
export default {
	components: { NewPostModal },
	data() {
		return {
			showPostModal: false,
		};
	},
	name: "NewPostCard",
};
</script>

<style></style>
