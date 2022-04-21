<template>
	<rich-input ref="editor" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
</template>

<script>
import { mapState } from "vuex";
import RichInput from "../../../inputs/RichInput.vue";
import EditorConfig from "../../../../utils/EditorConfig";

export default {
	props: {
		content: {
			default: () => {
				return { type: "doc", content: [] };
			},
		},
		disableEnter: {
			default: true,
		},
		placeholder: {
			default: __.get("content/posts.enter-your-text"),
		},
		max: {
			default: 1200,
		},
	},
	methods: {
		focus() {
			this.$refs.editor.focus();
		},
	},
	data() {
		return {
			val: {
				content: [],
				type: "doc",
			},
		};
	},
	watch: {
		val() {
			if (this.val != this.value) {
				this.$emit("update:content", this.val);
			}
		},
	},
	created() {
		this.val = this.content
			? this.content
			: {
					content: [],
					type: "doc",
			  };
	},
	computed: {
		...mapState(["shared"]),
		extensions() {
			return [...EditorConfig];
		},
		editorOptions() {
			return {
				editorProps: {
					handleDOMEvents: {
						keydown: (view, event) => {
							if (event.key == "Enter" && !event.shiftKey) {
								this.$emit("addParagraph");
								event.preventDefault();
							} else if (event.keyCode == 8) {
								if (this.content ? window.ContentRenderer.render(this.content).length <= "<p dir='auto'></p>".length : this.content) {
									this.$emit("delete");
								}
							}
						},
					},
				},
			};
		},
	},
	components: { RichInput },
};
</script>