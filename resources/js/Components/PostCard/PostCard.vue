<template>
	<div class="post-box" v-if="post !== undefined && !deleted">
		<EmbedCodeModal :post="post_data" :show.sync="showEmbed"></EmbedCodeModal>
		<new-post-modal :post.sync="post_data" :show.sync="edit"></new-post-modal>
		<likes-modal :item="post_data.id" :show.sync="showLikes"></likes-modal>
		<donation-modal :post="post_data.id" :show.sync="showTips" :showDonate="!checkUser(post_data.page.user_id) && post_data.can_tip"></donation-modal>
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
				<span class="category-item" v-if="this.post_data.category != null">{{ this.post_data.category.name }}</span>
				<div>
					<post-menu :post="post" @embed="showEmbed = true" @edit="edit = true" @deleted="doDelete"></post-menu>
				</div>
			</div>
		</div>
		<component v-if="post_data != null && post_data != undefined" :post="post_data" :has-comment="hasComment" v-bind:is="componentType"></component>

		<div class="post-footer">
			<div class="actions" v-if="$store.state.user">
				<div>
					<div class="clickale text-muted clickable hover-dark" v-if="post_data.page.has_donate && post_data.can_tip" @click="showTips = true">
						<i class="material-icons-outlined">savings</i>
						حمایت
					</div>
				</div>
				<div class="buttons">
					<i class="material-icons bookmark-icon clickable hover-dark" :class="{ active: bookmarked }" @click="bookmark">{{ bookmarked ? "bookmark" : "bookmark_border" }}</i>
					<i :class="{ 'material-icons-outlined': !openComment, 'material-icons active': openComment }" v-if="hasComment" v-on:click="openComment = !openComment">comment</i>
					<i class="material-icons like" v-if="!checkUser(post_data.page.user_id)" @click="like" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
				</div>
			</div>
			<div class="d-flex post-likes-text text-muted clickable" v-if="post_data.mutual_likes != null && post_data.mutual_likes.length > 0">
				<span @click="showLikes = true" class="ml-1">پسندیده شده توسط</span>
				<wire-link v-if="post_data.mutual_likes[0]" :href="'/' + post_data.mutual_likes[0].page.slug" class="text-dark">
					<strong class="text-light">{{ post_data.mutual_likes[0].page.name }}</strong>
				</wire-link>
				<div v-if="post_data.mutual_likes.length > 1">
					<span class="mr-1">و</span>
					<wire-link v-if="post_data.mutual_likes[1]" :href="'/' + post_data.mutual_likes[0].page.slug" class="text-dark">
						<strong class="text-light">{{ post_data.mutual_likes[1].page.name }}</strong>
					</wire-link>
				</div>
				<span class="mx-1" v-if="post_data.mutual_likes.length > 2"> و ... </span>
			</div>
		</div>

		<transition name="slide">
			<div v-if="openComment">
				<CommentsList :post="post_data.id"></CommentsList>
			</div>
		</transition>
	</div>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import CommentsList from "../Comments/CommetsList";
import EmbedCodeModal from "../Modals/EmbedCodeModal";

// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
import PostMenu from "../Menues/PostMenu.vue";
import NewPostModal from "../NewPost/NewPostModal";
import DonationModal from "./Donation/DonationModal.vue";

TimeAgo.addLocale(fa);
export default {
	computed: {
		post_time: function () {
			const timeAgo = new TimeAgo("fa-FA");
			return timeAgo.format(Date.parse(this.post_data.created_at), "fa_FA");
		},
		updated_at: function () {
			if (this.post_data.updated_at !== null) {
				const timeAgo = new TimeAgo("fa-FA");
				return timeAgo.format(Date.parse(this.post_data.updated_at), "fa_FA");
			}
			return "";
		},
	},

	components: {
		CommentsList: CommentsList,
		EmbedCodeModal: EmbedCodeModal,
		PostMenu,
		NewPostModal,
		DonationModal,
	},
	methods: {
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
			this.confirmDialog("آیا از حذف این پست اطمینان دارید؟").then((value) => {
				if (value) {
					this.deleted = true;
					axios.delete("/posts/" + this.post_data.id);
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

<style>
</style>
