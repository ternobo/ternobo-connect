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
                content = h("img", { attrs: { src: `/${this.content.content}` } });
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