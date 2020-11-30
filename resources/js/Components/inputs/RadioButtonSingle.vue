<template>
  <div class="radio clickable" @click="checked = true">
    <input type="radio" :name="name" class="radio__input" :checked="checked" />
    <label class="radio__label"> </label>
  </div>
</template>

<script>
export default {
  watch: {
    checked(val) {
      if (val) {
        this.$emit("checked", this.value);
      }
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  props: {
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    value: {
      type: String,
      default: undefined,
      required: false,
    },
  },
};
</script>

<style></style>
