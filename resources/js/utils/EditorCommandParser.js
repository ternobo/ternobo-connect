import ContentRenderer from "./PostContentRenderer";

export default {
    commands: {
        heading1: /^# $/g,
        heading2: /^## $/g,
        heading3: /^### $/g,
        // Lists
        bulletedList: /^- $/g,
        orderedList: /^1. $/g,
        quote: /^> $/g,
        horizontalRule: /^—-$/g,
        // action: /^\/$/g,
        // hideAction: /^$/g
    },
    parse(content) {
        const htmlContent = ContentRenderer.render(content);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        const textContent = doc.body.textContent;
        let command = "text";

        Object.keys(this.commands).forEach((item) => {
            if (this.commands[item].test(textContent)) {
                command = item;
            }
        });
        return command;
    }
}