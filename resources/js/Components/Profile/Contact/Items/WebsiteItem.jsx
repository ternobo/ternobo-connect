export default {
    render: function (h) {
        let iconClose = (<i class="material-icons clickable hover-danger text-grey">close</i>);
        let iconLaunch = (<i class="material-icons clickable hover-dark text-grey">launch</i>)
        let tag = this.edit ? "div" : "a";
        let paramters = this.edit ? {
            on: {
                click: this.doDelete
            }
        } : { attrs: { href: this.websiteURL, target: '_blank' } };
        let content = (<div class="website-info">
            <strong class="font-14 text-action">{this.website.url}</strong>
            <span class="font-14">{__.get(this.website.option.id)}</span>
        </div>);
        return h(tag, { class: ['website-item', "contact-item", 'clickable'], ...paramters }, [this.edit ? iconClose : iconLaunch, content]);
    },
    methods: {
        doDelete() {
            const h = this.$createElement;
            this.confirmDialog(h("div", { domProps: { innerHTML: this.__.get("messages.delete-confirm", { attribute: this.website.url }) } })).then((value) => {
                if (value) {
                    this.$emit('deleted');
                }
            });
        }
    },
    computed: {
        websiteURL() {
            let url = this.website.url;
            if (url.startsWith("http://") || url.startsWith("https://")) {
                return url;
            } else {
                return `http://${url}`;
            }
        }
    },
    data() {
        return {

        };
    },
    props: {
        website: {
            type: Object,
            default: undefined,
        },
        edit: {
            type: Boolean,
            default: false,
        },
    },
}