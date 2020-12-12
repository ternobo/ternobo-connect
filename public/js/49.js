(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Profile/Categories.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Profile/Categories.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryItem */ "./resources/js/Components/Profile/CategoryItem.vue");
/* harmony import */ var _Modals_CategoryModal_CategoriesModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Modals/CategoryModal/CategoriesModal */ "./resources/js/Components/Modals/CategoryModal/CategoriesModal.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  computed: {
    tagsToShow: function tagsToShow() {
      var _this = this;

      return this.searchTag.length > 0 ? this.tags.filter(function (tag) {
        return tag.startsWith(_this.searchTag);
      }) : this.tags.slice(0, 5 * this.tagPage);
    }
  },
  watch: {
    action: function action(newVal) {
      var _this2 = this;

      if (newVal != null) {
        this.activeCategory = null;
        this.activeTag = null;
        this.$emit("input", {
          action: newVal
        });
        var data = {};
        axios.post("/" + this.slug + "/tags", data).then(function (response) {
          _this2.tags = response.data.tags;
        });
      }
    },
    activeCategory: function activeCategory(newVal, oldValue) {
      var _this3 = this;

      if (newVal != null) {
        this.action = null;
        this.$emit("input", {
          category: newVal,
          tag: this.activeTag
        });
        var data = {
          category: newVal
        };
        axios.post("/" + this.slug + "/tags", data).then(function (response) {
          _this3.tags = response.data.tags;
        });
      }
    }
  },
  methods: {
    addCategory: function addCategory(category) {
      this.list.push(category);
    },
    removeTag: function removeTag(tag) {
      this.removedTags.push(tag);
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    categorySelect: function categorySelect(category) {
      if (category == this.activeCategory) {
        this.activeCategory = null;
        this.action = "all";
      }

      this.activeCategory = category;
    },
    saveTagRemove: function saveTagRemove() {
      var _this4 = this;

      axios.post("/tags/delete", {
        tags: this.removedTags
      })["catch"](function (err) {
        _this4.toast("خطا در حذف اطلاعات");

        var data = {};

        if (_this4.activeCategory != null) {
          data.category = _this4.activeCategory;
        }

        axios.post("/" + _this4.slug + "/tags", data).then(function (response) {
          _this4.tags = response.data.tags;
        });
      }).then(function () {
        _this4.removedTags = [];
        _this4.tagsEdit = false;
        _this4.action = "all";
        _this4.activeCategory = null;
        _this4.activeTag = null;
      });
    },
    cancelRemove: function cancelRemove() {
      var _this5 = this;

      this.tagsEdit = false;
      this.removedTags = [];
      var data = {};

      if (this.activeCategory != null) {
        data.category = this.activeCategory;
      }

      axios.post("/" + this.slug + "/tags", data).then(function (response) {
        _this5.tags = response.data.tags;
      });
    },
    tagAction: function tagAction(tag) {
      if (this.tagsEdit) {
        return this.removeTag(tag);
      }

      if (tag == this.activeTag) {
        this.activeTag = null;
        var filter = {};

        if (this.activeCategory != null) {
          filter.category = this.activeCategory;
        } else if (this.action != null) {
          filter.action = this.action;
        } else {
          filter.action = "all";
          this.action = "all";
        }

        this.$emit("input", filter);
        return;
      }

      this.action = null;
      this.activeTag = tag;

      if (this.activeCategory != null) {
        this.$emit("input", {
          category: this.activeCategory,
          tag: this.activeTag
        });
      } else {
        this.$emit("input", {
          tag: this.activeTag
        });
      }
    }
  },
  created: function created() {
    this.list = this.categories;
  },
  data: function data() {
    return {
      edit: false,
      tagsEdit: false,
      list: [],
      activeTag: null,
      action: "all",
      activeCategory: null,
      tags: [],
      removedTags: [],
      searchTag: "",
      tagPage: 1
    };
  },
  mounted: function mounted() {
    var _this6 = this;

    var data = {};

    if (this.activeCategory != null) {
      data.category = this.activeCategory;
    }

    axios.post("/" + this.slug + "/tags", data).then(function (response) {
      _this6.tags = response.data.tags;
    });
  },
  components: {
    CategoryItem: _CategoryItem__WEBPACK_IMPORTED_MODULE_0__["default"],
    CategoriesModal: _Modals_CategoryModal_CategoriesModal__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    pageId: {
      "default": 0,
      required: true
    },
    slug: {
      type: String,
      "default": null,
      required: true
    },
    categories: {
      type: Array,
      "default": [],
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Profile/Categories.vue?vue&type=template&id=79574226&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Profile/Categories.vue?vue&type=template&id=79574226& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "sticky-aside" },
    [
      _c("CategoriesModal", {
        attrs: { show: _vm.edit, categories: _vm.list },
        on: {
          categoryAdded: _vm.addCategory,
          "update:show": function($event) {
            _vm.edit = $event
          },
          "update:categories": function($event) {
            _vm.list = $event
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "card mb-3" }, [
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "actions-list" }, [
            _c(
              "button",
              {
                staticClass: "action-item",
                class: { active: _vm.action == "all" },
                on: {
                  click: function($event) {
                    _vm.action = "all"
                  }
                }
              },
              [
                _c("i", { staticClass: "material-icons" }, [
                  _vm._v("library_books")
                ]),
                _vm._v(" همه مطالب")
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "action-item",
                class: { active: _vm.action == "comments" },
                on: {
                  click: function($event) {
                    _vm.action = "comments"
                  }
                }
              },
              [
                _c("i", { staticClass: "material-icons-outlined" }, [
                  _vm._v("comment")
                ]),
                _vm._v(" نظرات")
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "action-item",
                class: { active: _vm.action == "likes" },
                on: {
                  click: function($event) {
                    _vm.action = "likes"
                  }
                }
              },
              [
                _c("i", { staticClass: "material-icons" }, [
                  _vm._v("favorite_border")
                ]),
                _vm._v(" پسند‌ها")
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "action-item",
                class: { active: _vm.action == "share" },
                on: {
                  click: function($event) {
                    _vm.action = "share"
                  }
                }
              },
              [
                _c("i", { staticClass: "material-icons-outlined" }, [
                  _vm._v("share")
                ]),
                _vm._v(" بازنشر‌ها")
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "categories" }, [
            _c("div", { staticClass: "d-flex justify-content-between" }, [
              _c("h2", { staticClass: "category--title" }, [
                _vm._v("دسته‌بندی‌ها")
              ]),
              _vm._v(" "),
              _vm.checkUser(_vm.pageId)
                ? _c(
                    "i",
                    {
                      staticClass:
                        "clickable hover-dark material-icons-outlined",
                      on: {
                        click: function($event) {
                          _vm.edit = !_vm.edit
                        }
                      }
                    },
                    [_vm._v(_vm._s(!_vm.edit ? "edit" : "save"))]
                  )
                : _vm._e()
            ]),
            _vm._v(" "),
            _c(
              "ul",
              _vm._l(_vm.list, function(category) {
                return _c("category-item", {
                  key: category.id,
                  class: { active: category.id == _vm.activeCategory },
                  attrs: { category: category },
                  nativeOn: {
                    click: function($event) {
                      return _vm.categorySelect(category.id)
                    }
                  }
                })
              }),
              1
            ),
            _vm._v(" "),
            _vm.tags.length > 0 ? _c("hr") : _vm._e(),
            _vm._v(" "),
            _vm.tags.length > 0
              ? _c("div", { staticClass: "d-flex justify-content-between" }, [
                  _c("h2", { staticClass: "category--title" }, [
                    _vm._v("برچسب‌ها")
                  ]),
                  _vm._v(" "),
                  _vm.checkUser(_vm.pageId)
                    ? _c("div", { staticClass: "d-flex align-items-center" }, [
                        !_vm.tagsEdit
                          ? _c(
                              "i",
                              {
                                staticClass:
                                  "clickable hover-dark material-icons-outlined",
                                on: {
                                  click: function($event) {
                                    _vm.tagsEdit = !_vm.tagsEdit
                                  }
                                }
                              },
                              [_vm._v("edit")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.tagsEdit
                          ? _c(
                              "i",
                              {
                                staticClass:
                                  "clickable hover-dark material-icons-outlined",
                                on: { click: _vm.cancelRemove }
                              },
                              [_vm._v("close")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.tagsEdit
                          ? _c(
                              "i",
                              {
                                staticClass:
                                  "clickable hover-dark material-icons-outlined",
                                on: { click: _vm.saveTagRemove }
                              },
                              [_vm._v("save")]
                            )
                          : _vm._e()
                      ])
                    : _vm._e()
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.searchTag,
                    expression: "searchTag"
                  }
                ],
                staticClass: "form-control my-2 rounded-pill",
                attrs: { placeholder: "جستجو" },
                domProps: { value: _vm.searchTag },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.searchTag = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "profile-tags tags",
                class: { "tag-edit": _vm.tagsEdit }
              },
              _vm._l(_vm.tagsToShow, function(tag) {
                return _c(
                  "div",
                  {
                    key: "tag_item_" + tag,
                    staticClass: "tag-item",
                    class: { active: tag == _vm.activeTag },
                    on: {
                      click: function($event) {
                        return _vm.tagAction(tag)
                      }
                    }
                  },
                  [_vm._v("\n\t\t\t\t\t\t" + _vm._s(tag) + "\n\t\t\t\t\t")]
                )
              }),
              0
            ),
            _vm._v(" "),
            _vm.tags.length > 5 && 5 * _vm.tagPage < _vm.tags.length
              ? _c(
                  "span",
                  {
                    staticClass: "text-action clickable mt-2",
                    on: {
                      click: function($event) {
                        _vm.tagPage++
                      }
                    }
                  },
                  [_vm._v("نمایش بیشتر")]
                )
              : _vm._e()
          ])
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Profile/Categories.vue":
/*!********************************************************!*\
  !*** ./resources/js/Components/Profile/Categories.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Categories_vue_vue_type_template_id_79574226___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Categories.vue?vue&type=template&id=79574226& */ "./resources/js/Components/Profile/Categories.vue?vue&type=template&id=79574226&");
/* harmony import */ var _Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Categories.vue?vue&type=script&lang=js& */ "./resources/js/Components/Profile/Categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Categories_vue_vue_type_template_id_79574226___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Categories_vue_vue_type_template_id_79574226___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Profile/Categories.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Profile/Categories.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/Profile/Categories.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categories.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Profile/Categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Profile/Categories.vue?vue&type=template&id=79574226&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Components/Profile/Categories.vue?vue&type=template&id=79574226& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_79574226___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categories.vue?vue&type=template&id=79574226& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Profile/Categories.vue?vue&type=template&id=79574226&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_79574226___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_79574226___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);