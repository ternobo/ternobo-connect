const ModalMixin = {
    created: function () {
        this.showModal = this.show;
    },
    data: function () {
        return {
            showModal: false
        }
    },
    watch: {
        show(newValue) {
            this.showModal = this.show;
        },
        showModal(newValue) {
            this.$emit("update:show", newValue);
            if (!newValue) {
                this.$emit("hide");
            }
        },

    },
    props: {
        show: {
            type: Boolean,
            default: false,
            required: false
        },
    }
};
export default ModalMixin;