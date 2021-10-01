export default {
    bind: function (el, binding, vnode) {
        let timeout = null
        el.addEventListener("click", function (e) {
            if (timeout == null) {
                timeout = 1;
                window.navigator.clipboard.writeText(binding.value).then(() => vnode.context.toast(__.get("messages.copied"), 'check', 'text-success'));
                setTimeout(() => timeout = null, 5000);
            }
        })
    }
}


