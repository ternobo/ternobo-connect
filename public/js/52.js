(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AboutTab.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/AboutTab.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      showCookiesModal: false,
      showLawsModal: false
    };
  },
  components: {
    CookiesModal: function CookiesModal() {
      return __webpack_require__.e(/*! import() */ 39).then(__webpack_require__.bind(null, /*! ../Modals/CookiesModal */ "./resources/js/Components/Modals/CookiesModal.vue"));
    },
    LawsModal: function LawsModal() {
      return __webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! ../Modals/LawsModal */ "./resources/js/Components/Modals/LawsModal.vue"));
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AboutTab.vue?vue&type=template&id=52196499&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/AboutTab.vue?vue&type=template&id=52196499& ***!
  \********************************************************************************************************************************************************************************************************************/
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
    [
      _c("CookiesModal", {
        attrs: { show: _vm.showCookiesModal },
        on: {
          "update:show": function($event) {
            _vm.showCookiesModal = $event
          }
        }
      }),
      _vm._v(" "),
      _c("LawsModal", {
        attrs: { show: _vm.showLawsModal },
        on: {
          "update:show": function($event) {
            _vm.showLawsModal = $event
          }
        }
      }),
      _vm._v(" "),
      _c("h2", { staticClass: "font-20 mb-4" }, [_vm._v("امنیت اطلاعات")]),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body py-0 px-4" }, [
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(0),
            _vm._v(" "),
            _c(
              "i",
              {
                staticClass: "btn setting-btn material-icons-outlined mr-3",
                on: {
                  click: function($event) {
                    _vm.showLawsModal = true
                  }
                }
              },
              [_vm._v("keyboard_arrow_left")]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(1),
            _vm._v(" "),
            _c(
              "i",
              {
                staticClass: "btn setting-btn material-icons-outlined mr-3",
                on: {
                  click: function($event) {
                    _vm.showCookiesModal = true
                  }
                }
              },
              [_vm._v("keyboard_arrow_left")]
            )
          ])
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("gavel")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("قوانین و مقررات")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("build_circle")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("کوکی‌ها")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Settings/AboutTab.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Components/Settings/AboutTab.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AboutTab_vue_vue_type_template_id_52196499___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AboutTab.vue?vue&type=template&id=52196499& */ "./resources/js/Components/Settings/AboutTab.vue?vue&type=template&id=52196499&");
/* harmony import */ var _AboutTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AboutTab.vue?vue&type=script&lang=js& */ "./resources/js/Components/Settings/AboutTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AboutTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AboutTab_vue_vue_type_template_id_52196499___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AboutTab_vue_vue_type_template_id_52196499___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Settings/AboutTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Settings/AboutTab.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/Settings/AboutTab.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AboutTab.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AboutTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Settings/AboutTab.vue?vue&type=template&id=52196499&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Components/Settings/AboutTab.vue?vue&type=template&id=52196499& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutTab_vue_vue_type_template_id_52196499___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AboutTab.vue?vue&type=template&id=52196499& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AboutTab.vue?vue&type=template&id=52196499&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutTab_vue_vue_type_template_id_52196499___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AboutTab_vue_vue_type_template_id_52196499___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);