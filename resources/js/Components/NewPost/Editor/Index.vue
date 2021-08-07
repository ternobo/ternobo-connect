<template>
	<div class="content-editor--container">
		<div class="elements">
			<draggable class="list-group" v-model="blocks" v-if="blocks.length > 0" handle=".hand-hover" tag="div" v-bind="dragOptions" @start="drag = true" @end="drag = false">
				<div class="editor-item" :class="{ 'image-item': element.type == 'image' || element.type == 'video' }" v-for="(element, index) in blocks" :key="`item_type_${element.id}_${element.type}`">
					<div class="delete-move-actions">
						<i class="material-icons-outlined hover-danger" @click="deleteElem(index)">delete_outline</i>
						<i class="material-icons-outlined hand-hover">drag_indicator</i>
					</div>
					<div class="editor-block-container">
						<component :is="components[element.type]" :ref="`${element.type}`" @addParagraph="addParagraph(index + 1)" :type="element.type" @focus="onFocus" :meta="blocks[index].meta" :content.sync="blocks[index].content" :key="'item_type_' + element.id" :max="leftCharacter" />
					</div>
				</div>
			</draggable>
			<div class="d-flex editor-actions" v-if="availableOptions.length > 0" :class="{ 'align-items-center': blocks.length < 1 }">
				<actions-button @select="addElement" :active-options="availableOptions" />
				<div class="placeholder-element clickable" v-if="blocks.length < 1" @click="addElement('text')">
					<span class="text-superlight font-14">{{ __.get("content/posts.post-ph", { fname: user.first_name }) }}</span>
				</div>
			</div>
		</div>
		<div class="d-flex align-items-center justify-content-between">
			<emoji-picker @pick="appendEmoji" />
			<div class="my-3 character-counter">
				<span class="counter tex-dark">{{ leftCharacter }}</span>
				<div class="progress me-1 mb-0" style="width: 100px; height: 5px">
					<div class="progress-bar" role="progressbar" :style="{ width: textProgress }" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ActionsButton from "./ActionsButton.vue";
import Paragraph from "./Elements/Paragraph.vue";
import TitleInput from "./Elements/TitleInput.vue";
import Media from "./Elements/Media";
import uuidv4 from "uuid";
import EmojiPicker from "../../EmojiPicker/EmojiPicker.vue";
import { mapState } from "vuex";
import TwitterText from "twitter-text";
import TextareaParser from "./TextareaParser";

export default {
	watch: {
		blocks: {
			deep: true,
			handler(newValue) {
				this.$emit("update:content", newValue);
			},
		},
		content() {
			this.blocks = this.content;
		},
	},
	methods: {
		addParagraph(index) {
			this.blocks.splice(index, 0, { id: uuidv4(), type: "text", content: "", meta: {} });
			this.$emit("itemAdd");
		},
		getData() {
			return this.blocks;
		},
		onFocus(node) {
			this.lastFocused = node;
		},
		appendEmoji(emoji) {
			if (this.lastFocused) {
				this.lastFocused.insertEmoji(emoji);
			}
		},
		deleteElem(index) {
			this.blocks.splice(index, 1);
			this.$emit("itemRemoved");
		},
		addElement(type, meta) {
			switch (type) {
				case "text":
					this.blocks.push({ id: uuidv4(), type: "text", content: "", meta: {} });
					this.$emit("itemAdd");
					break;
				case "title":
					this.blocks.push({ id: uuidv4(), type: "title", content: "", meta: {} });
					this.$emit("itemAdd");
					break;
				case "image":
					this.blocks.push({ id: uuidv4(), type: "image", content: null, meta: meta });
					this.$emit("itemAdd");
					break;
				case "video":
					this.blocks.push({ id: uuidv4(), type: "video", content: null, meta: meta });
					this.$emit("itemAdd");
					break;
			}
		},
	},
	computed: {
		...mapState(["user"]),
		hasTitle() {
			return this.blocks.filter((item) => item.type == "title").length > 0;
		},
		hasText() {
			return this.blocks.filter((item) => item.type == "text").length > 0;
		},
		textItems() {
			if (this.hasText) {
				return this.blocks.filter((item) => item.type == "text");
			} else {
				return [{ content: "" }];
			}
		},
		textProgress() {
			let characterCount = 0;
			this.textItems.forEach((item) => {
				characterCount += TwitterText.parseTweet(TextareaParser.unescapeHtml(item.content)).weightedLength;
			});
			return (characterCount / 1200) * 100 + "%";
		},
		leftCharacter() {
			let characterCount = 0;
			this.textItems.forEach((item) => {
				characterCount += TwitterText.parseTweet(TextareaParser.unescapeHtml(item.content)).weightedLength;
			});
			return 1200 - characterCount;
		},
		availableOptions() {
			let addedOptions = this.blocks.map((item) => item.type);
			return ["text", "title", "video", "image"].filter((item) => {
				if (item == "text") {
					return this.leftCharacter > 0;
				}
				return !addedOptions.includes(item);
			});
		},
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost",
			};
		},
	},
	components: { ActionsButton, EmojiPicker },
	data() {
		return {
			blocks: [],
			drag: false,
			lastFocused: null,
			components: {
				text: Paragraph,
				title: TitleInput,
				video: Media,
				image: Media,
			},
		};
	},
	mounted() {
		this.blocks = this.content;
	},
	props: {
		content: {
			default: () => [],
		},
	},
};
</script>

<style>
</style>
