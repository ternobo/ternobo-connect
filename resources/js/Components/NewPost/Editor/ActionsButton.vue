<template>
	<div class="position-relative" v-click-outside="hideList">
		<button class="btn btn-rounded btn-icon block-content-editor__blocks-list-button" :class="{ active: showList }" @click="toggleList"><i class="material-icons font-20">add</i></button>
		<transition name="fade">
			<div class="editors-actions-list" :style="editorsActionListStyle" v-if="showList">
				<div class="text-type-list">
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('heading1') }" @click="emitAcion('heading1', { type: 1 })">
						<i class="material-icons">title</i>
						<strong>{{ __.get("editor.heading1") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('heading2') }" @click="emitAcion('heading2', { type: 2 })">
						<i class="material-icons">title</i>
						<strong>{{ __.get("editor.heading2") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('heading3') }" @click="emitAcion('heading3', { type: 3 })">
						<i class="material-icons">title</i>
						<strong>{{ __.get("editor.heading3") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('text') }" @click="emitAcion('text')">
						<i class="material-icons">text_fields</i>
						<strong>{{ __.get("content/posts.text") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('text') }" @click="emitAcion('horizontalRule')">
						<i class="material-icons">remove</i>
						<strong>{{ __.get("editor.divider") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('text') }" @click="emitAcion('bulletedList')">
						<i class="material-icons-outlined">format_list_bulleted</i>
						<strong>{{ __.get("editor.bulleted-list") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('text') }" @click="emitAcion('orderedList')">
						<i class="material-icons-outlined">format_list_numbered</i>
						<strong>{{ __.get("editor.ordered-list") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('text') }" @click="emitAcion('quote')">
						<i class="material-icons-outlined">format_quote</i>
						<strong>{{ __.get("editor.quote") }}</strong>
					</div>
				</div>

				<div class="text-type-list">
					<div class="editor-list-item" :class="{ disabled: hasMedia }" @click="emitMediaAction('image')">
						<i class="material-icons-outlined">image</i>
						<strong>{{ __.get("editor.image") }}</strong>
					</div>
					<div class="editor-list-item" :class="{ disabled: hasMedia }" @click="emitMediaAction('video')">
						<i class="material-icons-outlined">play_circle_outline</i>
						<strong>{{ __.get("editor.video") }}</strong>
					</div>
				</div>
				<div class="text-type-list">
					<div class="editor-list-item" :class="{ disabled: !activeOptions.includes('code') }" @click="emitAcion('code')">
						<i class="material-icons-outlined">code</i>
						<strong>{{ __.get("editor.code") }}</strong>
					</div>
					<!-- <div class="editor-list-item" :class="{ disabled: !activeOptions.includes('poll') }" @click="emitAcion('poll')">
						<i class="material-icons-outlined">poll</i>
						<strong>{{ __.get("editor.poll") }}</strong>
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
				top: this.top,
			};
			if (this.shared.direction == "rtl") {
				style.left = "-266px";
			} else {
				style.right = "-266px";
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
		toggleList(top = 0) {
			this.showList = !this.showList;
			if (this.showList) {
				this.top = top;
			} else {
				this.top = 0;
			}
		},
		hideList() {
			if (this.showList) {
				this.top = 0;
			}
			this.showList = false;
		},
	},
	data() {
		return {
			top: 0,
			showList: false,
			xPosition: 0,
			yPosition: 0,
		};
	},
};
</script>

<style>
</style>