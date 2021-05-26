<template>
	<figure v-lazyload="{ onLoad: loaded }" class="image__wrapper">
		<skeleton style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; right: 0px; display: flex" :circle="circle" :color="loadingColor" :styles="styles" :classes="[imgClass]" ref="loader" v-if="loading"></skeleton>
		<i class="material-icons error_icon">error_outline</i>
		<img class="image__item" ref="imageItem" :style="imgStyle" :class="imgClass" :data-url="src" :alt="alt" />
	</figure>
</template>

<script>
export default {
	mounted() {
		this.$refs.imageItem.style.opacity = 0;
		if (typeof this.imgClass != "object") {
			this.$refs.loader.$el.firstElementChild.classList.add(this.imgClass);
		}
		this.styles = this.imgStyle;
	},
	data() {
		return {
			loading: true,

			styles: {},
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
		src(val) {
			this.$el.classList.remove("loaded");
			this.$refs.imageItem.src = val;
		},
	},
	name: "LazyImage",
	props: {
		circle: {
			default: false,
		},
		loadingColor: {
			default: "#EEEEEE",
		},
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
