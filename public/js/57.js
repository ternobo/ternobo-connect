(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[57],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConnectionButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConnectionButton */ "./resources/js/Components/buttons/ConnectionButton.vue");
/* harmony import */ var _FollowButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FollowButton */ "./resources/js/Components/buttons/FollowButton.vue");
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    onFollowed: function onFollowed() {
      this.followed = true;
    },
    onUnfollowed: function onUnfollowed() {
      this.followed = false;
    },
    onConnected: function onConnected() {
      this.connected = true;
    },
    onDisconnect: function onDisconnect() {
      this.connected = false;
    }
  },
  components: {
    ConnectionButton: _ConnectionButton__WEBPACK_IMPORTED_MODULE_0__["default"],
    FollowButton: _FollowButton__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      followed: false,
      connected: false
    };
  },
  props: {
    userId: {
      "default": undefined,
      required: true
    },
    pageId: {
      "default": undefined,
      required: true
    },
    btnStyle: {
      type: String,
      "default": ""
    },
    vertical: {
      type: Boolean,
      "default": false
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=template&id=1455dc8d&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=template&id=1455dc8d& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "d-flex", class: { "flex-column": _vm.vertical } },
    [
      _c("ConnectionButton", {
        class: {
          "splitor-l": !_vm.vertical && _vm.connected && _vm.followed,
          "splitor-b": _vm.vertical && _vm.connected && _vm.followed
        },
        style: _vm.btnStyle,
        attrs: { user: _vm.userId },
        on: { connected: _vm.onConnected, disconnected: _vm.onDisconnect }
      }),
      _vm._v(" "),
      _c("FollowButton", {
        style: _vm.btnStyle,
        attrs: { page: _vm.pageId },
        on: { followed: _vm.onFollowed, unfollowed: _vm.onUnfollowed }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/buttons/ConnetionButtons.vue":
/*!**************************************************************!*\
  !*** ./resources/js/Components/buttons/ConnetionButtons.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConnetionButtons_vue_vue_type_template_id_1455dc8d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConnetionButtons.vue?vue&type=template&id=1455dc8d& */ "./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=template&id=1455dc8d&");
/* harmony import */ var _ConnetionButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConnetionButtons.vue?vue&type=script&lang=js& */ "./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ConnetionButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ConnetionButtons_vue_vue_type_template_id_1455dc8d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ConnetionButtons_vue_vue_type_template_id_1455dc8d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/buttons/ConnetionButtons.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnetionButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ConnetionButtons.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnetionButtons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=template&id=1455dc8d&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=template&id=1455dc8d& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnetionButtons_vue_vue_type_template_id_1455dc8d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ConnetionButtons.vue?vue&type=template&id=1455dc8d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnetionButtons.vue?vue&type=template&id=1455dc8d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnetionButtons_vue_vue_type_template_id_1455dc8d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnetionButtons_vue_vue_type_template_id_1455dc8d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);