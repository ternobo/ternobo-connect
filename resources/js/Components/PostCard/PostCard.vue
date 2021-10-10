<template>
	<div class="post-box" v-if="post !== undefined && !deleted">
		<EmbedCodeModal :post="post_data" :show.sync="showEmbed"></EmbedCodeModal>
		<new-post-modal v-if="checkUser(post_data.page.user_id)" :post.sync="post_data" :show.sync="edit"></new-post-modal>
		<likes-modal :item="post_data.id" :show.sync="showLikes"></likes-modal>
		<donation-modal :post="post_data.id" :post_data="post_data" :show.sync="showTips" :showDonate="!checkUser(post_data.page.user_id) && post_data.can_tip"></donation-modal>
		<div class="post-header pt-0">
			<wire-link class="publisher" :href="'/' + post_data.page.slug">
				<lazy-image class="profile-sm mb-0" img-class="profile-sm" :src="post_data.page.profile" />
				<div>
					<strong class="publisher--name"> {{ post_data.page.name }} <i v-if="post_data.page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
					<span class="publisher--shortbio">
						{{ post_data.page.short_bio }}
					</span>
					<span class="publisher--shortbio font-10">
						{{ post_time }}
					</span>
				</div>
			</wire-link>
			<div class="actions position-relative">
				<wire-link :href="`/${post_data.page.slug}/activities?filters={&quot;category&quot;: &quot;${this.post_data.category_id}&quot;}`" class="category-item" v-if="this.post_data.category != null">{{ this.post_data.category.name }}</wire-link>
				<div>
					<post-menu :post="post" v-if="!isEmbed" @copySlide="copySlide" @reported="deleted = true" @embed="showEmbed = true" @edit="edit = true" @deleted="doDelete"></post-menu>
				</div>
			</div>
		</div>

		<component v-if="post_data != null && post_data != undefined" :slide.sync="slide" :post="post_data" :has-comment="hasComment" v-bind:is="componentType"></component>

		<div class="post-footer" v-if="!isEmbed">
			<div class="actions">
				<div>
					<div class="clickale text-muted clickable hover-dark" v-if="post_data.page.has_donate && post_data.can_tip" @click="showTips = true">
						<i class="material-icons-outlined">savings</i>
						{{ __.choice("tips.tip", 1) }}
					</div>
				</div>
				<div>
					<div class="buttons" v-if="$store.state.user">
						<i class="material-icons bookmark-icon clickable hover-dark" :class="{ active: bookmarked }" @click="bookmark">{{ bookmarked ? "bookmark" : "bookmark_border" }}</i>
						<a :href="`/posts/${post_data.id}`" target="_blank"><i class="material-icons-outlined" v-if="hasComment">comment</i></a>
						<i class="material-icons like" v-if="!checkUser(post_data.page.user_id)" @click="like" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
					</div>
				</div>
			</div>
			<div class="d-flex post-likes-text text-muted clickable" v-if="post_data.mutual_likes != null && post_data.mutual_likes.length > 0">
				<span @click="showLikes = true" class="me-1">{{ __.get("content/posts.liked-text") }}</span>
				<wire-link v-if="post_data.mutual_likes[0]" :href="'/' + post_data.mutual_likes[0].page.slug" class="text-dark me-1">
					<span class="d-flex">
						<strong class="text-gray-medium-dark">{{ post_data.mutual_likes[0].page.name }}</strong>
						<span class="text-gray-medium-dark">{{ post_data.mutual_likes.length > 2 ? __.get("application.comma") : "" }} </span>
					</span>
				</wire-link>
				<div v-if="post_data.mutual_likes.length > 1">
					<span v-if="post_data.mutual_likes.length == 2">{{ __.get("content/posts.and") }}</span>
					<wire-link v-if="post_data.mutual_likes[1]" :href="'/' + post_data.mutual_likes[0].page.slug" class="text-dark">
						<strong class="text-gray-medium-dark">{{ post_data.mutual_likes[1].page.name }}</strong>
					</wire-link>
				</div>
				<span class="mx-1" v-if="post_data.mutual_likes.length > 2"> {{ __.get("content/posts.and") }} ... </span>
			</div>
		</div>
	</div>
</template>

<script>
import EmbedCodeModal from "../Modals/EmbedCodeModal";

import PostMenu from "../Menues/PostMenu.vue";
import NewPostModal from "../NewPost/NewPostModal";
import DonationModal from "./Donation/DonationModal.vue";

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
	},

	components: {
		EmbedCodeModal: EmbedCodeModal,
		PostMenu,
		NewPostModal,
		DonationModal,
	},
	methods: {
		copySlide() {
			this.copyText(this.$APP_URL + "/posts/" + this.post_data.id + "?slide=" + this.slide).then(() => this.toast(__.get("messages.copied"), "check", "text-success"));
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
			}).catch((error) => {
				console.log(error);
			});
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
			}).catch((error) => {
				console.log(error);
				this.bookmark = false;
				this.toast(__("messages.connection-error"), "error_outlined", "text-danger");
			});
		},
	},
	created() {
		if (this.post) {
			this.post_data = this.post;
			this.liked = this.post_data.is_liked;
			this.bookmarked = this.post_data.is_bookmarked;
			if (this.post_data.type === "article") {
				this.componentType = require("./ArticleCard").default;
			} else if (this.post_data.type == "post") {
				this.componentType = require("./SliderCard").default;
			}
		}
	},
	data() {
		return {
			post_data: {},

			componentType: null,
			liked: false,
			bookmarked: false,
			openComment: false,
			showEmbed: false,
			showReshare: false,
			showLikes: false,
			showTips: false,

			deleted: false,

			edit: false,

			showMore: false,
		};
	},
	name: "PostCard",
	props: {
		slide: {
			type: Number,
			default: 0,
			required: false,
		},
		hasComment: {
			type: Boolean,
			default: true,
			required: false,
		},
		isEmbed: {
			type: Boolean,
			default: false,
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

<style>
</style>
