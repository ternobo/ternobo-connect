<template>
	<div class="position-relative" v-click-outside="hideList">
		<button class="btn rounded-circle add-action-btn" :class="{ active: showList }" @click="toggleList"><i class="material-icons font-20">add</i></button>
		<transition name="fade">
			<div class="editors-actions-list" :style="editorsActionListStyle" v-if="showList">
				<div class="text-type-list">
					<div class="editor-list-item" @click="emitAcion('title')">
						<i class="material-icons" :class="{ disabled: !activeOptions.includes('title') }">title</i>
						<strong>{{ __.get("content/posts.heading") }}</strong>
					</div>
					<div class="editor-list-item" @click="emitAcion('text')">
						<i class="material-icons" :class="{ disabled: !activeOptions.includes('text') }">text_fields</i>
						<strong>{{ __.get("content/posts.text") }}</strong>
					</div>
				</div>

				<div class="text-type-list">
					<div class="editor-list-item" @click="emitMediaAction('image')">
						<i class="material-icons-outlined" :class="{ disabled: hasMedia }">image</i>
						<strong>{{ __.get("editor.image") }}</strong>
					</div>
					<div class="editor-list-item" @click="emitMediaAction('video')">
						<i class="material-icons-outlined" :class="{ disabled: hasMedia }">play_circle_outline</i>
						<strong>{{ __.get("editor.video") }}</strong>
					</div>

					<!-- <div class="text-type-list">
						<div class="editor-list-item" @click="emitMediaAction('code')">
							<i class="material-icons-outlined" :class="{ disabled: !activeOptions.includes('code') }">code</i>
							<strong>{{ __.get("editor.code") }}</strong>
						</div>
					</div> -->
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: { activeOptions: { default: [] } },
	computed: {
		...mapState(["shared"]),
		editorsActionListStyle() {
			let style = {
				top: 0,
			};
			if (this.shared.direction == "rtl") {
				style.left = "-272px";
			} else {
				style.right = "-272px";
			}
			return style;
		},
		hasMedia() {
			return !this.activeOptions.includes("video") || !this.activeOptions.includes("image");
		},
	},
	methods: {
		emitMediaAction(type) {
			if (!this.hasMedia) {
				this.showList = false;
				this.$emit("select", type);
			}
		},
		emitAcion(type, meta = {}) {
			if (this.activeOptions.includes(type)) {
				this.showList = false;
				this.$emit("select", type, meta);
			}
		},
		toggleList(e) {
			this.showList = !this.showList;
		},
		hideList() {
			this.showList = false;
		},
	},
	data() {
		return {
			showList: false,
			xPosition: 0,
			yPosition: 0,
		};
	},
};
</script>

<style>
</style>