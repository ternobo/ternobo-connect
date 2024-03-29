<template>
	<div class="post-box" v-if="post !== undefined && post_data.page && !deleted">
		<new-post-modal :post.sync="post_data" :show.sync="edit"></new-post-modal>
		<div class="post-header pt-0">
			<wire-link class="publisher" :href="'/' + post_data.page.slug">
				<lazy-image class="profile-sm mb-0" img-class="profile-sm" :src="post_data.page.profile" />
				<div class="ms-3">
					<strong class="publisher--name"> {{ post_data.page.name }} <i v-if="post_data.page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
					<span class="publisher--shortbio">
						{{ post_data.page.short_bio }}
					</span>
				</div>
			</wire-link>
			<div class="actions position-relative">
				<span class="category-item" v-if="this.post_data.category != null"><i class="material-icons-outlined">layers</i>{{ this.post_data.category.name }}</span>
			</div>
		</div>
		<component class="mb-4" :post="post_data" :has-comment="hasComment" v-bind:is="componentType"></component>
		<div class="post-footer px-3">
			<i class="material-icons hover-danger font-32" @click="doDelete">delete_outline</i>

			<div class="d-flex">
				<button class="btn btn-transparent button-transparent text-muted font-14" @click="edit = true">{{ __.get("application.edit") }}</button>
				<loading-button :loading="loading" @click.native="publish" class="btn btn-primary font-14">{{ __.get("content/posts.publish") }}</loading-button>
			</div>
		</div>
	</div>
</template>

<script>
import NewPostModal from "../NewPost/NewPostModal";

export default {
	computed: {
		post_time: function () {
			return this.timeAgo(this.post_data.created_at);
		},
		updated_at: function () {
			if (this.post_data.updated_at !== null) {
				return this.timeAgo(this.post_data.updated_at);
			}
			return "";
		},
		componentType() {
			this.liked = this.post_data.is_liked;
			this.bookmarked = this.post_data.is_bookmarked;
			if (this.post_data.type === "draft_article") {
				return require("./ArticleCard").default;
			} else if (this.post_data.type == "draft_post") {
				return require("./SliderCard").default;
			}
			return null;
		},
	},

	components: { NewPostModal },
	methods: {
		publish() {
			this.loading = true;
			axios
				.post(`/posts/${this.post_data.id}/publish`)
				.then((response) => {
					if (response.data.result) {
						this.deleted = true;
					}
				})
				.catch((err) => console.log(err))
				.then(() => (this.loading = false));
		},
		like() {
			if (this.liked) {
				this.liked = false;
			} else {
				this.liked = true;
			}
			this.$axios({
				method: "post",
				url: this.$APP_URL + "/like/" + this.post_data.id,
			}).catch((error) => {});
		},
		doDelete() {
			this.confirmDialog(__.get("messages.delete-post-confirm")).then((value) => {
				if (value) {
					this.deleted = true;
					axios.delete("/posts/" + this.post_data.id);
					this.$emit("deleted");
				}
			});
		},
		bookmark() {
			if (this.bookmarked) {
				this.bookmarked = false;
			} else {
				this.bookmarked = true;
			}
			this.$axios({
				method: "post",
				url: this.$APP_URL + "/bookmark/" + this.post_data.id,
			}).catch((error) => {});
		},
	},
	created() {
		this.post_data = this.post;
	},
	data() {
		return {
			liked: false,
			bookmarked: false,
			openComment: false,
			showEmbed: false,
			showReshare: false,
			showLikes: false,
			post_data: {},

			loading: false,

			deleted: false,

			edit: false,

			showMore: false,
		};
	},
	name: "DraftCard",
	props: {
		hasComment: {
			type: Boolean,
			default: true,
			required: false,
		},
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.post-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>