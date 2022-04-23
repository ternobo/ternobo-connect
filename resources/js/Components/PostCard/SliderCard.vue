<template>
	<div class="post-body" tabindex="1">
		<Content v-for="content in post.blocks" :content="content" :key="`content_item_${content.id}`"></Content>
		<!-- <tags-list :tags="post.tags"></tags-list> -->
	</div>
</template>

<script>
import Content from "./ContentElement";
import TagsList from "./TagsList.vue";
export default {
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
		this.$nextTick(() => {
			setTimeout(() => {
				if (this.$el.getBoundingClientRect().height > 930) {
					this.viewShowMore = true;
				} else {
					this.viewShowMore = false;
				}
			}, 200);
		});
	},
	components: { Content, TagsList },
	name: "SliderCard",
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
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
