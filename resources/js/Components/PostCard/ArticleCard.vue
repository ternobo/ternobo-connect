<template>
	<div class="post-box" :class="{ 'reshared-post': !showMenu }" v-if="post !== undefined && !deleted">
		<EmbedCodeModal :post="post" :show.sync="showEmbed"></EmbedCodeModal>
		<ReshareModal :post="post" :show.sync="showReshare"></ReshareModal>
		<likes-modal :item="post.id" :show.sync="showLikes"></likes-modal>

		<div class="post-header pt-0">
			<wire-link class="publisher" :href="'/' + post.page.slug">
				<lazy-image class="profile-sm mb-0" img-class="profile-sm" :src="post.page.profile" />
				<div>
					<strong> {{ post.page.name }} <i v-if="post.page.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
					<span class="text-muted font-12">
						{{ post.page.short_bio }}
					</span>
					<div class="post-time" :class="{ 'pt-0': post.text != null && post.text.length > 0 }" v-if="showMenu">
						{{ post_time }}
						<span class="mx-1 font-10">●</span>
						<span v-if="post.updated_at !== post.created_at">بروز شده</span>
						<span v-if="post.updated_at !== post.created_at" class="mx-1 font-10">●</span>
						<i class="material-icons-outlined text-light verical-middle">
							{{ post.show === "public" ? "public" : "group" }}
						</i>
					</div>
				</div>
			</wire-link>
			<div class="actions position-relative" v-if="showMenu">
				<i class="material-icons bookmark-icon clickale text-muted clickable hover-dark" @click="bookmark">{{ bookmarked ? "bookmark" : "bookmark_border" }}</i>
				<div>
					<post-menu :post="post" @embed="showEmbed = true" @deleted="doDelete"></post-menu>
				</div>
			</div>
		</div>
		<wire-link class="post-body pb-2" :href="postSlug">
			<div class="images articleimg" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
				<lazy-image class="m-0" style="min-height: 218px" alt="" :src="post.medias" />
			</div>
			<h4 style="margin-right: -12px !important" class="article-title">{{ post.title }}</h4>
		</wire-link>
		<div class="post-footer" v-if="showMenu">
			<div class="tagandcate" v-if="((post.tags != null && post.tags.length > 0) || post.category !== null) && showMenu">
				<div class="tags">
					<wire-link v-for="(tag, index) in post.tags" :key="tag + '_POST_TAG_' + post.id + '_' + index" class="tag-item" :href="'/tags/' + tag">
						{{ tag }}
					</wire-link>
				</div>
				<wire-link class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
					<i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
				</wire-link>
			</div>
			<div class="actions" v-if="showMenu && $store.state.user">
				<div>
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
				<div class="buttons">
					<i class="material-icons-outlined" @click="showReshare = true">sync</i>
					<i class="material-icons like" @click="like" v-if="!checkUser(post.page.user_id)" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import EmbedCodeModal from "../Modals/EmbedCodeModal";
// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";
import ReshareModal from "../Modals/ReshareModal";
import PostMenu from "../Menues/PostMenu.vue";

TimeAgo.addLocale(fa);

export default {
	data() {
		return {
			liked: false,
			bookmarked: false,
			showEmbed: false,
			showReshare: false,

			showLikes: false,
			deleted: false,
		};
	},
	created() {
		this.liked = this.post.is_liked;
		this.bookmarked = this.post.is_bookmarked;
	},
	mounted() {
		let options = {
			root: null,
			threshold: 1.0,
		};
		const $this = this;
		let observer = new IntersectionObserver(function () {
			if (!$this.seen_content.includes($this.post.id)) {
				$this.seen_content.push($this.post.id);
				$this.seen_request.push($this.post.id);
			}
		}, options);
		observer.observe(this.$el);
	},
	components: {
		EmbedCodeModal,
		ReshareModal,
		PostMenu,
	},
	methods: {
		doDelete() {
			this.deleted = true;
			axios.delete("/posts/" + this.post.id);
		},
		like() {
			if (this.liked) {
				this.liked = false;
			} else {
				this.liked = true;
			}
			const $this = this;
			this.$axios({
				method: "post",
				url: this.$APP_URL + "/like/" + this.post.id,
			}).catch((error) => {});
		},
		bookmark() {
			if (this.bookmarked) {
				this.bookmarked = false;
			} else {
				this.bookmarked = true;
			}
			const $this = this;
			this.$axios({
				method: "post",
				url: this.$APP_URL + "/bookmark/" + this.post.id,
			}).catch((error) => {});
		},
	},
	name: "ArticleCard",
	props: {
		showMenu: {
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
	computed: {
		post_time: function () {
			const timeAgo = new TimeAgo("fa-FA");
			return timeAgo.format(Date.parse(this.post.created_at), "fa_FA");
		},
		postSlug: function () {
			let post_slug = this.post.id;
			if (this.post.slug !== null && this.post.slug.length > 0) {
				post_slug = this.post.slug;
			}
			let page_slug = this.post.page.slug;
			return this.$APP_URL + "/" + page_slug + "/" + post_slug;
		},
		updated_at: function () {
			if (this.post.updated_at !== null) {
				const timeAgo = new TimeAgo("fa-FA");
				return timeAgo.format(Date.parse(this.post.updated_at), "fa_FA");
			}
			return "";
		},
	},
};
</script>
