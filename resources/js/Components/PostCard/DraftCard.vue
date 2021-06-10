<template>
	<div class="post-box" v-if="post !== undefined && post.page && !deleted">
		<new-post-modal :post="post" :show.sync="edit"></new-post-modal>
		<div class="post-header pt-0">
			<wire-link class="publisher" :href="'/' + post.page.slug">
				<lazy-image class="profile-sm mb-0" img-class="profile-sm" :src="post.page.profile" />
				<div>
					<strong class="publisher--name"> {{ post.page.name }} <i v-if="post.page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
					<span class="publisher--shortbio">
						{{ post.page.short_bio }}
					</span>
				</div>
			</wire-link>
			<div class="actions position-relative">
				<span class="category-item" v-if="this.post.category != null"><i class="material-icons-outlined">layers</i>{{ this.post.category.name }}</span>
			</div>
		</div>
		<component class="mb-3" :post="post" :has-comment="hasComment" v-bind:is="componentType"></component>
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
			return this.timeAgo(this.post.created_at);
		},
		updated_at: function () {
			if (this.post.updated_at !== null) {
				return this.timeAgo(this.post.updated_at);
			}
			return "";
		},
		componentType() {
			this.liked = this.post.is_liked;
			this.bookmarked = this.post.is_bookmarked;
			if (this.post.type === "draft_article") {
				return require("./ArticleCard").default;
			} else if (this.post.type == "draft_post") {
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
				.post(`/posts/${this.post.id}/publish`)
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
				url: this.$APP_URL + "/like/" + this.post.id,
			}).catch((error) => {});
		},
		doDelete() {
			this.deleted = true;
			axios.delete("/posts/" + this.post.id);
		},
		bookmark() {
			if (this.bookmarked) {
				this.bookmarked = false;
			} else {
				this.bookmarked = true;
			}
			this.$axios({
				method: "post",
				url: this.$APP_URL + "/bookmark/" + this.post.id,
			}).catch((error) => {});
		},
	},
	data() {
		return {
			liked: false,
			bookmarked: false,
			openComment: false,
			showEmbed: false,
			showReshare: false,
			showLikes: false,

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