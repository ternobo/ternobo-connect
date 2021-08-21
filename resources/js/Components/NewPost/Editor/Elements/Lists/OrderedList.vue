<template>
	<ol class="ordered-list-editor">
		<paragraph v-for="(item, index) in list" :dir="computedList[index].direction" ref="list-item" :key="`ordered_list_${item.id}`" tag="li" @delete="deleteItem(index)" @addParagraph="onEnter" :content.sync="list[index].text"></paragraph>
	</ol>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import Paragraph from "../Paragraph.vue";
export default {
	watch: {
		list: {
			deep: true,
			handler() {
				this.$emit("update:content", this.list);
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
			this.list.splice(index, 1);
			if (index != 0) {
				this.$nextTick(() => {
					this.$refs["list-item"][index - 1].focus();
				});
			}
		},
	},
	mounted() {
		this.list = Boolean(this.content) ? this.content : [{ id: 0, text: "" }];
	},
	data() {
		return {
			list: [{ id: 0, text: "" }],
		};
	},
};
</script>

<style lang="scss" scoped>
.ordered-list-editor {
	list-style: num;
	margin-bottom: 0;
}
</style>