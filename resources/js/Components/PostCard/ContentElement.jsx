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
                    tag = contentType == "quote" ? "blockquote" : "div";
                    classes += "post-content--text";
                    this.text = (TextareaParser.unescapeHtml(this.content.content));
                    content = (
                        <div>
                            <social-content text={this.text} tags={this.tags}></social-content>
                        </div>
                    );
                }
                break;
            case "image":
                tag = "div";
                classes = "slider-media-image";

                let source = this.content.content.startsWith("http") ? this.content.content : `/${this.content.content}`
                let spoiler = this.content.meta?.spoiler;
                spoiler = typeof (spoiler) == 'string' ? parseInt(spoiler) : spoiler;
                content = (<image-viewer onLoad={this.$emit.bind(this, 'loaded')} spoiler={spoiler} info={this.content.meta?.info} src={source} />);
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

                const items = this.content.content;

                let li_list = [];

                items.forEach((item) => {
                    li_list.push(<li>
                        <social-content text={item} tags={this.tags}></social-content>
                    </li>)
                });

                content = <ListTag dir="auto">{li_list}</ListTag>;
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
    mounted() {
        twemoji.parse(this.$el);
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
            default: () => [],
        }
    }
}