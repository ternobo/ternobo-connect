(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[46],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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



/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    save: function save() {
      var _this = this;

      this.saveLoading = true;
      axios.post("/auth/set-username", {
        username: this.username
      }).then(function (response) {
        if (response.data.result) {
          _this.$emit("updated", response.data.username);

          _this.$emit("update:show", false);
        } else {
          _this.handleError(response.data.errors);
        }
      })["catch"](function (error) {
        _this.error("خطا در بر فراری ارتباط");
      }).then(function () {
        return _this.saveLoading = false;
      });
    },
    checkValidation: function checkValidation() {
      var _this2 = this;

      this.loading = true;
      axios.post("/auth/check-username", {
        username: this.username
      }).then(function (response) {
        _this2.valid = response.data.valid;
      })["catch"](function (error) {
        _this2.error("خطا در بر فراری ارتباط");
      }).then(function () {
        return _this2.loading = false;
      });
    }
  },
  props: {
    value: {
      type: String,
      "default": null,
      required: true
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.username = this.value;
    axios.post("/auth/suggest-username").then(function (response) {
      _this3.suggestions = response.data.list;
    });
  },
  data: function data() {
    return {
      loading: false,
      saveLoading: false,
      valid: true,
      username: null,
      suggestions: []
    };
  },
  components: {
    LoadingButton: _buttons_LoadingButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LoadingSpinner: _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  name: "UsernameModal"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=template&id=61c309ce&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=template&id=61c309ce& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
        "body-class": "modal-signup",
        title: "ویرایش نام کاربری",
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
      _c("div", [
        _c(
          "div",
          { staticClass: "d-flex justify-content-between align-items-center" },
          [
            _c(
              "loading-button",
              {
                staticClass: "btn btn-primary signup-save-btn",
                attrs: {
                  disabled: _vm.loading || !_vm.valid,
                  loading: _vm.saveLoading
                },
                nativeOn: {
                  click: function($event) {
                    return _vm.save($event)
                  }
                }
              },
              [_vm._v("ثبت")]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "d-flex align-items-center" },
              [
                _c(
                  "i",
                  {
                    staticClass: "material-icons ml-2",
                    class: {
                      "text-danger": !_vm.valid,
                      "text-success": _vm.valid
                    }
                  },
                  [
                    _vm._v(
                      _vm._s(
                        _vm.valid ? "check_circle_outline" : "highlight_off"
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "material-text-field",
                  {
                    staticClass: "material--sm",
                    attrs: {
                      "no-space": true,
                      placeholder: "نام کاربری",
                      required: true,
                      maxlength: 30
                    },
                    on: { blur: _vm.checkValidation },
                    model: {
                      value: _vm.username,
                      callback: function($$v) {
                        _vm.username = $$v
                      },
                      expression: "username"
                    }
                  },
                  [
                    _vm.loading
                      ? _c("loading-spinner", {
                          staticClass: "position-absolute",
                          staticStyle: {
                            left: "0",
                            height: "10px",
                            width: "10px",
                            "border-width": "2px"
                          }
                        })
                      : _vm._e()
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "d-flex justify-content-end pt-3" }, [
          _c("span", { staticClass: "text-muted font-16 ml-4" }, [
            _vm._v("پیشنهادات ما")
          ]),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "text-left p-0", attrs: { dir: "ltr" } },
            _vm._l(_vm.suggestions, function(suggestion) {
              return _c(
                "li",
                {
                  key: "username_suggestion_" + suggestion,
                  staticClass: "clickable",
                  on: {
                    click: function($event) {
                      _vm.username = suggestion
                    }
                  }
                },
                [_vm._v("- " + _vm._s(suggestion))]
              )
            }),
            0
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Modals/Settings/UsernameModal.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/UsernameModal.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsernameModal_vue_vue_type_template_id_61c309ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsernameModal.vue?vue&type=template&id=61c309ce& */ "./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=template&id=61c309ce&");
/* harmony import */ var _UsernameModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsernameModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UsernameModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UsernameModal_vue_vue_type_template_id_61c309ce___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UsernameModal_vue_vue_type_template_id_61c309ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/Settings/UsernameModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsernameModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UsernameModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsernameModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=template&id=61c309ce&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=template&id=61c309ce& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsernameModal_vue_vue_type_template_id_61c309ce___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UsernameModal.vue?vue&type=template&id=61c309ce& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/Settings/UsernameModal.vue?vue&type=template&id=61c309ce&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsernameModal_vue_vue_type_template_id_61c309ce___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsernameModal_vue_vue_type_template_id_61c309ce___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);