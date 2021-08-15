export default {
    methods: {
        saveCaretPosition(context) {
            let positon = this.getCaretPosition(context)
            this.restore = () => {
                console.log(positon);
                this.setCaretPosition(context, positon);
            };
        },

        getCaretPosition(context) {
            const element = context;
            var caretOffset = 0;
            var doc = element.ownerDocument || element.document;
            var win = doc.defaultView || doc.parentWindow;
            var sel;
            if (typeof win.getSelection != "undefined") {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var range = win.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset = preCaretRange.toString().length;
                }
            } else if ((sel = doc.selection) && sel.type != "Control") {
                var textRange = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretOffset = preCaretTextRange.text.length;
            }
            return caretOffset;
        },

        setCaretPosition(elem, caretPos) {
            if (elem != null) {
                if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move("character", caretPos);
                    range.select();
                } else {
                    if (elem.selectionStart) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    } else elem.focus();
                }
            }
        },
    },
    destroyed() {
        this.mounted = false;
    },
    mounted() {
        this.mounted = true;
    },
    data() {
        return {
            restore: () => { },
            mounted: false,
        }
    }
}