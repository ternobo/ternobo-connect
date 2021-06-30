import TextareaParser from "../NewPost/Editor/TextareaParser";

export default {
    render: function (h) {
        let contentType = this.content.type;
        let tag = "div";
        let classes = "";
        let content = "";
        let text = document.createElement("p");
        switch (contentType) {
            case "title":
                tag = "h2";
                text.innerHTML = twemoji.parse(this.content.content)
                content = (text.innerText);
                break;
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
            case "media":
                tag = "div";
                classes = "slider-media-image";

                let source = this.content.content.startsWith("http") ? this.content.content : `/${this.content.content}`

                content = this.content.content.endsWith("mp4") ? (<video src={source} controls class={'w-100'}></video>) : (<lazy-image style={{ minHeight: '100px' }} class={['mb-0']} src={source} />);
                break;
        }

        return h(tag, {
            class: classes
        }, [content]);
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
            required: true,
            default: [],
        }
    }
}