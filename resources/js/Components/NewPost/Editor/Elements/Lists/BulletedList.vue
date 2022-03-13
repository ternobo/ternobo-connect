<template>
	<ul class="bulleted-list-editor">
		<paragraph v-for="(item, index) in list" :max="max" :dir="computedList[index].direction" ref="list-item" :key="`bulleted_list_${item.id}`" tag="li" @delete="deleteItem(index)" @addParagraph="onEnter(index)" :content.sync="list[index].text"></paragraph>
	</ul>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Paragraph from "../Paragraph.vue";
export default {
	watch: {
		list: {
			deep: true,
			handler() {
				if (this.list) {
					this.$emit(
						"update:content",
						this.list?.map((item) => item.text)
					);
				}
			},
		},
	},
	computed: {
		computedList() {
			return this.list.map((item) => {
				item.direction = this.getDirection(item.text);
				return item;
			});
		},
	},
	props: ["content", "max"],
	components: { Paragraph },
	methods: {
		getDirection(text) {
			let el = document.createElement("span");
			el.dir = "auto";
			el.innerHTML = text;
			document.body.append(el);
			let direction = window.getComputedStyle(el).direction;
			el.remove();
			return direction;
		},
		onEnter(index) {
			if (this.list[index].text.length > 0) {
				this.list.splice(index + 1, 0, { id: uuidv4(), text: "" });
			} else {
				this.deleteItem(index);
				this.$emit("addParagraph");
			}
		},
		deleteItem(index) {
			if (index != 0) {
				this.list.splice(index, 1);
				this.$nextTick(() => {
					this.$refs["list-item"][index - 1].focus();
				});
			} else {
				this.$emit("delete");
			}
		},
		setContent(content) {
			return typeof content == "string"
				? JSON.parse(content).map((text) => {
						return { id: uuidv4(), text: text };
				  })
				: content.map((text) => {
						return { id: uuidv4(), text: text };
				  });
		},
	},
	mounted() {
		this.list = Boolean(this.content) ? this.setContent(this.content) : [{ id: 0, text: "" }];
	},
	data() {
		return {
			list: [{ id: 0, text: "" }],
		};
	},
};
</script>

<style lang="scss" scoped>
.bulleted-list-editor {
	list-style: disc;
	margin-bottom: 0;
	padding: 0 24px;
}
</style>