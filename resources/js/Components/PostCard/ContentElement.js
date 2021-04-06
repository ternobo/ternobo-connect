import { replace } from "lodash-es";

export default {
    render: function (h) {
        let contentType = this.content.type;
        let tag = "pre";
        let classes = "";
        let content = "";

        let text = document.createElement("p");

        switch (contentType) {
            case "title":
                tag = "h2";
                text.innerHTML = this.content.text
                content = (text.innerText);
                break;
            case "text":
                text.innerHTML = this.content.text
                content = (text.innerText);
                break;
            case "media":
                tag = "div";
                classes = "slider-media-image";
                content = h("img", { attrs: { src: `/${this.content.media}` } });
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