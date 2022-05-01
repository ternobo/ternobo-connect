import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import MentionList from './MentionList.vue'

export default {
    async items({ query }) {
        return new Promise((resolve, reject) => {
            axios.post("/slugsearch", { q: query }).then((response) => {
                let data = response.data;
                resolve(data.pages);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    render() {
        let component
        let popup
        return {
            onStart: props => {
                component = new VueRenderer(MentionList, {
                    parent: this,
                    propsData: props,
                })

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                })
            },

            onUpdate(props) {
                component.updateProps(props)

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                })
            },

            onKeyDown(props) {
                if (props.event.key === 'Escape') {
                    popup[0].hide()

                    return true
                }

                return component.ref?.onKeyDown(props)
            },

            onExit() {
                popup[0].destroy()
                component.destroy()
            },
        }
    },
}