var vSortable = {}
var Sortable = require('sortablejs').default

if (!Sortable) {
    throw new Error('[vue-sortable] cannot locate Sortable.js.');
}

// exposed global options
vSortable.config = {}

vSortable.install = function (Vue) {
    Vue.directive('sortable', function (el, binding) {
        binding = binding || {}

        var sortable = new Sortable(el, binding)

        if (this.arg && !this.vm.sortable) {
            this.vm.sortable = {}
        }

        //  Throw an error if the given ID is not unique
        if (this.arg && this.vm.sortable[this.arg]) {
            console.warn('[vue-sortable] cannot set already defined sortable id: \'' + this.arg + '\'')
        } else if (this.arg) {
            this.vm.sortable[this.arg] = sortable
        }
    })
}
