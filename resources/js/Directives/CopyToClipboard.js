export default {
    bind: function (el, binding, vnode) {
        el.addEventListener("click",function(e){
            const element = document.createElement('textarea');
            element.value = binding.value;
            element.setAttribute('readonly', '');
            element.style.position = 'absolute';
            element.style.left = '-9999px';
            document.body.appendChild(element);
            element.select();
            document.execCommand('copy');
            document.body.removeChild(element);
            vnode.context.toast("کپی شد");
        })
            

    }
}