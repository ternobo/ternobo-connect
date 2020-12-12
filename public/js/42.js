(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Mixins/Modal */ "./resources/js/Mixins/Modal.js");
/* harmony import */ var _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../buttons/LoadingButton.vue */ "./resources/js/Components/buttons/LoadingButton.vue");
/* harmony import */ var _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../LoadingSpinner.vue */ "./resources/js/Components/LoadingSpinner.vue");
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
    sendVcode: function sendVcode() {
      var _this = this;

      this.loading = true;
      var $this = this;
      var data = new FormData();
      data.append("email", this.email);
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

      this.loading = true;
      var data = new FormData();
      data.append("code", this.code);
      var config = {
        method: "post",
        url: this.$APP_URL + "/auth/verify-email",
        data: data
      };
      axios(config).then(function (response) {
        if (response.data.result) {
          _this2.$emit("update:show", false);

          _this2.$emit("updated", _this2.email);
        } else {
          _this2.toast("کد تایید نامعتبر است");
        }

        _this2.loading = false;
      })["catch"](function (error) {
        _this2.loading = false;
      });
    }
  },
  props: {
    value: {
      "default": null
    }
  },
  mounted: function mounted() {
    this.email = this.value;
  },
  data: function data() {
    return {
      loading: false,
      code: null,
      verification_step: false,
      email: null
    };
  },
  components: {
    LoadingButton: _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LoadingSpinner: _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  name: "EmailModal"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=template&id=16496b82&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=template&id=16496b82& ***!
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
  return _c(
    "b-modal",
    {
      attrs: {
        "hide-footer": "",
        title: "ثبت / ویرایش ایمیل",
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
              staticClass: "btn signup-save-btn btn-dark",
              attrs: { loading: _vm.loading },
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
                value: _vm.email,
                expression: "email"
              }
            ],
            staticClass: "form-control mx-1 text-left",
            attrs: {
              type: "tel",
              readonly: _vm.verification_step,
              placeholder: "example@ternobo.com"
            },
            domProps: { value: _vm.email },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.email = $event.target.value
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide" } }, [
        _vm.verification_step
          ? _c(
              "div",
              [
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
                  [_vm._v("ایمیل اشتباه است؟")]
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
                    _c("div", { staticClass: "input-group-icon" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.code,
                            expression: "code"
                          }
                        ],
                        staticClass: "form-control mx-1 text-center",
                        attrs: {
                          type: "tel",
                          placeholder: "111111",
                          maxlength: "6"
                        },
                        domProps: { value: _vm.code },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.code = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("i", { staticClass: "material-icons-outlined" }, [
                        _vm._v("verified_user")
                      ])
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "LoadingButton",
                  {
                    staticClass: "btn btn-dark mx-3 mt-4 w-50",
                    attrs: { loading: _vm.loading },
                    nativeOn: {
                      click: function($event) {
                        return _vm.verifyCode($event)
                      }
                    }
                  },
                  [_vm._v("بعدی")]
                )
              ],
              1
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Modals/Settings/EmailModal.vue":
/*!****************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/EmailModal.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EmailModal_vue_vue_type_template_id_16496b82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EmailModal.vue?vue&type=template&id=16496b82& */ "./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=template&id=16496b82&");
/* harmony import */ var _EmailModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmailModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EmailModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EmailModal_vue_vue_type_template_id_16496b82___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EmailModal_vue_vue_type_template_id_16496b82___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/Settings/EmailModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmailModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EmailModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EmailModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=template&id=16496b82&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=template&id=16496b82& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EmailModal_vue_vue_type_template_id_16496b82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./EmailModal.vue?vue&type=template&id=16496b82& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/EmailModal.vue?vue&type=template&id=16496b82&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EmailModal_vue_vue_type_template_id_16496b82___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EmailModal_vue_vue_type_template_id_16496b82___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);