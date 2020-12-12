(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Mixins/Modal */ "./resources/js/Mixins/Modal.js");
/* harmony import */ var _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../buttons/LoadingButton.vue */ "./resources/js/Components/buttons/LoadingButton.vue");
/* harmony import */ var _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../LoadingSpinner.vue */ "./resources/js/Components/LoadingSpinner.vue");
/* harmony import */ var _OtpInput_OtpInput_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../OtpInput/OtpInput.vue */ "./resources/js/Components/OtpInput/OtpInput.vue");
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
  methods: {
    sendVcode: function sendVcode(type) {
      var _this = this;

      this.loading = true;
      var $this = this;
      var data = new FormData();
      data.append("phone", this.phone);
      var config = {
        method: "post",
        url: this.$APP_URL + "/auth/verification",
        data: data
      };
      axios(config).then(function (response) {
        if (response.data.result) {
          _this.verification_step = true;
        } else {
          var errors = response.data.errors;

          _this.handleError(errors);
        }

        _this.loading = false;
      })["catch"](function (error) {
        _this.loading = false;
      });
    },
    verifyCode: function verifyCode() {
      var _this2 = this;

      this.nextLoading = true;
      var data = new FormData();
      data.append("code", this.code);
      var config = {
        method: "post",
        url: this.$APP_URL + "/auth/verify-phone",
        data: data
      };
      axios(config).then(function (response) {
        if (response.data.result) {
          _this2.$emit("update:show", false);

          _this2.$emit("updated", _this2.phone);

          _this2.invalidCode = false;
        } else {
          _this2.invalidCode = true;
        }

        _this2.nextLoading = false;
      })["catch"](function (error) {
        _this2.nextLoading = false;
      }).then(function () {
        return _this2.completedCode = true;
      });
    }
  },
  props: {
    value: {
      "default": null
    }
  },
  mounted: function mounted() {
    this.phone = this.value;
  },
  data: function data() {
    return {
      loading: false,
      code: null,
      verification_step: false,
      phone: null,
      nextLoading: false,
      invalidCode: false,
      completedCode: false
    };
  },
  components: {
    LoadingButton: _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LoadingSpinner: _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    OtpInput: _OtpInput_OtpInput_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  name: "PhoneNumberModal"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=template&id=775b1d64&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=template&id=775b1d64& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
    "b-modal",
    {
      attrs: {
        "hide-footer": "",
        title: "ثبت / ویرایش تلفن همراه",
        "body-class": "modal-signup",
        size: "md",
        centered: true
      },
      model: {
        value: _vm.showModal,
        callback: function($$v) {
          _vm.showModal = $$v
        },
        expression: "showModal"
      }
    },
    [
      _c(
        "div",
        {
          staticClass:
            "d-flex ephone-input-group py-0 justify-content-between align-items-center"
        },
        [
          _c(
            "LoadingButton",
            {
              staticClass: "btn btn-dark signup-save-btn",
              attrs: { loading: _vm.loading, disabled: _vm.verification_step },
              nativeOn: {
                click: function($event) {
                  return _vm.sendVcode()
                }
              }
            },
            [_vm._v("ثبت")]
          ),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.phone,
                expression: "phone"
              }
            ],
            staticClass: "form-control mx-1 text-left",
            attrs: {
              type: "tel",
              readonly: _vm.verification_step,
              placeholder: "09126667152"
            },
            domProps: { value: _vm.phone },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.phone = $event.target.value
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide" } }, [
        _vm.verification_step
          ? _c("div", { staticClass: "text" }, [
              _c(
                "label",
                {
                  staticClass: "ml-1 mt-2 text-left clickable",
                  on: {
                    click: function($event) {
                      _vm.verification_step = false
                    }
                  }
                },
                [_vm._v("شماره همراه اشتباه است؟")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "input-group d-flex align-items-center flex-column justify-content-center mt-4"
                },
                [
                  _c("label", { staticClass: "w-100" }, [
                    _vm._v("کد تایید خود ‌را وارد کنید")
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex align-items-center" },
                    [
                      _c("otp-input", {
                        staticClass: "material--sm mx-1 text-center",
                        attrs: { "input-class": "w-100", numInputs: 6 },
                        on: { completed: _vm.verifyCode },
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
                        "i",
                        {
                          staticClass: "material-icons-outlined mr-3",
                          class: {
                            "text-muted":
                              !_vm.invalidCode && !_vm.completedCode,
                            "text-danger": _vm.invalidCode,
                            "text-success": !_vm.invalidCode
                          }
                        },
                        [_vm._v("verified_user")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "LoadingButton",
                    {
                      staticClass: "btn btn-dark mt-4",
                      attrs: { loading: _vm.nextLoading },
                      nativeOn: {
                        click: function($event) {
                          return _vm.verifyCode($event)
                        }
                      }
                    },
                    [_vm._v("تایید")]
                  )
                ],
                1
              )
            ])
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Modals/Settings/PhoneNumberModal.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/PhoneNumberModal.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhoneNumberModal_vue_vue_type_template_id_775b1d64___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhoneNumberModal.vue?vue&type=template&id=775b1d64& */ "./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=template&id=775b1d64&");
/* harmony import */ var _PhoneNumberModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhoneNumberModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PhoneNumberModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PhoneNumberModal_vue_vue_type_template_id_775b1d64___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PhoneNumberModal_vue_vue_type_template_id_775b1d64___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/Settings/PhoneNumberModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumberModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhoneNumberModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumberModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=template&id=775b1d64&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=template&id=775b1d64& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumberModal_vue_vue_type_template_id_775b1d64___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhoneNumberModal.vue?vue&type=template&id=775b1d64& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/PhoneNumberModal.vue?vue&type=template&id=775b1d64&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumberModal_vue_vue_type_template_id_775b1d64___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhoneNumberModal_vue_vue_type_template_id_775b1d64___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);