export default {
    bind: function (el, binding, vnode) {
        let timeout = null
        el.addEventListener("click", function (e) {
            if (timeout == null) {
                timeout = 1;
                const textarea = document.createElement('textarea')
                textarea.value = binding.value;
                textarea.setAttribute('readonly', '')
                textarea.style.cssText = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;'


                document.body.appendChild(textarea)

                if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                    textarea.contentEditable = true
                    textarea.readOnly = true

                    const range = document.createRange()

                    range.selectNodeContents(textarea)

                    const selection = window.getSelection()

                    selection.removeAllRanges()
                    selection.addRange(range)
                    textarea.setSelectionRange(0, 999999)
                } else {
                    textarea.select()
                }

                let success = false

                try {
                    success = document.execCommand('copy')
                } catch (err) {
                    console.warn(err)
                }
                vnode.context.toast("کپی شد", 'check', 'text-success');
                setTimeout(() => timeout = null, 5000);
                document.body.removeChild(textarea);
            }


        })


    }
}
