<template>
	<div class="position-relative card" v-if="$store.state.user != null && $store.state.shared.fullAccess">
		<new-post-modal @posted="onPosted" :show.sync="showPostModal"></new-post-modal>
		<div class="card-body">
			<div class="d-flex align-items-center">
				<lazy-image :loadingColor="skeletonOptions.profileColor" img-class="profile-sm" class="profile-sm me-3" loading="lazy" :src="$store.state.user.profile" />
				<div class="w-100 clickable" style="border-radius: 12px; background: #f5f5f5; padding: 8px 16px" @click="showPostModal = true">
					<span class="text-gray-dark font-14">
						{{ __.get("content/posts.post-card-text", { fname: $store.state.user.first_name }) }}
					</span>
				</div>
				<wire-link v-if="showDraft" v-b-tooltip.hover.ds700 key="shownotificatiosn_item" :title="__.get('content/posts.draft')" :href="`/${$store.state.user.username}#drafts`" as="i" class="material-icons-outlined clickable text-grey ms-4 hover-dark">save</wire-link>
			</div>
		</div>
	</div>
</template>

<script>
import NewPostModal from "../NewPost/NewPostModal";
export default {
	methods: {
		onPosted(post) {
			this.$emit("posted", post);
		},
	},
	components: { NewPostModal },
	props: {
		showDraft: {
			default: true,
		},
	},
	data() {
		return {
			showPostModal: false,
		};
	},
	name: "NewPostCard",
};
</script>

<style></style>
