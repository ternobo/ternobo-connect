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
                text.innerHTML = this.content.content
                content = (text.innerText);
                break;
            case "text":
                if (this.content.content != null) {
                    tag = "pre";
                    classes += "post-content--text";
                    this.text = this.content.content;

                    let action = "";

                    if (this.text.split(" ").length > 100) {
                        action = (<div class="text-action font-12 clickable" onClick={this.toggleShowFullText}>{this.showFullText ? "نمایش کمتر" : "نمایش بیشتر"}</div>);;
                    }

                    content = (
                        <div>
                            <dynamic-link text={this.textToShow}></dynamic-link>
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
            showFullText: false,
        };
    },
    methods: {
        toggleShowFullText() {
            this.showFullText = !this.showFullText;
        }
    },
    computed: {
        textToShow() {
            return this.showFullText || this.text.split(" ").length < 100 ? this.text : (this.text.split(" ").slice(0, 40).join(" ") + "...");
        }
    },
    props: {
        content: {
            required: true
        }
    }
}