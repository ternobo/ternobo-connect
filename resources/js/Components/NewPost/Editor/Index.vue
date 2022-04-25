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
						<component :is="components[element.type]" ref="blocks" :isDefault="element.default" @delete="deleteElem(index, true)" @addParagraph="addParagraph(index + 1)" @convertType="convertType(index, $event)" :meta.sync="blocks[index].meta" :content.sync="blocks[index].content" :key="'item_type_' + element.id" />
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
	</div>
</template>

<script>
import ActionsButton from "./ActionsButton.vue";
import Paragraph from "./Elements/Paragraph.vue";
import Heading1 from "./Elements/Heading1.vue";
import Image from "./Elements/Image";
import Video from "./Elements/Video";
import uuidv4 from "uuid";
import EmojiPicker from "../../EmojiPicker/EmojiPicker.vue";
import { mapState } from "vuex";
import Code from "./Elements/Code.vue";
import BulletedList from "./Elements/Lists/BulletedList.vue";
import OrderedList from "./Elements/Lists/OrderedList.vue";
import Quote from "./Elements/Quote.vue";
import PollBlock from "./Elements/Poll/PollBlock.vue";
import Heading2 from "./Elements/Heading2.vue";
import Heading3 from "./Elements/Heading3.vue";
import Embed from "./Elements/Embed.vue";
import HorizontalRule from "./Elements/HorizontalRule.vue";

export default {
	watch: {
		blocks: {
			deep: true,
			handler(newValue) {
				if (newValue != this.content) {
					this.$emit("update:content", newValue);
				}
			},
		},
		content() {
			if (this.blocks != this.content) {
				this.blocks = this.content;
			}
		},
	},
	methods: {
		addParagraph(index) {
			this.blocks.splice(index, 0, { id: uuidv4(), type: "text", content: JSON.stringify({ type: "doc", content: [] }), meta: {} });
			this.$emit("itemAdd");
		},
		getData() {
			return this.blocks;
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
		convertType(index, type) {
			this.blocks[index].content = null;
			this.blocks[index].type = type;
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
						meta: meta,
					});
					this.$emit("itemAdd");
				} else {
					this.blocks.push({ id: uuidv4(), type: type, content: null, meta: meta });
				}
			}
		},
	},
	computed: {
		...mapState(["user"]),
		availableOptions() {
			return ["text", "heading1", "horizontalRule", "heading2", "heading3", "video", "image", "code", "bulletedList", "orderedList", "quote", "poll"].filter((option) => {
				if (option == "heading1") {
					return this.blocks.filter((block) => block.type == "heading1").length == 0;
				}
				return true;
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
				heading1: Heading1,
				heading2: Heading2,
				heading3: Heading3,
				video: Video,
				image: Image,
				code: Code,
				bulletedList: BulletedList,
				orderedList: OrderedList,
				quote: Quote,
				poll: PollBlock,
				embed: Embed,
				horizontalRule: HorizontalRule,
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
