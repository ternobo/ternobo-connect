<template>
	<div class="post-box" style="margin: 0 !important; box-shadow: none !important; width: 100vw">
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
		<div class="post-body">
			<pre class="text" id="posteditable-93">{{ post.text }}</pre>
		</div>
		<div class="post-footer">
			<div class="tagandcate">
				<div class="tags">
					<a v-for="tag in post.tags" :key="tag" class="tag-item" :href="'/tags/' + tag">
						{{ tag }}
					</a>
				</div>
				<a class="category" v-if="post.category !== null" :href="'/' + post.page.slug + '/categories/' + post.category.id">
					<i class="material-icons text-grey">layers</i><span class="text-grey"> {{ post.category.name }}</span>
				</a>
			</div>
			<div class="images" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
				<lazy-image style="min-height: 400px" class="m-0" alt="" :src="post.medias" />
			</div>
		</div>
	</div>
</template>

<script>
import TimeAgo from "javascript-time-ago";
import CommentsList from "../Comments/CommetsList";
// Load locale-specific relative date/time formatting rules.
import fa from "javascript-time-ago/locale/fa";

TimeAgo.addLocale(fa);

export default {
	data() {
		return {
			liked: false,
			openComment: false,
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
	name: "SimpleEmbed",
	components: {
		CommentsList,
	},
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

<style>
</style>
