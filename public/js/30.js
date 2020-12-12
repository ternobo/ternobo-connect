(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/Landing.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/App/Landing.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_slick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-slick */ "./node_modules/vue-slick/dist/slickCarousel.esm.js");
/* harmony import */ var vue_slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-slick-carousel */ "./node_modules/vue-slick-carousel/dist/vue-slick-carousel.umd.js");
/* harmony import */ var vue_slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_slick_carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_slick_carousel_dist_vue_slick_carousel_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-slick-carousel/dist/vue-slick-carousel.css */ "./node_modules/vue-slick-carousel/dist/vue-slick-carousel.css");
/* harmony import */ var vue_slick_carousel_dist_vue_slick_carousel_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_slick_carousel_dist_vue_slick_carousel_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_slick_carousel_dist_vue_slick_carousel_theme_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-slick-carousel/dist/vue-slick-carousel-theme.css */ "./node_modules/vue-slick-carousel/dist/vue-slick-carousel-theme.css");
/* harmony import */ var vue_slick_carousel_dist_vue_slick_carousel_theme_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_slick_carousel_dist_vue_slick_carousel_theme_css__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // optional style for arrows & dots


/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    setHeight: function setHeight() {
      var _this = this;

      setTimeout(function () {
        _this.$refs.slider.$el.getElementsByClassName("card").forEach(function (item) {
          item.style.minHeight = _this.$refs.slider.$el.getBoundingClientRect().height + "px";
          item.style.maxHeight = _this.$refs.slider.$el.getBoundingClientRect().height + "px";
        });
      }, 500);
    },
    extractContent: function extractContent(s) {
      var span = document.createElement("span");
      span.innerHTML = s;
      return span.textContent || span.innerText;
    },
    truncate: function truncate(str, no_words) {
      return str.split(" ").splice(0, no_words).join(" ");
    }
  },
  components: {
    VueSlickCarousel: vue_slick_carousel__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  props: {
    articles: {
      type: Array,
      "default": undefined,
      required: true
    }
  },
  name: "Landing"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Welcome.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Welcome.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_switches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-switches */ "./node_modules/vue-switches/src/switches.vue");
/* harmony import */ var _Components_Modals_LawsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/Modals/LawsModal */ "./resources/js/Components/Modals/LawsModal.vue");
/* harmony import */ var _Components_App_header_AppHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/App/header/AppHeader */ "./resources/js/Components/App/header/AppHeader.vue");
/* harmony import */ var _Components_App_Landing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Components/App/Landing */ "./resources/js/Components/App/Landing.vue");
/* harmony import */ var _Components_Modals_LoginModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/Modals/LoginModal */ "./resources/js/Components/Modals/LoginModal.vue");
/* harmony import */ var _Components_Modals_SignupModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Components/Modals/SignupModal */ "./resources/js/Components/Modals/SignupModal.vue");
/* harmony import */ var _Layouts_App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Layouts/App */ "./resources/js/Layouts/App.vue");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _trevoreyre_autocomplete_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @trevoreyre/autocomplete-vue */ "./node_modules/@trevoreyre/autocomplete-vue/dist/autocomplete.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    search: function search(input) {
      var _this = this;

      var element = document.getElementById("searchforminput").parentElement;
      element.style.position = "unset";

      if (element.getElementsByClassName("autocomplete-result-list").length > 0) {
        element.getElementsByClassName("autocomplete-result-list")[0].style.width = element.getBoundingClientRect().width + "px";
        element.getElementsByClassName("autocomplete-result-list")[0].style.marginTop = "-14px";
      }

      if (input.length < 2) {
        return [];
      }

      return new Promise(function (resolve, reject) {
        axios.post(_this.$APP_URL + "/search", {
          q: input
        }).then(function (response) {
          if (response.data.result) {
            resolve(response.data.suggestions);
          } else {
            resolve([]);
          }
        });
      });
    }
  },
  data: function data() {
    return {
      showLanding: false,
      showDownloader: false,
      hasBG: true,
      showLogin: false,
      showLaws: false,
      showSignup: false
    };
  },
  watch: {
    showLanding: function showLanding() {
      setTimeout(function () {
        window.scrollTo(0, 800);
      }, 500);
    }
  },
  mounted: function mounted() {
    var $this = this;
    var i = 0;
    var txt = "شبکه اجتماعی متخصصین";
    var speed = 130;

    function typeWriter() {
      if (i < txt.length) {
        $this.$refs.typewritingdescript.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  },
  props: {
    articles: {
      type: Array,
      "default": undefined
    }
  },
  layout: _Layouts_App__WEBPACK_IMPORTED_MODULE_6__["default"],
  name: "Welcome",
  components: {
    LawsModal: _Components_Modals_LawsModal__WEBPACK_IMPORTED_MODULE_1__["default"],
    AppHeader: _Components_App_header_AppHeader__WEBPACK_IMPORTED_MODULE_2__["default"],
    Landing: _Components_App_Landing__WEBPACK_IMPORTED_MODULE_3__["default"],
    Switches: vue_switches__WEBPACK_IMPORTED_MODULE_0__["default"],
    LoginModal: _Components_Modals_LoginModal__WEBPACK_IMPORTED_MODULE_4__["default"],
    SignupModal: _Components_Modals_SignupModal__WEBPACK_IMPORTED_MODULE_5__["default"],
    Autocomplete: _trevoreyre_autocomplete_vue__WEBPACK_IMPORTED_MODULE_8__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/Landing.vue?vue&type=template&id=5ecd7ae4&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Components/App/Landing.vue?vue&type=template&id=5ecd7ae4& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    { staticClass: "landing", attrs: { id: "landing-section" } },
    [
      _c("div", { staticClass: "container py-4" }, [
        _c("div", { staticClass: "section-1 text-center" }, [
          _c("h1", { staticClass: "text-action py-5 mb-0 font-32" }, [
            _vm._v("شبکه اجتماعی متخصصین")
          ]),
          _vm._v(" "),
          _c("span", { staticClass: "mb-4" }, [
            _vm._v(
              "ترنوبو شبکه اجتماعی ویژه متخصصین است که با امکانات گسترده‌ای که در زمینه تولید محتوا دارد به شما کمک می‌کند تجربیات و دانش تخصصیتان را در قالب متن، تصویر و ویدئو با دیگران به اشتراک بگذارید، ارتباط تخصصیتان را گسترش دهید و رزومه آنلاین خودتان را بسازید."
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "w-100" },
            [
              _c("lazy-image", {
                staticClass: "d-lg-block d-none",
                staticStyle: { "min-height": "670px", "max-width": "100%" },
                attrs: { src: "/images/Svg1.svg" }
              }),
              _vm._v(" "),
              _c("lazy-image", {
                staticClass: "d-lg-none d-block",
                staticStyle: { "min-height": "600px", "max-width": "100%" },
                attrs: { src: "/images/svg1mobile.svg" }
              })
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "section-2" }, [
        _c("div", { staticClass: "container" }, [
          _c(
            "h2",
            { staticClass: "text-action text-center mb-3 font-32 py-5" },
            [_vm._v("چـــــــرا تــــرنـــوبــــو؟")]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "row m-0 pt-5" }, [
            _c("div", { staticClass: "col-lg-4" }, [
              _c(
                "div",
                { staticClass: "card bg-landing-grey mb-lg-3" },
                [
                  _c("lazy-image", {
                    staticClass: "card-img-top mb-0",
                    attrs: {
                      "img-class": "card-img-top",
                      src: "/images/s1.png"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "i",
                    { staticClass: "material-icons-outlined card-icon" },
                    [_vm._v("mms")]
                  ),
                  _vm._v(" "),
                  _vm._m(0)
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c(
                "div",
                { staticClass: "card go-top bg-landing-grey mb-lg-3" },
                [
                  _c("lazy-image", {
                    staticClass: "card-img-top mb-0",
                    attrs: {
                      "img-class": "card-img-top",
                      src: "/images/cardimage.png"
                    }
                  }),
                  _vm._v(" "),
                  _c("i", { staticClass: "material-icons card-icon" }, [
                    _vm._v("work_outline")
                  ]),
                  _vm._v(" "),
                  _vm._m(1)
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4" }, [
              _c(
                "div",
                { staticClass: "card bg-landing-grey mb-lg-3" },
                [
                  _c("lazy-image", {
                    staticClass: "card-img-top mb-0",
                    attrs: {
                      "img-class": "card-img-top",
                      src: "/images/cardimage3.png"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "i",
                    { staticClass: "material-icons-outlined card-icon" },
                    [_vm._v("description")]
                  ),
                  _vm._v(" "),
                  _vm._m(2)
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _vm._m(3)
        ])
      ]),
      _vm._v(" "),
      _vm._m(4),
      _vm._v(" "),
      _c("div", { staticClass: "section-4 d-flex flex-column pb-5" }, [
        _c("div", { staticClass: "container text-center" }, [
          _c(
            "h2",
            { staticClass: "text-center py-5 mb-0 text-white font-32" },
            [_vm._v("تازه‌ترین مقالات منتشر شده")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "container" },
            [
              _c(
                "VueSlickCarousel",
                {
                  ref: "slider",
                  staticClass: "slickslider",
                  attrs: {
                    arrows: true,
                    dots: false,
                    rtl: true,
                    slidesToShow: _vm.$root.isDesktop ? 3 : 1
                  },
                  on: { init: _vm.setHeight }
                },
                _vm._l(_vm.articles, function(article) {
                  return _c(
                    "div",
                    { key: article.id, staticClass: "px-2 h-100" },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "card bg-landing-grey h-100 text-right"
                        },
                        [
                          _c(
                            "inertia-link",
                            {
                              attrs: {
                                href:
                                  article.page.slug +
                                  "/" +
                                  (article.slug != null
                                    ? article.slug
                                    : article.id)
                              }
                            },
                            [
                              _c("lazy-image", {
                                staticClass: "card-img-top mb-0",
                                attrs: {
                                  "img-class": "card-img-top",
                                  src: article.medias
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "p-3" },
                            [
                              _c(
                                "inertia-link",
                                {
                                  staticClass: "card-title",
                                  attrs: {
                                    href:
                                      article.page.slug +
                                      "/" +
                                      (article.slug != null
                                        ? article.slug
                                        : article.id)
                                  }
                                },
                                [
                                  _c(
                                    "h3",
                                    { staticClass: "text-white py-1 m-0" },
                                    [_vm._v(_vm._s(article.title))]
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "card-body" }, [
                            _c("p", { staticClass: "font-16" }, [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\t" +
                                  _vm._s(
                                    _vm.truncate(
                                      _vm.extractContent(article.text),
                                      25
                                    )
                                  ) +
                                  "\n\t\t\t\t\t\t\t\t"
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "card-footer bg-landing-grey d-flex align-items-center",
                              attrs: { dir: "rtl" }
                            },
                            [
                              _c(
                                "inertia-link",
                                {
                                  attrs: { href: article.page.slug + "/" + "" }
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "d-flex align-items-center"
                                    },
                                    [
                                      _c("img", {
                                        staticClass: "rounded-circle ml-2",
                                        attrs: {
                                          width: "60",
                                          src: article.page.profile
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "d-flex flex-column" },
                                        [
                                          _c(
                                            "strong",
                                            { staticClass: "text-white" },
                                            [
                                              _vm._v(
                                                " " +
                                                  _vm._s(article.page.name) +
                                                  " "
                                              ),
                                              article.page.is_verified === 1
                                                ? _c(
                                                    "i",
                                                    {
                                                      staticClass:
                                                        "verificationcheck"
                                                    },
                                                    [_vm._v("check_circle")]
                                                  )
                                                : _vm._e()
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "small",
                                            { staticClass: "text-white" },
                                            [
                                              _vm._v(
                                                _vm._s(article.page.short_bio)
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  )
                }),
                0
              )
            ],
            1
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-body" }, [
      _c("h3", { staticClass: "text-center text-action font-18" }, [
        _vm._v("فقط به روی تولید محتوا تمرکز کنید")
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "text-center font-16" }, [
        _vm._v(
          "دغــدغه طــراحی، تــوسـعه، سـئو و... را کنـار بـگـذارید، فـقـط به روی تولید محتوا و معرفی بـرند خودتان تمرکز کنید، ما اینجا هستیم که به شما کمک کنیم."
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-body" }, [
      _c("h3", { staticClass: "text-center text-action font-18" }, [
        _vm._v("موقعیت شغلی مناسب خود را پیدا کنید")
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "text-center font-16" }, [
        _vm._v(
          "مـجــله و روزنامه و گــشت و گــذار در صدها وبسایت مختلف را کنار بگذارید، مـا در تـرنوبو به شما کمک می‌کنیم که بهترین و مناسب‌ترین مــوقعـیت‌های شغلی را بسته به مهارتتان پیدا کنید."
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-body" }, [
      _c("h3", { staticClass: "text-center text-action font-18" }, [
        _vm._v("رزومه خود را در اختیار دیگران قرار دهید")
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "text-center font-16" }, [
        _vm._v(
          "رزومه خودتان را به سادگی در ترنوبو اضافه کنید تا بتوانید هرچه بهتر خود را به دیگران معرفی کنید و پیشنهادات کاری خودتان را مدیریت کنید."
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "d-flex justify-content-center py-5" }, [
      _c(
        "a",
        {
          staticClass: "btn text-white btn-grey",
          attrs: { "data-toggle": "modal", "data-target": "#signupmodal" }
        },
        [_vm._v("همین حالا ثبت‌نام کنید")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c(
        "div",
        { staticClass: "section-3 d-flex justify-content-center pb-5" },
        [
          _c(
            "div",
            {
              staticClass: "text-center flex-column d-flex align-items-center"
            },
            [
              _c("h2", { staticClass: "text-action pt-5 font-32 sptitle" }, [
                _vm._v("نوشتن یا ارسال مقاله")
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "pt-2 mt-3 font-16 spPr" }, [
                _vm._v(
                  "بدون هیچ محدودیتی تمام نوشته‌های خود را در ترنوبو و به کمک ویرایشگر آنلاین متن ما ویرایش و منتشر کنید."
                )
              ]),
              _vm._v(" "),
              _c("img", { attrs: { src: "/images/svg 2.svg", width: "400" } }),
              _vm._v(" "),
              _c(
                "h2",
                { staticClass: "text-action font-32 tellTOusText sptitle" },
                [_vm._v("گفتگو با دیگران")]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "pt-2 pb-5 font-16 spPr" }, [
                _vm._v(
                  "ایمیل را کنار بگذارید! با استفاده از قابلیت ارسال پیام ترنوبو، تمامی پیام‌ها و مکالمات کاری و حرفه‌ای خودتان را بر بستر ترنوبو انجام دهید. برقراری ارتباط با وجود قابلیت چت آنلاین ترنوبو بیش از پیش آسان شده‌. بدون محدودیت و بر بستری امن می‌توانید با تمام دوستانتان به گفتگو بپردازید. "
                )
              ]),
              _vm._v(" "),
              _c("img", { attrs: { src: "/images/svg 3.svg", width: "400" } }),
              _vm._v(" "),
              _c(
                "h2",
                { staticClass: "text-action pt-5 pb-2 font-32 sptitle" },
                [_vm._v("ایجاد رزومه آنلاین")]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "pb-5 font-16 spPr" }, [
                _vm._v(
                  "طراحی و آماده‌سازی یک رزومه کامل، بی‌نقص و حرفه‌ای دغدغه‌ای است که همه ما به نوعی با آن درگیر هستیم، به کمک ترنوبو شما می‌توانید رزومه آنلاین خودتان را در کوتاه‌ترین زمان و به سادگی هرچه تمام‌تر در کمتر از ۲ دقیقه ایجاد و آن را به صورت فایل PDF هم دریافت نمایید."
                )
              ]),
              _vm._v(" "),
              _c("img", { attrs: { src: "/images/svg 4.svg", width: "400" } }),
              _vm._v(" "),
              _c("div", { staticClass: "py-5" }, [
                _c(
                  "a",
                  {
                    staticClass: "btn text-white btn-grey",
                    attrs: {
                      "data-toggle": "modal",
                      "data-target": "#signupmodal"
                    }
                  },
                  [_vm._v("همین حالا ثبت‌نام کنید")]
                )
              ])
            ]
          )
        ]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Welcome.vue?vue&type=template&id=317d1a6e&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/Pages/Welcome.vue?vue&type=template&id=317d1a6e& ***!
  \*****************************************************************************************************************************************************************************************************/
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
    { staticClass: "container-fluid" },
    [
      _c("LoginModal", {
        attrs: { show: _vm.showLogin },
        on: {
          "update:show": function($event) {
            _vm.showLogin = $event
          }
        }
      }),
      _vm._v(" "),
      _c("LawsModal", {
        attrs: { show: _vm.showLaws },
        on: {
          "update:show": function($event) {
            _vm.showLaws = $event
          }
        }
      }),
      _vm._v(" "),
      _c("SignupModal", {
        attrs: { show: _vm.showSignup },
        on: {
          "update:show": function($event) {
            _vm.showSignup = $event
          }
        }
      }),
      _vm._v(" "),
      _c(
        "b-sidebar",
        {
          attrs: {
            id: "sidebar",
            title: "",
            "backdrop-variant": "dark",
            right: "",
            backdrop: "",
            shadow: ""
          }
        },
        [
          _c(
            "div",
            [
              _c(
                "div",
                {
                  staticClass:
                    "b-sidebar-item w-100 d-flex justify-content-between align-items-center clickable",
                  staticStyle: { "overflow-x": "hidden" },
                  on: {
                    click: function($event) {
                      _vm.showLaws = !_vm.showLaws
                    }
                  }
                },
                [_vm._v("قوانین و مقررات")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "b-sidebar-item w-100 d-flex justify-content-between align-items-center",
                  staticStyle: { "overflow-x": "hidden" }
                },
                [
                  _c("span", [_vm._v("نمایش پس زمینه")]),
                  _vm._v(" "),
                  _c("switches", {
                    model: {
                      value: _vm.hasBG,
                      callback: function($$v) {
                        _vm.hasBG = $$v
                      },
                      expression: "hasBG"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _vm.$page.props.user
                ? _c(
                    "inertia-link",
                    {
                      staticClass:
                        "b-sidebar-item hover-danger w-100 d-flex justify-content-between align-items-center",
                      attrs: { href: "/logout", method: "post", as: "div" }
                    },
                    [
                      _c("span", [_vm._v("خروج از حساب کاربری")]),
                      _vm._v(" "),
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("power_settings_new")
                      ])
                    ]
                  )
                : _vm._e()
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "header-search d-flex justify-content-between align-items-center"
        },
        [
          _c("div", { staticClass: "menu d-flex" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "b-toggle",
                    rawName: "v-b-toggle.sidebar",
                    modifiers: { sidebar: true }
                  }
                ],
                staticClass: "clickable"
              },
              [
                _c(
                  "i",
                  {
                    staticClass: "material-icons header-btn",
                    class: { "text-dark": !_vm.hasBG, "text-white": _vm.hasBG }
                  },
                  [_vm._v("menu")]
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "mr-2 d-flex align-items-center" }, [
              _c("h1", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.$root.isDesktop,
                    expression: "$root.isDesktop"
                  }
                ],
                ref: "typewritingdescript",
                staticClass: "font-16 mb-0",
                class: { "text-dark": !_vm.hasBG, "text-white": _vm.hasBG }
              })
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "d-flex align-items-center" },
            [
              _vm.$page.props.user
                ? _c(
                    "inertia-link",
                    {
                      class: {
                        "text-dark": !_vm.hasBG,
                        "text-white": _vm.hasBG
                      },
                      attrs: { href: "/feed" }
                    },
                    [
                      _c(
                        "i",
                        {
                          staticClass: "navheader-icon material-icons-outlined",
                          class: {
                            "text-dark": !_vm.hasBG,
                            "text-white": _vm.hasBG
                          }
                        },
                        [_vm._v("home")]
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.$page.props.user
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-transparent font-14 py-1",
                      class: { "text-dark": !_vm.hasBG },
                      on: {
                        click: function($event) {
                          _vm.showLogin = !_vm.showLogin
                        }
                      }
                    },
                    [_vm._v("ورود")]
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.$page.props.user
                ? _c("span", { staticClass: "splitor-line" })
                : _vm._e(),
              _vm._v(" "),
              !_vm.$page.props.user
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-transparent font-14 py-1",
                      class: { "text-dark": !_vm.hasBG },
                      on: {
                        click: function($event) {
                          _vm.showSignup = !_vm.showSignup
                        }
                      }
                    },
                    [_vm._v("ثبت‌نام")]
                  )
                : _vm._e()
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "search-section", class: { noBG: !_vm.hasBG } },
        [
          _c(
            "form",
            {
              attrs: {
                action: "/search",
                id: "searchform",
                autocomplete: "off"
              }
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "content-body d-flex justify-content-center align-items-center flex-column"
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "col-md-6 p-0 d-flex justify-content-center align-items-center flex-column"
                    },
                    [
                      _vm.hasBG
                        ? _c("img", {
                            staticClass: "thelogo logo-type",
                            attrs: { src: "/images/logo-type.svg" }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.hasBG
                        ? _c("img", {
                            staticClass: "thelogo logo-type",
                            attrs: { src: "/images/logo-type-dark.svg" }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("autocomplete", {
                        staticClass: "w-100 search-box",
                        staticStyle: { "min-width": "270px" },
                        attrs: {
                          search: _vm.search,
                          id: "searchforminput",
                          autocomplete: "off",
                          required: "",
                          type: "text",
                          name: "q",
                          placeholder: "هر چیزی که در جستن آنی، آنی"
                        }
                      })
                    ],
                    1
                  )
                ]
              )
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "footer p-3 d-flex justify-content-between align-items-center"
        },
        [
          _vm.hasBG
            ? _c(
                "div",
                {
                  staticClass: "bg-downloader d-flex",
                  on: {
                    mouseenter: function($event) {
                      _vm.showDownloader = true
                    },
                    mouseleave: function($event) {
                      _vm.showDownloader = false
                    }
                  }
                },
                [
                  _c(
                    "i",
                    { staticClass: "material-icons-outlined text-white" },
                    [_vm._v("add_photo_alternate")]
                  ),
                  _vm._v(" "),
                  _c("transition", { attrs: { name: "fade" } }, [
                    _vm.showDownloader
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "d-flex py-2 copyright-bg px-4 bg-dark align-items-center text-white"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex flex-column justify-content-center"
                              },
                              [
                                _c(
                                  "b",
                                  {
                                    staticClass: "my-1",
                                    staticStyle: { "font-size": "0.8rem" }
                                  },
                                  [_vm._v("علی اطیابی")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "small",
                                  { staticStyle: { "font-size": "0.8rem" } },
                                  [_vm._v("تهران، تهران ایران")]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                staticClass: "d-flex align-items-center",
                                attrs: {
                                  download: "",
                                  href: "/images/search-background-2x.jpg"
                                }
                              },
                              [
                                _c(
                                  "i",
                                  {
                                    staticClass:
                                      "material-icons text-white mr-5"
                                  },
                                  [_vm._v("get_app")]
                                )
                              ]
                            )
                          ]
                        )
                      : _vm._e()
                  ])
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "clickable showlanding",
              class: { "bg-dark": !_vm.hasBG },
              on: {
                click: function($event) {
                  _vm.showLanding = true
                }
              }
            },
            [
              _c(
                "i",
                {
                  staticClass: "material-icons",
                  class: { "text-white": !_vm.hasBG }
                },
                [_vm._v("flight_land")]
              )
            ]
          ),
          _vm._v(" "),
          _vm.$root.isMobile
            ? _c("div", [
                _vm.hasBG
                  ? _c("img", {
                      staticClass: "thelogo",
                      staticStyle: { width: "24px" },
                      attrs: { src: "/images/logo-white.svg" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                !_vm.hasBG
                  ? _c("img", {
                      staticClass: "thelogo",
                      staticStyle: { width: "24px" },
                      attrs: { src: "/images/logo.svg" }
                    })
                  : _vm._e()
              ])
            : _c("div", [
                _vm.hasBG
                  ? _c("img", {
                      staticClass: "thelogo",
                      staticStyle: { width: "110px" },
                      attrs: { src: "/images/logo-en.svg" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                !_vm.hasBG
                  ? _c("img", {
                      staticClass: "thelogo",
                      staticStyle: { width: "110px" },
                      attrs: { src: "/images/logo-en-dark.svg" }
                    })
                  : _vm._e()
              ])
        ]
      ),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "slide" } },
        [
          _vm.showLanding
            ? _c("landing", { attrs: { articles: _vm.articles } })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/Components/App/Landing.vue":
/*!*************************************************!*\
  !*** ./resources/js/Components/App/Landing.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Landing_vue_vue_type_template_id_5ecd7ae4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Landing.vue?vue&type=template&id=5ecd7ae4& */ "./resources/js/Components/App/Landing.vue?vue&type=template&id=5ecd7ae4&");
/* harmony import */ var _Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Landing.vue?vue&type=script&lang=js& */ "./resources/js/Components/App/Landing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Landing_vue_vue_type_template_id_5ecd7ae4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Landing_vue_vue_type_template_id_5ecd7ae4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Components/App/Landing.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Components/App/Landing.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/App/Landing.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/Landing.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Components/App/Landing.vue?vue&type=template&id=5ecd7ae4&":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/App/Landing.vue?vue&type=template&id=5ecd7ae4& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_5ecd7ae4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Landing.vue?vue&type=template&id=5ecd7ae4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Components/App/Landing.vue?vue&type=template&id=5ecd7ae4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_5ecd7ae4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Landing_vue_vue_type_template_id_5ecd7ae4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/Pages/Welcome.vue":
/*!****************************************!*\
  !*** ./resources/js/Pages/Welcome.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Welcome_vue_vue_type_template_id_317d1a6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Welcome.vue?vue&type=template&id=317d1a6e& */ "./resources/js/Pages/Welcome.vue?vue&type=template&id=317d1a6e&");
/* harmony import */ var _Welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Welcome.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Welcome.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Welcome_vue_vue_type_template_id_317d1a6e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Welcome_vue_vue_type_template_id_317d1a6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Welcome.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Welcome.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/Pages/Welcome.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Welcome.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Welcome.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Welcome.vue?vue&type=template&id=317d1a6e&":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Welcome.vue?vue&type=template&id=317d1a6e& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Welcome_vue_vue_type_template_id_317d1a6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Welcome.vue?vue&type=template&id=317d1a6e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/Pages/Welcome.vue?vue&type=template&id=317d1a6e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Welcome_vue_vue_type_template_id_317d1a6e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Welcome_vue_vue_type_template_id_317d1a6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);