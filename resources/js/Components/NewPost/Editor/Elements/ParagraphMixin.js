
import { mapState } from "vuex";
import RichInput from "../../../inputs/RichInput.vue";
import EditorConfig from "../../../../utils/EditorConfig";

export default {
    props: {
        content: {
            default: null,
        },
        disableEnter: {
            default: true,
        },
        placeholder: {
            default: __.get("content/posts.enter-your-text"),
        },
        maxCharacter: {
            default: null,
        },
    },
    methods: {
        reset() {
            this.$refs.editor.reset();
        },
        focus() {
            this.$refs.editor.focus();
        },
    },
    data() {
        return {
            val: null,
        };
    },
    watch: {
        val() {
            if (this.val != this.value) {
                this.$emit("update:content", JSON.stringify(this.val));
            }
        },
    },
    created() {
        let content = this.content;
        if (typeof content == "string") {
            content = JSON.parse(this.content);
        }

        this.val = this.content
            ? content
            : null;
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
                                if (this.val ? window.ContentRenderer.render(this.val).length <= "<p dir='auto'></p>".length : this.val) {
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