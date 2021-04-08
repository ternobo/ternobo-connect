import Vue from "vue";
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
                text.innerHTML = this.content.text
                content = (text.innerText);
                break;
            case "text":
                if (this.content.text != null) {
                    tag = "pre";
                    classes += "post-content--text";
                    let text = this.content.text;
                    // console.log(text)
                    // let items = [];
                    // text.forEach((item) => {
                    //     if (item != undefined) {
                    //         if (item.startsWith("#")) {
                    //             items.push(
                    //                 <wire-link href={`/tags/${item}`}>{item}</wire-link>
                    //             );
                    //         } else if (item.startsWith("@")) {
                    //             items.push(
                    //                 <wire-link href={`/${item}`}>{item}</wire-link>
                    //             );
                    //         } else {
                    //             items.push(item)
                    //         }
                    //     }
                    // });
                    content = (<dynamic-link text={text}></dynamic-link>);
                }
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