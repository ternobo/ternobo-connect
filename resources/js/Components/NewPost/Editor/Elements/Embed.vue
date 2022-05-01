<template>
	<div class="media-block" :class="{ 'p-0 border-0': embedInfo != null }">
		<!--- Select Media !-->
		<div class="action-container" v-if="embedInfo == null">
			<span class="title text-center">
				<i class="material-icons-outlined">play_circle</i>
				{{ __.get(`editor.video-embed`) }}
			</span>
			<div class="media-block__actions bg-white">
				<div class="input-group-icon embed-block__input">
					<input class="form-control fill" @keypress.enter="setEmbed" v-model="url" placeholder="Insert Link" />
					<i class="material-icons" @click="setEmbed">subdirectory_arrow_left</i>
				</div>
			</div>
		</div>
		<!--- Select Media End !-->

		<iframe v-else title="embedvideo" class="embed-video" :src="embedInfo.embed" allowfullscreen width="640" height="316"></iframe>
	</div>
</template>

<script>
import embedParser from "@ternobo/embed-video-parser";

export default {
	data() {
		return {
			url: "",
			embedInfo: null,
		};
	},

	methods: {
		setEmbed() {
			this.embedInfo = embedParser(this.url);
			this.$emit("update:content", this.embedInfo?.embed);
			this.$emit("update:meta", this.embedInfo);
		},
	},
	mounted() {
		this.embedInfo = Object.keys(this.meta) > 0 ? this.meta : null;
		this.url = this.content != null ? this.content : "";
	},
	props: ["meta", "content"],
};
</script>