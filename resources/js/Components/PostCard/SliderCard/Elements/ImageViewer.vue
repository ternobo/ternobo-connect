<template>
	<div class="image-viewer">
		<div class="spoiler" v-if="spoiler && showSpoiler">
			<button class="btn btn-rounded btn-white" @click="showSpoiler = false">
				{{ __.get("content/posts.spoiler-alert") }}
			</button>
		</div>
		<lazy-image @loaded="onLoad" :style="{ height: `${imageHeight}px`, maxHeight: '744px' }" class="mb-0" :src="src" />
	</div>
</template>

<script>
export default {
	props: ["spoiler", "src", "info"],
	computed: {
		imageHeight() {
			const width = 510;
			return this.info?.height != undefined ? (width / this.info?.width) * this.info?.height : 120;
		},
	},
	methods: {
		onLoad() {
			this.$emit("load");
		},
	},
	data() {
		return {
			showSpoiler: true,
		};
	},
};
</script>