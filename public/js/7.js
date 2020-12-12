(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ResharedPost.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/PostCard/ResharedPost.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var javascript_time_ago__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! javascript-time-ago */ "./node_modules/javascript-time-ago/index.js");
/* harmony import */ var _Comments_CommetsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Comments/CommetsList */ "./resources/js/Components/Comments/CommetsList.vue");
/* harmony import */ var _Modals_EmbedCodeModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modals/EmbedCodeModal */ "./resources/js/Components/Modals/EmbedCodeModal.vue");
/* harmony import */ var javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! javascript-time-ago/locale/fa */ "./node_modules/javascript-time-ago/locale/fa.json");
var javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! javascript-time-ago/locale/fa */ "./node_modules/javascript-time-ago/locale/fa.json", 1);
/* harmony import */ var _Modals_ReshareModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Modals/ReshareModal */ "./resources/js/Components/Modals/ReshareModal.vue");
/* harmony import */ var _Menues_PostMenu_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Menues/PostMenu.vue */ "./resources/js/Components/Menues/PostMenu.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // Load locale-specific relative date/time formatting rules.




javascript_time_ago__WEBPACK_IMPORTED_MODULE_0__["default"].addLocale(javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      liked: false,
      bookmarked: false,
      openComment: false,
      showEmbed: false,
      showReshare: false,
      showLikes: false,
      componentType: __webpack_require__(/*! ../PostCard/SimplePost */ "./resources/js/Components/PostCard/SimplePost.vue")["default"],
      showMore: false
    };
  },
  created: function created() {
    if (this.post.share) {
      if (this.post.share.type === "article") {
        this.componentType = __webpack_require__(/*! ../PostCard/ArticleCard */ "./resources/js/Components/PostCard/ArticleCard.vue")["default"];
      }

      this.liked = this.post.is_liked;
      this.bookmarked = this.post.is_bookmarked;
      this.showMore = this.post.text != null && this.post.text.length < 283;
    }
  },
  mounted: function mounted() {
    if (this.$refs.textelem) {
      this.$refs.textelem.oncopy = function (event) {
        event.preventDefault();
      };
    }

    var options = {
      root: null,
      threshold: 1.0
    };
    var $this = this;
    var observer = new IntersectionObserver(function () {
      if (!$this.seen_content.includes($this.post.id)) {
        $this.seen_content.push($this.post.id);
        $this.seen_request.push($this.post.id);
      }
    }, options);
    observer.observe(this.$el);
  },
  methods: {
    like: function like() {
      if (this.liked) {
        this.liked = false;
      } else {
        this.liked = true;
      }

      var $this = this;
      this.$axios({
        method: "post",
        url: this.$APP_URL + "/like/" + this.post.id
      })["catch"](function (error) {});
    },
    bookmark: function bookmark() {
      if (this.bookmarked) {
        this.bookmarked = false;
      } else {
        this.bookmarked = true;
      }

      var $this = this;
      this.$axios({
        method: "post",
        url: this.$APP_URL + "/bookmark/" + this.post.id
      })["catch"](function (error) {});
    }
  },
  name: "ResharedPost",
  components: {
    CommentsList: _Comments_CommetsList__WEBPACK_IMPORTED_MODULE_1__["default"],
    EmbedCodeModal: _Modals_EmbedCodeModal__WEBPACK_IMPORTED_MODULE_2__["default"],
    ReshareModal: _Modals_ReshareModal__WEBPACK_IMPORTED_MODULE_4__["default"],
    PostMenu: _Menues_PostMenu_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  props: {
    hasComment: {
      type: Boolean,
      "default": true,
      required: false
    },
    showMenu: {
      type: Boolean,
      "default": true,
      required: false
    },
    post: {
      type: Object,
      "default": undefined,
      required: true
    }
  },
  computed: {
    isImage: function isImage() {
      if (this.post.media_type.startsWith("video")) {
        return false;
      }

      return true;
    },
    post_time: function post_time() {
      var timeAgo = new javascript_time_ago__WEBPACK_IMPORTED_MODULE_0__["default"]("fa-FA");
      return timeAgo.format(Date.parse(this.post.created_at), "fa_FA");
    },
    updated_at: function updated_at() {
      if (this.post.updated_at !== null) {
        var timeAgo = new javascript_time_ago__WEBPACK_IMPORTED_MODULE_0__["default"]("fa-FA");
        return timeAgo.format(Date.parse(this.post.updated_at), "fa_FA");
      }

      return "";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ResharedPost.vue?vue&type=template&id=7cd4f85c&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/PostCard/ResharedPost.vue?vue&type=template&id=7cd4f85c& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _vm.post !== undefined &&
    _vm.post != null &&
    _vm.post.share != null &&
    _vm.post.share != undefined
    ? _c(
        "div",
        { staticClass: "post-box" },
        [
          _c("ReshareModal", {
            attrs: { post: _vm.post.share, show: _vm.showReshare },
            on: {
              "update:show": function($event) {
                _vm.showReshare = $event
              }
            }
          }),
          _vm._v(" "),
          _c("EmbedCodeModal", {
            attrs: { post: _vm.post, show: _vm.showEmbed },
            on: {
              "update:show": function($event) {
                _vm.showEmbed = $event
              }
            }
          }),
          _vm._v(" "),
          _c("likes-modal", {
            attrs: { item: _vm.post.id, show: _vm.showLikes },
            on: {
              "update:show": function($event) {
                _vm.showLikes = $event
              }
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "post-header pt-0" },
            [
              _c(
                "inertia-link",
                {
                  staticClass: "publisher",
                  attrs: { href: "/" + _vm.post.page.slug }
                },
                [
                  _c("lazy-image", {
                    staticClass: "profile-sm mb-0",
                    attrs: {
                      "img-class": "profile-sm",
                      src: _vm.post.page.profile
                    }
                  }),
                  _vm._v(" "),
                  _c("div", [
                    _c("strong", [
                      _vm._v(" " + _vm._s(_vm.post.page.name) + " "),
                      _vm.post.page.is_verified === 1
                        ? _c("i", { staticClass: "verificationcheck" }, [
                            _vm._v("check_circle")
                          ])
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-muted font-12" }, [
                      _vm._v(
                        "\n\t\t\t\t\t" +
                          _vm._s(_vm.post.page.short_bio) +
                          "\n\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _vm.showMenu
                      ? _c(
                          "div",
                          {
                            staticClass: "post-time",
                            class: {
                              "pt-0":
                                _vm.post.text != null &&
                                _vm.post.text.length > 0
                            }
                          },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t" +
                                _vm._s(_vm.post_time) +
                                "\n\t\t\t\t\t"
                            ),
                            _c("span", { staticClass: "mx-1 font-10" }, [
                              _vm._v("●")
                            ]),
                            _vm._v(" "),
                            _vm.post.updated_at !== _vm.post.created_at
                              ? _c("span", [_vm._v("بروز شده")])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.post.updated_at !== _vm.post.created_at
                              ? _c("span", { staticClass: "mx-1 font-10" }, [
                                  _vm._v("●")
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "i",
                              {
                                staticClass:
                                  "material-icons-outlined text-light verical-middle"
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t" +
                                    _vm._s(
                                      _vm.post.show === "public"
                                        ? "public"
                                        : "group"
                                    ) +
                                    "\n\t\t\t\t\t"
                                )
                              ]
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm.showMenu
                ? _c("div", { staticClass: "actions position-relative" }, [
                    _c(
                      "i",
                      {
                        staticClass:
                          "material-icons bookmark-icon clickable text-muted hover-dark",
                        on: { click: _vm.bookmark }
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.bookmarked ? "bookmark" : "bookmark_border"
                          )
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      [
                        _c("post-menu", {
                          attrs: { post: _vm.post },
                          on: {
                            embed: function($event) {
                              _vm.showEmbed = true
                            }
                          }
                        })
                      ],
                      1
                    )
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.post.text != null && _vm.post.text.length > 0
            ? _c("div", { staticClass: "post-body" }, [
                _c("pre", {
                  ref: "textelem",
                  staticClass: "text",
                  class: { open: _vm.showMore },
                  domProps: { innerHTML: _vm._s(_vm.post.text) }
                }),
                _vm._v(" "),
                _vm.post.text != null && _vm.post.text.length > 283
                  ? _c(
                      "span",
                      {
                        staticClass: "text-action clickable",
                        on: {
                          click: function($event) {
                            _vm.showMore = !_vm.showMore
                          }
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm.showMore ? "نمایش کمتر" : "نمایش بیشتر")
                        )
                      ]
                    )
                  : _vm._e()
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "inertia-link",
            {
              staticClass: "border clickable my-2 mx-3",
              attrs: { as: "div", href: "/posts/" + _vm.post.share.id }
            },
            [
              _c(_vm.componentType, {
                tag: "component",
                staticClass: "shadow-0",
                staticStyle: { "margin-bottom": "0 !important" },
                attrs: { post: _vm.post.share, "show-menu": false }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "post-footer" }, [
            ((_vm.post.tags != null && _vm.post.tags.length > 0) ||
              _vm.post.category !== null) &&
            _vm.showMenu
              ? _c("div", { staticClass: "tagandcate" }, [
                  _vm.post.tags.length > 0
                    ? _c(
                        "div",
                        { staticClass: "tags" },
                        _vm._l(_vm.post.tags, function(tag) {
                          return _c(
                            "a",
                            {
                              key: tag,
                              staticClass: "tag-item",
                              attrs: { href: "/tags/" + tag }
                            },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" + _vm._s(tag) + "\n\t\t\t\t"
                              )
                            ]
                          )
                        }),
                        0
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.post.category !== null
                    ? _c(
                        "a",
                        {
                          staticClass: "category",
                          attrs: {
                            href:
                              "/" +
                              _vm.post.page.slug +
                              "/categories/" +
                              _vm.post.category.id
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons text-grey" }, [
                            _vm._v("layers")
                          ]),
                          _c("span", { staticClass: "text-grey" }, [
                            _vm._v(" " + _vm._s(_vm.post.category.name))
                          ])
                        ]
                      )
                    : _vm._e()
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.post.medias !== null &&
            _vm.post.medias !== undefined &&
            _vm.post.medias.length > 0
              ? _c(
                  "div",
                  { staticClass: "images" },
                  [
                    _vm.isImage
                      ? _c("lazy-image", {
                          staticClass: "m-0",
                          attrs: { alt: "", src: _vm.post.medias }
                        })
                      : _c("video", {
                          staticStyle: { "max-width": "100%" },
                          attrs: {
                            src: _vm.post.medias,
                            autoplay: "",
                            controls: "",
                            controlslist: "nodownload"
                          }
                        })
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.showMenu && _vm.$page.props.user
              ? _c("div", { staticClass: "actions" }, [
                  _c("div", [
                    _vm.post.mutual_likes != null &&
                    _vm.post.mutual_likes.length > 0
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "d-flex post-likes-text text-muted clickable",
                            on: {
                              click: function($event) {
                                _vm.showLikes = true
                              }
                            }
                          },
                          [
                            _c("span", { staticClass: "ml-1" }, [
                              _vm._v("پسندیده شده توسط")
                            ]),
                            _vm._v(" "),
                            _vm.post.mutual_likes[0]
                              ? _c(
                                  "inertia-link",
                                  {
                                    staticClass: "text-dark",
                                    attrs: {
                                      href:
                                        "/" + _vm.post.mutual_likes[0].page.slug
                                    }
                                  },
                                  [
                                    _c(
                                      "strong",
                                      { staticClass: "text-light" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.post.mutual_likes[0].page.name
                                          )
                                        )
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.post.mutual_likes.length > 1
                              ? _c(
                                  "div",
                                  [
                                    _c("span", { staticClass: "mr-1" }, [
                                      _vm._v("و")
                                    ]),
                                    _vm._v(" "),
                                    _vm.post.mutual_likes[1]
                                      ? _c(
                                          "inertia-link",
                                          {
                                            staticClass: "text-dark",
                                            attrs: {
                                              href:
                                                "/" +
                                                _vm.post.mutual_likes[0].page
                                                  .slug
                                            }
                                          },
                                          [
                                            _c(
                                              "strong",
                                              { staticClass: "text-light" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.post.mutual_likes[1]
                                                      .page.name
                                                  )
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.post.mutual_likes.length > 2
                              ? _c("span", { staticClass: "mx-1" }, [
                                  _vm._v(" و ... ")
                                ])
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "buttons" }, [
                    _c(
                      "i",
                      {
                        staticClass: "material-icons-outlined",
                        on: {
                          click: function($event) {
                            _vm.showReshare = true
                          }
                        }
                      },
                      [_vm._v("sync")]
                    ),
                    _vm._v(" "),
                    _vm.hasComment
                      ? _c(
                          "i",
                          {
                            class: {
                              "material-icons-outlined": !_vm.openComment,
                              "material-icons": _vm.openComment
                            },
                            on: {
                              click: function($event) {
                                _vm.openComment = !_vm.openComment
                              }
                            }
                          },
                          [_vm._v("comment")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    !_vm.checkUser(_vm.post.page.user_id)
                      ? _c(
                          "i",
                          {
                            staticClass: "material-icons like",
                            class: { "text-danger": _vm.liked },
                            on: { click: _vm.like }
                          },
                          [
                            _vm._v(
                              _vm._s(_vm.liked ? "favorite" : "favorite_border")
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("transition", { attrs: { name: "slide" } }, [
            _vm.openComment && _vm.hasComment
              ? _c(
                  "div",
                  [_c("CommentsList", { attrs: { post: _vm.post.id } })],
                  1
                )
              : _vm._e()
          ])
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/PostCard/ResharedPost.vue":
/*!***********************************************************!*\
  !*** ./resources/js/Components/PostCard/ResharedPost.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResharedPost_vue_vue_type_template_id_7cd4f85c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResharedPost.vue?vue&type=template&id=7cd4f85c& */ "./resources/js/Components/PostCard/ResharedPost.vue?vue&type=template&id=7cd4f85c&");
/* harmony import */ var _ResharedPost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResharedPost.vue?vue&type=script&lang=js& */ "./resources/js/Components/PostCard/ResharedPost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ResharedPost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResharedPost_vue_vue_type_template_id_7cd4f85c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ResharedPost_vue_vue_type_template_id_7cd4f85c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/PostCard/ResharedPost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/PostCard/ResharedPost.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/Components/PostCard/ResharedPost.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResharedPost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResharedPost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ResharedPost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResharedPost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/PostCard/ResharedPost.vue?vue&type=template&id=7cd4f85c&":
/*!******************************************************************************************!*\
  !*** ./resources/js/Components/PostCard/ResharedPost.vue?vue&type=template&id=7cd4f85c& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResharedPost_vue_vue_type_template_id_7cd4f85c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResharedPost.vue?vue&type=template&id=7cd4f85c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/PostCard/ResharedPost.vue?vue&type=template&id=7cd4f85c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResharedPost_vue_vue_type_template_id_7cd4f85c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResharedPost_vue_vue_type_template_id_7cd4f85c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);