(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TagInput.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/inputs/TagInput.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    removeLastTag: function removeLastTag() {
      if (this.input == null || this.input.length < 1) {
        this.tags.pop();
        this.$emit("input", this.tags);
      }
    },
    removeTag: function removeTag(index) {
      this.tags.splice(index, 1);
      this.$emit("input", this.tags);
    },
    addTag: function addTag() {
      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (item != null) {
        if (this.tags.indexOf(item) == -1) {
          this.tags.push(item);
          this.input = null;
          this.$emit("input", this.tags);
          this.suggestions = [];
        }
      } else if (this.input != null) {
        if (this.tags.indexOf(this.input) == -1) {
          this.tags.push(this.input);
          this.input = null;
          this.$emit("input", this.tags);
        }
      }
    },
    check: function check() {
      if ((this.val == null || this.val.length < 1) && this.required || this.notValid) {
        this.invalid = true;
      } else {
        this.invalid = false;
      }
    }
  },
  created: function created() {
    this.tags = this.value;
  },
  watch: {
    value: function value() {
      this.tags = this.value;
    },
    input: function input(newVal) {
      var _this = this;

      if (newVal != null && newVal.length > 0) {
        axios.get(this.$APP_URL + '/gettags?term=' + newVal + '&q=' + newVal).then(function (response) {
          var data = response.data;

          if (data.results.length > 0) {
            _this.suggestions = data.results;
          }
        });
      }
    }
  },
  data: function data() {
    return {
      tags: [],
      suggestions: [],
      input: null,
      invalid: false
    };
  },
  props: {
    notValid: {
      type: Boolean,
      "default": false,
      required: false
    },
    value: {
      type: Array,
      required: false
    },
    required: {
      type: Boolean,
      "default": false,
      required: false
    },
    type: {
      type: String,
      "default": "text",
      required: false
    },
    maxlength: {
      type: Number,
      "default": 15000,
      required: false
    },
    inputClass: {
      type: String,
      "default": "",
      required: false
    },
    placeholder: {
      type: String,
      "default": undefined,
      required: false
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TagInput.vue?vue&type=template&id=dafaf10a&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/inputs/TagInput.vue?vue&type=template&id=dafaf10a& ***!
  \******************************************************************************************************************************************************************************************************************/
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
      staticClass: "d-flex tag-input",
      class: {
        focus: _vm.tags != null && _vm.tags != undefined && _vm.tags.length > 0
      }
    },
    [
      _c(
        "div",
        { staticClass: "tags" },
        _vm._l(_vm.tags, function(tag, index) {
          return _c(
            "div",
            {
              key: "newpost_tag_" + tag + "_" + index,
              staticClass: "tag-item",
              on: {
                click: function($event) {
                  return _vm.removeTag(index)
                }
              }
            },
            [_vm._v("\n            " + _vm._s(tag) + "\n        ")]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm.type === "checkbox"
        ? _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.input,
                expression: "input"
              }
            ],
            staticClass: "input",
            class: [_vm.inputClass, { invalid: _vm.invalid }],
            attrs: {
              placeholder: " ",
              disabled:
                _vm.tags != null && _vm.tags != null && _vm.tags.length == 3,
              maxlength: _vm.maxlength,
              type: "checkbox"
            },
            domProps: {
              checked: Array.isArray(_vm.input)
                ? _vm._i(_vm.input, null) > -1
                : _vm.input
            },
            on: {
              keyup: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.addTag()
              },
              blur: _vm.check,
              change: function($event) {
                var $$a = _vm.input,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.input = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.input = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.input = $$c
                }
              }
            }
          })
        : _vm.type === "radio"
        ? _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.input,
                expression: "input"
              }
            ],
            staticClass: "input",
            class: [_vm.inputClass, { invalid: _vm.invalid }],
            attrs: {
              placeholder: " ",
              disabled:
                _vm.tags != null && _vm.tags != null && _vm.tags.length == 3,
              maxlength: _vm.maxlength,
              type: "radio"
            },
            domProps: { checked: _vm._q(_vm.input, null) },
            on: {
              keyup: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.addTag()
              },
              blur: _vm.check,
              change: function($event) {
                _vm.input = null
              }
            }
          })
        : _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.input,
                expression: "input"
              }
            ],
            staticClass: "input",
            class: [_vm.inputClass, { invalid: _vm.invalid }],
            attrs: {
              placeholder: " ",
              disabled:
                _vm.tags != null && _vm.tags != null && _vm.tags.length == 3,
              maxlength: _vm.maxlength,
              type: _vm.type
            },
            domProps: { value: _vm.input },
            on: {
              keyup: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                return _vm.addTag()
              },
              blur: _vm.check,
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.input = $event.target.value
              }
            }
          }),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _vm.suggestions.length > 0 && this.input != null && this.input.length > 0
        ? _c("div", { staticClass: "tags-suggestion" }, [
            _c(
              "div",
              { staticClass: "tags flex-wrap" },
              _vm._l(_vm.suggestions, function(suggestion, index) {
                return _c(
                  "div",
                  {
                    key: "suggested_tag_" + suggestion + "_" + index,
                    staticClass: "tag-item",
                    on: {
                      click: function($event) {
                        return _vm.addTag(suggestion.text)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(suggestion.text) +
                        "\n            "
                    )
                  ]
                )
              }),
              0
            )
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "d-flex align-items-center" }, [
      _vm._v("\n        برچسب‌ها\n        "),
      _c("small", { staticClass: "max-text mr-1" }, [_vm._v("حداکثر 3 برچسب")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/inputs/TagInput.vue":
/*!*****************************************************!*\
  !*** ./resources/js/Components/inputs/TagInput.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagInput_vue_vue_type_template_id_dafaf10a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagInput.vue?vue&type=template&id=dafaf10a& */ "./resources/js/Components/inputs/TagInput.vue?vue&type=template&id=dafaf10a&");
/* harmony import */ var _TagInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagInput.vue?vue&type=script&lang=js& */ "./resources/js/Components/inputs/TagInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TagInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagInput_vue_vue_type_template_id_dafaf10a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TagInput_vue_vue_type_template_id_dafaf10a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/inputs/TagInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/inputs/TagInput.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/Components/inputs/TagInput.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TagInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TagInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/inputs/TagInput.vue?vue&type=template&id=dafaf10a&":
/*!************************************************************************************!*\
  !*** ./resources/js/Components/inputs/TagInput.vue?vue&type=template&id=dafaf10a& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagInput_vue_vue_type_template_id_dafaf10a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TagInput.vue?vue&type=template&id=dafaf10a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/inputs/TagInput.vue?vue&type=template&id=dafaf10a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagInput_vue_vue_type_template_id_dafaf10a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagInput_vue_vue_type_template_id_dafaf10a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);