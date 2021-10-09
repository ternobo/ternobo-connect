import TextareaParser from "../NewPost/Editor/TextareaParser";
import VideoPlayer from "./SliderCard/Elements/PostVideoPlayer.vue";
import CodeBlock from "./SliderCard/Elements/Code.vue";
export default {
    render: function (h) {
        let contentType = this.content.type;
        let tag = "div";
        let classes = "";
        let content = "";
        switch (contentType) {
            case "title":
                tag = "h2";
                content = this.content.content;
                break;
            case "quote":
            case "text":
                if (this.content.content != null) {
                    tag = "div";
                    classes += "post-content--text";
                    this.text = (TextareaParser.unescapeHtml(this.content.content));

                    let action = "";

                    if (this.text.length > 200 && !this.hideMore) {
                        action = (<div class="show-more-text--clickable" onClick={this.toggleShowFullText}>{this.showFullText ? __.get("application.show-less") : __.get("application.show-more")}</div>);
                    }

                    content = (
                        <div>
                            <social-content text={this.textToShow} tags={this.tags}></social-content>
                            {action}
                        </div>
                    );

                }
                break;
            case "image":
                tag = "div";
                classes = "slider-media-image";

                let source = this.content.content.startsWith("http") ? this.content.content : `/${this.content.content}`

                content = (<image-viewer spoiler={this.content.meta?.spoiler} src={source} />);
                break;
            case "video":
                tag = "div";
                classes = ["slider-media-image", "mb-0"];

                let videoSource = this.content.content.startsWith("http") ? this.content.content : `/${this.content.content}`

                content = (<VideoPlayer poster={`${videoSource}/thumbnail`} src={videoSource} controls class={'w-100'}></VideoPlayer>);
                break;
            case "code":
                tag = "div";
                classes = ['mb-3'];
                content = (<CodeBlock content={JSON.parse(this.content.content)}></CodeBlock>);
                break;

            case "bulletedList":
            case "orderedList":
                const ListTag = this.content.type == "orderedList" ? "ol" : "ul";

                const items = JSON.parse(this.content.content);

                let li_list = [];

                items.forEach((item) => {
                    li_list.push(<li>{item}</li>)
                });

                content = <ListTag>{li_list}</ListTag>;
                break;
            case "poll":
                tag = "div";
                content = (<poll-viewer pollId={JSON.parse(this.content.content).id}></poll-viewer>);
                break;
        }

        return h(tag, {
            class: classes
        }, [content]);
    },
    components: {
        VideoPlayer,
        CodeBlock,
        "image-viewer": () => import("./SliderCard/Elements/ImageViewer.vue"),
        "poll-viewer": () => import("./SliderCard/Elements/PollViewer.vue")
    },
    data() {
        return {
            text: "",
        };
    },
    methods: {
        toggleShowFullText() {
            this.$emit("update:showFullText", !this.showFullText)
        }
    },
    mounted() {
        twemoji.parse(this.$el);
    },
    watch: {
        textToShow() {
            this.$nextTick(() => {
                twemoji.parse(this.$el);
            });
        }
    },
    computed: {
        textToShow() {
            return this.showFullText || this.text.length < 200 ? this.text : this.text.substring(0, 200) + "...";
        }
    },
    props: {
        showFullText: {
            type: Boolean,
            require: false,
        },
        hideMore: {
            default: false,
        },
        content: {
            required: true
        },
        tags: {
            required: false,
            default: [],
        }
    }
}