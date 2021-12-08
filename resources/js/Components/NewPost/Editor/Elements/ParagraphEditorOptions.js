
function unsurroundedRange(range, sel) {
    const parent = range.commonAncestorContainer.parentElement;
    var selectedTextNode = document.createTextNode(range.toString());
    range.deleteContents();
    range.insertNode(selectedTextNode);
    range.selectNode(selectedTextNode);
    sel.removeAllRanges();
    sel.addRange(range);
    parent.replaceWith(parent, selectedTextNode);
    range.selectNode(selectedTextNode);
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
    range.collapse();
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
                    unsurroundedRange(range, sel);
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
                    unsurroundedRange(range, sel);
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
                    unsurroundedRange(range, sel);
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
                    unsurroundedRange(range, sel);
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
                        unsurroundedRange(range, sel);
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
                        unsurroundedRange(range, sel);
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
                return range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "spoiler";
            },
            action: () => {
                let sel = window.getSelection();
                if (sel.rangeCount) {
                    let range = sel.getRangeAt(0).cloneRange();
                    if (range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "spoiler") {
                        unsurroundedRange(range, sel);
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
                    unsurroundedRange(range, sel);
                } else {
                    surroundNode("sup");
                }
            },
        },
    },
}