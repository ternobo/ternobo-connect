import link from './link'
import remember from './remember'
import { Inertia } from '../../InertiaJs'

let app = {}

export default {
    name: 'Inertia',
    props: {
        initialPage: {
            type: Object,
            required: true,
        },
        resolveComponent: {
            type: Function,
            required: true,
        },
        transformProps: {
            type: Function,
            default: props => props,
        },
    },
    data() {
        return {
            component: null,
            page: {},
            key: null,
        }
    },
    created() {
        app = this
        Inertia.init({
            initialPage: this.initialPage,
            resolveComponent: this.resolveComponent,
            transformProps: this.transformProps,
            swapComponent: async ({ component, page, preserveState }) => {
                this.component = component
                this.page = page
                this.key = preserveState ? this.key : Date.now()
            },
        })
    },
    render(h) {
        if (this.component) {
            const child = h(this.component, {
                key: this.key,
                props: this.page.props,
                scopedSlots: this.$scopedSlots,
            })

            if (this.component.layout) {
                if (typeof this.component.layout === 'function') {
                    return this.component.layout(h, child)
                } else if (Array.isArray(this.component.layout)) {
                    return this.component.layout
                        .concat(child)
                        .reverse()
                        .reduce((child, layout) => h(layout, [child]))
                }

                return h(this.component.layout, [child])
            }

            return child
        }
    },
    install(Vue) {
        console.warn('Registering the Inertia Vue plugin via the "app" component has been deprecated. Use the new "plugin" named export instead.\n\nimport { plugin } from \'@inertiajs/inertia-vue\'\n\nVue.use(plugin)')
        plugin.install(Vue)
    },
}

export const plugin = {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$inertia', { get: () => Inertia })
        Object.defineProperty(Vue.prototype, '$page', { get: () => app.page })
        Vue.mixin(remember)
        Vue.component('InertiaLink', link)
    },
}
