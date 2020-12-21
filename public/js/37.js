(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/PeopleSuggestion.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/App/PeopleSuggestion.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buttons_FollowButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../buttons/FollowButton */ "./resources/js/Components/buttons/FollowButton.vue");
/* harmony import */ var _buttons_ConnectionButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/ConnectionButton */ "./resources/js/Components/buttons/ConnectionButton.vue");
//
//
//
//
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
  props: {
    page: {
      type: Object,
      "default": undefined,
      required: true
    }
  },
  components: {
    FollowButton: _buttons_FollowButton__WEBPACK_IMPORTED_MODULE_0__["default"],
    ConnectionButton: _buttons_ConnectionButton__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  name: "PeopleSuggestion"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/PeopleSuggestion.vue?vue&type=template&id=2501948c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/App/PeopleSuggestion.vue?vue&type=template&id=2501948c& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    {
      staticClass:
        "people-sugestion d-flex justify-content-between align-items-center"
    },
    [
      _c(
        "inertia-link",
        {
          staticClass: "d-flex h-100 align-items-center w-100",
          attrs: { href: "/" + _vm.page.slug }
        },
        [
          _c("lazy-image", {
            staticClass: "profile-sm my-0 ml-2",
            attrs: { "img-class": "profile-sm", alt: "", src: _vm.page.profile }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "d-flex ml-2 align-items-start flex-column justify-content-center w-100"
            },
            [
              _c("strong", { staticClass: "person-name" }, [
                _vm._v(_vm._s(_vm.page.name) + " "),
                _vm.page.is_verified === 1
                  ? _c("i", { staticClass: "verificationcheck" }, [
                      _vm._v("check_circle")
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("small", { staticClass: "text-muted person-short-bio" })
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("ConnetionButtons", {
        staticClass: "follow-buttons actions",
        staticStyle: { "margin-left": "4px", width: "80px" },
        attrs: {
          vertical: true,
          "btn-style": "padding: 7px",
          "page-id": _vm.page.id,
          "user-id": _vm.page.user_id
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/App/PeopleSuggestion.vue":
/*!**********************************************************!*\
  !*** ./resources/js/Components/App/PeopleSuggestion.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PeopleSuggestion_vue_vue_type_template_id_2501948c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PeopleSuggestion.vue?vue&type=template&id=2501948c& */ "./resources/js/Components/App/PeopleSuggestion.vue?vue&type=template&id=2501948c&");
/* harmony import */ var _PeopleSuggestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PeopleSuggestion.vue?vue&type=script&lang=js& */ "./resources/js/Components/App/PeopleSuggestion.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PeopleSuggestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PeopleSuggestion_vue_vue_type_template_id_2501948c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PeopleSuggestion_vue_vue_type_template_id_2501948c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/App/PeopleSuggestion.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/App/PeopleSuggestion.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Components/App/PeopleSuggestion.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PeopleSuggestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PeopleSuggestion.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/PeopleSuggestion.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PeopleSuggestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/App/PeopleSuggestion.vue?vue&type=template&id=2501948c&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/App/PeopleSuggestion.vue?vue&type=template&id=2501948c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PeopleSuggestion_vue_vue_type_template_id_2501948c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PeopleSuggestion.vue?vue&type=template&id=2501948c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/PeopleSuggestion.vue?vue&type=template&id=2501948c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PeopleSuggestion_vue_vue_type_template_id_2501948c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PeopleSuggestion_vue_vue_type_template_id_2501948c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);