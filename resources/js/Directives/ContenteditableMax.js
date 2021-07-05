import TextareaParser from "../Components/NewPost/Editor/TextareaParser";

export default {
    bind: function (el, binding, vnode) {
        let max = parseInt(binding.value);

        document.body.addEventListener("keydown", (e) => {
            let utils = {
                special: [8, 16, 17, 18, 46],
                navigational: [38, 37, 39, 40],
                isSpecial(event) {
                    let result = this.special.includes(event.keyCode) || (event.ctrlKey && [90, 83, 65].includes(event.keyCode));
                    return result;
                },
                isNavigational(e) {
                    return this.navigational.includes(e.keyCode);
                },
            };

            let len = e.target.innerText.length;
            let hasSelection = false;
            let selection = window.getSelection();
            let isSpecial = utils.isSpecial(e);
            let isNavigational = utils.isNavigational(e);

            if (selection) {
                hasSelection = !!selection.toString();
            }
            if (isSpecial || isNavigational) {
                return true;
            } else if (len >= max && !hasSelection) {
                e.preventDefault();
                return false;
            }
        });

        el.addEventListener("paste", (e) => {
            e.preventDefault();
            var text = (e.originalEvent || e).clipboardData.getData("text/plain");
            let len = e.target.innerText.length + text.length;

            if (len > max) {
                text = text.substr(0, max - this.$refs.editable.innerText.length);
            }

            // insert text manually
            document.execCommand("insertHTML", false, text);
        });

    }
}