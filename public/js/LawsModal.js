(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LawsModal"],{

/***/ "./resources/js/Mixins/Modal.js":
/*!**************************************!*\
  !*** ./resources/js/Mixins/Modal.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ModalMixin = {
  created: function created() {
    this.showModal = this.show;
  },
  data: function data() {
    return {
      showModal: false
    };
  },
  watch: {
    show: function show(newValue) {
      this.showModal = this.show;
    },
    showModal: function showModal(newValue) {
      this.$emit("update:show", newValue);
    }
  },
  props: {
    show: {
      type: Boolean,
      "default": false,
      required: false
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ModalMixin);

/***/ })

}]);