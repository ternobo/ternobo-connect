<template>
	<div class="block-content-editor">
		<div class="block-content-editor--body">
			<draggable class="block-content-editor--body__list" v-model="blocks" v-if="blocks.length > 0" handle=".hand-hover" tag="div" v-bind="dragOptions" @start="drag = true" @end="drag = false">
				<div class="editor-block" v-for="(element, index) in blocks" :key="`item_type_${element.id}_${element.type}`">
					<div class="delete-move-actions">
						<i class="material-icons-outlined hand-hover">drag_indicator</i>
						<i class="material-icons-outlined hover-danger" @click="deleteElem(index)">delete_outline</i>
					</div>
					<div class="editor-block--container">
						<component :is="components[element.type]" ref="blocks" :isDefault="element.default" @delete="deleteElem(index, true)" @addParagraph="addParagraph(index + 1)" :type.sync="blocks[index].type" @focus="onFocus" :meta.sync="blocks[index].meta" :content.sync="blocks[index].content" :key="'item_type_' + element.id" :max="leftCharacter" />
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
		<div class="block-content-editor--footer">
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
import Image from "./Elements/Image";
import Video from "./Elements/Video";
import uuidv4 from "uuid";
import EmojiPicker from "../../EmojiPicker/EmojiPicker.vue";
import { mapState } from "vuex";
import TwitterText from "twitter-text";
import TextareaParser from "./TextareaParser";
import Code from "./Elements/Code.vue";
import BulletedList from "./Elements/Lists/BulletedList.vue";
import OrderedList from "./Elements/Lists/OrderedList.vue";
import Quote from "./Elements/Quote.vue";
import PollBlock from "./Elements/Poll/PollBlock.vue";
import Heading2 from "./Elements/Heading2.vue";
import Heading3 from "./Elements/Heading3.vue";
import Embed from "./Elements/Embed.vue";
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
			if (this.lastFocused?.mounted) {
				this.lastFocused.insertEmoji(emoji);
			} else {
				this.blocks.push({ id: uuidv4(), type: "text", content: "", meta: {} });
				this.$nextTick(() => {
					setTimeout(() => this.$refs.blocks[this.blocks.length - 1].insertEmoji(emoji), 100);
				});
			}
		},
		deleteElem(index, focus = false) {
			this.blocks.splice(index, 1);
			if (focus) {
				const item = this.blocks[index - 1];
				if (item?.type == "text") {
					this.$refs.blocks[index - 1]?.focus();
				}
			}
			this.$emit("itemRemoved");
		},
		addElement(type, meta) {
			if (this.availableOptions.includes(type)) {
				if (type == "code") {
					this.blocks.push({
						id: uuidv4(),
						type: "code",
						content: {
							code: "public class Main{\n \tpublic static void main(String args[]){\n\t} \n}",
							language: "java",
						},
						meta: {},
					});
					this.$emit("itemAdd");
				} else {
					this.blocks.push({ id: uuidv4(), type: type, content: null, meta: {} });
				}
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
		hasList() {
			return this.blocks.filter((item) => ["bulletedList", "orderedList"].includes(item.type)).length > 0;
		},
		// ************* //
		textItems() {
			if (this.hasText) {
				return this.blocks.filter((item) => item.type == "text");
			} else {
				return [{ content: "" }];
			}
		},
		listItems() {
			if (this.hasList) {
				return this.blocks.filter((item) => ["bulletedList", "orderedList"].includes(item.type));
			} else {
				return [];
			}
		},
		// ************* //
		textProgress() {
			let characterCount = this.charachersCount;
			return (characterCount / 2200) * 100 + "%";
		},
		charachersCount() {
			let characterCount = 0;
			this.textItems.forEach((item) => {
				characterCount += TwitterText.parseTweet(TextareaParser.unescapeHtml(item.content)).weightedLength;
			});
			this.listItems.forEach((item) => {
				const content = typeof item.content == "string" ? JSON.parse(item.content) : item.content;
				content?.forEach((listItem) => {
					characterCount += TwitterText.parseTweet(TextareaParser.unescapeHtml(listItem)).weightedLength;
				});
			});

			return characterCount;
		},
		leftCharacter() {
			let characterCount = this.charachersCount;
			return 2200 - characterCount;
		},
		availableOptions() {
			let addedOptions = this.blocks.map((item) => item.type);
			return ["text", "title", "heading2", "heading3", "video", "image", "code", "bulletedList", "orderedList", "quote", "poll"].filter((item) => {
				if (item == "text" || item == "quote" || item == "bulletedList" || item == "orderedList" || item == "heading2" || item == "heading3") {
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
				video: Video,
				image: Image,
				code: Code,
				bulletedList: BulletedList,
				orderedList: OrderedList,
				quote: Quote,
				poll: PollBlock,
				heading2: Heading2,
				heading3: Heading3,
				embed: Embed,
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
