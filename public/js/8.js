(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnectionButton.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/buttons/ConnectionButton.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LoadingButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoadingButton */ "./resources/js/Components/buttons/LoadingButton.vue");
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    if (this.$page.props.user !== null) {
      var user = this.user;

      if (typeof user != "number") {
        user = parseInt(user);
      }

      if (this.$page.props.connectedPeople.includes(user)) {
        this.connected = true;
        this.text = "متصل شده";
        this.$emit("connected");
      } else if (this.$page.props.waitingConnections.includes(user)) {
        this.waiting = true;
        this.text = "انتظار تایید";
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      connected: false,
      waiting: false,
      followed: true,
      text: "متصل شدن"
    };
  },
  props: {
    user: {
      "default": undefined,
      required: true
    }
  },
  methods: {
    connect: function connect() {
      var $this = this;
      this.loading = true;

      if (!this.connected && !this.waiting) {
        var config = {
          method: "post",
          url: this.$APP_URL + "/connect/" + this.user
        };
        axios(config).then(function (response) {
          // console.log(response.data);
          if (response.data.result) {
            $this.loading = false;
            $this.$page.props.connectedPeople.push($this.user);
            $this.text = "انتظار تایید";
            $this.waiting = true;
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
          url: this.$APP_URL + "/disconnect/" + this.user
        };
        axios(config).then(function (response) {
          // console.log(response.data);
          if (response.data.result) {
            $this.loading = false;
            $this.text = "متصل شدن";

            if ($this.$page.props.connectedPeople.indexOf($this.user) != -1) {
              $this.$page.props.connectedPeople.splice($this.$page.props.connectedPeople.indexOf($this.user), 1);
            } else if ($this.$page.props.waitingConnections.indexOf($this.user) != -1) {
              $this.$page.props.waitingConnections.splice($this.$page.props.waitingConnections.indexOf($this.user), 1);
            }

            $this.connected = false;
            $this.waiting = false;
            $this.$emit("disconnected");
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
          console.log(error);
          $this.loading = false;
        });
      }
    }
  },
  components: {
    LoadingButton: _LoadingButton__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnectionButton.vue?vue&type=template&id=666bbe6e&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/buttons/ConnectionButton.vue?vue&type=template&id=666bbe6e& ***!
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
  return _vm.$page.props.user !== null
    ? _c(
        "LoadingButton",
        {
          staticClass: "btn connect-btn",
          class: {
            "btn-followed-connected": _vm.connected,
            "btn-connection-waiting": _vm.waiting
          },
          attrs: { loading: _vm.loading },
          nativeOn: {
            click: function($event) {
              return _vm.connect($event)
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

/***/ "./resources/js/Components/buttons/ConnectionButton.vue":
/*!**************************************************************!*\
  !*** ./resources/js/Components/buttons/ConnectionButton.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConnectionButton_vue_vue_type_template_id_666bbe6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConnectionButton.vue?vue&type=template&id=666bbe6e& */ "./resources/js/Components/buttons/ConnectionButton.vue?vue&type=template&id=666bbe6e&");
/* harmony import */ var _ConnectionButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConnectionButton.vue?vue&type=script&lang=js& */ "./resources/js/Components/buttons/ConnectionButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ConnectionButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ConnectionButton_vue_vue_type_template_id_666bbe6e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ConnectionButton_vue_vue_type_template_id_666bbe6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/buttons/ConnectionButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/buttons/ConnectionButton.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/Components/buttons/ConnectionButton.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ConnectionButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnectionButton.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/buttons/ConnectionButton.vue?vue&type=template&id=666bbe6e&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/Components/buttons/ConnectionButton.vue?vue&type=template&id=666bbe6e& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionButton_vue_vue_type_template_id_666bbe6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ConnectionButton.vue?vue&type=template&id=666bbe6e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/buttons/ConnectionButton.vue?vue&type=template&id=666bbe6e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionButton_vue_vue_type_template_id_666bbe6e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConnectionButton_vue_vue_type_template_id_666bbe6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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



/***/ })

}]);