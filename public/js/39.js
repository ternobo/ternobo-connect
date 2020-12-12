(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/CookiesModal.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/CookiesModal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_Mixins_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]],
  name: "CookiesModal"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/CookiesModal.vue?vue&type=template&id=6950280c&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/Modals/CookiesModal.vue?vue&type=template&id=6950280c& ***!
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
    "b-modal",
    {
      attrs: {
        "hide-footer": "",
        title: "کوکی‌های ترنوبو",
        size: "lg",
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
        _c("h2", { staticClass: "font-20" }, [_vm._v("کوکی چیست؟")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "کوکی‌ها داده‌هایی هستند که برای مدت زمان معینی توسط مرورگر ذخیره می‌شوند، تا کاربر مجبور نباشد هر بار بین صفحات جابه‌جا می‌شود یا به وب‌سایت را مجدد باز می‌کند عملیات‌های تکراری اجام دهد و تجربه استفاده از سیستم لذت‌بخش تر باشد."
          )
        ]),
        _vm._v(" "),
        _c("h2", { staticClass: "font-20 mb-4" }, [
          _vm._v("ما از چه کوکی‌هایی استفاده می‌کنیم؟")
        ]),
        _vm._v(" "),
        _c("div", [
          _c("div", { staticClass: "clearfix content active" }, [
            _c("h4", { staticClass: "font-18" }, [
              _vm._v("کوکی های مرتبط با حساب کاربری (account)")
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "اگر یک حساب کاربری با ما ایجاد کنید، ما از کوکی ها برای مدیریت فرآیند ثبت نام و مدیریت کلی استفاده خواهیم کرد. این کوکی ها معمولا هنگامی که از سیستم خارج می شوید (log out) حذف می‌شوند، اما در بعضی موارد ممکن است پس از آن در جهت حفظ تنظیمات ترنوبو شما حتی پس از خروج از سیستم، باقی بمانند."
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("h4", { staticClass: "font-18" }, [
              _vm._v("کوکی های مرتبط با ورود به سیستم (login)")
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "ما از کوکی ها هنگام ورود شما به سیستم استفاده می‌کنیم تا بتوانیم ورود شما را به یاد داشته باشیم. این امر این امکان را به شما می‌دهد که هربار که از یک صفحه جدید بازدید می‌کنید، مجبور نباشید مجددا وارد شوید. این کوکی ها معمولا هنگامی که از سیستم خارج می‌شوید حذف و یا پاک می‌شوند تا اطمینان حاصل شود که تنها پس از ورود به سیستم می‌توان به فضاها و ویژگی های محدود دسترسی پیدا کرد."
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("h4", { staticClass: "font-18" }, [_vm._v("کوکی های تنظیمات")]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "برای اینکه تجربه مناسبی در ترنوبو برای شما فراهم آوریم، قابلیتی جهت اصلاح تنظیمات شما برای نحوه عملکرد ترنوبو به هنگام استفاده شما، فراهم می کنیم. به منظور حفظ تنظیمات شما ما نیاز داریم تا کوکی هایی تنظیم کنیم تا بتوان این اطلاعات را هر زمان که با یک صفحه تحت تنظیمات خود در تعامل هستید اعمال کرد."
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("h4", { staticClass: "font-18" }, [
              _vm._v("کوکی‌های تجربه کاربری")
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "\n\t\t\t\t\tما برای بهبود تجربه کاربری، تمامی تجربه از ترنوبو را ردیابی و تحلیل می‌کنیم و اطلاعات مربوطه را در یک کوکی رمزگذاری شده ذخیره می‌کنیم تا پست‌ها و مطالب تکراری، صفحه افرادی که علاقه‌ای به دنبال کردن آنها ندارید به شما کمتر نمایش دهیم.\n\t\t\t\t\t"
              ),
              _c("br"),
              _vm._v(" "),
              _c("strong", [
                _vm._v(
                  "تمامی اطلاعات شما به صورت end2end رمزگذاری شده است و حتی تیم فنی ترنوبو نیز به اطلاعات دسترسی ندارد."
                )
              ])
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c("h4", { staticClass: "font-18" }, [_vm._v("کوکی های شخص ثالث")]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "\n\t\t\t\t\tدر برخی موارد خاص، ما از کوکی هایی که توسط اشخاص ثالث تامین می‌شوند، استفاده می‌کنیم.\n\t\t\t\t\t"
              ),
              _c("br"),
              _vm._v(
                "\n\t\t\t\t\tترنوبو از گوگل آنالیتیک استفاده می‌کند که یکی از رایج‌ترین و قابل اعتماد ترین ابزارهای تحلیلی در وب برای کمک به درک نحوه درست استفاده از سیستم و ارائه بهتر خدمات، می‌باشد. این کوکی‌ها مواردی مانند مدت زمان صرف شده در ترنوبو و صفحاتی که بازدید می‌کنید را ردیابی می‌کنند و بنابراین ما می‌توانیم به تولید محتوای جذاب ادامه دهیم.\n\t\t\t\t\t"
              ),
              _c("br")
            ])
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/Modals/CookiesModal.vue":
/*!*********************************************************!*\
  !*** ./resources/js/Components/Modals/CookiesModal.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CookiesModal_vue_vue_type_template_id_6950280c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookiesModal.vue?vue&type=template&id=6950280c& */ "./resources/js/Components/Modals/CookiesModal.vue?vue&type=template&id=6950280c&");
/* harmony import */ var _CookiesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookiesModal.vue?vue&type=script&lang=js& */ "./resources/js/Components/Modals/CookiesModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CookiesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CookiesModal_vue_vue_type_template_id_6950280c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CookiesModal_vue_vue_type_template_id_6950280c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/Modals/CookiesModal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/Modals/CookiesModal.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/Components/Modals/CookiesModal.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CookiesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CookiesModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/CookiesModal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CookiesModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/Modals/CookiesModal.vue?vue&type=template&id=6950280c&":
/*!****************************************************************************************!*\
  !*** ./resources/js/Components/Modals/CookiesModal.vue?vue&type=template&id=6950280c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookiesModal_vue_vue_type_template_id_6950280c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CookiesModal.vue?vue&type=template&id=6950280c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/Modals/CookiesModal.vue?vue&type=template&id=6950280c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookiesModal_vue_vue_type_template_id_6950280c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookiesModal_vue_vue_type_template_id_6950280c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);