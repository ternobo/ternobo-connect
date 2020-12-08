<template>
	<figure v-lazyload="{ onLoad: loaded }" class="image__wrapper">
		<Skeleton style="height: 100%; width: 100%; position: absolute; top: 0; left: 0; right: 0" ref="loader" v-if="loading"></Skeleton>
		<i class="material-icons error_icon">error_outline</i>
		<img class="image__item" ref="imageItem" :style="imgStyle" :class="imgClass" :data-url="src" :alt="alt" />
	</figure>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
export default {
	mounted() {
		this.$refs.imageItem.style.opacity = 0;
		this.$refs.loader.$el.firstElementChild.classList.add(this.imgClass);
		this.$refs.loader.$el.firstElementChild.style.top = "0";
		this.$refs.loader.$el.firstElementChild.style.left = "0";
		this.$refs.loader.$el.firstElementChild.style.right = "0";
		this.$refs.loader.$el.firstElementChild.style.position = "absolute";
		this.$refs.loader.$el.firstElementChild.style.borderRadius = getComputedStyle(this.$refs.imageItem).borderRadius;
	},
	components: {
		Skeleton,
	},
	data() {
		return {
			loading: true,
		};
	},
	methods: {
		loaded() {
			this.loading = false;
			if (this.$refs.imageItem) {
				this.$refs.imageItem.style.opacity = 1;
			}
		},
	},
	watch: {
		loading() {
			if (this.loading) {
				this.$refs.imageItem.style.opacity = 0;
				this.$refs.loader.$el.firstElementChild.classList.add(this.imgClass);
				this.$refs.loader.$el.firstElementChild.style.top = "0";
				this.$refs.loader.$el.firstElementChild.style.position = "absolute";
				this.$refs.loader.$el.firstElementChild.style.borderRadius = getComputedStyle(this.$refs.imageItem).borderRadius;
			}
		},
		src(val) {
			this.$el.classList.remove("loaded");
			this.$refs.imageItem.src = val;
		},
	},
	name: "LazyImage",
	props: {
		src: {
			type: String,
			default: undefined,
			required: true,
		},
		alt: {
			type: String,
			default: "Image",
			required: false,
		},
		imgClass: {
			required: false,
		},
		imgStyle: {
			type: String,
			required: false,
		},
	},
};
</script>
