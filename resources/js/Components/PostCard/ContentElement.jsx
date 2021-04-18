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
                    let text = this.content.content;
                    content = (<dynamic-link text={text}></dynamic-link>);

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
    props: {
        content: {
            required: true
        }
    }
}