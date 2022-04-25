import ContentRenderer from "./PostContentRenderer";

export default {
    commands: {
        heading1: "# ",
        heading2: "## ",
        heading3: "### ",
        // Lists
        bulletedList: "- ",
        orderedList: "1. ",
        quote: "> "
    },
    parse(content) {
        const htmlContent = ContentRenderer.render(content);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        const textContent = doc.body.textContent;
        let command = "text";
        Object.keys(this.commands).forEach((item) => {
            // console.log([textContent, this.commands[item]]);
            if (this.commands[item] == textContent) {
                command = item;
            }
        });
        return command;
    }
}