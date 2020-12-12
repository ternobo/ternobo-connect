(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Feedback/Index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layouts_AppLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Layouts/AppLayout */ "./resources/js/Layouts/AppLayout.vue");
/* harmony import */ var _Components_Feedback_FeedbackCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Feedback/FeedbackCard */ "./resources/js/Components/Feedback/FeedbackCard.vue");
/* harmony import */ var _Components_NoContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/NoContent */ "./resources/js/Components/NoContent.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  watch: {
    filter: function filter(newValue) {
      var _this = this;

      if (this.status == "my-ideas") {
        this.loadMyIdeas();
      } else {
        var parms = {
          status: this.status
        };

        if (newValue == "fav") {
          parms.fav = true;
        }

        this.ideasArray = [];
        this.loadingPage = true;
        var options = {
          method: "GET",
          headers: {
            "X-Inertia": "true"
          },
          url: "/ideas",
          params: parms
        };
        axios(options).then(function (response) {
          var data = response.data.props.ideas;

          if (data) {
            _this.ideasArray = data.data;
            _this.page = data.current_page;
            _this.next_page_url = data.next_page_url;
          }
        })["catch"](function (error) {
          console.log(error);
          self.$nextTick(function () {
            //with this we skip the first change
            self.status = oldValue;
          });
          _this.ideasArray = _this.ideas.data;
        }).then(function () {
          _this.loadingPage = false;
        });
      }
    },
    status: function status(newValue, oldValue) {
      var parms = {
        status: newValue
      };

      if (this.filter == "fav") {
        parms.fav = true;
      }

      if (newValue == "my-ideas") {
        this.loadMyIdeas();
      } else {
        var $this = this;
        this.ideasArray = [];
        this.loadingPage = true;
        var options = {
          method: "GET",
          headers: {
            "X-Inertia": "true"
          },
          url: "/ideas",
          params: parms
        };
        axios(options).then(function (response) {
          var data = response.data.props.ideas;

          if (data) {
            $this.ideasArray = data.data;
            $this.page = data.current_page;
            $this.next_page_url = data.next_page_url;
          }
        })["catch"](function (error) {
          console.log(error);
          self.$nextTick(function () {
            //with this we skip the first change
            self.status = oldValue;
          });
          $this.ideasArray = $this.ideas.data;
        }).then(function () {
          $this.loadingPage = false;
        });
      }
    }
  },
  created: function created() {
    this.ideasArray = this.ideas.data;
    this.page = this.ideas.current_page;
    this.next_page_url = this.ideas.next_page_url;
  },
  methods: {
    loadMyIdeas: function loadMyIdeas() {
      var parms = {
        onlyMy: true
      };

      if (this.filter == "fav") {
        parms.fav = true;
      }

      var $this = this;
      this.ideasArray = [];
      this.loadingPage = true;
      var options = {
        method: "GET",
        headers: {
          "X-Inertia": "true"
        },
        url: "/ideas",
        params: parms
      };
      axios(options).then(function (response) {
        var data = response.data.props.ideas;

        if (data) {
          $this.ideasArray = data.data;
          $this.page = data.current_page;
          $this.next_page_url = data.next_page_url;
        }
      })["catch"](function (error) {
        console.log(error);
        self.$nextTick(function () {
          //with this we skip the first change
          self.status = oldValue;
        });
        $this.ideasArray = $this.ideas.data;
      }).then(function () {
        $this.loadingPage = false;
      });
    },
    loadMore: function loadMore() {
      var _this2 = this;

      if (!this.loadingPage && this.next_page_url !== null) {
        var $this = this;
        var options = {
          method: "GET",
          headers: {
            "X-Inertia": "true"
          },
          url: this.next_page_url
        };
        this.loadingPage = true;
        axios(options).then(function (response) {
          var data = response.data.props.ideas;

          if (data) {
            $this.ideasArray = $this.ideasArray.concat(data.data);
            $this.page = data.current_page;
            $this.next_page_url = data.next_page_url;
          }
        })["catch"](function (error) {
          _this2.next_page_url = options.url;
        }).then(function () {
          $this.loadingPage = false;
        });
      }
    },
    saveIdea: function saveIdea() {
      var $this = this;
      this.loading = true;
      axios.post("/ideas", {
        title: this.ideaTitle,
        description: this.ideaDescription
      }).then(function (response) {
        if (response.data.result) {
          $this.ideaDescription = null;
          $this.ideaTitle = "";
          $this.ideasArray.unshift(response.data.idea);
        } else {
          var errors = response.data.errors;
          Object.keys(errors).forEach(function (item, index) {
            $this.toast(errors[item][0]);
          });
        }

        $this.loading = false;
      })["catch"](function (error) {
        console.log(error);
        $this.toast("خطا در برقراری ارتباط");
        $this.loading = false;
      });
    }
  },
  data: function data() {
    return {
      showNewIdea: undefined,
      ideaTitle: "",
      ideaDescription: "",
      loading: false,
      ideasArray: [],
      page: 1,
      next_page_url: undefined,
      loadingPage: false,
      status: "voting",
      filter: "mostnew"
    };
  },
  props: {
    ideas: {
      type: Object,
      "default": undefined
    },
    pages: {
      type: Array,
      "default": undefined
    }
  },
  layout: _Layouts_AppLayout__WEBPACK_IMPORTED_MODULE_0__["default"],
  components: {
    FeedbackCard: _Components_Feedback_FeedbackCard__WEBPACK_IMPORTED_MODULE_1__["default"],
    NoContent: _Components_NoContent__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/Index.vue?vue&type=template&id=210c1391&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Feedback/Index.vue?vue&type=template&id=210c1391& ***!
  \************************************************************************************************************************************************************************************************************/
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
    "base-layout",
    [
      _c("div", { staticClass: "content-container-right" }, [
        _c("div", { staticClass: "card mb-3 w-100" }, [
          _c(
            "div",
            { staticClass: "card-body" },
            [
              _c(
                "div",
                {
                  staticClass:
                    "d-flex align-items-center justify-content-between",
                  staticStyle: { "min-height": "39px" }
                },
                [
                  _c("h2", { staticClass: "font-16 bold m-0" }, [
                    _vm._v(
                      "ما چطور می‌توانیم کیفیت خدماتمان را در ترنوبو بهبود ببخشیم؟"
                    )
                  ]),
                  _vm._v(" "),
                  _c("transition", { attrs: { name: "fade" } }, [
                    !_vm.showNewIdea
                      ? _c(
                          "button",
                          {
                            staticClass: "btn bold btn-action rounded-pill",
                            on: {
                              click: function($event) {
                                _vm.showNewIdea = true
                              }
                            }
                          },
                          [
                            _c(
                              "i",
                              { staticClass: "material-icons-outlined" },
                              [_vm._v("emoji_objects")]
                            ),
                            _vm._v(
                              "\n              ثبت ایده جدید\n            "
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("transition", { attrs: { name: "slide" } }, [
                _vm.showNewIdea
                  ? _c("div", [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.ideaTitle,
                              expression: "ideaTitle"
                            }
                          ],
                          staticClass: "form-control bg-body border-0",
                          attrs: {
                            type: "text",
                            placeholder:
                              "ایده‌ی خودتان را با ما به اشتراک بگذارید",
                            max: "150",
                            maxlength: "150"
                          },
                          domProps: { value: _vm.ideaTitle },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.ideaTitle = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "d-flex w-25 align-items-center" },
                          [
                            _c("span", { staticClass: "mx-2" }, [
                              _vm._v(
                                " " + _vm._s(150 - _vm.ideaTitle.length) + " "
                              )
                            ]),
                            _vm._v(" "),
                            _c("b-progress", {
                              staticClass: "w-100",
                              attrs: {
                                value: (_vm.ideaTitle.length / 150) * 100,
                                max: 100
                              }
                            })
                          ],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "py-2" },
                        [
                          _c("textarea-autosize", {
                            staticClass: "form-control",
                            attrs: {
                              maxlength: "2500",
                              "min-height": 230,
                              placeholder:
                                "کمی بیشتری در رابطه با ایده خودتان توضیح دهید...(اختیاری)"
                            },
                            model: {
                              value: _vm.ideaDescription,
                              callback: function($$v) {
                                _vm.ideaDescription = $$v
                              },
                              expression: "ideaDescription"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "d-flex align-items-center flex-row-reverse pt-3"
                        },
                        [
                          _c(
                            "loading-button",
                            {
                              staticClass: "btn btn-primary",
                              attrs: { loading: _vm.loading },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.saveIdea($event)
                                }
                              }
                            },
                            [_vm._v("ارسال")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-transparent text-light",
                              attrs: { disabled: _vm.loading },
                              on: {
                                click: function($event) {
                                  _vm.showNewIdea = false
                                }
                              }
                            },
                            [_vm._v("لغو")]
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
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "tabs" }, [
          _c("ul", { staticClass: "default position-relative" }, [
            _c(
              "li",
              {
                class: { "is-active": _vm.status === "voting" },
                on: {
                  click: function($event) {
                    _vm.status = "voting"
                  }
                }
              },
              [_c("a", [_vm._v("درحال رای‌گیری")])]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                class: { "is-active": _vm.status === "scheduled" },
                on: {
                  click: function($event) {
                    _vm.status = "scheduled"
                  }
                }
              },
              [_c("a", [_vm._v("برنامه ریزی شده")])]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                class: { "is-active": _vm.status === "done" },
                on: {
                  click: function($event) {
                    _vm.status = "done"
                  }
                }
              },
              [_c("a", [_vm._v("انجام شده")])]
            ),
            _vm._v(" "),
            _c(
              "li",
              {
                staticClass: "position-absolute",
                class: { "is-active": _vm.status === "my-ideas" },
                staticStyle: { left: "0" },
                on: {
                  click: function($event) {
                    _vm.status = "my-ideas"
                  }
                }
              },
              [
                _c("a", { staticClass: "active" }, [
                  _c("i", { staticClass: "material-icons" }, [
                    _vm._v("outlined_flag")
                  ]),
                  _vm._v(" پیشنهادات من")
                ])
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "infinite-scroll",
                rawName: "v-infinite-scroll",
                value: _vm.loadMore,
                expression: "loadMore"
              }
            ],
            staticClass: "ideas",
            attrs: {
              "infinite-scroll-disabled": _vm.loadingPage,
              "infinite-scroll-distance": "12"
            }
          },
          [
            _c("div", { staticClass: "item-filters mb-3 mt-2" }, [
              _c(
                "div",
                {
                  staticClass: "filter-item",
                  class: { active: _vm.filter == "mostnew" },
                  on: {
                    click: function($event) {
                      _vm.filter = "mostnew"
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons-outlined" }, [
                    _vm._v("new_releases")
                  ]),
                  _vm._v(" جدید‌ترین‌ها")
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "filter-item",
                  class: { active: _vm.filter == "fav" },
                  on: {
                    click: function($event) {
                      _vm.filter = "fav"
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons-outlined" }, [
                    _vm._v("favorite_border")
                  ]),
                  _vm._v(" محبوب‌ترین‌ها")
                ]
              )
            ]),
            _vm._v(" "),
            _vm._l(_vm.ideasArray, function(idea) {
              return _c("FeedbackCard", { key: idea.id, attrs: { idea: idea } })
            }),
            _vm._v(" "),
            _vm.loadingPage
              ? _c(
                  "div",
                  { staticClass: "w-100 d-flex justify-content-center py-3" },
                  [_c("loading-spinner", { staticClass: "image__spinner" })],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.next_page_url === null && !_vm.loadingPage
              ? _c(
                  "div",
                  [_c("no-content", [_vm._v(" هیچ ایده‌ای وجود ندارد ")])],
                  1
                )
              : _vm._e()
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("sidebar-left", [
        _c("div", { staticClass: "card" }, [
          _c(
            "div",
            { staticClass: "card-body px-2 py-1" },
            _vm._l(_vm.pages, function(page) {
              return _c("people-suggestion", {
                key: page.id,
                attrs: { page: page }
              })
            }),
            1
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Pages/Feedback/Index.vue":
/*!***********************************************!*\
  !*** ./resources/js/Pages/Feedback/Index.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_210c1391___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=210c1391& */ "./resources/js/Pages/Feedback/Index.vue?vue&type=template&id=210c1391&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Feedback/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_210c1391___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_210c1391___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Feedback/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Feedback/Index.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/Pages/Feedback/Index.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Feedback/Index.vue?vue&type=template&id=210c1391&":
/*!******************************************************************************!*\
  !*** ./resources/js/Pages/Feedback/Index.vue?vue&type=template&id=210c1391& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_210c1391___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=210c1391& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/Index.vue?vue&type=template&id=210c1391&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_210c1391___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_210c1391___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);