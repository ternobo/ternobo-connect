
function unsurroundedRange(range) {
    const node = range.commonAncestorContainer.parentElement;
    const node_content = node.innerText;
    const newNode = document.createTextNode(node_content);
    node.replaceWith(newNode);
}
function checkSurroundedElemeant() {
    var sel = window.getSelection();
    var range = sel.getRangeAt(0).cloneRange();
    const node = range.commonAncestorContainer.parentElement;
    return node.tagName.toLowerCase();
}

function surroundNode(tag) {
    var sel = window.getSelection();
    var range = sel.getRangeAt(0).cloneRange();
    const elem = document.createElement(tag);
    range.surroundContents(elem);
    sel.removeAllRanges();
    sel.addRange(range);
}

export default {
    toolbar: {
        bold: {
            text: "format_bold",
            class: "material-icons",
            onActive: () => {
                return checkSurroundedElemeant() == "strong";
            },
            action: () => {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0).cloneRange();
                if (checkSurroundedElemeant() == "strong") {
                    unsurroundedRange(range);
                } else {
                    surroundNode("strong");
                    range.collapse();
                }
            },
        },
        italic: {
            text: "format_italic",
            class: "material-icons",
            onActive: () => {
                return checkSurroundedElemeant() == "em";
            },
            action: () => {

                if (checkSurroundedElemeant() == "em") {
                    var sel = window.getSelection();
                    var range = sel.getRangeAt(0).cloneRange();
                    unsurroundedRange(range);
                } else {
                    surroundNode("em");
                }
            },
        },
        strikeThrough: {
            text: "strikethrough_s",
            class: "material-icons",
            onActive: () => {
                return checkSurroundedElemeant() == "strike";
            },
            action: () => {

                if (checkSurroundedElemeant() == "strike") {
                    var sel = window.getSelection();
                    var range = sel.getRangeAt(0).cloneRange();
                    unsurroundedRange(range);
                } else {
                    surroundNode("strike");
                }
            },
        },
        underline: {
            text: "format_underlined",
            class: "material-icons",
            onActive: () => {
                return checkSurroundedElemeant() == "u";
            },
            action: () => {

                if (checkSurroundedElemeant() == "u") {
                    var sel = window.getSelection();
                    var range = sel.getRangeAt(0).cloneRange();
                    unsurroundedRange(range);
                } else {
                    surroundNode("u");
                }
            },
        },

        link: {
            text: "link",
            class: "material-icons",
            onActive: () => {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0).cloneRange();
                return range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "a";
            },
            action: (e) => {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var range = sel.getRangeAt(0).cloneRange();
                    let element = range.commonAncestorContainer.parentElement;
                    if (element.tagName.toLowerCase() == "a") {
                        unsurroundedRange(range);
                        e.editor.selectionToLink("subdirectory_arrow_left", "Enter Link", element.href);
                    } else {
                        e.editor.selectionToLink("subdirectory_arrow_left", "Enter Link");
                    }
                }
            },
        },
        code: {
            text: "code",
            class: "material-icons",
            onActive: () => {
                var sel = window.getSelection();
                var range = sel.getRangeAt(0).cloneRange();
                return range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "code";
            },
            action: () => {
                var sel = window.getSelection();
                if (sel.rangeCount) {
                    var range = sel.getRangeAt(0).cloneRange();
                    if (range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "code") {
                        unsurroundedRange(range);
                        node.replaceWith(newNode);
                    } else {
                        range.surroundContents(document.createElement("code"));
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            },
        },

        spoiler: {
            text: "visibility",
            class: "material-icons",
            onActive: () => {
                let sel = window.getSelection();
                let range = sel.getRangeAt(0).cloneRange();
                return range.commonAncestorContainer.parentElement.tagName.toLowerCase() === "span" && range.commonAncestorContainer.parentElement.className.includes("spoiler");
            },
            action: () => {
                let sel = window.getSelection();
                if (sel.rangeCount) {
                    let range = sel.getRangeAt(0).cloneRange();
                    if (range.commonAncestorContainer.parentElement.tagName.toLowerCase() === "span" && range.commonAncestorContainer.parentElement.className.includes("spoiler")) {
                        unsurroundedRange(range);
                        node.replaceWith(newNode);
                    } else {
                        const spoilerElem = document.createElement("spoiler");
                        spoilerElem.classList.add("spoiler-preview")
                        range.surroundContents(spoilerElem);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            },
        },
        superscript: {
            text: "superscript",
            class: "material-icons",
            onActive: () => {
                return checkSurroundedElemeant() == "sup";
            },
            action: () => {

                if (checkSurroundedElemeant() == "sup") {
                    var sel = window.getSelection();
                    var range = sel.getRangeAt(0).cloneRange();
                    unsurroundedRange(range);
                } else {
                    surroundNode("sup");
                }
            },
        },
    },
}