<template>
	<ul class="bulleted-list-editor">
		<paragraph v-for="(item, index) in list" :dir="computedList[index].direction" ref="list-item" :key="`bulleted_list_${item.id}`" tag="li" @delete="deleteItem(index)" @addParagraph="onEnter" :content.sync="list[index].text"></paragraph>
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
				this.$emit(
					"update:content",
					this.list.map((item) => item.text)
				);
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
	props: ["content"],
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
		onEnter() {
			this.list.push({ id: uuidv4(), text: "" });
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
	},
	mounted() {
		this.list = Boolean(this.content)
			? this.content.map((text) => {
					return { id: uuidv4(), text: text };
			  })
			: [{ id: 0, text: "" }];
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
}
</style>