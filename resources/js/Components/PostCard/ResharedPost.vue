<template>
	<div class="post-box" v-if="post !== undefined && post != null && post.share != null && post.share != undefined && !deleted">
		<ReshareModal :post="post.share" :show.sync="showReshare"></ReshareModal>
		<EmbedCodeModal :post="post" :show.sync="showEmbed"></EmbedCodeModal>
		<likes-modal :item="post.id" :show.sync="showLikes"></likes-modal>
		<new-post-modal :post="post" :show.sync="edit"></new-post-modal>
		<div class="post-header pt-0">
			<inertia-link class="publisher" :href="'/' + post.page.slug">
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
			</inertia-link>
			<div class="actions position-relative" v-if="showMenu">
				<i class="material-icons bookmark-icon clickable text-muted hover-dark" @click="bookmark">{{ bookmarked ? "bookmark" : "bookmark_border" }}</i>
				<div>
					<post-menu :post="post" @deleted="doDelete" @edit="edit = true" @embed="showEmbed = true"></post-menu>
				</div>
			</div>
		</div>
		<div class="post-body" v-if="post.text != null && post.text.length > 0">
			<pre class="text" :class="{ open: showMore }" ref="textelem" v-html="post.text"></pre>
			<span class="text-action clickable" v-if="post.text != null && post.text.length > 283" @click="showMore = !showMore">{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}</span>
		</div>
		<inertia-link as="div" :href="'/posts/' + post.share.id" class="border clickable my-2 mx-3">
			<component :is="componentType" class="shadow-0" style="margin-bottom: 0 !important" :post="post.share" :show-menu="false"></component>
		</inertia-link>
		<div class="post-footer">
			<div class="tagandcate" v-if="((post.tags != null && post.tags.length > 0) || post.category !== null) && showMenu">
				<div class="tags" v-if="post.tags.length > 0">
					<a v-for="tag in post.tags" :key="tag" class="tag-item" :href="'/tags/' + tag">
						{{ tag }}
					</a>
				</div>
				<a class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
					<i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
				</a>
			</div>
			<div class="images" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
				<lazy-image v-if="isImage" class="m-0" alt="" :src="post.medias" />
				<video v-else :src="post.medias" controls controlslist="nodownload" style="max-width: 100%"></video>
			</div>
			<div class="actions" v-if="showMenu && $page.props.user">
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
					<i :class="{ 'material-icons-outlined': !openComment, 'material-icons': openComment }" v-if="hasComment" v-on:click="openComment = !openComment">comment</i>
					<i class="material-icons like" @click="like" v-if="!checkUser(post.page.user_id)" :class="{ 'text-danger': liked }">{{ liked ? "favorite" : "favorite_border" }}</i>
				</div>
			</div>
		</div>

		<transition name="slide">
			<div v-if="openComment && hasComment">
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
import ReshareModal from "../Modals/ReshareModal";
import PostMenu from "../Menues/PostMenu.vue";

TimeAgo.addLocale(fa);

export default {
	data() {
		return {
			liked: false,
			deleted: false,
			bookmarked: false,
			openComment: false,
			showEmbed: false,
			showReshare: false,

			showLikes: false,
			edit: false,
			componentType: require("../PostCard/SimplePost").default,

			showMore: false,
		};
	},
	created: function () {
		if (this.post.share) {
			if (this.post.share.type === "article") {
				this.componentType = require("../PostCard/ArticleCard").default;
			}
			this.liked = this.post.is_liked;
			this.bookmarked = this.post.is_bookmarked;
			this.showMore = this.post.text != null && this.post.text.length < 283;
		}
	},
	mounted() {
		if (this.$refs.textelem) {
			this.$refs.textelem.oncopy = (event) => {
				event.preventDefault();
			};
		}

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
	name: "ResharedPost",
	components: {
		CommentsList: CommentsList,
		EmbedCodeModal: EmbedCodeModal,
		ReshareModal: ReshareModal,
		PostMenu,
	},
	props: {
		hasComment: {
			type: Boolean,
			default: true,
			required: false,
		},
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
		isImage() {
			if (this.post.media_type.startsWith("video")) {
				return false;
			}
			return true;
		},
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
};
</script>

<style></style>
