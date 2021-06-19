<template>
	<div class="post-body">
		<div class="slider-content">
			<Content v-for="content in post.slides[active].content" :content="content" :showFullText.sync="showFullText" :key="`content_item_${content.id}`"></Content>
		</div>
		<div dir="ltr" class="slider-arrows" v-if="post.slides.length > 1">
			<i class="material-icons clickable" :class="{ disabled: active < 1 }" @click="goPrevSlide">keyboard_arrow_left</i>
			<div class="dot" v-for="(dot, index) in post.slides" :key="'dot_' + dot.id" @click="active = index" :class="{ active: index == active, clickable: index != active }"></div>
			<i class="material-icons clickable" :class="{ disabled: active == post.slides.length - 1 }" @click="goNextSlide">keyboard_arrow_right</i>
		</div>
	</div>
</template>

<script>
import Content from "./ContentElement";
export default {
	methods: {
		goPrevSlide() {
			if (this.active > 0) {
				this.active--;
			}
		},
		goNextSlide() {
			if (this.active < this.post.slides.length) {
				this.active++;
			}
		},
	},
	data() {
		return {
			active: 0,
			showFullText: false,
		};
	},
	watch: {
		active() {
			this.$nextTick(() => {
				const y = this.$parent.$el.getBoundingClientRect().top + window.scrollY;
				window.scroll({
					top: y - 92,
					behavior: "smooth",
				});
			});
		},
		showFullText() {
			if (!this.showFullText) {
				this.$nextTick(() => {
					const y = this.$parent.$el.getBoundingClientRect().top + window.scrollY;
					window.scroll({
						top: y - 92,
						behavior: "smooth",
					});
				});
			}
		},
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
	components: { Content },
	name: "SliderCard",
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

<style></style>
