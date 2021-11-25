export default {
    bind(el) {
        el.addEventListener('keydown', (e) => {
            var code = (e.which) ? e.which : e.keyCode;
            if (code > 31 && (code < 48 || code > 57) && !(code <= 105 && code >= 96) && !code == 107) {
                e.preventDefault();
            }
        })
    }
};