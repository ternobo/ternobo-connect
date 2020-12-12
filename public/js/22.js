(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LoadingSpinner */ "./resources/js/Components/LoadingSpinner.vue");
/* harmony import */ var _IdeaReply_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdeaReply.vue */ "./resources/js/Components/IdeaReplies/IdeaReply.vue");
/* harmony import */ var _NewIdeaReply__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewIdeaReply */ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
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
    submit: function submit(idea) {
      this.ideaReplies.unshift(idea);
    },
    ideaReplyDelete: function ideaReplyDelete(idea) {
      var index = this.ideaReplies.indexOf(idea);

      if (index > -1) {
        this.ideaReplies.splice(index, 1);
        this.loadMore();
      }
    },
    loadMore: function loadMore() {
      var _this = this;

      if (this.next_page_url !== null && !this.ideaRepliesLoading) {
        this.ideaRepliesLoading = true;
        axios.get(this.next_page_url).then(function (response) {
          var data = response.data;

          if (data.result) {
            _this.next_page_url = data.data.next_page_url;
            _this.ideaReplies = _this.ideaReplies.concat(data.data.data);
          }

          _this.ideaRepliesLoading = false;
        })["catch"](function (error) {
          return console.log(error);
        }).then(function () {
          return _this.ideaRepliesLoading = false;
        });
      }
    }
  },
  props: {
    noScroll: {
      type: Boolean,
      "default": false,
      required: false
    },
    idea: {
      type: Number,
      "default": undefined,
      required: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    axios.get(this.$APP_URL + "/ideas/" + this.idea + "/replies").then(function (response) {
      var data = response.data;

      if (data.result) {
        _this2.next_page_url = data.data.next_page_url;
        _this2.ideaReplies = data.data.data;
      }

      _this2.ideaRepliesLoading = false;
    })["catch"](function (error) {
      return console.log(error);
    });
  },
  data: function data() {
    return {
      ideaRepliesLoading: true,
      ideaReplies: undefined,
      next_page_url: null
    };
  },
  name: "IdeaReplies",
  components: _defineProperty({
    LoadingSpinner: _LoadingSpinner__WEBPACK_IMPORTED_MODULE_0__["default"],
    IdeaReply: _IdeaReply_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    NewIdeaReply: _NewIdeaReply__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, "IdeaReply", _IdeaReply_vue__WEBPACK_IMPORTED_MODULE_1__["default"])
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewIdeaReply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewIdeaReply */ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue");
/* harmony import */ var javascript_time_ago__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! javascript-time-ago */ "./node_modules/javascript-time-ago/index.js");
/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LoadingSpinner */ "./resources/js/Components/LoadingSpinner.vue");
/* harmony import */ var javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! javascript-time-ago/locale/fa */ "./node_modules/javascript-time-ago/locale/fa.json");
var javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! javascript-time-ago/locale/fa */ "./node_modules/javascript-time-ago/locale/fa.json", 1);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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


javascript_time_ago__WEBPACK_IMPORTED_MODULE_1__["default"].addLocale(javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3__);
/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.liked = this.ideaReply.is_liked;
  },
  data: function data() {
    return {
      deleted: false,
      showReply: false,
      replies: [],
      repliesLoading: true,
      showReplies: false,
      next_page_url: null,
      loadingMore: false,
      liked: false
    };
  },
  methods: {
    commentDelete: function commentDelete() {
      var index = this.replies.indexOf(comment);

      if (index > -1) {
        this.replies.splice(index, 1);
        this.loadMore();
      }
    },
    likeComment: function likeComment() {
      if (this.liked) {
        this.liked = false;
      } else {
        this.liked = true;
      }

      axios.post(this.$APP_URL + "/idea-replies/" + this.ideaReply.id + "/like");
    },
    loadReplies: function loadReplies() {
      var _this = this;

      this.showReplies = !this.showReplies;

      if (this.showReplies) {
        this.repliesLoading = true;
        axios.post(this.$APP_URL + "/idea-replies/" + this.ideaReply.id + "/replies").then(function (response) {
          var data = response.data;

          if (data.result) {
            _this.next_page_url = data.data.next_page_url;
            _this.replies = data.data.data;
          }

          _this.repliesLoading = false;
        })["catch"](function (error) {
          return console.log(error);
        }).then(function () {
          return _this.repliesLoading = false;
        });
      }
    },
    deleteComment: function deleteComment() {
      var _this2 = this;

      this.deleted = true;
      axios["delete"]("/idea-replies/" + this.ideaReply.idea_id + "/replies/" + this.ideaReply.id).then(function (response) {
        _this2.$emit("deleted", _this2.ideaReply);
      })["catch"](function (error) {
        return console.log(error);
      });
    },
    loadMore: function loadMore() {
      var _this3 = this;

      if (this.next_page_url !== null && !this.loadingMore) {
        this.loadingMore = true;
        axios.get(this.next_page_url).then(function (response) {
          var data = response.data;

          if (data.result) {
            _this3.next_page_url = data.data.next_page_url;
            _this3.replies = _this3.replies.concat(data.data.data);
          }

          _this3.loadingMore = false;
        })["catch"](function (error) {
          return console.log(error);
        }).then(function () {
          return _this3.loadingMore = false;
        });
      }
    },
    submit: function submit(comment) {
      var _this4 = this;

      if (this.replyTo !== undefined) {
        this.$emit("replied", comment);
      } else {
        this.replies.unshift(comment);
        setTimeout(function () {
          var theComment = _this4.$el;
          _this4.$parent.$el.scrollTop += theComment.getBoundingClientRect().top;
        }, 300);
      }
    }
  },
  computed: {
    ideaReply_time: function ideaReply_time() {
      var timeAgo = new javascript_time_ago__WEBPACK_IMPORTED_MODULE_1__["default"]("fa-FA");
      return timeAgo.format(Date.parse(this.ideaReply.created_at), "twitter");
    }
  },
  components: _defineProperty({
    NewIdeaReply: _NewIdeaReply__WEBPACK_IMPORTED_MODULE_0__["default"],
    LoadingSpinner: _LoadingSpinner__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, "NewIdeaReply", _NewIdeaReply__WEBPACK_IMPORTED_MODULE_0__["default"]),
  props: {
    replyTo: {
      "default": undefined,
      required: false
    },
    ideaReply: {
      type: Object,
      "default": undefined,
      required: true
    }
  },
  name: "IdeaReply"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inputs_MaterialTextArea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../inputs/MaterialTextArea */ "./resources/js/Components/inputs/MaterialTextArea.vue");
//
//
//
//
//
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
    text: function text(newValue) {
      if (newValue.length > 0) {
        this.showSubmit = true;
      } else {
        this.showSubmit = false;
      }
    }
  },
  props: {
    idea: {
      type: Number,
      "default": undefined,
      required: true
    },
    replyTo: {
      "default": undefined,
      required: false
    }
  },
  data: function data() {
    return {
      loading: false,
      showSubmit: false,
      text: ""
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      if (this.text.length > 0) {
        this.loading = true;
        var data = {
          text: this.text
        };

        if (this.replyTo !== undefined) {
          data.reply_to = this.replyTo;
        }

        axios.post(this.$APP_URL + "/ideas/" + this.idea + "/replies", data).then(function (response) {
          if (response.data.result) {
            _this.text = "";

            _this.$emit("submit", response.data.reply);
          } else {
            _this.handleError(response.data.errors);
          }
        })["catch"](function (ex) {
          return console.log(ex);
        }).then(function () {
          return _this.loading = false;
        });
      }
    }
  },
  name: "NewIdeaReply",
  components: {
    MaterialTextArea: _inputs_MaterialTextArea__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Layouts_AppLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Layouts/AppLayout */ "./resources/js/Layouts/AppLayout.vue");
/* harmony import */ var _Components_NoContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/NoContent */ "./resources/js/Components/NoContent.vue");
/* harmony import */ var _Components_Feedback_FeedbackCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Feedback/FeedbackCard */ "./resources/js/Components/Feedback/FeedbackCard.vue");
/* harmony import */ var _Components_IdeaReplies_IdeaReplies_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Components/IdeaReplies/IdeaReplies.vue */ "./resources/js/Components/IdeaReplies/IdeaReplies.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    loadMore: function loadMore() {
      this.$refs.replies.loadMore();
    }
  },
  props: {
    pages: {
      type: Array,
      "default": undefined
    },
    idea: {
      type: Object,
      "default": undefined
    }
  },
  components: {
    NoContent: _Components_NoContent__WEBPACK_IMPORTED_MODULE_1__["default"],
    FeedbackCard: _Components_Feedback_FeedbackCard__WEBPACK_IMPORTED_MODULE_2__["default"],
    IdeaReplies: _Components_IdeaReplies_IdeaReplies_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  name: "Ideapage",
  layout: _Layouts_AppLayout__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".comment .pagedetail[data-v-2977004c] {\n  display: flex;\n  flex-direction: column;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=template&id=3b5088f8&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=template&id=3b5088f8& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "idea-replies px-2" },
    [
      _c("new-idea-reply", {
        attrs: { idea: _vm.idea },
        on: { submit: _vm.submit }
      }),
      _vm._v(" "),
      _vm._l(_vm.ideaReplies, function(reply) {
        return _c("idea-reply", {
          key: "idea_reply_" + reply.id,
          attrs: { "idea-reply": reply },
          on: { deleted: _vm.ideaReplyDelete }
        })
      }),
      _vm._v(" "),
      _vm.ideaRepliesLoading
        ? _c(
            "div",
            {
              staticClass:
                "d-flex w-100 justify-content-center align-items-center py-3"
            },
            [_c("LoadingSpinner")],
            1
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=template&id=2977004c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=template&id=2977004c&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "mb-3" },
    [
      !_vm.deleted
        ? _c("div", { staticClass: "idea-reply" }, [
            _c(
              "div",
              { staticClass: "idea-reply-header" },
              [
                _c(
                  "inertia-link",
                  {
                    staticClass: "d-flex align-items-center",
                    attrs: { href: "/" + _vm.ideaReply.user.username }
                  },
                  [
                    _c("img", {
                      staticClass: "profile-sm",
                      attrs: { src: _vm.ideaReply.user.profile }
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "pr-3 pagedetail" }, [
                      _c("span", { staticClass: "name" }, [
                        _c("strong", [
                          _vm._v(
                            "\n              " +
                              _vm._s(_vm.ideaReply.user.name) +
                              "\n            "
                          )
                        ])
                      ])
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c("span", { staticClass: "font-10 text-muted" }, [
                    _vm._v(_vm._s(_vm.ideaReply_time))
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c(
                        "b-dropdown",
                        {
                          attrs: {
                            size: "lg",
                            variant: "link",
                            "toggle-class": "text-decoration-none",
                            "no-caret": ""
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "button-content",
                                fn: function() {
                                  return [
                                    _c(
                                      "i",
                                      {
                                        staticClass:
                                          "material-icons openmenu clickale text-muted hover-dark"
                                      },
                                      [_vm._v("more_vert")]
                                    )
                                  ]
                                },
                                proxy: true
                              }
                            ],
                            null,
                            false,
                            3552891933
                          )
                        },
                        [
                          _vm._v(" "),
                          _c("b-dropdown-item", [
                            _c(
                              "div",
                              { staticClass: "d-flex align-items-center" },
                              [
                                _c(
                                  "i",
                                  {
                                    staticClass: "material-icons ml-2 text-dark"
                                  },
                                  [_vm._v("link")]
                                ),
                                _vm._v(" "),
                                _c("div", [
                                  _c("div", [
                                    _c("strong", [_vm._v(" گزارش تخلف ")])
                                  ]),
                                  _vm._v(" "),
                                  _c("small", { staticClass: "text-muted" }, [
                                    _vm._v(
                                      " این دیدگاه در تضاد با قوانین ترنوبو است "
                                    )
                                  ])
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _vm.checkUser(_vm.ideaReply.user_id)
                            ? _c(
                                "b-dropdown-item",
                                {
                                  staticClass: "hover-danger",
                                  on: { click: _vm.deleteComment }
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex hover-danger align-items-center"
                                    },
                                    [
                                      _c(
                                        "i",
                                        {
                                          staticClass:
                                            "material-icons-outlined ml-2"
                                        },
                                        [_vm._v("delete_sweep")]
                                      ),
                                      _vm._v(" "),
                                      _c("div", [
                                        _c("div", [
                                          _c("strong", [_vm._v(" حذف ")])
                                        ])
                                      ])
                                    ]
                                  )
                                ]
                              )
                            : _vm._e()
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "idea-reply-body" }, [
              _c("div", {
                staticStyle: {
                  "unicode-bidi": "plaintext",
                  width: "100% !important",
                  display: "block",
                  "text-align": "justify"
                },
                domProps: { innerHTML: _vm._s(_vm.ideaReply.text) }
              })
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "w-100 d-flex align-content-center justify-content-between pt-2"
        },
        [
          _c("span", {
            domProps: { innerHTML: _vm._s(_vm.ideaReply.liked_by) }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "actions" }, [
            _c(
              "i",
              {
                staticClass: "hover-dark clickable",
                class: {
                  "material-icons-outlined": !_vm.showReplies,
                  "material-icons": _vm.showReplies
                },
                on: { click: _vm.loadReplies }
              },
              [_vm._v(" insert_comment ")]
            ),
            _vm._v(" "),
            _c(
              "i",
              {
                staticClass: "hover-danger clickable material-icons",
                class: { "text-danger": _vm.liked },
                on: { click: _vm.likeComment }
              },
              [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.liked ? "favorite" : "favorite_border") +
                    "\n      "
                )
              ]
            )
          ])
        ]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide" } }, [
        _vm.showReplies
          ? _c(
              "div",
              { staticClass: "idea-reply-replies" },
              [
                _c("new-idea-reply", {
                  attrs: {
                    idea: _vm.ideaReply.idea_id,
                    "reply-to": _vm.ideaReply.id
                  },
                  on: { submit: _vm.submit }
                }),
                _vm._v(" "),
                _vm.replyTo === undefined
                  ? _c(
                      "div",
                      {
                        staticClass: "border-right pr-3",
                        staticStyle: { "border-color": "#212121 !important" }
                      },
                      [
                        _vm._l(_vm.replies, function(reply) {
                          return _c("idea-reply", {
                            key: reply.id,
                            attrs: {
                              "reply-to": _vm.ideaReply.id,
                              "idea-reply": reply
                            },
                            on: {
                              replied: _vm.submit,
                              deleted: _vm.ideaReplyDelete
                            }
                          })
                        }),
                        _vm._v(" "),
                        _vm.repliesLoading
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "w-100 d-flex p-2 justify-content-center align-items-center"
                              },
                              [_c("loading-spinner")],
                              1
                            )
                          : _vm._e()
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "w-100 d-flex align-items-center justify-content-center p-2"
                  },
                  [
                    _vm.next_page_url !== null
                      ? _c(
                          "loading-button",
                          {
                            staticClass: "btn btn-outline-dark",
                            attrs: { loading: _vm.loadingMore },
                            nativeOn: {
                              click: function($event) {
                                return _vm.loadMore($event)
                              }
                            }
                          },
                          [_vm._v("بارگیری بیشتر")]
                        )
                      : _vm._e()
                  ],
                  1
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=template&id=3f6fba9c&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=template&id=3f6fba9c& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _vm.$page.props.user != null
    ? _c(
        "div",
        { staticClass: "sendidea clearfix" },
        [
          _c(
            "div",
            { staticClass: "input-group-btn mb-0" },
            [
              _c("img", {
                staticClass: "idea-profile",
                attrs: { src: _vm.$page.props.user.profile }
              }),
              _vm._v(" "),
              _c("MaterialTextArea", {
                staticClass: "w-100",
                attrs: {
                  "input-class": "form-control autoresize",
                  placeholder: "نظر شما چیست؟",
                  name: "text",
                  maxlength: "2500"
                },
                model: {
                  value: _vm.text,
                  callback: function($$v) {
                    _vm.text = $$v
                  },
                  expression: "text"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("transition", { attrs: { name: "slide" } }, [
            _vm.showSubmit
              ? _c(
                  "div",
                  { staticClass: "justify-content-end mt-0" },
                  [
                    _c(
                      "loading-button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { loading: _vm.loading },
                        nativeOn: {
                          click: function($event) {
                            return _vm.submit($event)
                          }
                        }
                      },
                      [_vm._v("ارسال")]
                    )
                  ],
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=template&id=7a81c992&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=template&id=7a81c992& ***!
  \***************************************************************************************************************************************************************************************************************/
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
          staticClass: "content-container-right",
          attrs: { "infinite-scroll-distance": 5 }
        },
        [
          _c(
            "div",
            {
              staticClass:
                "w-100 d-flex justify-content-end align-items-center py-3"
            },
            [
              _c(
                "inertia-link",
                { staticClass: "text-grey", attrs: { href: "/ideas" } },
                [
                  _vm._v("\n        بازگشت\n        "),
                  _c("i", { staticClass: "material-icons" }, [
                    _vm._v("keyboard_backspace")
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("FeedbackCard", { attrs: { idea: _vm.idea } }),
          _vm._v(" "),
          _c("idea-replies", {
            ref: "replies",
            staticClass: "mt-3",
            attrs: { idea: _vm.idea.id }
          })
        ],
        1
      ),
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

/***/ "./resources/js/Components/IdeaReplies/IdeaReplies.vue":
/*!*************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReplies.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IdeaReplies_vue_vue_type_template_id_3b5088f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdeaReplies.vue?vue&type=template&id=3b5088f8& */ "./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=template&id=3b5088f8&");
/* harmony import */ var _IdeaReplies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdeaReplies.vue?vue&type=script&lang=js& */ "./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IdeaReplies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IdeaReplies_vue_vue_type_template_id_3b5088f8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IdeaReplies_vue_vue_type_template_id_3b5088f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/IdeaReplies/IdeaReplies.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReplies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaReplies.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReplies_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=template&id=3b5088f8&":
/*!********************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=template&id=3b5088f8& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReplies_vue_vue_type_template_id_3b5088f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaReplies.vue?vue&type=template&id=3b5088f8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReplies.vue?vue&type=template&id=3b5088f8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReplies_vue_vue_type_template_id_3b5088f8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReplies_vue_vue_type_template_id_3b5088f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Components/IdeaReplies/IdeaReply.vue":
/*!***********************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReply.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IdeaReply_vue_vue_type_template_id_2977004c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdeaReply.vue?vue&type=template&id=2977004c&scoped=true& */ "./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=template&id=2977004c&scoped=true&");
/* harmony import */ var _IdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdeaReply.vue?vue&type=script&lang=js& */ "./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _IdeaReply_vue_vue_type_style_index_0_id_2977004c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true& */ "./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IdeaReply_vue_vue_type_template_id_2977004c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IdeaReply_vue_vue_type_template_id_2977004c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2977004c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/IdeaReplies/IdeaReply.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaReply.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_style_index_0_id_2977004c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=style&index=0&id=2977004c&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_style_index_0_id_2977004c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_style_index_0_id_2977004c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_style_index_0_id_2977004c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_style_index_0_id_2977004c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=template&id=2977004c&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=template&id=2977004c&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_template_id_2977004c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaReply.vue?vue&type=template&id=2977004c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/IdeaReply.vue?vue&type=template&id=2977004c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_template_id_2977004c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaReply_vue_vue_type_template_id_2977004c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue":
/*!**************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/NewIdeaReply.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewIdeaReply_vue_vue_type_template_id_3f6fba9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewIdeaReply.vue?vue&type=template&id=3f6fba9c& */ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=template&id=3f6fba9c&");
/* harmony import */ var _NewIdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewIdeaReply.vue?vue&type=script&lang=js& */ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewIdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewIdeaReply_vue_vue_type_template_id_3f6fba9c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewIdeaReply_vue_vue_type_template_id_3f6fba9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/IdeaReplies/NewIdeaReply.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewIdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewIdeaReply.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewIdeaReply_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=template&id=3f6fba9c&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=template&id=3f6fba9c& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewIdeaReply_vue_vue_type_template_id_3f6fba9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewIdeaReply.vue?vue&type=template&id=3f6fba9c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/IdeaReplies/NewIdeaReply.vue?vue&type=template&id=3f6fba9c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewIdeaReply_vue_vue_type_template_id_3f6fba9c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewIdeaReply_vue_vue_type_template_id_3f6fba9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Pages/Feedback/IdeaPage.vue":
/*!**************************************************!*\
  !*** ./resources/js/Pages/Feedback/IdeaPage.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IdeaPage_vue_vue_type_template_id_7a81c992___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdeaPage.vue?vue&type=template&id=7a81c992& */ "./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=template&id=7a81c992&");
/* harmony import */ var _IdeaPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IdeaPage.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IdeaPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IdeaPage_vue_vue_type_template_id_7a81c992___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IdeaPage_vue_vue_type_template_id_7a81c992___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Feedback/IdeaPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaPage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=template&id=7a81c992&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=template&id=7a81c992& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaPage_vue_vue_type_template_id_7a81c992___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./IdeaPage.vue?vue&type=template&id=7a81c992& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Feedback/IdeaPage.vue?vue&type=template&id=7a81c992&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaPage_vue_vue_type_template_id_7a81c992___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IdeaPage_vue_vue_type_template_id_7a81c992___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);