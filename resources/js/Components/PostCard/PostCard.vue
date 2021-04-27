<template>
	<div class="post-box" v-if="post !== undefined && !deleted">
		<EmbedCodeModal :post="post" :show.sync="showEmbed"></EmbedCodeModal>
		<new-post-modal :post="post" :show.sync="edit"></new-post-modal>
		<likes-modal :item="post.id" :show.sync="showLikes"></likes-modal>
		<donation-modal :post="post.id" :show.sync="showTips" :showDonate="!checkUser(post.page.user_id)"></donation-modal>
		<div class="post-header pt-0">
			<wire-link class="publisher" :href="'/' + post.page.slug">
				<lazy-image class="profile-sm mb-0" img-class="profile-sm" :src="post.page.profile" />
				<div>
					<strong class="publisher--name"> {{ post.page.name }} <i v-if="post.page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
					<span class="publisher--shortbio">
						{{ post.page.short_bio }}
					</span>
					<span class="text-superlight font-11">
						{{ post_time }}
					</span>
				</div>
			</wire-link>
			<div class="actions position-relative">
				<span class="category-item" v-if="this.post.category != null"><i class="material-icons-outlined">layers</i>{{ this.post.category.name }}</span>
				<div>
					<post-menu :post="post" @embed="showEmbed = true" @edit="edit = true" @deleted="doDelete"></post-menu>
				</div>
			</div>
		</div>
		<component v-if="post != null && post != undefined" class="mb-3" :post="post" :has-comment="hasComment" v-bind:is="componentType"></component>

		<div class="post-footer">
			<div class="actions" v-if="$store.state.user">
				<div>
					<div class="clickale text-muted clickable hover-dark" v-if="post.page.has_donate" @click="showTips = true">
						<i class="material-icons-outlined">savings</i>
						حمایت
					</div>
				</div>
				<div class="buttons">
					<i class="material-icons bookmark-icon clickale text-muted clickable hover-dark" @click="bookmark">{{ bookmarked ? "bookmark" : "bookmark_border" }}</i>
					<i :class="{ 'material-icons-outlined': !openComment, 'material-icons': openComment }" v-if="hasComment" v-on:click="openComment = !openComment">comment</i>
					<i class="material-icons like" v-if="!checkUser(post.page.user_id)" @click="like" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
				</div>
			</div>
			<div @click="showLikes = true" class="d-flex post-likes-text text-muted clickable" v-if="post.mutual_likes != null && post.mutual_likes.length > 0">
				<span class="ml-1">پسندیده شده توسط</span>
				<wire-link v-if="post.mutual_likes[0]" :href="'/' + post.mutual_likes[0].page.slug" class="text-dark">
					<strong class="text-light">{{ post.mutual_likes[0].page.name }}</strong>
				</wire-link>
				<div v-if="post.mutual_likes.length > 1">
					<span class="mr-1">و</span>
					<wire-link v-if="post.mutual_likes[1]" :href="'/' + post.mutual_likes[0].page.slug" class="text-dark">
						<strong class="text-light">{{ post.mutual_likes[1].page.name }}</strong>
					</wire-link>
				</div>
				<span class="mx-1" v-if="post.mutual_likes.length > 2"> و ... </span>
			</div>
		</div>

		<transition name="slide">
			<div v-if="openComment">
				<CommentsList :post="post.id"></CommentsList>
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
			return timeAgo.format(Date.parse(this.post.created_at), "fa_FA");
		},
		updated_at: function () {
			if (this.post.updated_at !== null) {
				const timeAgo = new TimeAgo("fa-FA");
				return timeAgo.format(Date.parse(this.post.updated_at), "fa_FA");
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
	created() {
		if (this.post) {
			this.liked = this.post.is_liked;
			this.bookmarked = this.post.is_bookmarked;
			if (this.post.type === "article") {
				this.componentType = require("./ArticleCard").default;
			} else if (this.post.type == "post") {
				this.componentType = require("./SliderCard").default;
			}
		}
	},
	data() {
		return {
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
