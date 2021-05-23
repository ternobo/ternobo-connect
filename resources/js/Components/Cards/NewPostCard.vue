<template>
	<div class="position-relative card" v-if="$store.state.user != null">
		<new-post-modal @done="$emit('done')" :show.sync="showPostModal"></new-post-modal>
		<div class="new-post-body">
			<div class="text d-flex align-items-center">
				<lazy-image :loadingColor="skeletonOptions.profileColor" img-class="profile-sm" class="profile-sm" loading="lazy" :src="$store.state.user.profile" />
				<div class="w-100 clickable" style="border-radius: 12px; background: #f5f5f5; padding: 8px 16px" @click="showPostModal = true">
					<span class="new-post--placeholder">
						{{ "به چی فکر می‌کنی " + $store.state.user.first_name + "؟" }}
					</span>
				</div>
				<wire-link :href="`/${$store.state.user.username}#drafts`" as="i" class="material-icons-outlined clickable text-grey mr-4">save</wire-link>
			</div>
		</div>
	</div>
</template>

<script>
import NewPostModal from "../NewPost/NewPostModal";
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
