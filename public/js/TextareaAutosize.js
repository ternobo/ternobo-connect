(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TextareaAutosize"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TextareaAutosize',
  props: {
    value: {
      type: [String, Number],
      "default": ''
    },
    autosize: {
      type: Boolean,
      "default": true
    },
    minHeight: {
      type: [Number],
      'default': null
    },
    maxHeight: {
      type: [Number],
      'default': null
    },

    /*
     * Force !important for style properties
     */
    important: {
      type: [Boolean, Array],
      "default": false
    }
  },
  data: function data() {
    return {
      // data property for v-model binding with real textarea tag
      val: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      height: 'auto'
    };
  },
  computed: {
    computedStyles: function computedStyles() {
      if (!this.autosize) return {};
      return {
        resize: !this.isResizeImportant ? 'none' : 'none !important',
        height: this.height,
        overflow: this.maxHeightScroll ? 'auto' : !this.isOverflowImportant ? 'hidden' : 'hidden !important'
      };
    },
    isResizeImportant: function isResizeImportant() {
      var imp = this.important;
      return imp === true || Array.isArray(imp) && imp.includes('resize');
    },
    isOverflowImportant: function isOverflowImportant() {
      var imp = this.important;
      return imp === true || Array.isArray(imp) && imp.includes('overflow');
    },
    isHeightImportant: function isHeightImportant() {
      var imp = this.important;
      return imp === true || Array.isArray(imp) && imp.includes('height');
    }
  },
  watch: {
    value: function value(val) {
      this.val = val;
    },
    val: function val(_val) {
      this.$nextTick(this.resize);
      this.$emit('input', _val);
    },
    minHeight: function minHeight() {
      this.$nextTick(this.resize);
    },
    maxHeight: function maxHeight() {
      this.$nextTick(this.resize);
    },
    autosize: function autosize(val) {
      if (val) this.resize();
    }
  },
  methods: {
    resize: function resize() {
      var _this = this;

      var important = this.isHeightImportant ? 'important' : '';
      this.height = "auto".concat(important ? ' !important' : '');
      this.$nextTick(function () {
        var contentHeight = _this.$el.scrollHeight + 1;

        if (_this.val == null) {
          contentHeight -= parseInt(window.getComputedStyle(_this.$el).paddingTop) + parseInt(window.getComputedStyle(_this.$el).paddingBottom);
        } else if (_this.val.length < 1) {
          contentHeight -= parseInt(window.getComputedStyle(_this.$el).paddingTop) + parseInt(window.getComputedStyle(_this.$el).paddingBottom);
        }

        if (_this.minHeight) {
          contentHeight = contentHeight < _this.minHeight ? _this.minHeight : contentHeight;
        }

        if (_this.maxHeight) {
          if (contentHeight > _this.maxHeight) {
            contentHeight = _this.maxHeight;
            _this.maxHeightScroll = true;
          } else {
            _this.maxHeightScroll = false;
          }
        }

        var heightVal = contentHeight + 'px';
        _this.height = "".concat(heightVal).concat(important ? ' !important' : '');
      });
      return this;
    }
  },
  created: function created() {
    this.val = this.value;
  },
  mounted: function mounted() {
    this.resize();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=template&id=eec16296&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=template&id=eec16296& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("textarea", {
    directives: [
      { name: "model", rawName: "v-model", value: _vm.val, expression: "val" }
    ],
    style: _vm.computedStyles,
    domProps: { value: _vm.val },
    on: {
      focus: _vm.resize,
      input: function($event) {
        if ($event.target.composing) {
          return
        }
        _vm.val = $event.target.value
      }
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/inputs/TextareaAutosize.vue":
/*!*************************************************************!*\
  !*** ./resources/js/Components/inputs/TextareaAutosize.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TextareaAutosize_vue_vue_type_template_id_eec16296___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextareaAutosize.vue?vue&type=template&id=eec16296& */ "./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=template&id=eec16296&");
/* harmony import */ var _TextareaAutosize_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextareaAutosize.vue?vue&type=script&lang=js& */ "./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TextareaAutosize_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TextareaAutosize_vue_vue_type_template_id_eec16296___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TextareaAutosize_vue_vue_type_template_id_eec16296___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/inputs/TextareaAutosize.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextareaAutosize_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TextareaAutosize.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextareaAutosize_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=template&id=eec16296&":
/*!********************************************************************************************!*\
  !*** ./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=template&id=eec16296& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextareaAutosize_vue_vue_type_template_id_eec16296___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TextareaAutosize.vue?vue&type=template&id=eec16296& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TextareaAutosize.vue?vue&type=template&id=eec16296&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextareaAutosize_vue_vue_type_template_id_eec16296___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TextareaAutosize_vue_vue_type_template_id_eec16296___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);