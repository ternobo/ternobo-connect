<template>
	<div class="image-viewer">
		<div class="spoiler" v-if="spoiler && showSpoiler">
			<button class="btn btn-rounded btn-white" @click="showSpoiler = false">
				{{ __.get("content/posts.spoiler-alert") }}
			</button>
		</div>
		<lazy-image style="min-height: 100px" class="mb-0" :src="src" />
	</div>
</template>

<script>
export default {
	props: ["spoiler", "src"],
	data() {
		return {
			showSpoiler: true,
		};
	},
};
</script>