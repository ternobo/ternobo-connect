<template>
<div class="d-flex tag-input" :class="{ focus: tags != null && tags != undefined && tags.length > 0 }">
    <div class="tags">
        <div class="tag-item" v-for="(tag, index) in tags" @click="removeTag(index)" :key="'newpost_tag_' + tag + '_' + index">
            {{ tag }}
        </div>
    </div>
    <input :type="type" placeholder=" " @keyup.enter="addTag()" :disabled="tags != null && tags != null && tags.length == 3" @keyup.delete="removeLastTag" :class="[inputClass, { invalid: invalid }]" @blur="check" v-model="input" :maxlength="maxlength" class="input" />
    <label class="d-flex align-items-center">
        برچسب‌ها
        <small class="max-text mr-1">حداکثر 3 برچسب</small>
    </label>
</div>
</template>

<script>
export default {
    methods: {
        removeLastTag() {
            if (this.input == null || this.input.length < 1) {
                this.tags.pop();
                this.$emit("input", this.tags);
            }
        },
        removeTag(index) {
            this.tags.splice(index, 1);
            this.$emit("input", this.tags);
        },
        addTag() {
            if (this.input != null) {
                this.tags.push(this.input);
                this.input = null;
                this.$emit("input", this.tags);
            }
        },
        check() {
            if (
                ((this.val == null || this.val.length < 1) && this.required) ||
                this.notValid
            ) {
                this.invalid = true;
            } else {
                this.invalid = false;
            }
        },
    },
    created() {
        this.tags = this.value;
    },
    watch: {
        value() {
            this.tags = this.value;
        },
    },
    data() {
        return {
            tags: [],
            input: null,
            invalid: false,
        };
    },
    props: {
        notValid: {
            type: Boolean,
            default: false,
            required: false,
        },
        value: {
            type: Array,
            required: false,
        },
        required: {
            type: Boolean,
            default: false,
            required: false,
        },
        type: {
            type: String,
            default: "text",
            required: false,
        },
        maxlength: {
            type: Number,
            default: 15000,
            required: false,
        },
        inputClass: {
            type: String,
            default: "",
            required: false,
        },
        placeholder: {
            type: String,
            default: undefined,
            required: false,
        },
    },
};
</script>
