<template>
	<div class="post-body" v-if="post.text != null && post.text.length > 0">
		<pre class="text" :class="{ open: showMore }" ref="textelem" v-html="post.text"></pre>
		<span class="text-action clickable" v-if="post.text != null && post.text.length > 283" @click="showMore = !showMore">{{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMore: false,
		};
	},

	mounted() {
		this.showMore = this.post.text != null && this.post.text.length < 283;
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
	methods: {},
	name: "SimplePost",
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
};
</script>

<style></style>
