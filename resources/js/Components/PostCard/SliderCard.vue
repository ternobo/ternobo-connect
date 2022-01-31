<template>
	<div class="post-body" tabindex="1" @mouseenter="focus" @keyup.left="goPrevSlide" @keyup.right="goNextSlide">
		<div class="slider-content" :class="{ expanded: showFullText }">
			<Content @loaded="updateHeight" v-for="content in post.slides[active].content" :content="content" :tags="post.tags" :key="`content_item_${content.id}`"></Content>
			<div class="showmore-container" :class="{ expanded: showFullText }" @click="showFullText = !showFullText" v-if="viewShowMore">{{ showFullText ? __.get("application.show-less") : __.get("application.show-more") }}</div>
		</div>
		<tags-list :tags="post.tags"></tags-list>
		<div dir="ltr" class="slider-arrows" v-if="post.slides.length > 1">
			<i class="material-icons clickable" :class="{ disabled: active < 1 }" @click="goPrevSlide">keyboard_arrow_left</i>
			<div class="dot" v-for="(dot, index) in post.slides" :key="'dot_' + dot.id" @click="active = index" :class="{ active: index == active, clickable: index != active }"></div>
			<i class="material-icons clickable" :class="{ disabled: active == post.slides.length - 1 }" @click="goNextSlide">keyboard_arrow_right</i>
		</div>
	</div>
</template>

<script>
import Content from "./ContentElement";
import Slide from "./SliderCard/Slide.vue";
import TagsList from "./TagsList.vue";
export default {
	methods: {
		focus() {
			this.$el.focus();
		},
		goPrevSlide() {
			if (this.active > 0) {
				this.active--;
			}
		},
		goNextSlide() {
			if (this.active < this.post.slides.length - 1) {
				this.active++;
			}
		},
		updateHeight() {
			this.$nextTick(() => {
				if (this.$el.getBoundingClientRect().height > 930) {
					this.viewShowMore = true;
				} else {
					this.viewShowMore = false;
				}
			});
		},
	},
	data() {
		return {
			active: 0,
			showFullText: false,

			viewShowMore: false,
		};
	},
	watch: {
		slide() {
			if (this.slide != null && this.slide < this.post.slides.length) {
				this.active = this.slide;
			}
		},
		active() {
			this.$nextTick(() => {
				const y = this.$parent.$el.getBoundingClientRect().top + window.scrollY;
				window.scroll({
					top: y - 92,
					behavior: "smooth",
				});

				this.$nextTick(() => {
					setTimeout(() => {
						if (this.$el.getBoundingClientRect().height > 930) {
							this.viewShowMore = true;
						} else {
							this.viewShowMore = false;
						}
					}, 200);
				});
			});
			this.$emit("update:slide", this.active);
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
	components: { Content, Slide, TagsList },
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
