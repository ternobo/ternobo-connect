<template>
<div class="teditor" :style="{minHeight: minHeight}">
    <label class="font-16" @click="focus" v-if="placeholder != null && showLabel">
        {{ placeholder }}
    </label>
    <div contenteditable ref="editable" class="editable font-16" :style="{minHeight: minHeight}" @focus="showLabel = false" @input="update"></div>
    <div class="readonly" v-html="text"></div>
</div>
</template>

<script>
export default {
    created() {
        this.text = this.value;
    },
    data() {
        return {
            showLabel: true,
            text: null,
        }
    },
    props: {
        minHeight: {
            type: String,
            default: false,
            required: false
        },
        placeholder: {
            type: String,
            default: null,
            required: false
        },
        maxlength: {
            type: Number,
            default: -1,
            required: false
        },
        value: {
            type: String,
            default: null,
            required: false
        },

    },
    methods: {
        blur() {
            this.update();
            this.toggleLabel();
        },
        focus() {
            this.$refs.editable.focus();
        },
        toggleLabel() {
            if (!(this.text != null && this.text.length > 0)) {
                this.showLabel = true;
            }
        },
        update() {
            this.$el.style.height = this.$refs.editable.scrollHeight + "px";
            let text = this.$refs.editable.textContent;
            this.$emit("input", text);

            if (text.length > this.maxlength) {
                text = '<span>' + text.substr(0, this.maxlength) + "</span><span style='background:red;color:#FFF'>" + text.substr(this.maxlength, text.length) + "</span>"
            }
            this.text = text;
        }

    },

}
</script>
