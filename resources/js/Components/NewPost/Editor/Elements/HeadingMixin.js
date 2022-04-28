
import { mapState } from "vuex";
import RichInput from "../../../inputs/RichInput.vue";
import EditorConfig from "../../../../utils/EditorConfig";

export default {
    props: {
        content: {
            default: "",
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
                this.$emit("update:content", renderHeadingContent(this.val));
            }
        },
    },
    created() {
        this.val = typeof this.content == "object" ? this.content : this.content == null ? { content: [], type: "doc" } : { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: this.content }] }] };
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
                                if (!document.querySelector("[data-tippy-root]")) {
                                    this.$emit("addParagraph");
                                    event.preventDefault();
                                }
                            } else if (event.keyCode == 8) {
                                if (this.val ? renderHeadingContent(this.val) <= "<p dir='auto'></p>".length : this.val) {
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