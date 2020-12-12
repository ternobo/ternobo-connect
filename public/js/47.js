(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ActionCard.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/PostCard/ActionCard.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimplePost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SimplePost */ "./resources/js/Components/PostCard/SimplePost.vue");
/* harmony import */ var _ArticleCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArticleCard */ "./resources/js/Components/PostCard/ArticleCard.vue");
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    if (this.action.post) {
      if (this.action.post.type === "article") {
        this.componentType = __webpack_require__(/*! ./ArticleCard */ "./resources/js/Components/PostCard/ArticleCard.vue")["default"];
      } else if (this.action.post.type === "share") {
        this.componentType = __webpack_require__(/*! ./ResharedPost */ "./resources/js/Components/PostCard/ResharedPost.vue")["default"];
      }
    }
  },
  data: function data() {
    return {
      componentType: __webpack_require__(/*! ./SimplePost */ "./resources/js/Components/PostCard/SimplePost.vue")["default"]
    };
  },
  computed: {
    actionText: function actionText() {
      if (this.action.action == "like") {
        return this.page.name + " این محتوا را پسندید";
      } else if (this.action.action == "comment") {
        return this.page.name + " برای این محتوا دیدگاه ارسال کرد";
      } else if (this.action.action == "share") {
        return this.page.name + " این محتوا را بازنشر کرد";
      }
    }
  },
  name: "ActionCard",
  props: {
    action: {
      type: Object,
      "default": undefined,
      required: true
    },
    page: {
      type: Object,
      "default": undefined,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ActionCard.vue?vue&type=template&id=8c55d4ac&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/PostCard/ActionCard.vue?vue&type=template&id=8c55d4ac& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _vm.action.post !== null
    ? _c(
        "div",
        { staticClass: "action bg-white px-0 mb-3" },
        [
          _vm.action.action !== "post"
            ? _c("div", { staticClass: "actionText border-bottom" }, [
                _vm._v("\n\t\t" + _vm._s(_vm.actionText) + "\n\t")
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(_vm.componentType, {
            tag: "component",
            staticClass: "shadow-0",
            attrs: { post: _vm.action.post }
          })
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/PostCard/ActionCard.vue":
/*!*********************************************************!*\
  !*** ./resources/js/Components/PostCard/ActionCard.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ActionCard_vue_vue_type_template_id_8c55d4ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionCard.vue?vue&type=template&id=8c55d4ac& */ "./resources/js/Components/PostCard/ActionCard.vue?vue&type=template&id=8c55d4ac&");
/* harmony import */ var _ActionCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionCard.vue?vue&type=script&lang=js& */ "./resources/js/Components/PostCard/ActionCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionCard_vue_vue_type_template_id_8c55d4ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ActionCard_vue_vue_type_template_id_8c55d4ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/PostCard/ActionCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/PostCard/ActionCard.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/PostCard/ActionCard.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ActionCard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ActionCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/PostCard/ActionCard.vue?vue&type=template&id=8c55d4ac&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Components/PostCard/ActionCard.vue?vue&type=template&id=8c55d4ac& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionCard_vue_vue_type_template_id_8c55d4ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ActionCard.vue?vue&type=template&id=8c55d4ac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ActionCard.vue?vue&type=template&id=8c55d4ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionCard_vue_vue_type_template_id_8c55d4ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionCard_vue_vue_type_template_id_8c55d4ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);