(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[53],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AccountTab.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/AccountTab.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__);
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

    axios.post("/auth/get-info").then(function (response) {
      _this.phone = response.data.phone;
      _this.email = response.data.email;
    });
  },
  methods: {
    reload: function reload() {
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__["Inertia"].reload({
        only: ["user"]
      });
    },
    updateEmail: function updateEmail(email) {
      this.email = email;
    },
    updatePhone: function updatePhone(phone) {
      this.phone = phone;
    }
  },
  data: function data() {
    return {
      showUsernameModal: false,
      showPhoneModal: false,
      showEmailModal: false,
      showPasswordMdal: false,
      showLangModal: false,
      showDeactiveModal: false,
      showTwoFAModal: false,
      showActiveSessions: false,
      phone: null,
      email: null
    };
  },
  components: {
    UsernameModal: function UsernameModal() {
      return __webpack_require__.e(/*! import() */ 46).then(__webpack_require__.bind(null, /*! ../Modals/Settings/UsernameModal */ "./resources/js/Components/Modals/Settings/UsernameModal.vue"));
    },
    EmailModal: function EmailModal() {
      return __webpack_require__.e(/*! import() */ 42).then(__webpack_require__.bind(null, /*! ../Modals/Settings/EmailModal */ "./resources/js/Components/Modals/Settings/EmailModal.vue"));
    },
    PasswordModal: function PasswordModal() {
      return __webpack_require__.e(/*! import() */ 43).then(__webpack_require__.bind(null, /*! ../Modals/Settings/PasswordModal */ "./resources/js/Components/Modals/Settings/PasswordModal.vue"));
    },
    PhoneNumberModal: function PhoneNumberModal() {
      return __webpack_require__.e(/*! import() */ 44).then(__webpack_require__.bind(null, /*! ../Modals/Settings/PhoneNumberModal */ "./resources/js/Components/Modals/Settings/PhoneNumberModal.vue"));
    },
    ChangeLanguageModal: function ChangeLanguageModal() {
      return __webpack_require__.e(/*! import() */ 40).then(__webpack_require__.bind(null, /*! ../Modals/Settings/ChangeLanguageModal */ "./resources/js/Components/Modals/Settings/ChangeLanguageModal.vue"));
    },
    DeactiveModal: function DeactiveModal() {
      return __webpack_require__.e(/*! import() */ 41).then(__webpack_require__.bind(null, /*! ../Modals/Settings/DeactiveModal */ "./resources/js/Components/Modals/Settings/DeactiveModal.vue"));
    },
    TwoFAModal: function TwoFAModal() {
      return Promise.all(/*! import() */[__webpack_require__.e(13), __webpack_require__.e(45)]).then(__webpack_require__.bind(null, /*! ../Modals/Settings/TwoFAModal */ "./resources/js/Components/Modals/Settings/TwoFAModal.vue"));
    },
    SessionsModal: function SessionsModal() {
      return __webpack_require__.e(/*! import() */ 36).then(__webpack_require__.bind(null, /*! ../Modals/Settings/Sessions/SessionsModal */ "./resources/js/Components/Modals/Settings/Sessions/SessionsModal.vue"));
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AccountTab.vue?vue&type=template&id=704edfb9&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Settings/AccountTab.vue?vue&type=template&id=704edfb9& ***!
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
  return _c(
    "div",
    [
      _c("UsernameModal", {
        attrs: {
          show: _vm.showUsernameModal,
          value: _vm.$page.props.user.username
        },
        on: {
          "update:show": function($event) {
            _vm.showUsernameModal = $event
          },
          updated: _vm.reload
        }
      }),
      _vm._v(" "),
      _c("email-modal", {
        attrs: { show: _vm.showEmailModal, value: _vm.email },
        on: {
          "update:show": function($event) {
            _vm.showEmailModal = $event
          },
          updated: _vm.updateEmail
        }
      }),
      _vm._v(" "),
      _c("phone-number-modal", {
        attrs: { show: _vm.showPhoneModal, value: _vm.phone },
        on: {
          "update:show": function($event) {
            _vm.showPhoneModal = $event
          },
          updated: _vm.updatePhone
        }
      }),
      _vm._v(" "),
      _c("PasswordModal", {
        attrs: { show: _vm.showPasswordMdal },
        on: {
          "update:show": function($event) {
            _vm.showPasswordMdal = $event
          }
        }
      }),
      _vm._v(" "),
      _c("ChangeLanguageModal", {
        attrs: { show: _vm.showLangModal },
        on: {
          "update:show": function($event) {
            _vm.showLangModal = $event
          }
        }
      }),
      _vm._v(" "),
      _c("DeactiveModal", {
        attrs: { show: _vm.showDeactiveModal },
        on: {
          "update:show": function($event) {
            _vm.showDeactiveModal = $event
          }
        }
      }),
      _vm._v(" "),
      _c("TwoFAModal", {
        attrs: { phone: _vm.phone, email: _vm.email, show: _vm.showTwoFAModal },
        on: {
          "update:show": function($event) {
            _vm.showTwoFAModal = $event
          }
        }
      }),
      _vm._v(" "),
      _c("SessionsModal", {
        attrs: { show: _vm.showActiveSessions },
        on: {
          "update:show": function($event) {
            _vm.showActiveSessions = $event
          }
        }
      }),
      _vm._v(" "),
      _c("h2", { staticClass: "font-20 mb-4" }, [_vm._v("ورود و امنیت")]),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body py-0 px-4" }, [
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c("div", { staticClass: "content" }, [
                _c(
                  "section",
                  {
                    directives: [
                      {
                        name: "clipboard",
                        rawName: "v-clipboard",
                        value:
                          _vm.$APP_URL + "/" + _vm.$page.props.user.username,
                        expression: "$APP_URL + '/' + $page.props.user.username"
                      }
                    ],
                    staticClass: "slugItem clickable"
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "ml-2 d-flex align-items-center",
                        staticStyle: { direction: "ltr" }
                      },
                      [
                        _c("span", { staticClass: "mr-1" }, [
                          _vm._v(
                            _vm._s(
                              _vm.$root.isDesktop ? _vm.$APP_URL + "/" : ""
                            ) +
                              " " +
                              _vm._s(_vm.$page.props.user.username)
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _vm._m(1)
                  ]
                )
              ]),
              _vm._v(" "),
              _c(
                "i",
                {
                  staticClass: "btn setting-btn material-icons-outlined mr-3",
                  on: {
                    click: function($event) {
                      _vm.showUsernameModal = true
                    }
                  }
                },
                [_vm._v("edit")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(2),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c("div", { staticClass: "content" }, [
                _c("span", { staticClass: "mr-1" }, [_vm._v(_vm._s(_vm.phone))])
              ]),
              _vm._v(" "),
              _c(
                "i",
                {
                  staticClass: "btn setting-btn material-icons-outlined mr-3",
                  on: {
                    click: function($event) {
                      _vm.showPhoneModal = true
                    }
                  }
                },
                [_vm._v("edit")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(3),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c("div", { staticClass: "content" }, [
                _c("span", { staticClass: "mr-1" }, [_vm._v(_vm._s(_vm.email))])
              ]),
              _vm._v(" "),
              _c(
                "i",
                {
                  staticClass: "btn setting-btn material-icons-outlined mr-3",
                  on: {
                    click: function($event) {
                      _vm.showEmailModal = true
                    }
                  }
                },
                [_vm._v("edit")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(4),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c(
                "i",
                {
                  staticClass: "btn setting-btn material-icons-outlined mr-3",
                  on: {
                    click: function($event) {
                      _vm.showPasswordMdal = true
                    }
                  }
                },
                [_vm._v("edit")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(5),
            _vm._v(" "),
            _c(
              "i",
              {
                staticClass: "btn setting-btn material-icons-outlined mr-3",
                on: {
                  click: function($event) {
                    _vm.showActiveSessions = true
                  }
                }
              },
              [_vm._v("keyboard_arrow_left")]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(6),
            _vm._v(" "),
            _c(
              "i",
              {
                staticClass: "btn setting-btn material-icons-outlined mr-3",
                on: {
                  click: function($event) {
                    _vm.showTwoFAModal = true
                  }
                }
              },
              [_vm._v("keyboard_arrow_left")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("h2", { staticClass: "font-20 my-4" }, [
        _vm._v("اطلاعات و دسترسی‌ها")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body py-0 px-4" }, [
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(7),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _vm._m(8),
              _vm._v(" "),
              _c(
                "i",
                {
                  staticClass: "btn setting-btn material-icons-outlined mr-3",
                  on: {
                    click: function($event) {
                      _vm.showLangModal = true
                    }
                  }
                },
                [_vm._v("keyboard_arrow_left")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "setting-action" }, [
            _vm._m(9),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex align-items-center" }, [
              _c(
                "i",
                {
                  staticClass: "btn setting-btn material-icons-outlined mr-3",
                  on: {
                    click: function($event) {
                      _vm.showDeactiveModal = true
                    }
                  }
                },
                [_vm._v("keyboard_arrow_left")]
              )
            ])
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
        _vm._v("account_circle")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("نام کاربری")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("section", { staticClass: "icon clickable" }, [
      _c("i", { staticClass: "font-18 material-icons-outlined" }, [
        _vm._v("copy")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("perm_phone_msg")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("تلفن همراه")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("email")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("پست الکترونیک")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("vpn_key")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("رمز عبور")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("devices")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("دستگاه‌های متصل")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("privacy_tip")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("تایید 2 مرحله‌ای")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("translate")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("زبان نمایش")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "content" }, [
      _c("div", { staticClass: "d-flex justify-content-between w-100" }, [
        _c("span", { staticClass: "ml-2" }, [_vm._v(" فارسی (Persian) ")]),
        _vm._v(" "),
        _c("img", {
          staticStyle: { width: "16px", height: "16px" },
          attrs: { src: "/img/iranicon.png" }
        })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "name" }, [
      _c("i", { staticClass: "material-icons-outlined ml-2" }, [
        _vm._v("cancel")
      ]),
      _vm._v(" "),
      _c("span", [_vm._v("غیرفعال کردن حساب")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Settings/AccountTab.vue":
/*!*********************************************************!*\
  !*** ./resources/js/Components/Settings/AccountTab.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AccountTab_vue_vue_type_template_id_704edfb9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountTab.vue?vue&type=template&id=704edfb9& */ "./resources/js/Components/Settings/AccountTab.vue?vue&type=template&id=704edfb9&");
/* harmony import */ var _AccountTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountTab.vue?vue&type=script&lang=js& */ "./resources/js/Components/Settings/AccountTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AccountTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountTab_vue_vue_type_template_id_704edfb9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AccountTab_vue_vue_type_template_id_704edfb9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Settings/AccountTab.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Settings/AccountTab.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/Settings/AccountTab.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountTab.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AccountTab.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTab_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Settings/AccountTab.vue?vue&type=template&id=704edfb9&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Components/Settings/AccountTab.vue?vue&type=template&id=704edfb9& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTab_vue_vue_type_template_id_704edfb9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountTab.vue?vue&type=template&id=704edfb9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Settings/AccountTab.vue?vue&type=template&id=704edfb9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTab_vue_vue_type_template_id_704edfb9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountTab_vue_vue_type_template_id_704edfb9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);