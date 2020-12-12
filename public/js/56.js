(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    phone: {
      type: String,
      "default": undefined,
      required: true
    }
  },
  created: function created() {
    axios.post("/two-factor-auth/setup", {
      type: "phone"
    });
  },
  mounted: function mounted() {
    this.countDownTimer();
  },
  methods: {
    resend: function resend() {
      if (!(this.countdown > 0)) {
        this.countdown = this.resendtimes * 30;
        axios.post("/two-factor-auth/setup", {
          type: "phone"
        });
        this.countDownTimer();
      }
    },
    countDownTimer: function countDownTimer() {
      var _this = this;

      if (this.countdown > 0) {
        setTimeout(function () {
          _this.countdown -= 1;

          _this.countDownTimer();
        }, 1000);
      }
    },
    verify: function verify() {
      var _this2 = this;

      if (this.code != null && this.code.length > 0) {
        this.loading = true;
        axios.post("/two-factor-auth/enable", {
          type: "phone",
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
      qr: null,
      countdown: 30,
      resendtimes: 1
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=template&id=2c7bae2e&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=template&id=2c7bae2e& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "d-flex flex-column" }, [
    _c("div", [
      _c(
        "div",
        { staticClass: "d-flex justify-content-between align-content-center" },
        [
          _c("strong", [_vm._v(" یک کد تایید برای شما ارسال شد ")]),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.phone))])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "d-flex justify-content-between mt-4 align-items-end" },
        [
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
            {
              staticClass: "d-flex justify-content-end",
              staticStyle: { height: "min-content" }
            },
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
      ),
      _vm._v(" "),
      _c("div", { staticClass: "mt-2" }, [
        _c(
          "span",
          {
            staticClass: "clickable",
            class: {
              "disabled text-muted": _vm.countdown > 0,
              "text-action": !(_vm.countdown > 0)
            },
            on: { click: _vm.resend }
          },
          [
            _vm._v(
              "ارسال مجدد " +
                _vm._s(_vm.countdown > 0 ? "(" + _vm.countdown + ")" : "")
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Settings/TwoFA/PhoneNumber.vue":
/*!****************************************************************!*\
  !*** ./resources/js/Components/Settings/TwoFA/PhoneNumber.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhoneNumber_vue_vue_type_template_id_2c7bae2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumber.vue?vue&type=template&id=2c7bae2e& */ "./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=template&id=2c7bae2e&");
/* harmony import */ var _PhoneNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhoneNumber.vue?vue&type=script&lang=js& */ "./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PhoneNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PhoneNumber_vue_vue_type_template_id_2c7bae2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PhoneNumber_vue_vue_type_template_id_2c7bae2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Settings/TwoFA/PhoneNumber.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhoneNumber.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumber_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=template&id=2c7bae2e&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=template&id=2c7bae2e& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumber_vue_vue_type_template_id_2c7bae2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhoneNumber.vue?vue&type=template&id=2c7bae2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/TwoFA/PhoneNumber.vue?vue&type=template&id=2c7bae2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumber_vue_vue_type_template_id_2c7bae2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumber_vue_vue_type_template_id_2c7bae2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);