import VideoPlayer from "./Blocks/PostVideoPlayer.vue";
import CodeBlock from "./Blocks/Code.vue";
import ContentViewer from "./ContentViewer.vue";

export default {
    render: function (h) {
        let contentType = this.content.type;
        let tag = "div";
        let classes = "";
        let content = "";
        switch (contentType) {
            case "heading1":
                tag = "div";
                content = <h1 dir="auto">{this.content.content}</h1>;
                break;
            case "heading2":
                tag = "div";
                content = <h2 dir="auto">{this.content.content}</h2>;
                break;
            case "heading3":
                tag = "div";
                content = <h3 dir="auto">{this.content.content}</h3>;
                break;
            case "embed":
                tag = "div";
                content = <iframe title="embedvideo" class="embed-video" src={this.content.content} allowfullscreen width="510" height="286"></iframe>;
                break;
            case "quote":
            case "text":
                if (this.content.content != null) {
                    tag = contentType == "quote" ? "blockquote" : "div";
                    classes += "post-content--text";
                    content = (
                        <content-viewer content={this.content.content}></content-viewer>
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
            case "horizontalRule":
                content = <hr class="horizontal-rule" />;
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
                        <content-viewer content={this.content.content}></content-viewer>
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
            dir: "auto",
            class: classes
        }, [content]);
    },
    components: {
        VideoPlayer,
        CodeBlock,
        ContentViewer,
        "image-viewer": () => import("./Blocks/ImageViewer.vue"),
        "poll-viewer": () => import("./Blocks/PollViewer.vue")
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
        }
    }
}