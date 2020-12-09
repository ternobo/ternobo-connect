<template>
	<div class="post-box" id="post-24" style="margin: 0 !important; box-shadow: none !important; width: 100vw">
		<div class="post-header">
			<a class="publisher" :href="'/' + post.page.slug">
				<img :src="post.page.profile" />
				<div>
					<strong>
						{{ post.page.name }}
					</strong>
					<span class="text-muted font-12">
						{{ post.page.short_bio }}
					</span>
					<small class="text-light font-10">
						{{ post_time }}
						<small class="text-light font-10" v-if="post.updated_at !== null"> ویرایش شده در {{ updated_at }} </small>
						<i class="material-icons-outlined font-14 text-light verical-middle">
							{{ post.show === "public" ? "public" : "group" }}
						</i>
					</small>
				</div>
			</a>
			<div class="actions"></div>
		</div>
		<a class="post-body clickale" :href="postSlug">
			<div class="images articleimg">
				<lazy-image style="min-height: 400px" class="m-0" alt="" :src="post.medias" />
			</div>
			<h4 class="mt-3 mb-0">{{ post.title }}</h4>
		</a>
		<div class="post-footer">
			<div class="tags">
				<abbr v-for="tag in post.tags" :key="tag" class="tag-item" :href="'/tags/' + tag">
					{{ tag }}
				</abbr>
			</div>
			<a class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
				<i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
			</a>
		</div>
	</div>
</template>

<script>
import TimeAgo from "javascript-time-ago";

// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";

TimeAgo.addLocale(fa);

export default {
	data() {
		return {
			liked: false,
		};
	},
	created: function () {
		this.liked = this.post.is_liked;
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
	name: "ArticleEmbed",
	props: {
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	computed: {
		post_time: function () {
			const timeAgo = new TimeAgo("fa-FA");
			return timeAgo.format(Date.parse(this.post.created_at), "twitter") + " ● ";
		},
		postSlug: function () {
			const post_slug = this.post.id;
			if (this.post.slug.length > 0) {
				post_slug = this.post.slug;
			}
			const page_slug = this.post.page.slug;
			return this.$APP_URL + "/" + page_slug + "/" + post_slug;
		},
		updated_at: function () {
			if (this.post.updated_at !== null) {
				const timeAgo = new TimeAgo("fa-FA");
				return timeAgo.format(Date.parse(this.post.updated_at), "twitter") + " ● ";
			}
			return "";
		},
	},
};
</script>
