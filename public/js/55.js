(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    var _this = this;

    axios.post("/two-factor-auth/setup", {
      type: "app"
    }).then(function (response) {
      _this.qr = response.data.qr_code;
    });
  },
  methods: {
    verify: function verify() {
      var _this2 = this;

      if (this.code != null && this.code.length > 0) {
        this.loading = true;
        axios.post("/two-factor-auth/enable", {
          type: "app",
          code: this.code
        }).then(function (response) {
          var data = response.data;

          if (data.result) {
            _this2.$emit("enabled", JSON.parse(data.recovery));
          } else {
            _this2.toast("کد تایید نامعتبر است");
          }

          _this2.loading = false;
        })["catch"](function (err) {
          return _this2.loading = false;
        });
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      code: null,
      qr: null
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=template&id=0268c60c&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=template&id=0268c60c& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "d-flex flex-column" },
    [
      _c("strong", [_vm._v(" تایید هویت دو مرحله‌ای توسط اپلیکیشن ")]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "w-100 d-flex justify-content-center" },
        [
          _vm.qr != null
            ? _c("img", {
                staticStyle: { "max-width": "130px" },
                attrs: { src: _vm.qr }
              })
            : _c("skeleton", { attrs: { height: "130px", width: "130px" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("span", { staticClass: "my-4" }, [
        _vm._v("کد نمایان شده را اینجا وارد کنید")
      ]),
      _vm._v(" "),
      _c("material-text-field", {
        staticClass: "material--sm",
        attrs: { placeholder: "کد را وارد کنید" },
        model: {
          value: _vm.code,
          callback: function($$v) {
            _vm.code = $$v
          },
          expression: "code"
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "d-flex justify-content-end" },
        [
          _c(
            "button",
            {
              staticClass: "btn button-transparent",
              on: {
                click: function($event) {
                  return _vm.$emit("cancel")
                }
              }
            },
            [_vm._v("لغو")]
          ),
          _vm._v(" "),
          _c(
            "loading-button",
            {
              staticClass: "btn btn-primary",
              attrs: { loading: _vm.loading },
              nativeOn: {
                click: function($event) {
                  return _vm.verify($event)
                }
              }
            },
            [_vm._v("تایید")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", [
      _c("li", [
        _vm._v("اپلیکیشن "),
        _c("span", { staticClass: "text-action" }, [
          _vm._v("تایید هویت ترنوبو")
        ]),
        _vm._v("، یا یک اپلیکیشن تایید هویت به انتخاب خودتان نصب کنید.")
      ]),
      _vm._v(" "),
      _c("li", [_vm._v("اپلیکیشن را اجرا و سپس کوی‌آر کد زیر اسکن کنید")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Settings/TwoFA/GoogleAuth.vue":
/*!***************************************************************!*\
  !*** ./resources/js/Components/Settings/TwoFA/GoogleAuth.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GoogleAuth_vue_vue_type_template_id_0268c60c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoogleAuth.vue?vue&type=template&id=0268c60c& */ "./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=template&id=0268c60c&");
/* harmony import */ var _GoogleAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GoogleAuth.vue?vue&type=script&lang=js& */ "./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GoogleAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GoogleAuth_vue_vue_type_template_id_0268c60c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GoogleAuth_vue_vue_type_template_id_0268c60c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Settings/TwoFA/GoogleAuth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GoogleAuth.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=template&id=0268c60c&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=template&id=0268c60c& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleAuth_vue_vue_type_template_id_0268c60c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GoogleAuth.vue?vue&type=template&id=0268c60c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/GoogleAuth.vue?vue&type=template&id=0268c60c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleAuth_vue_vue_type_template_id_0268c60c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GoogleAuth_vue_vue_type_template_id_0268c60c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);