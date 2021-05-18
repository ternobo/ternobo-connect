export default {
    render: function (h) {
        let actions = {};
        if (this.tag == "div") {
            actions = {
                click: this.click
            };
        }
        return h(this.tag, [this.$slots.default], { on: actions });
    },
    methods: {
        click() {
            this.$emit("click");
        }
    },
    props: ['tag'],
}