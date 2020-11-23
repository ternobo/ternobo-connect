<template>
  <b-modal v-model="showModal" hide-footer :title="title" size="confirm" :centered="true">
    <div class="confirm-container">
      <p class="text">
        <slot></slot>
      </p>
      <div class="actions">
        <button class="btn btn-cancel" @click="onCancel" :class="cancelClass">{{ cancelText }}</button>
        <button class="btn btn-ok" @click="onOk" :class="okClass">{{ okText }}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
  methods: {
    onCancel() {
      this.$emit("cancel");
      this.$emit("update:show", false);
    },
    onOk() {
      this.$emit("confirm");
      this.$emit("update:show", false);
    },
  },
  props: {
    title: {
      type: String,
      default: "تایید عملیات",
      required: false,
    },
    direction: {
      type: String,
      default: "rtl",
      required: false,
    },
    cancelClass: {
      type: String,
      default: null,
      required: false,
    },
    okClass: {
      type: String,
      default: null,
      required: false,
    },
    okText: {
      type: String,
      default: "تایید",
      required: false,
    },
    cancelText: {
      type: String,
      default: "لغو",
      required: false,
    },
  },
  mixins: [ModalMixin],
  name: "ConfirmModal",
};
</script>

<style></style>
