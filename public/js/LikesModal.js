(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LikesModal"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/LikesModal.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/LikesModal.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Mixins/Modal */ "./resources/js/Mixins/Modal.js");
/* harmony import */ var _buttons_FollowButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/FollowButton.vue */ "./resources/js/Components/buttons/FollowButton.vue");
/* harmony import */ var _LazyImage_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LazyImage.vue */ "./resources/js/Components/LazyImage.vue");
/* harmony import */ var _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LoadingSpinner.vue */ "./resources/js/Components/LoadingSpinner.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    likesPaginate: function likesPaginate(newValue) {
      this.likes = newValue.data;
      this.next_page_url = newValue.next_page_url;
    }
  },
  props: {
    item: {
      "default": 0,
      required: true
    },
    type: {
      "default": "post",
      required: false
    }
  },
  data: function data() {
    return {
      error: false,
      loading: true,
      likesPaginate: null,
      likes: [],
      next_page_url: null,
      loadingMore: false,
      typeBasedData: {}
    };
  },
  methods: {
    loadMore: function loadMore() {
      var _this = this;

      if (!this.loadingMore && this.next_page_url !== null) {
        var options = {
          method: "POST",
          url: this.next_page_url,
          data: this.typeBasedData
        };
        this.loadingMore = true;
        axios(options).then(function (response) {
          var data = response.data.likes;

          if (data) {
            _this.likes = _this.likes.concat(data.data);
            _this.next_page_url = data.next_page_url;
          }
        })["catch"](function (error) {
          _this.next_page_url = options.url;
        }).then(function () {
          _this.loadingMore = false;
        });
      }
    },
    onShown: function onShown() {
      var _this2 = this;

      this.likes = true;
      this.loading = true;
      this.error = false;

      if (this.type == "comment") {
        this.typeBasedData = {
          comment_id: this.item
        };
      } else {
        this.typeBasedData = {
          post_id: this.item
        };
      }

      axios.post("/likes/get", this.typeBasedData).then(function (response) {
        _this2.likesPaginate = response.data.likes;
      })["catch"](function (error) {
        _this2.error = true;
      }).then(function () {
        return _this2.loading = false;
      });
    }
  },
  components: {
    LazyImage: _LazyImage_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    FollowButton: _buttons_FollowButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    LoadingSpinner: _LoadingSpinner_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  name: "LikesModal"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/FollowButton.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/buttons/FollowButton.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoadingButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoadingButton */ "./resources/js/Components/buttons/LoadingButton.vue");
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    if (this.$page.props.user !== null) {
      var page = this.page;

      if (typeof page != "number") {
        page = parseInt(page);
      }

      if (this.$page.props.followings.includes(page)) {
        this.followed = true;
        this.text = "دنبال شده";
        this.$emit("followed");
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      followed: false,
      text: "دنبال کردن"
    };
  },
  props: {
    page: {
      type: Number,
      "default": undefined,
      required: true
    }
  },
  methods: {
    follow: function follow() {
      var $this = this;
      this.loading = true;

      if (!this.followed) {
        var config = {
          method: "post",
          url: this.$APP_URL + "/follow/" + this.page
        };
        axios(config).then(function (response) {
          // console.log(response.data);
          if (response.data.result) {
            $this.loading = false;
            $this.$page.props.followings.push($this.page);
            $this.text = "دنبال شده";
            $this.followed = true;
            $this.$emit("followed");
          } else {
            var errors = response.data.errors;
            Object.keys(errors).forEach(function (item, index) {
              $this.$bvToast.toast(errors[item][0], {
                noCloseButton: true,
                toaster: "b-toaster-bottom-left",
                bodyClass: ["bg-dark", "text-right", "text-white"],
                solid: true
              });
            });
          }

          $this.loading = false;
        })["catch"](function (error) {
          $this.loading = false;
        });
      } else {
        var config = {
          method: "post",
          url: this.$APP_URL + "/unfollow/" + this.page
        };
        axios(config).then(function (response) {
          // console.log(response.data);
          if (response.data.result) {
            $this.loading = false;
            $this.text = "دنبال کردن";
            $this.followed = false;
            $this.$emit("unfollowed");
            $vm0.$page.props.followings.splice($vm0.$page.props.followings.indexOf(51), 1);
          } else {
            var errors = response.data.errors;
            Object.keys(errors).forEach(function (item, index) {
              $this.$bvToast.toast(errors[item][0], {
                noCloseButton: true,
                toaster: "b-toaster-bottom-left",
                bodyClass: ["bg-dark", "text-right", "text-white"],
                solid: true
              });
            });
          }

          $this.loading = false;
        })["catch"](function (error) {
          $this.loading = false;
        });
      }
    }
  },
  components: {
    LoadingButton: _LoadingButton__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/LikesModal.vue?vue&type=template&id=38281202&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/LikesModal.vue?vue&type=template&id=38281202& ***!
  \********************************************************************************************************************************************************************************************************************/
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
        title: "پسند‌ها",
        size: "md",
        centered: true
      },
      on: { show: _vm.onShown },
      model: {
        value: _vm.showModal,
        callback: function($$v) {
          _vm.showModal = $$v
        },
        expression: "showModal"
      }
    },
    [
      _vm.loading || _vm.error
        ? _c(
            "div",
            {
              staticClass:
                "d-flex align-items-center justify-content-center loading",
              staticStyle: { "min-height": "200px" }
            },
            [
              _vm.loading ? _c("loading-spinner") : _vm._e(),
              _vm._v(" "),
              _vm.error
                ? _c(
                    "div",
                    {
                      staticClass:
                        "d-flex flex-column justify-center align-items-center w-100 err"
                    },
                    [
                      _c(
                        "i",
                        {
                          staticClass:
                            "hover-dark text-muted material-icons-outlined",
                          on: { click: _vm.onShown }
                        },
                        [_vm._v("refresh")]
                      ),
                      _vm._v(" "),
                      _c("br"),
                      _vm._v(" "),
                      _c("span", { staticClass: "text-muted" }, [
                        _vm._v("خطا در برقراری ارتباط")
                      ])
                    ]
                  )
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.loading && !_vm.error
        ? _c(
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
              staticClass: "likes-list",
              attrs: { "infinite-scroll-distance": 10 }
            },
            [
              _vm._l(_vm.likes, function(like) {
                return _c(
                  "div",
                  { key: "like_" + like.id, staticClass: "like-item" },
                  [
                    _c(
                      "inertia-link",
                      {
                        staticClass: "userinfo",
                        attrs: { href: "/" + like.page.slug }
                      },
                      [
                        _c("lazy-image", {
                          staticClass: "mb-0",
                          class: {
                            "profile-sm": _vm.$root.isDesktop,
                            "profile-md": !_vm.$root.isDesktop
                          },
                          attrs: {
                            imgClass: {
                              "profile-sm": _vm.$root.isDesktop,
                              "profile-md": !_vm.$root.isDesktop
                            },
                            src: like.page.profile
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "page-name d-flex flex-column" },
                          [
                            _c("strong", [
                              _vm._v(" " + _vm._s(like.page.name) + " "),
                              like.page.is_verified === 1
                                ? _c(
                                    "i",
                                    { staticClass: "verificationcheck" },
                                    [_vm._v("check_circle")]
                                  )
                                : _vm._e()
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "shortbio" }, [
                              _vm._v(" " + _vm._s(like.page.short_bio) + " ")
                            ])
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("follow-button", { attrs: { page: like.page.id } })
                  ],
                  1
                )
              }),
              _vm._v(" "),
              this.next_page_url != null
                ? _c("infinite-loading", {
                    attrs: { spinner: "spiral" },
                    on: { infinite: _vm.loadMore }
                  })
                : _vm._e()
            ],
            2
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/FollowButton.vue?vue&type=template&id=8d22cb48&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/buttons/FollowButton.vue?vue&type=template&id=8d22cb48& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
  return _vm.$page.props.user !== null
    ? _c(
        "LoadingButton",
        {
          staticClass: "btn follow-btn",
          class: { "btn-followed-connected": _vm.followed },
          attrs: { loading: _vm.loading },
          nativeOn: {
            click: function($event) {
              return _vm.follow($event)
            }
          }
        },
        [_vm._v(_vm._s(_vm.text))]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Modals/LikesModal.vue":
/*!*******************************************************!*\
  !*** ./resources/js/Components/Modals/LikesModal.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LikesModal_vue_vue_type_template_id_38281202___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LikesModal.vue?vue&type=template&id=38281202& */ "./resources/js/Components/Modals/LikesModal.vue?vue&type=template&id=38281202&");
/* harmony import */ var _LikesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LikesModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/LikesModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LikesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LikesModal_vue_vue_type_template_id_38281202___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LikesModal_vue_vue_type_template_id_38281202___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/LikesModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/LikesModal.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/Modals/LikesModal.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LikesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./LikesModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/LikesModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LikesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/LikesModal.vue?vue&type=template&id=38281202&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Components/Modals/LikesModal.vue?vue&type=template&id=38281202& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LikesModal_vue_vue_type_template_id_38281202___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./LikesModal.vue?vue&type=template&id=38281202& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/LikesModal.vue?vue&type=template&id=38281202&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LikesModal_vue_vue_type_template_id_38281202___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LikesModal_vue_vue_type_template_id_38281202___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Components/buttons/FollowButton.vue":
/*!**********************************************************!*\
  !*** ./resources/js/Components/buttons/FollowButton.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FollowButton_vue_vue_type_template_id_8d22cb48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FollowButton.vue?vue&type=template&id=8d22cb48& */ "./resources/js/Components/buttons/FollowButton.vue?vue&type=template&id=8d22cb48&");
/* harmony import */ var _FollowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FollowButton.vue?vue&type=script&lang=js& */ "./resources/js/Components/buttons/FollowButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FollowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FollowButton_vue_vue_type_template_id_8d22cb48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FollowButton_vue_vue_type_template_id_8d22cb48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/buttons/FollowButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/buttons/FollowButton.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Components/buttons/FollowButton.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FollowButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/FollowButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/buttons/FollowButton.vue?vue&type=template&id=8d22cb48&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/buttons/FollowButton.vue?vue&type=template&id=8d22cb48& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowButton_vue_vue_type_template_id_8d22cb48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FollowButton.vue?vue&type=template&id=8d22cb48& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/FollowButton.vue?vue&type=template&id=8d22cb48&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowButton_vue_vue_type_template_id_8d22cb48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowButton_vue_vue_type_template_id_8d22cb48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Mixins/Modal.js":
/*!**************************************!*\
  !*** ./resources/js/Mixins/Modal.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ModalMixin = {
  created: function created() {
    this.showModal = this.show;
  },
  data: function data() {
    return {
      showModal: false
    };
  },
  watch: {
    show: function show(newValue) {
      this.showModal = this.show;
    },
    showModal: function showModal(newValue) {
      this.$emit("update:show", newValue);
    }
  },
  props: {
    show: {
      type: Boolean,
      "default": false,
      required: false
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ModalMixin);

/***/ })

}]);