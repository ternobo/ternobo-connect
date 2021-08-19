<template>
	<ul class="bulleted-list-editor">
		<li v-for="(item, index) in list" ref="list-item" :key="`bulleted_list_${item.id}`">
			<paragraph :key="`bulleted_list_paragraph_${item.id}`" @delete="deleteItem(index)" @addParagraph="onEnter" :content.sync="list[index].text"></paragraph>
		</li>
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
				this.$emit("update:content", this.list);
			},
		},
	},
	components: { Paragraph },
	methods: {
		onEnter() {
			this.list.push({ id: uuidv4(), text: "" });
		},
		deleteItem(index) {
			this.list.splice(index, 1);
			if (index != 0) {
				this.$nextTick(() => {
					this.$refs["list-item"][index - 1].querySelector(".editor--text-input").focus();
				});
			}
		},
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