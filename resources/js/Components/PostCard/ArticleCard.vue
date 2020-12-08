<template>
	<div class="post-box" :class="{ 'reshared-post': !showMenu }" v-if="post !== undefined">
		<EmbedCodeModal :post="post" :show.sync="showEmbed"></EmbedCodeModal>
		<ReshareModal :post="post" :show.sync="showReshare"></ReshareModal>
		<likes-modal :item="post.id" :show.sync="showLikes"></likes-modal>

		<div class="post-header pt-0">
			<inertia-link class="publisher" :href="'/' + post.page.slug">
				<lazy-image class="profile-sm mb-0" img-class="profile-sm" :src="post.page.profile" />
				<div>
					<strong>
						{{ post.page.name }}
					</strong>
					<text class="text-muted font-12">
						{{ post.page.short_bio }}
					</text>
				</div>
			</inertia-link>
			<div class="actions position-relative" v-if="showMenu">
				<i class="material-icons bookmark-icon clickable text-muted hover-dark">bookmark_border</i>
				<div>
					<post-menu :post="post" @embed="showEmbed = true"></post-menu>
				</div>
			</div>
		</div>
		<inertia-link class="post-body pb-2" :href="postSlug">
			<div class="images articleimg" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
				<lazy-image class="m-0" style="min-height: 218px" alt="" :src="post.medias" />
			</div>
			<h4 style="margin-right: -12px !important" class="article-title">{{ post.title }}</h4>
		</inertia-link>
		<div class="post-time" v-if="showMenu">
			{{ post_time }}
			<span class="mx-1 font-10">●</span>
			<span v-if="post.updated_at !== post.created_at"> بروز شده</span>
			<span v-if="post.updated_at !== post.created_at" class="mx-1 font-10">●</span>
			<i class="material-icons-outlined text-light verical-middle">
				{{ post.show === "public" ? "public" : "group" }}
			</i>
		</div>
		<div class="post-footer" v-if="showMenu">
			<div class="tagandcate" v-if="post.tags.length > 0 || post.category !== null">
				<div class="tags">
					<inertia-link v-for="(tag, index) in post.tags" :key="tag + '_POST_TAG_' + post.id + '_' + index" class="tag-item" :href="'/tags/' + tag">
						{{ tag }}
					</inertia-link>
				</div>
				<inertia-link class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
					<i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
				</inertia-link>
			</div>
			<div class="actions" v-if="showMenu">
				<div>
					<div @click="showLikes = true" class="d-flex post-likes-text text-muted clickable" v-if="post.mutual_likes != null && post.mutual_likes.length > 0">
						<span class="ml-1">پسندیده شده توسط</span>
						<inertia-link v-if="post.mutual_likes[0]" :href="'/' + post.mutual_likes[0].page.slug" class="text-dark">
							<strong class="text-light">{{ post.mutual_likes[0].page.name }}</strong>
						</inertia-link>
						<div v-if="post.mutual_likes.length > 1">
							<span class="mr-1">و</span>
							<inertia-link v-if="post.mutual_likes[1]" :href="'/' + post.mutual_likes[0].page.slug" class="text-dark">
								<strong class="text-light">{{ post.mutual_likes[1].page.name }}</strong>
							</inertia-link>
						</div>
						<span class="mx-1" v-if="post.mutual_likes.length > 2"> و ... </span>
					</div>
				</div>
				<div class="buttons">
					<i class="material-icons-outlined" @click="showReshare = true">sync</i>
					<i class="material-icons like" @click="like" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
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
		};
	},
	created: function () {
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
