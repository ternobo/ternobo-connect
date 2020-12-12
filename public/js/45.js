(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Mixins/Modal */ "./resources/js/Mixins/Modal.js");
/* harmony import */ var _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../buttons/LoadingButton.vue */ "./resources/js/Components/buttons/LoadingButton.vue");
/* harmony import */ var _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../LoadingSpinner.vue */ "./resources/js/Components/LoadingSpinner.vue");
/* harmony import */ var vue_switches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-switches */ "./node_modules/vue-switches/src/switches.vue");
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
    email: {
      "default": null
    },
    phone: {
      "default": null
    }
  },
  created: function created() {
    var _this = this;

    axios.post("/two-factor-auth/info").then(function (response) {
      var data = response.data;
      _this.enabled = data.enabled;
      _this.isSetuped = data.enabled;

      if (data.enabled) {
        _this.select_step = false;
        _this.setup_step = false;
      }

      var name = "";

      if (data.type === "app") {
        name = "اپلیکیشن تایید هویت";
      } else if (data.type === "phone") {
        name = "تلفن همراه";
      } else if (data.type === "email") {
        name = "ایمیل";
      }

      _this.type = {
        id: data.type,
        label: name
      };
      _this.recoveryCodes = JSON.parse(data.recovery_codes);
    });
  },
  computed: {
    theComponent: function theComponent() {
      if (this.type != null) {
        if (this.type.id == "app") {
          return function () {
            return __webpack_require__.e(/*! import() */ 55).then(__webpack_require__.bind(null, /*! ../../Settings/TwoFA/GoogleAuth */ "./resources/js/Components/Settings/TwoFA/GoogleAuth.vue"));
          };
        } else if (this.type.id == "email") {
          return function () {
            return __webpack_require__.e(/*! import() */ 54).then(__webpack_require__.bind(null, /*! ../../Settings/TwoFA/Email */ "./resources/js/Components/Settings/TwoFA/Email.vue"));
          };
        } else if (this.type.id == "phone") {
          return function () {
            return __webpack_require__.e(/*! import() */ 56).then(__webpack_require__.bind(null, /*! ../../Settings/TwoFA/PhoneNumber */ "./resources/js/Components/Settings/TwoFA/PhoneNumber.vue"));
          };
        }
      }

      return null;
    },
    typeText: function typeText() {
      if (this.type.id === "app") {
        return "اپلیکیشن تایید هویت";
      } else if (this.type.id === "phone") {
        return "تلفن همراه";
      } else if (this.type.id === "email") {
        return "ایمیل";
      }
    },
    noPhone: function noPhone() {
      return this.phone == null;
    },
    noEmail: function noEmail() {
      return this.email == null;
    },
    canNext: function canNext() {
      if (this.type != null && this.enabled) {
        if (this.type.id == "phone") {
          return !this.noPhone;
        } else if (this.type.id == "email") {
          return !this.noEmail;
        }

        return true;
      }

      return false;
    },
    attributes: function attributes() {
      if (this.type != null) {
        if (this.type.id == "phone") {
          return {
            phone: this.phone
          };
        } else if (this.type.id == "email") {
          return {
            email: this.email
          };
        }
      }
    }
  },
  data: function data() {
    return {
      enabled: false,
      QrCode: null,
      recoveryCodes: [],
      type: null,
      isSetuped: false,
      select_step: true,
      setup_step: false,
      resetLoading: false
    };
  },
  methods: {
    action: function action() {
      this.enabled = !this.enabled;

      if (!this.enabled) {
        axios.post("/two-factor-auth/deactive");
        this.cancel();
      }
    },
    downloadCodes: function downloadCodes() {
      var csvStr = this.recoveryCodes.join("\n");
      var hiddenElement = document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
      hiddenElement.target = "_blank";
      hiddenElement.download = "Ternobo-Recovery-Codes.csv";
      hiddenElement.click();
    },
    cancel: function cancel() {
      this.enabled = false;
      this.isSetuped = false;
      this.setup_step = false;
      this.select_step = true;
    },
    resetCodes: function resetCodes() {
      var _this2 = this;

      this.resetLoading = true;
      axios.post("/two-factor-auth/reset").then(function (response) {
        _this2.recoveryCodes = JSON.parse(response.data.codes);
        _this2.resetLoading = false;
      })["catch"](function (err) {
        _this2.toast("خطا در برقراری ارتباط");

        _this2.resetLoading = false;
      });
    },
    changeType: function changeType() {
      this.select_step = true;
      this.isSetuped = false;
    },
    next: function next() {
      if (this.type != null) {
        this.isSetuped = false;
        this.select_step = false;
        this.setup_step = true;
      } else {
        this.toast("یک شیوه تایید هویت را انتخاب کنید");
      }
    },
    onEnabled: function onEnabled(codes) {
      this.recoveryCodes = codes;
      this.setup_step = false;
      this.enabled = true;
      this.isSetuped = true;
    }
  },
  components: {
    LoadingButton: _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LoadingSpinner: _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  name: "TwoFAModal"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=template&id=ebd61398&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=template&id=ebd61398& ***!
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
        title: "تایید دو مرحله‌ای",
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
      _c("div", { staticClass: "d-flex flex-column py-3" }, [
        !_vm.enabled || _vm.isSetuped
          ? _c("div", { staticClass: "d-flex align-items-center" }, [
              _c("strong", { staticClass: "ml-4" }, [
                _vm._v(
                  " این ویژگی برای شما " +
                    _vm._s(_vm.enabled ? "فعال" : "غیرفعال") +
                    " است. "
                )
              ]),
              _vm._v(" "),
              _c(
                "span",
                {
                  staticClass: "clickable text-action",
                  on: { click: _vm.action }
                },
                [
                  _vm._v(
                    "\n\t\t\t\t" +
                      _vm._s(_vm.enabled ? "غیرفعال کردن" : "فعال کردن") +
                      "\n\t\t\t"
                  )
                ]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.select_step
          ? _c("div", [
              _c(
                "div",
                {
                  staticClass:
                    "d-flex mb-4 justify-content-between flex-wrap align-items-end"
                },
                [
                  _c(
                    "div",
                    { staticClass: "d-flex flex-column" },
                    [
                      _vm.enabled
                        ? _c("strong", { staticClass: "mb-2" }, [
                            _vm._v("یک روش تاییده انتخاب کنید")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("v-select", {
                        staticClass: "datepicker-list ml-2",
                        staticStyle: { "min-width": "280px" },
                        attrs: {
                          placeholder: "روش تاییدیه",
                          dir: "rtl",
                          disabled: !_vm.enabled,
                          options: [
                            {
                              id: "app",
                              label: "اپلیکیشن تایید هویت"
                            },
                            {
                              id: "phone",
                              label: "تلفن همراه"
                            },
                            {
                              id: "email",
                              label: "ایمیل"
                            }
                          ]
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "no-options",
                              fn: function() {
                                return [_vm._v("موردی یافت نشد")]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          false,
                          1105869603
                        ),
                        model: {
                          value: _vm.type,
                          callback: function($$v) {
                            _vm.type = $$v
                          },
                          expression: "type"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "d-flex mt-sm-0 mt-3",
                      staticStyle: { height: "min-content" }
                    },
                    [
                      _c(
                        "button",
                        {
                          staticClass: "btn text-muted button-transparent",
                          attrs: { disabled: !_vm.enabled },
                          on: {
                            click: function($event) {
                              _vm.enabled = false
                            }
                          }
                        },
                        [_vm._v("لغو")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-dark",
                          attrs: { disabled: !_vm.canNext },
                          on: { click: _vm.next }
                        },
                        [_vm._v("ادامه")]
                      )
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _vm.noPhone && _vm.type != null && _vm.type.id == "phone"
                ? _c("div", [
                    _c("strong", { staticClass: "text-danger" }, [
                      _vm._v(
                        " برای استفاده از این ویژگی بایستی تلفن همراه خود را به اطلاعات حساب اضافه کنید "
                      )
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "mt-3" }, [
                      _vm._v(
                        "با افزودن شماره همراه خودتان یک لایه امنیتی جهت ورود به حساب کاربری شما اضافه می‌شود که هربار جهت ورود به حساب کاربری یک تایید برای شما ارسال می‌کنیم. البته شما می‌توانید تعیین کنید که از شماره همراه به چه منظور استفاده کنید."
                      )
                    ])
                  ])
                : _vm.noEmail && _vm.type != null && _vm.type.id == "email"
                ? _c("div", [
                    _c("strong", { staticClass: "text-danger" }, [
                      _vm._v(
                        " برای استفاده از این ویژگی بایستی ایمیل خود را به اطلاعات حساب اضافه کنید "
                      )
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "mt-3" }, [
                      _vm._v(
                        "با افزودن ایمیل خودتان یک لایه امنیتی جهت ورود به حساب کاربری شما اضافه می‌شود که هربار جهت ورود به حساب کاربری یک تایید برای شما ارسال می‌کنیم. البته شما می‌توانید تعیین کنید که از ایمیل به چه منظور استفاده کنید."
                      )
                    ])
                  ])
                : _vm._e()
            ])
          : _c(
              "div",
              [
                _vm.setup_step
                  ? _c(
                      _vm.theComponent,
                      _vm._b(
                        {
                          tag: "component",
                          on: { enabled: _vm.onEnabled, cancel: _vm.cancel }
                        },
                        "component",
                        _vm.attributes,
                        false
                      )
                    )
                  : _vm.isSetuped
                  ? _c("div", [
                      _c("div", { staticClass: "d-flex flex-column" }, [
                        _c("div", { staticClass: "py-3 border-bottom" }, [
                          _c("div", { staticClass: "d-flex" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "bg-body px-2 p-1 ml-3 font-14 rounded-pill"
                              },
                              [
                                _vm._v(
                                  "تایید هویت دو مرحله‌ای با استفاده از " +
                                    _vm._s(_vm.typeText)
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "clickable text-action",
                                on: { click: _vm.changeType }
                              },
                              [_vm._v("تغییر روش")]
                            )
                          ]),
                          _vm._v(" "),
                          _vm.type.id === "app"
                            ? _c(
                                "span",
                                { staticClass: "text-muted font-14 mt-3" },
                                [
                                  _vm._v(
                                    "حین ورود، از کد‌ یکبار مصرفی که " +
                                      _vm._s(_vm.typeText) +
                                      " به شما نشان می‌دهد استفاده کنید."
                                  )
                                ]
                              )
                            : _vm.type.id === "phone"
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "text-muted font-14 text-center mt-3"
                                },
                                [
                                  _c("p", { staticClass: "text-right" }, [
                                    _vm._v(
                                      "در هنگام ورود، کد یکبار مصرفی به تلفن همراه شما ارسال می‌شود."
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("strong", { staticClass: "text-dark" }, [
                                    _vm._v(_vm._s(_vm.phone))
                                  ])
                                ]
                              )
                            : _vm.type.id === "email"
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "text-muted font-14 text-center mt-3"
                                },
                                [
                                  _c("p", { staticClass: "text-right" }, [
                                    _vm._v(
                                      "در هنگام ورود، کد یکبار مصرفی به ایمیل شما ارسال می‌شود."
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("strong", { staticClass: "text-dark" }, [
                                    _vm._v(_vm._s(_vm.email))
                                  ])
                                ]
                              )
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "pt-3" }, [
                          _c("h3", { staticClass: "mb-3 font-16" }, [
                            _vm._v("کد‌های بازیابی")
                          ]),
                          _vm._v(" "),
                          _c("p", [
                            _vm._v(
                              "اگر به هر دلیل نتوانستید به تلفن‌همراه خود برای دریافت پیامک یا اپلیکیشن تایید هویت دسترسی پیدا کنید می‌توانید برای ورد به حساب از کد‌های زیر استفاده کنید."
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "w-100 d-flex justify-content-between align-items-center mb-3"
                            },
                            [
                              _c("span", { staticClass: "font-12" }, [
                                _vm._v("برای کپی کردن کلیک کنید")
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "d-flex align-items-center" },
                                [
                                  _c(
                                    "i",
                                    {
                                      staticClass:
                                        "material-icons-outlined text-muted hover-dark clickable",
                                      on: { click: _vm.downloadCodes }
                                    },
                                    [_vm._v("get_app")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "i",
                                    {
                                      staticClass:
                                        "material-icons-outlined text-muted hover-dark clickable",
                                      class: {
                                        rotateAnimation: _vm.resetLoading
                                      },
                                      on: { click: _vm.resetCodes }
                                    },
                                    [_vm._v("loop")]
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "row" },
                            _vm._l(_vm.recoveryCodes, function(recoveryCode) {
                              return _c(
                                "div",
                                {
                                  key: "recovery_" + recoveryCode,
                                  staticClass: "col-md-4 col-2 mb-3"
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "clipboard",
                                          rawName: "v-clipboard",
                                          value: JSON.stringify(recoveryCode),
                                          expression:
                                            "JSON.stringify(recoveryCode)"
                                        }
                                      ],
                                      staticClass:
                                        "bg-body p-1 rounded-pill text-center clickable",
                                      staticStyle: {
                                        "padding-top": "7px !important"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t\t\t" +
                                          _vm._s(recoveryCode) +
                                          "\n\t\t\t\t\t\t\t\t"
                                      )
                                    ]
                                  )
                                ]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "w-100 text-center" }, [
                            _c("strong", [
                              _vm._v(
                                "حتما این اطلاعات را در جای امنی نگه دارید"
                              )
                            ])
                          ])
                        ])
                      ])
                    ])
                  : _vm._e()
              ],
              1
            ),
        _vm._v(" "),
        _c("strong", { staticClass: "text-superlight mt-3" }, [
          _vm._v(
            " با فعال کردن این ویژگی تمامی دستگاه‌های متصل به این حساب به صورت خودکار خارج می‌شوند. با اولین ورود هر دستگاه، یک تایید جهت ورود از شما درخواست می‌شود. "
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Modals/Settings/TwoFAModal.vue":
/*!****************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/TwoFAModal.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TwoFAModal_vue_vue_type_template_id_ebd61398___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwoFAModal.vue?vue&type=template&id=ebd61398& */ "./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=template&id=ebd61398&");
/* harmony import */ var _TwoFAModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TwoFAModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TwoFAModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TwoFAModal_vue_vue_type_template_id_ebd61398___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TwoFAModal_vue_vue_type_template_id_ebd61398___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/Settings/TwoFAModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TwoFAModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TwoFAModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TwoFAModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=template&id=ebd61398&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=template&id=ebd61398& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TwoFAModal_vue_vue_type_template_id_ebd61398___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TwoFAModal.vue?vue&type=template&id=ebd61398& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/TwoFAModal.vue?vue&type=template&id=ebd61398&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TwoFAModal_vue_vue_type_template_id_ebd61398___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TwoFAModal_vue_vue_type_template_id_ebd61398___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);