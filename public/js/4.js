(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/Comment.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewComment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewComment */ "./resources/js/Components/Comments/NewComment.vue");
/* harmony import */ var javascript_time_ago__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! javascript-time-ago */ "./node_modules/javascript-time-ago/index.js");
/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LoadingSpinner */ "./resources/js/Components/LoadingSpinner.vue");
/* harmony import */ var javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! javascript-time-ago/locale/fa */ "./node_modules/javascript-time-ago/locale/fa.json");
var javascript_time_ago_locale_fa__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! javascript-time-ago/locale/fa */ "./node_modules/javascript-time-ago/locale/fa.json", 1);
/* harmony import */ var _Modals_ReportModal_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Modals/ReportModal.vue */ "./resources/js/Components/Modals/ReportModal.vue");
/* harmony import */ var _Modals_LikesModal_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Modals/LikesModal.vue */ "./resources/js/Components/Modals/LikesModal.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    this.liked = this.comment.is_liked;
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
      liked: false,
      showReport: false,
      showNewComment: false,
      showLikes: false
    };
  },
  methods: {
    commentDelete: function commentDelete() {
      var index = this.comments.indexOf(comment);

      if (index > -1) {
        this.comments.splice(index, 1);
        this.loadMore();
      }
    },
    likeComment: function likeComment() {
      if (this.liked) {
        this.liked = false;
      } else {
        this.liked = true;
      }

      axios.post(this.$APP_URL + "/comments/" + this.comment.id + "/like");
    },
    loadReplies: function loadReplies() {
      var _this = this;

      var newComment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.showReplies && !this.showNewComment && newComment) {
        this.showNewComment = newComment;
      } else {
        this.showNewComment = newComment;
        this.showReplies = !this.showReplies;
      }

      if (this.showReplies) {
        this.repliesLoading = true;
        axios.post(this.$APP_URL + "/comments/" + this.comment.id + "/replies").then(function (response) {
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
      axios["delete"]("/posts/" + this.comment.post_id + "/comments/" + this.comment.id).then(function (response) {
        _this2.$emit("deleted", _this2.comment);
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
    comment_time: function comment_time() {
      var timeAgo = new javascript_time_ago__WEBPACK_IMPORTED_MODULE_1__["default"]("fa-FA");
      return timeAgo.format(Date.parse(this.comment.created_at), "twitter");
    }
  },
  components: {
    NewComment: _NewComment__WEBPACK_IMPORTED_MODULE_0__["default"],
    LoadingSpinner: _LoadingSpinner__WEBPACK_IMPORTED_MODULE_2__["default"],
    ReportModal: _Modals_ReportModal_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    LikesModal: _Modals_LikesModal_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  props: {
    replyTo: {
      "default": undefined,
      required: false
    },
    comment: {
      type: Object,
      "default": undefined,
      required: true
    }
  },
  name: "Comment"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/CommetsList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/CommetsList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../LoadingSpinner */ "./resources/js/Components/LoadingSpinner.vue");
/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment */ "./resources/js/Components/Comments/Comment.vue");
/* harmony import */ var _NewComment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NewComment */ "./resources/js/Components/Comments/NewComment.vue");
//
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
    submit: function submit(comment) {
      this.comments.unshift(comment);
    },
    commentDelete: function commentDelete(comment) {
      var index = this.comments.indexOf(comment);

      if (index > -1) {
        this.comments.splice(index, 1);
        this.loadMore();
      }
    },
    loadMore: function loadMore() {
      var _this = this;

      if (this.next_page_url !== null && !this.commentsLoading) {
        this.commentsLoading = true;
        axios.get(this.next_page_url).then(function (response) {
          var data = response.data;

          if (data.result) {
            _this.next_page_url = data.data.next_page_url;
            _this.comments = _this.comments.concat(data.data.data);
          }

          _this.commentsLoading = false;
        })["catch"](function (error) {
          return console.log(error);
        }).then(function () {
          return _this.commentsLoading = false;
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
    post: {
      type: Number,
      "default": undefined,
      required: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    axios.get(this.$APP_URL + "/posts/" + this.post + "/comments").then(function (response) {
      var data = response.data;

      if (data.result) {
        _this2.next_page_url = data.data.next_page_url;
        _this2.comments = data.data.data;
      }

      _this2.commentsLoading = false;
    })["catch"](function (error) {
      return console.log(error);
    });
  },
  data: function data() {
    return {
      commentsLoading: true,
      comments: undefined,
      next_page_url: null
    };
  },
  name: "CommentsList",
  components: {
    LoadingSpinner: _LoadingSpinner__WEBPACK_IMPORTED_MODULE_0__["default"],
    Comment: _Comment__WEBPACK_IMPORTED_MODULE_1__["default"],
    NewComment: _NewComment__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/NewComment.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/NewComment.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
    post: {
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

        axios.post(this.$APP_URL + "/posts/" + this.post + "/comments", data).then(function (response) {
          if (response.data.result) {
            _this.text = "";

            _this.$emit("submit", response.data.comment);
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
  name: "NewComment",
  components: {
    MaterialTextArea: _inputs_MaterialTextArea__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/ReportModal.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/ReportModal.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Mixins/Modal */ "./resources/js/Mixins/Modal.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    type: {
      type: String,
      "default": "post",
      required: false
    },
    postId: {
      type: Number,
      "default": undefined,
      required: false
    },
    commentId: {
      type: Number,
      "default": undefined,
      required: false
    }
  },
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  methods: {
    setReason: function setReason(val) {
      this.reason = val;
    },
    submit: function submit() {
      var _this = this;

      this.loading = true;
      var data = {};

      if (this.type == "post") {
        data.post_id = this.postId;
      } else if (this.type == "comment") {
        data.comment_id = this.commentId;
      }

      axios.post("/reportpost", data).then(function (response) {
        _this.toast("درخواست شما با موفقیت ثبت شد", "check", "text-success");

        _this.$emit("update:show", false);
      })["catch"](function (err) {
        return _this.toast("خطا در برقراری ارتباط");
      }).then(function () {
        return _this.loading = false;
      });
    }
  },
  data: function data() {
    return {
      reportFor: null,
      loading: false,
      description: null,
      moreInfo: false,
      reason: null
    };
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".comment .pagedetail[data-v-5d0a7522] {\n  display: flex;\n  flex-direction: column;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=template&id=5d0a7522&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/Comment.vue?vue&type=template&id=5d0a7522&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "comment-item" },
    [
      _c("report-modal", {
        attrs: {
          show: _vm.showReport,
          type: "comment",
          "comment-id": _vm.comment.id
        },
        on: {
          "update:show": function($event) {
            _vm.showReport = $event
          }
        }
      }),
      _vm._v(" "),
      _c("likes-modal", {
        attrs: { item: _vm.comment.id, type: "comment", show: _vm.showLikes },
        on: {
          "update:show": function($event) {
            _vm.showLikes = $event
          }
        }
      }),
      _vm._v(" "),
      _vm.replyTo != undefined && _vm.comment.replyto.page
        ? _c("div", [
            _c("span", { staticClass: "text-superlight" }, [
              _c("i", { staticClass: "material-icons" }, [_vm._v("reply")]),
              _vm._v(" پاسخ به " + _vm._s(_vm.comment.replyto.page.name) + " ")
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.deleted
        ? _c("div", { staticClass: "comment" }, [
            _c(
              "div",
              { staticClass: "comment-header" },
              [
                _c(
                  "inertia-link",
                  {
                    staticClass: "d-flex align-items-center",
                    attrs: { href: "/" + _vm.comment.page.slug }
                  },
                  [
                    _c("img", {
                      staticClass: "profile-sm",
                      attrs: { src: _vm.comment.page.profile }
                    }),
                    _vm._v(" "),
                    _c("div", { staticClass: "pr-2 pagedetail" }, [
                      _c("span", { staticClass: "name" }, [
                        _c("strong", [
                          _vm._v(" " + _vm._s(_vm.comment.page.name) + " "),
                          _vm.comment.page.is_verified === 1
                            ? _c("i", { staticClass: "verificationcheck" }, [
                                _vm._v("check_circle")
                              ])
                            : _vm._e()
                        ])
                      ]),
                      _vm._v(" "),
                      _vm.comment.page.short_bio
                        ? _c("small", { staticClass: "text-muted" }, [
                            _vm._v(
                              "\n\t\t\t\t\t\t" +
                                _vm._s(_vm.comment.page.short_bio) +
                                "\n\t\t\t\t\t"
                            )
                          ])
                        : _vm._e()
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c("span", { staticClass: "font-10 text-muted" }, [
                    _vm._v(_vm._s(_vm.comment_time))
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
                          !_vm.checkUser(_vm.comment.page.user_id)
                            ? _c("b-dropdown-item", [
                                _c(
                                  "div",
                                  {
                                    staticClass: "d-flex align-items-center",
                                    on: {
                                      click: function($event) {
                                        _vm.showReport = true
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "i",
                                      {
                                        staticClass:
                                          "material-icons ml-2 text-dark"
                                      },
                                      [_vm._v("link")]
                                    ),
                                    _vm._v(" "),
                                    _c("div", [
                                      _c("div", [
                                        _c("strong", [_vm._v(" گزارش تخلف ")])
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "small",
                                        { staticClass: "text-muted" },
                                        [
                                          _vm._v(
                                            " این دیدگاه در تضاد با قوانین ترنوبو است "
                                          )
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.checkUser(_vm.comment.page.user_id)
                            ? _c(
                                "b-dropdown-item",
                                { on: { click: _vm.deleteComment } },
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
            _c("div", { staticClass: "comment-body" }, [
              _c("div", {
                staticStyle: {
                  "unicode-bidi": "plaintext",
                  width: "100% !important",
                  display: "block",
                  "text-align": "justify"
                },
                domProps: { innerHTML: _vm._s(_vm.comment.text) }
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
          _c("div", [
            _vm.comment.mutual_likes != null &&
            _vm.comment.mutual_likes.length > 0
              ? _c(
                  "div",
                  {
                    staticClass: "d-flex post-likes-text text-muted clickable",
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
                    _vm.comment.mutual_likes[0]
                      ? _c(
                          "inertia-link",
                          {
                            staticClass: "text-dark",
                            attrs: {
                              href: "/" + _vm.comment.mutual_likes[0].page.slug
                            }
                          },
                          [
                            _c("strong", { staticClass: "text-light" }, [
                              _vm._v(
                                _vm._s(_vm.comment.mutual_likes[0].page.name)
                              )
                            ])
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.comment.mutual_likes.length > 1
                      ? _c(
                          "div",
                          [
                            _c("span", { staticClass: "mr-1" }, [_vm._v("و")]),
                            _vm._v(" "),
                            _vm.comment.mutual_likes[1]
                              ? _c(
                                  "inertia-link",
                                  {
                                    staticClass: "text-dark",
                                    attrs: {
                                      href:
                                        "/" +
                                        _vm.comment.mutual_likes[0].page.slug
                                    }
                                  },
                                  [
                                    _c(
                                      "strong",
                                      { staticClass: "text-light" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.comment.mutual_likes[1].page
                                              .name
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
                    _vm.comment.mutual_likes.length > 2
                      ? _c("span", { staticClass: "mx-1" }, [_vm._v(" و ... ")])
                      : _vm._e()
                  ],
                  1
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "actions" }, [
            _vm.comment.replies_count > 0 && _vm.replyTo == undefined
              ? _c(
                  "small",
                  {
                    staticClass: "clickable ml-2",
                    on: {
                      click: function($event) {
                        return _vm.loadReplies(false)
                      }
                    }
                  },
                  [
                    _c(
                      "strong",
                      {
                        class: {
                          "text-muted": !_vm.showReplies,
                          "text-dark": _vm.showReplies
                        }
                      },
                      [
                        _vm._v(
                          " " + _vm._s(_vm.comment.replies_count) + " پاسخ "
                        )
                      ]
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "i",
              {
                staticClass: "hover-dark clickable",
                class: {
                  "material-icons-outlined":
                    !_vm.showReplies || !_vm.showNewComment,
                  "material-icons": _vm.showReplies && _vm.showNewComment
                },
                on: { click: _vm.loadReplies }
              },
              [_vm._v(" insert_comment ")]
            ),
            _vm._v(" "),
            !_vm.checkUser(_vm.comment.page.user_id)
              ? _c(
                  "i",
                  {
                    staticClass: "hover-dark clickable material-icons",
                    class: { "text-danger": _vm.liked },
                    on: { click: _vm.likeComment }
                  },
                  [
                    _vm._v(
                      "\n\t\t\t\t" +
                        _vm._s(_vm.liked ? "favorite" : "favorite_border") +
                        "\n\t\t\t"
                    )
                  ]
                )
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide" } }, [
        _vm.showReplies
          ? _c(
              "div",
              { staticClass: "comment-replies" },
              [
                _vm.showNewComment
                  ? _c("new-comment", {
                      attrs: {
                        post: _vm.comment.post_id,
                        "reply-to": _vm.comment.id
                      },
                      on: { submit: _vm.submit }
                    })
                  : _vm._e(),
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
                          return _c("comment", {
                            key: reply.id,
                            attrs: {
                              "reply-to": _vm.comment.id,
                              comment: reply
                            },
                            on: {
                              replied: _vm.submit,
                              deleted: _vm.commentDelete
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/CommetsList.vue?vue&type=template&id=02534f66&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/CommetsList.vue?vue&type=template&id=02534f66& ***!
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
  return _c(
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
      staticClass: "comments",
      attrs: {
        "infinite-scroll-disabled": _vm.commentsLoading,
        "infinite-scroll-distance": 5
      }
    },
    [
      _c("new-comment", {
        attrs: { post: _vm.post },
        on: { submit: _vm.submit }
      }),
      _vm._v(" "),
      _vm._l(_vm.comments, function(comment) {
        return _c("comment", {
          key: "comment_" + comment.id,
          attrs: { comment: comment },
          on: { deleted: _vm.commentDelete }
        })
      }),
      _vm._v(" "),
      _vm.commentsLoading
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/NewComment.vue?vue&type=template&id=0ff684bf&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Comments/NewComment.vue?vue&type=template&id=0ff684bf& ***!
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
  return _vm.$page.props.user != null
    ? _c(
        "div",
        { staticClass: "sendcomment clearfix" },
        [
          _c(
            "div",
            { staticClass: "input-group-btn mb-0" },
            [
              _c("img", {
                staticClass: "profile-sm ml-3",
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/ReportModal.vue?vue&type=template&id=19d7ee1b&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/ReportModal.vue?vue&type=template&id=19d7ee1b& ***!
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
    "b-modal",
    {
      attrs: {
        "hide-footer": "",
        size: "md",
        title: "چرا می‌‌خواهید این محتوا را گزارش دهید؟",
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
      _vm.reportFor == null
        ? _c("div", { staticClass: "reportreseaons" }, [
            _c(
              "div",
              {
                staticClass: "report-item",
                on: {
                  click: function($event) {
                    ;(_vm.reportFor = "notrelated"),
                      (_vm.reason = "نامرتبط با ترنوبو")
                  }
                }
              },
              [
                _c("span", { staticClass: "text" }, [
                  _vm._v("فکر می‌کنم "),
                  _c("span", { staticClass: "reportTitle" }, [
                    _vm._v("این محتوا")
                  ]),
                  _vm._v(" مناسب ترنوبو نیست")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "material-icons" }, [
                  _vm._v("keyboard_arrow_left")
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "report-item",
                on: {
                  click: function($event) {
                    _vm.reportFor = "fakeorspam"
                  }
                }
              },
              [
                _c("span", { staticClass: "text" }, [
                  _vm._v("فکر می‌کنم "),
                  _c("span", { staticClass: "reportTitle" }, [
                    _vm._v("این محتوا")
                  ]),
                  _vm._v(" جعلی، هرز یا کلاهبراری است‌")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "material-icons" }, [
                  _vm._v("keyboard_arrow_left")
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "report-item",
                on: {
                  click: function($event) {
                    _vm.reportFor = "other-reasons"
                  }
                }
              },
              [
                _c("span", { staticClass: "text" }, [
                  _vm._v("برای گزارش "),
                  _c("span", { staticClass: "reportTitle" }, [
                    _vm._v("این محتوا")
                  ]),
                  _vm._v(" دلایل دیگری دارم")
                ]),
                _vm._v(" "),
                _c("i", { staticClass: "material-icons" }, [
                  _vm._v("keyboard_arrow_left")
                ])
              ]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.moreInfo
        ? _c("div", [
            _vm.reportFor === "fakeorspam"
              ? _c("div", { staticClass: "fakeorspam reportfor" }, [
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "fakeaccount" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم این حساب کاربری غیرواقعی است")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("مثال : گزارش حساب ساختگی یا جعل شده")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason =
                              "فکر می‌کنم این حساب کاربری غیرواقعی است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value: "فکر می‌کنم این حساب کاربری غیرواقعی است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌کنم این حساب کاربری غیرواقعی است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason =
                                "فکر می‌کنم این حساب کاربری غیرواقعی است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "wronginformation" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(" دارای اطلاعات نادرست است")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("مثال : اطلاعات ارائه شده در "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(
                          " نادرست بوده و تحت عنوان اطلاعت درست و واقعی ارائه شده است"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason =
                              "فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value:
                              "فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason =
                                "فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "spamcotent" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(" هرز است")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("مثال : "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(
                          " دارای ارزش خاصی نمی‌باشد و صرفا جهت جذب بازدید ارائه شده است"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason = "فکر می این محتوا هرز است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value: "فکر می این محتوا هرز است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می این محتوا هرز است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason = "فکر می این محتوا هرز است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "phisingorvirus" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(
                          " جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده‌"
                        )
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("مثال : "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(
                          " به جهت دریافت اطلاعات شخصی، پول یا ارائه لینک‌های مشکوک و آلوده قرار گرفته است."
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason =
                              "فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value:
                              "فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason =
                                "فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.reportFor === "other-reasons"
              ? _c("div", { staticClass: "other-reasons reportfor" }, [
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "hatewordsreport" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(" توهین آمیز است")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("مثال : "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(
                          " به صوتر هدفمند به اشخصا حقیقی، قومیت یا مذهبی خاص توهین کرده است"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason = "فکر می‌کنم این محتوا توهین آمیز است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value: "فکر می‌کنم این محتوا توهین آمیز است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌کنم این محتوا توهین آمیز است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason = "فکر می‌کنم این محتوا توهین آمیز است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "sexualreport" } }, [
                      _c("span", [_vm._v("فکر می‌کنم شامل محتوای جنسی است")]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v(
                          "مثال : شامل محتوای برهنگی، صحنه‌ها و زبان جنسی، فحشا یا قاچاق جنسی است"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason = "فکر می‌‌کنم شامل محتوای جنسی است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value: "فکر می‌‌کنم شامل محتوای جنسی است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌‌کنم شامل محتوای جنسی است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason = "فکر می‌‌کنم شامل محتوای جنسی است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "terorismreport" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(" اشاعه دهنده خشونت و تروریسم است")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v(
                          "مثال : شامل شکنجه، تجاوز یا سوء استفاده، عمل تروریستی یا عضوگیری برای گروه‌های تروریستی است"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason =
                              "فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value:
                              "فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason =
                                "فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "threatandhatereport" } }, [
                      _c("span", [
                        _vm._v("فکر می‌کنم "),
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(" آزار دهنده و تهدید آمیز است‌")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v(
                          "مثال : شامل حمله به شخص/اشخاص یا تهدید و قلدری است"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason =
                              "فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value:
                              "فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason =
                                "فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "suicidereport" } }, [
                      _c("span", [
                        _vm._v("من نگران هستم این فرد بخواهد خودکشی کند‌")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v(
                          "مثال : این شخص تهدید می‌کند که به خودش آسیب می‌رساند"
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason =
                              "من نگران هستم این فرد بخواهد خودکشی کند"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value: "من نگران هستم این فرد بخواهد خودکشی کند"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "من نگران هستم این فرد بخواهد خودکشی کند"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason =
                                "من نگران هستم این فرد بخواهد خودکشی کند"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "report-reason" }, [
                    _c("label", { attrs: { for: "copyrightreport" } }, [
                      _c("span", [
                        _c("span", { staticClass: "reportTitle" }, [
                          _vm._v("این محتوا")
                        ]),
                        _vm._v(" حقوق شخصی مرا نقض می‌کند‌‌")
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("مثال : اقتراء، نقص حقوق چاپ یا علائم تجاری است")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "radio clickable",
                        on: {
                          click: function($event) {
                            _vm.reason = "این محتوا حقوق شخصی مرا نقض می‌کند"
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.reason,
                              expression: "reason"
                            }
                          ],
                          staticClass: "radio__input",
                          attrs: {
                            type: "radio",
                            name: "reason",
                            value: "این محتوا حقوق شخصی مرا نقض می‌کند"
                          },
                          domProps: {
                            checked: _vm._q(
                              _vm.reason,
                              "این محتوا حقوق شخصی مرا نقض می‌کند"
                            )
                          },
                          on: {
                            change: function($event) {
                              _vm.reason = "این محتوا حقوق شخصی مرا نقض می‌کند"
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio__label" })
                      ]
                    )
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.reportFor === "notrelated"
              ? _c("div", { staticClass: "notrelated reportfor px-3" }, [
                  _c("label", [
                    _vm._v("از گزارش "),
                    _c("span", { staticClass: "reportTitle" }, [
                      _vm._v("این محتوا")
                    ]),
                    _vm._v(" به عنوان محتوای نامناسب و نامرتبط اطمینان دارید؟")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    staticStyle: { display: "none" },
                    attrs: {
                      type: "radio",
                      name: "report",
                      checked: "",
                      value: "نامرتبط با ترنوبو"
                    }
                  })
                ])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.moreInfo
        ? _c("div", [
            _c("div", { staticClass: "moreinfo px-2" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.description,
                    expression: "description"
                  }
                ],
                staticClass: "form-control h-100",
                attrs: {
                  placeholder: "توضیحات خود را اینجا بنویسید",
                  name: "moreinfo"
                },
                domProps: { value: _vm.description },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.description = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "moreinfo-footer text-left py-2" }, [
              _c(
                "button",
                {
                  staticClass: "btn button-transparent",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      ;(_vm.moreInfo = false), (_vm.description = null)
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
                  attrs: { id: "moreinfo-close" },
                  on: {
                    click: function($event) {
                      _vm.moreInfo = false
                    }
                  }
                },
                [_vm._v("افزودن")]
              )
            ])
          ])
        : _vm.reportFor != null
        ? _c("div", { staticClass: "d-flex pt-3 justify-content-between" }, [
            _c("div", { staticClass: "align-self-start" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-primary rounded-pill",
                  on: {
                    click: function($event) {
                      _vm.moreInfo = true
                    }
                  }
                },
                [_vm._v("ارائه توضیحات")]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "d-flex" },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn button-transparent",
                    on: {
                      click: function($event) {
                        _vm.reportFor = null
                      }
                    }
                  },
                  [_vm._v("برگشت")]
                ),
                _vm._v(" "),
                _c(
                  "loading-button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: {
                      loading: _vm.loading,
                      disabled: _vm.reason == null
                    },
                    nativeOn: {
                      click: function($event) {
                        return _vm.submit($event)
                      }
                    }
                  },
                  [_vm._v("ثبت")]
                )
              ],
              1
            )
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Comments/Comment.vue":
/*!******************************************************!*\
  !*** ./resources/js/Components/Comments/Comment.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Comment_vue_vue_type_template_id_5d0a7522_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Comment.vue?vue&type=template&id=5d0a7522&scoped=true& */ "./resources/js/Components/Comments/Comment.vue?vue&type=template&id=5d0a7522&scoped=true&");
/* harmony import */ var _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.vue?vue&type=script&lang=js& */ "./resources/js/Components/Comments/Comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Comment_vue_vue_type_style_index_0_id_5d0a7522_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true& */ "./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Comment_vue_vue_type_template_id_5d0a7522_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Comment_vue_vue_type_template_id_5d0a7522_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5d0a7522",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Comments/Comment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Comments/Comment.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/Components/Comments/Comment.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Comment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5d0a7522_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=style&index=0&id=5d0a7522&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5d0a7522_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5d0a7522_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5d0a7522_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_sass_loader_dist_cjs_js_ref_6_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_style_index_0_id_5d0a7522_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/Components/Comments/Comment.vue?vue&type=template&id=5d0a7522&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/Components/Comments/Comment.vue?vue&type=template&id=5d0a7522&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_5d0a7522_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Comment.vue?vue&type=template&id=5d0a7522&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/Comment.vue?vue&type=template&id=5d0a7522&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_5d0a7522_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Comment_vue_vue_type_template_id_5d0a7522_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Components/Comments/CommetsList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/Components/Comments/CommetsList.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommetsList_vue_vue_type_template_id_02534f66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommetsList.vue?vue&type=template&id=02534f66& */ "./resources/js/Components/Comments/CommetsList.vue?vue&type=template&id=02534f66&");
/* harmony import */ var _CommetsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommetsList.vue?vue&type=script&lang=js& */ "./resources/js/Components/Comments/CommetsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CommetsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CommetsList_vue_vue_type_template_id_02534f66___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CommetsList_vue_vue_type_template_id_02534f66___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Comments/CommetsList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Comments/CommetsList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/Components/Comments/CommetsList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommetsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommetsList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/CommetsList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommetsList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Comments/CommetsList.vue?vue&type=template&id=02534f66&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Components/Comments/CommetsList.vue?vue&type=template&id=02534f66& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommetsList_vue_vue_type_template_id_02534f66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CommetsList.vue?vue&type=template&id=02534f66& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/CommetsList.vue?vue&type=template&id=02534f66&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommetsList_vue_vue_type_template_id_02534f66___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommetsList_vue_vue_type_template_id_02534f66___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Components/Comments/NewComment.vue":
/*!*********************************************************!*\
  !*** ./resources/js/Components/Comments/NewComment.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewComment_vue_vue_type_template_id_0ff684bf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewComment.vue?vue&type=template&id=0ff684bf& */ "./resources/js/Components/Comments/NewComment.vue?vue&type=template&id=0ff684bf&");
/* harmony import */ var _NewComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewComment.vue?vue&type=script&lang=js& */ "./resources/js/Components/Comments/NewComment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewComment_vue_vue_type_template_id_0ff684bf___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewComment_vue_vue_type_template_id_0ff684bf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Comments/NewComment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Comments/NewComment.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/Comments/NewComment.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewComment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/NewComment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Comments/NewComment.vue?vue&type=template&id=0ff684bf&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Components/Comments/NewComment.vue?vue&type=template&id=0ff684bf& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewComment_vue_vue_type_template_id_0ff684bf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NewComment.vue?vue&type=template&id=0ff684bf& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Comments/NewComment.vue?vue&type=template&id=0ff684bf&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewComment_vue_vue_type_template_id_0ff684bf___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewComment_vue_vue_type_template_id_0ff684bf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./resources/js/Components/Modals/ReportModal.vue":
/*!********************************************************!*\
  !*** ./resources/js/Components/Modals/ReportModal.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReportModal_vue_vue_type_template_id_19d7ee1b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReportModal.vue?vue&type=template&id=19d7ee1b& */ "./resources/js/Components/Modals/ReportModal.vue?vue&type=template&id=19d7ee1b&");
/* harmony import */ var _ReportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReportModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/ReportModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReportModal_vue_vue_type_template_id_19d7ee1b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReportModal_vue_vue_type_template_id_19d7ee1b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/ReportModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/ReportModal.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/Modals/ReportModal.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/ReportModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/ReportModal.vue?vue&type=template&id=19d7ee1b&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Components/Modals/ReportModal.vue?vue&type=template&id=19d7ee1b& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportModal_vue_vue_type_template_id_19d7ee1b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ReportModal.vue?vue&type=template&id=19d7ee1b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/ReportModal.vue?vue&type=template&id=19d7ee1b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportModal_vue_vue_type_template_id_19d7ee1b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReportModal_vue_vue_type_template_id_19d7ee1b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);