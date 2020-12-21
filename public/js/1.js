(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"1y+g":function(t,e,s){"use strict";var a=s("Ql3O"),i=s("osEC"),n={methods:{cropImage:function(){var t=this,e=this.$refs.cropper.getResult(),s=e.canvas,a=e.coordinates;s.toBlob((function(e){t.$emit("cropped",a,s),t.$emit("update:show",!1)}))}},props:{image:{default:void 0,required:!0},aspectRatio:{default:16/12,required:!1},title:{type:String,default:void 0,required:!0}},components:{Cropper:i.a},mixins:[a.a]},o=s("KHd+"),l=Object(o.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"no-close-on-backdrop":"","hide-footer":"",title:t.title,size:"lg",centered:!0},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[s("cropper",{ref:"cropper",staticClass:"cropper",attrs:{src:t.image,"stencil-props":{aspectRatio:t.aspectRatio}}}),t._v(" "),s("div",{staticClass:"w-100 align-items-center py-3 px-2 d-flex"},[s("button",{staticClass:"btn btn-primary",on:{click:t.cropImage}},[t._v("تایید")])])],1)}),[],!1,null,null,null);e.a=l.exports},Oe0w:function(t,e,s){"use strict";s.r(e);var a=s("lb/t"),i=s("yfBN"),n=s("lh7E"),o={name:"UserMenu"},l=s("KHd+"),r={props:{},name:"HeaderToolbar",data:function(){return{menuVisible:!1,menuLeft:0,showLogin:!1,showSignup:!1}},methods:{showUserMenu:function(t){this.menuVisible=!0;var e=document.getElementById("usermenu-show").getBoundingClientRect().x;this.menuLeft=e+"px"}},components:{UserMenu:Object(l.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return null!=t.$page.props.user?s("div",{staticClass:"usermenu card"},[s("div",{staticClass:"card-header px-2 d-flex bg-white border-bottom"},[s("inertia-link",{staticClass:"d-flex aling-items-center",attrs:{href:"/"+this.$page.props.user.username}},[s("img",{staticClass:"profile-sm",attrs:{src:this.$page.props.user.profile}}),t._v(" "),s("span",{staticClass:"mx-2 d-flex flex-column justify-content-center"},[s("strong",{staticClass:"text-black"},[t._v(t._s(this.$page.props.user.name)+"\n\t\t\t\t\t"),1===this.$page.props.user.is_verified?s("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),s("small",[t._v(t._s(this.$page.props.user.short_bio))])])])],1),t._v(" "),s("div",{staticClass:"card-body p-0"},[s("ul",{staticClass:"list-group list-group-flush"},[s("li",{staticClass:"list-group-item headermenu-item d-flex flex-column px-2 pt-3"},[s("inertia-link",{staticClass:"m-0",attrs:{href:"/settings"}},[s("i",{staticClass:"material-icons-outlined"},[t._v("settings")]),t._v(" تنظیمات و حریم خصوصی ")])],1),t._v(" "),s("li",{staticClass:"list-group-item border-top-0 headermenu-item d-flex flex-column pb-3 px-2"},[s("inertia-link",{staticClass:"m-0",attrs:{href:"/ideas"}},[s("i",{staticClass:"material-icons-outlined"},[t._v("emoji_objects")]),t._v(" ایده‌های شما ")])],1),t._v(" "),s("li",{staticClass:"list-group-item headermenu-item d-flex flex-column px-2 pb-2"},[s("inertia-link",{staticClass:"text-right bg-transparent hover-danger m-0 border-0 text-grey",attrs:{href:"/logout",method:"post",as:"button"}},[s("i",{staticClass:"material-icons"},[t._v("power_settings_new")]),t._v(" خروج ")])],1)])])]):t._e()}),[],!1,null,null,null).exports,LoginModal:i.a,SignupModal:n.a}},c=Object(l.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toolbar"},[null!=t.$page.props.user?s("div",{staticClass:"header-menu"},[s("inertia-link",{class:{active:"/feed"===t.$root.url},attrs:{href:"/feed"}},[s("i",{staticClass:"navheader-icon"},[t._v("home")]),t._v(" "),s("div",{staticClass:"navheader-text"},[t._v("خانه")])]),t._v(" "),s("inertia-link",{class:{active:"/connections"===t.$root.url},attrs:{href:"/connections"}},[s("i",{staticClass:"navheader-icon"},[t._v("group")]),t._v(" "),s("div",{staticClass:"navheader-text"},[t._v("شبکه من")])]),t._v(" "),s("inertia-link",{class:{active:"/notifications"===t.$root.url},attrs:{href:"/notifications"}},[s("i",{staticClass:"navheader-icon",class:{unread:t.$page.props.notifications_count>0}},[t._v(t._s("/notifications"===t.$root.url?"notifications":"notifications_none"))]),t._v(" "),s("div",{staticClass:"navheader-text"},[t._v("اعلان‌ها")])]),t._v(" "),s("inertia-link",{class:{active:"/bookmarks"===t.$root.url},attrs:{href:"/bookmarks"}},[s("i",{staticClass:"navheader-icon"},[t._v("bookmarks")]),t._v(" "),s("div",{staticClass:"navheader-text"},[t._v("نشان‌ها")])])],1):s("div",[s("login-modal",{attrs:{show:t.showLogin},on:{"update:show":function(e){t.showLogin=e}}}),t._v(" "),s("signup-modal",{attrs:{show:t.showSignup},on:{"update:show":function(e){t.showSignup=e}}}),t._v(" "),s("div",{staticClass:"d-flex align-items-center"},[s("button",{staticClass:"text-dark btn btn-transparent font-14 py-1",on:{click:function(e){t.showLogin=!0}}},[t._v("ورود")]),t._v(" "),s("span",{staticClass:"splitor-line"}),t._v(" "),s("button",{staticClass:"text-dark btn btn-transparent font-14 py-1",on:{click:function(e){t.showSignup=!0}}},[t._v("ثبت‌نام")])])],1),t._v(" "),null!=t.$page.props.user?s("div",{staticClass:"usertoolbar h-100 d-flex align-items-center mr-2 py-3",attrs:{id:"usermenu-show"},on:{mouseenter:t.showUserMenu,mouseleave:function(e){t.menuVisible=!1}}},[s("div",{staticClass:"d-flex align-items-center"},[s("div",{staticClass:"d-flex align-items-center"},[s("span",{staticClass:"ml-2",staticStyle:{"white-space":"nowrap","user-select":"none"},attrs:{dir:"ltr"}},[t._v(t._s(t.$page.props.user.username)+" "),1===t.$page.props.user.is_verified?s("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),s("img",{staticClass:"profile-xsm",attrs:{src:t.$page.props.user.profile}})]),t._v(" "),s("i",{staticClass:"material-icons text-light"},[t._v("more_vert")])]),t._v(" "),s("transition",{attrs:{name:"fade",mode:"out-in"}},[s("user-menu",{directives:[{name:"show",rawName:"v-show",value:t.menuVisible,expression:"menuVisible"}],style:{left:t.menuLeft}})],1)],1):t._e()])}),[],!1,null,null,null).exports,d=s("Ql3O"),u={data:function(){return{showLogin:!1,showSignup:!1}},components:{LoginModal:i.a,SignupModal:n.a},methods:{onShow:function(){var t=this;setTimeout((function(){t.$refs.modal.$refs.dialog.style.marginTop="0"}),100)}},mixins:[d.a],name:"UserOptionModal"},p=Object(l.a)(u,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("login-modal",{attrs:{show:t.showLogin},on:{"update:show":function(e){t.showLogin=e}}}),t._v(" "),s("signup-modal",{attrs:{show:t.showSignup},on:{"update:show":function(e){t.showSignup=e}}}),t._v(" "),s("b-modal",{ref:"modal",attrs:{"hide-footer":"","hide-header":"","body-class":"pb-0",size:"lg"},on:{show:t.onShow},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[t.$page.props.user?s("div",{staticClass:"useroptions"},[s("div",{staticClass:"useroptions-header"},[s("inertia-link",{staticClass:"d-flex aling-items-center",attrs:{href:"/"+t.$page.props.user.username},on:{click:function(e){return t.$emit("update:show",!1)}}},[s("img",{staticClass:"profile-sm",attrs:{src:t.$page.props.user.profile}}),t._v(" "),s("span",{staticClass:"mx-2 d-flex flex-column justify-content-center"},[s("strong",{staticClass:"text-black"},[t._v(t._s(t.$page.props.user.name)+"\n\t\t\t\t\t\t\t"),1===t.$page.props.user.is_verified?s("i",{staticClass:"position-relative verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),s("small",[t._v(t._s(t.$page.props.user.short_bio))])])]),t._v(" "),s("i",{staticClass:"close material-icons text-muted hover-dark",on:{click:function(e){return t.$emit("update:show",!1)}}},[t._v("close")])],1),t._v(" "),s("ul",{staticClass:"p-0 menu"},[s("li",{staticClass:"list-item d-flex flex-column"},[s("inertia-link",{staticClass:"m-0",attrs:{href:"/settings"},on:{click:function(e){return t.$emit("update:show",!1)}}},[s("i",{staticClass:"material-icons-outlined"},[t._v("settings")]),t._v(" تنظیمات و حریم خصوصی ")])],1),t._v(" "),s("li",{staticClass:"list-item d-flex flex-column"},[s("inertia-link",{staticClass:"m-0",attrs:{href:"/ideas"},on:{click:function(e){return t.$emit("update:show",!1)}}},[s("i",{staticClass:"material-icons-outlined"},[t._v("emoji_objects")]),t._v(" صدای شما ")])],1),t._v(" "),s("li",{staticClass:"list-item d-flex flex-column"},[s("inertia-link",{staticClass:"m-0",attrs:{href:"/help"},on:{click:function(e){return t.$emit("update:show",!1)}}},[s("i",{staticClass:"material-icons-outlined"},[t._v("help_outline")]),t._v(" مرکز راهنمایی ")])],1)]),t._v(" "),s("div",{staticClass:"langs"},[s("div",{staticClass:"lang-item disabled"},[s("img",{attrs:{src:"/img/franch.png",width:"24",height:"24"}}),t._v(" "),s("span",[t._v("Française")])]),t._v(" "),s("div",{staticClass:"lang-item disabled"},[s("img",{attrs:{src:"/img/en.png",width:"24",height:"24"}}),t._v(" "),s("span",[t._v("English")])]),t._v(" "),s("div",{staticClass:"lang-item"},[s("img",{attrs:{src:"/img/iranicon.png",width:"24",height:"24"}}),t._v(" "),s("span",[t._v("فارسی")])])]),t._v(" "),s("ul",{staticClass:"mb-0 p-0"},[s("li",{staticClass:"list-item"},[s("inertia-link",{staticClass:"text-right bg-transparent hover-danger m-0 border-0 text-grey",attrs:{href:"/logout",method:"post",as:"button"},on:{click:function(e){return t.$emit("update:show",!1)}}},[s("i",{staticClass:"material-icons"},[t._v("power_settings_new")]),t._v(" خروج ")])],1)])]):s("div",{staticClass:"useroptions"},[s("ul",{staticClass:"p-0 menu"},[s("li",{staticClass:"list-item d-flex flex-column"},[s("a",{staticClass:"clickable m-0",on:{click:function(e){t.$emit("update:show",!1),t.showLogin=!0}}},[s("i",{staticClass:"material-icons-outlined"},[t._v("login")]),t._v(" ورود ")])]),t._v(" "),s("li",{staticClass:"list-item d-flex flex-column"},[s("a",{staticClass:"clickable m-0",on:{click:function(e){t.$emit("update:show",!1),t.showSignup=!0}}},[s("i",{staticClass:"material-icons-outlined"},[t._v("account_circle")]),t._v(" ثبت‌نام ")])])])])])],1)}),[],!1,null,null,null).exports,m={data:function(){return{searchVal:this.$page.props.search?this.$page.props.search:"",showOptions:!1}},methods:{search:function(t){var e=this,s=document.getElementById("searchforminput").parentElement;return s.style.position="unset",s.getElementsByClassName("autocomplete-result-list").length>0&&(s.getElementsByClassName("autocomplete-result-list")[0].style.width=s.getBoundingClientRect().width+"px",s.getElementsByClassName("autocomplete-result-list")[0].style.marginTop="-14px"),t.length<2?[]:new Promise((function(s,a){axios.post(e.$APP_URL+"/search",{q:t}).then((function(t){t.data.result?s(t.data.suggestions):s([])}))}))}},name:"AppHeader",components:{HeaderToolbar:c,Autocomplete:a.a,UserOptionModal:p}},h=Object(l.a)(m,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("user-option-modal",{attrs:{show:t.showOptions},on:{"update:show":function(e){t.showOptions=e}}}),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"d-flex align-items-center w-100"},[t.$root.isDesktop?s("inertia-link",{staticClass:"logodesktop",attrs:{href:"/feed"}},[s("img",{staticClass:"w-100",attrs:{src:"/images/farsi-logo.png"}})]):t._e(),t._v(" "),t.$root.isDesktop?t._e():s("inertia-link",{staticClass:"logo-sm",attrs:{href:"/feed"}},[s("img",{staticClass:"mr-2",attrs:{src:"/images/logo.svg"}})]),t._v(" "),s("form",{staticClass:"searchfield d-flex mr-3",attrs:{method:"get",action:"/search"}},[s("autocomplete",{staticClass:"search-field w-100",attrs:{"default-value":t.searchVal,search:t.search,id:"searchforminput",autocomplete:"off",required:"",type:"text",name:"q",placeholder:"هر چیزی که در جستن آنی، آنی"}}),t._v(" "),t._m(0)],1),t._v(" "),t.$root.isDesktop?t._e():s("div",[s("i",{staticClass:"material-icons hover-dark clickable",on:{click:function(e){t.showOptions=!0}}},[t._v("more_vert")])])],1),t._v(" "),t.$root.isDesktop?s("div",{staticClass:"d-flex align-items-center justify-content-end",staticStyle:{"min-width":"400px"}},[s("header-toolbar")],1):t._e()])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"text-muted align-items-center justify-content-center d-lg-flex d-none nowrap font-12",staticStyle:{width:"max-content","margin-right":"24px !important"}},[e("img",{staticClass:"verical-middle",attrs:{src:"/images/beta.svg",width:"36"}}),this._v(" "),e("span",{staticClass:"mx-1 text-nowrap",staticStyle:{"margin-top":"3px"}},[this._v("۰.۵ V")])])}],!1,null,null,null);e.default=h.exports},Ql3O:function(t,e,s){"use strict";var a={created:function(){this.showModal=this.show},data:function(){return{showModal:!1}},watch:{show:function(t){this.showModal=this.show},showModal:function(t){this.$emit("update:show",t)}},props:{show:{type:Boolean,default:!1,required:!1}}};e.a=a},bQg6:function(t,e,s){"use strict";var a=s("1y+g"),i=s("Wz0r"),n=(s("0YuL"),{watch:{src:function(t){this.picture=t}},created:function(){this.picture=this.src},props:{canChange:{type:Boolean,default:!1,required:!1},src:{type:String,default:void 0,required:!0},size:{type:String,default:"profile-xlg",required:!1}},methods:{openFileSelect:function(){this.canChange&&this.$refs.imageFile.click()},imageSelect:function(t){var e=t.target;if(e.files&&e.files[0]){var s=t.target.files[0],a=s.type,i=URL.createObjectURL(s);a.startsWith("image")?(this.file=s,this.image=i,this.crop=!0):this.toast("فایل انتخابی تصویر نیست!")}},upload:function(t){var e=this;this.loading=!0;var s=new FormData;s.append("profile",this.file),s.append("sizes",JSON.stringify(t)),s.append("json",!0),axios.post(this.$APP_URL+"/setprofile",s).then((function(t){var s=t.data;if(s.result)i.Inertia.reload(),s.url&&(e.picture=s.url),e.$emit("updated");else{var a=s.errors;e.handleError(a)}})).then((function(){return e.loading=!1}))}},data:function(){return{crop:!1,image:"",file:null,loading:!1,picture:""}},components:{CropperModal:a.a}}),o=s("KHd+"),l=Object(o.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"profile-box clickable",class:t.size,on:{click:t.openFileSelect}},[t.canChange?s("CropperModal",{attrs:{title:"انتخاب تصویر پروفایل",show:t.crop,"aspect-ratio":1,image:t.image},on:{"update:show":function(e){t.crop=e},cropped:t.upload}}):t._e(),t._v(" "),t.canChange?s("input",{ref:"imageFile",staticClass:"d-none",attrs:{type:"file"},on:{change:t.imageSelect}}):t._e(),t._v(" "),s("lazy-image",{class:t.size,attrs:{src:t.picture,"img-class":"rounded-circle"}}),t._v(" "),t.canChange?s("i",{staticClass:"material-icons-outlined"},[t._v("camera_alt")]):t._e(),t._v(" "),t.loading?s("div",{staticClass:"position-absolute d-flex align-items-center justify-content-center profile-xlg",staticStyle:{top:"-3px",left:"-3px",right:"-3px",bottom:"-3px",width:"calc(100%+3px)",height:"calc(100%+3px)",background:"rgba(0, 0, 0, 0.5)"}},[s("loading-spinner")],1):t._e()],1)}),[],!1,null,null,null);e.a=l.exports},lh7E:function(t,e,s){"use strict";var a=s("Ql3O"),i=s("xBln"),n=s("bQg6"),o=s("Wz0r"),l=s("nzbj"),r={methods:{updateProfile:function(){o.Inertia.visit("/feed")},sendVcode:function(t){this.loading=!0;var e=this,s=new FormData;"email"===t?s.append("email",this.email):s.append("phone",this.phone_number);var a={method:"post",url:this.$APP_URL+"/auth/verification",data:s};axios(a).then((function(t){if(t.data.result)e.emailphone_step=!1,e.verification_step=!0;else{var s=t.data.errors;e.handleError(s)}e.loading=!1})).catch((function(t){e.loading=!1}))},verifyCode:function(){var t=this;this.loading=!0;var e=this,s=new FormData;s.append("code",this.code);var a={method:"post",url:this.$APP_URL+"/auth/verifycode",data:s};axios(a).then((function(e){e.data.result?(t.verification_step=!1,t.personal_info_step=!0,t.invalidCode=!1):t.invalidCode=!0,t.loading=!1})).catch((function(t){e.loading=!1})).then((function(){return t.completedCode=!0}))},savePersonal:function(){this.loading=!0;var t=this,e=new FormData;void 0!==this.first_name&&""!==this.first_name&&e.append("firstname",this.first_name),void 0!==this.last_name&&""!==this.last_name&&e.append("lastname",this.last_name),void 0!==this.username&&""!==this.username&&e.append("username",this.username),void 0!==this.gender&&e.append("gender",this.gender.code);var s={method:"post",url:this.$APP_URL+"/auth/signup",data:e};axios(s).then((function(e){if(e.data.result)t.personal_info_step=!1,t.password_step=!0;else{var s=e.data.errors;t.handleError(s)}t.loading=!1})).catch((function(e){t.loading=!1}))},savePassword:function(){var t=this,e=new FormData;if(this.password===this.password_repeat){this.loading=!0,e.append("password",this.password);var s={method:"post",url:this.$APP_URL+"/auth/setpassword",data:e};axios(s).then((function(e){if(e.data.result)t.password_step=!1,t.profile_step=!0;else{var s=e.data.errors;t.handleError(s)}t.loading=!1})).catch((function(e){t.loading=!1}))}else this.toast("رمزعبور و تاییدیه آن برابر نیست")}},data:function(){return{emailphone_step:!0,verification_step:!1,personal_info_step:!1,profile_step:!1,password_step:!1,phone_number:void 0,email:void 0,code:void 0,first_name:"",last_name:"",username:"",gender:void 0,password:"",password_repeat:"",profile:"/images/man-profile.png",loading:!1,invalidCode:!1,completedCode:!1}},mixins:[a.a],name:"SignupModal",components:{LoadingButton:i.a,ProfileImage:n.a,OtpInput:l.a}},c=s("KHd+"),d=Object(c.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"hide-footer":"","hide-header":"","body-class":"modal-signup",centered:!0},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[t.verification_step||t.emailphone_step?s("tabs",{on:{selected:function(e){t.emailphone_step=!0,t.verification_step=!1}}},[s("tab",{attrs:{name:"ایمیل",selected:!0}},[s("div",{staticClass:"input-group ephone-input-group d-flex align-items-center"},[t.verification_step?s("i",{staticClass:"material-icons-outlined text-superlight hover-danger",on:{click:function(e){t.emailphone_step=!0,t.verification_step=!1}}},[t._v("edit")]):s("LoadingButton",{staticClass:"signup-save-btn btn btn-dark",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.sendVcode("email")}}},[t._v("ثبت")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control mx-1 text-left",attrs:{dir:"ltr","input-class":"w-100",type:"email",readonly:t.verification_step,placeholder:"example@ternobo.com"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})],1)]),t._v(" "),s("tab",{attrs:{name:"شماره همراه"}},[s("div",{staticClass:"input-group ephone-input-group d-flex align-items-center"},[t.verification_step?s("i",{staticClass:"material-icons-outlined text-superlight hover-danger",on:{click:function(e){t.emailphone_step=!0,t.verification_step=!1}}},[t._v("edit")]):s("LoadingButton",{staticClass:"signup-save-btn btn btn-dark",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.sendVcode("phone")}}},[t._v("ثبت")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phone_number,expression:"phone_number"}],staticClass:"form-control mx-1 text-left",attrs:{dir:"ltr",type:"tel",readonly:t.verification_step,placeholder:"09123456789"},domProps:{value:t.phone_number},on:{input:function(e){e.target.composing||(t.phone_number=e.target.value)}}})],1)])],1):t._e(),t._v(" "),s("transition",{attrs:{name:"slide"}},[t.verification_step?s("div",{staticClass:"text-center"},[s("div",{staticClass:"input-group d-flex align-items-center flex-column justify-content-center mt-4"},[s("label",{staticClass:"w-100"},[t._v("کد "),s("strong",[t._v("تایید")]),t._v(" ارسال شده ‌را وارد کنید")]),t._v(" "),s("div",{staticClass:"d-flex justify-content-center"},[s("div",{staticClass:"d-flex align-items-center"},[s("otp-input",{staticClass:"material--sm mx-1 text-center",attrs:{"input-class":"w-100",numInputs:6},on:{completed:t.verifyCode},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t._v(" "),s("i",{staticClass:"material-icons-outlined mr-4",class:{"text-muted":!t.invalidCode&&!t.completedCode,"text-danger":t.invalidCode,"text-success":!t.invalidCode}},[t._v("verified_user")])],1)])]),t._v(" "),s("LoadingButton",{staticClass:"btn btn-dark mt-4",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.verifyCode(e)}}},[t._v("بعدی")])],1):t._e()]),t._v(" "),s("transition",{attrs:{name:"slide"}},[t.personal_info_step?s("div",{staticClass:"text-center"},[s("h5",{staticClass:"mb-4",staticStyle:{"border-bottom":"2px solid #000019",width:"fit-content","align-self":"center","margin-top":"20px",margin:"auto","padding-bottom":"10px","padding-left":"0","padding-right":"0"}},[t._v("اطلاعات تکمیلی")]),t._v(" "),s("div",[s("material-text-field",{staticClass:"material--sm mb-3",attrs:{"input-class":"w-100",placeholder:"نام"},model:{value:t.first_name,callback:function(e){t.first_name=e},expression:"first_name"}}),t._v(" "),s("material-text-field",{staticClass:"material--sm mb-3",attrs:{"input-class":"w-100",placeholder:"نام خانوادگی"},model:{value:t.last_name,callback:function(e){t.last_name=e},expression:"last_name"}}),t._v(" "),s("material-text-field",{staticClass:"material--sm mb-3",attrs:{"input-class":"w-100",placeholder:"نام کاربری"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),s("v-select",{staticClass:"datepicker-list",attrs:{placeholder:"جنسیت",dir:"rtl",options:[{label:"زن",code:"1"},{label:"مرد",code:"2"}]},scopedSlots:t._u([{key:"no-options",fn:function(){return[t._v("موردی یافت نشد")]},proxy:!0}],null,!1,1105869603),model:{value:t.gender,callback:function(e){t.gender=e},expression:"gender"}})],1),t._v(" "),s("LoadingButton",{staticClass:"btn btn-dark mx-auto mt-4 signup-save-btn",attrs:{loading:t.loading,disabled:!(t.first_name.length>0&&t.last_name.length>0&&t.username.length>0&&null!=t.gender)},nativeOn:{click:function(e){return t.savePersonal(e)}}},[t._v("بعدی")])],1):t._e()]),t._v(" "),s("transition",{attrs:{name:"slide"}},[t.password_step?s("div",{staticClass:"text-center"},[s("h5",{staticClass:"mb-4",staticStyle:{"border-bottom":"2px solid #000019",margin:"auto",width:"fit-content",display:"flex","justify-content":"center","margin-top":"20px","padding-bottom":"10px","padding-left":"0","padding-right":"0"}},[t._v("رمزعبور")]),t._v(" "),s("div",{staticClass:"d-flex flex-column",staticStyle:{"align-items":"center"}},[s("material-text-field",{staticClass:"material--sm w-50 mx-1 text-right",attrs:{"input-class":"w-100",type:"password",placeholder:"رمزعبور"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("material-text-field",{staticClass:"material--sm w-50 mx-1 text-right mt-3",attrs:{"input-class":"w-100",type:"password",placeholder:"تکرار رمزعبور"},model:{value:t.password_repeat,callback:function(e){t.password_repeat=e},expression:"password_repeat"}})],1),t._v(" "),s("div",{staticClass:"text-right mt-5 mx-auto",staticStyle:{"max-width":"80%"}},[s("p",{staticClass:"font-18 pr-3"},[t._v("نکات امنیتی")]),t._v(" "),s("ul",{staticClass:"font-14 pr-3",staticStyle:{"list-style":"none"}},[s("li",[t._v("رمزعبور حداقل ۸ کاراکتر باشد")]),t._v(" "),s("li",[t._v("بهتر است که از حروف کوچک، بزرگ و سمبل‌ها در رمزعبور خود استفاده کنید.")])])]),t._v(" "),s("LoadingButton",{staticClass:"btn btn-dark mx-auto mt-4 signup-save-btn",attrs:{loading:t.loading,disabled:!(t.password.length>0&&t.password.length)},nativeOn:{click:function(e){return t.savePassword(e)}}},[t._v("بعدی")])],1):t._e()]),t._v(" "),s("transition",{attrs:{name:"slide"}},[t.profile_step?s("div",{staticClass:"d-flex flex-column align-items-center"},[s("ProfileImage",{staticClass:"m-0",attrs:{canChange:!0,src:t.$APP_URL+"/images/man-profile.png"},on:{updated:t.updateProfile}}),t._v(" "),s("div",{staticClass:"d-flex mt-4 flex-column"},[s("span",{staticClass:"text-center"},[t._v("تصویر خود را وارد کنید")]),t._v(" "),s("inertia-link",{staticClass:"btn btn-dark mx-auto mt-4 signup-save-btn",staticStyle:{"white-space":"nowrap"},attrs:{href:"/feed",loading:t.loading}},[t._v("رد شدن")])],1)],1):t._e()])],1)}),[],!1,null,null,null);e.a=d.exports},nzbj:function(t,e,s){"use strict";var a={name:"SingleOtpInput",props:{value:{type:String},separator:{type:String},focus:{type:Boolean},inputClasses:{type:String},shouldAutoFocus:{type:Boolean},inputType:{type:String,default:function(){return"tel"}},isLastChild:{type:Boolean}},data:function(){return{model:this.value||""}},mounted:function(){this.$refs.input&&this.focus&&this.shouldAutoFocus&&this.$refs.input.focus()},watch:{value:function(t,e){t!==e&&(this.model=t)},focus:function(t,e){e!==t&&this.$refs.input&&this.focus&&(this.$refs.input.focus(),this.$refs.input.select())}},methods:{handleOnChange:function(){return this.model.length>1&&(this.model=this.model.slice(0,1)),this.$emit("on-change",this.model)},handleOnKeyDown:function(t){var e=t||window.event,s=e.which?e.which:e.keyCode;this.isCodeNumeric(s)||8===s||86===s||46===s?this.$emit("on-keydown",t):e.preventDefault()},isCodeNumeric:function(t){return t>=48&&t<=57||t>=96&&t<=105},handleOnPaste:function(t){return this.$emit("on-paste",t)},handleOnFocus:function(){return this.$refs.input.select(),this.$emit("on-focus")},handleOnBlur:function(){return this.$emit("on-blur")}}},i=s("KHd+"),n=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{display:"flex","align-items":"center"}},[s("div",t._g({staticClass:"otp-input-single material-textfield material--transparent material--sm"},t.$listeners),["checkbox"===t.inputType?s("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"}],ref:"input",staticClass:"input",class:t.inputClasses,attrs:{min:"0",max:"9",maxlength:"1",pattern:"[0-9]",type:"checkbox"},domProps:{checked:Array.isArray(t.model)?t._i(t.model,null)>-1:t.model},on:{input:t.handleOnChange,keydown:t.handleOnKeyDown,paste:t.handleOnPaste,focus:t.handleOnFocus,blur:t.handleOnBlur,change:function(e){var s=t.model,a=e.target,i=!!a.checked;if(Array.isArray(s)){var n=t._i(s,null);a.checked?n<0&&(t.model=s.concat([null])):n>-1&&(t.model=s.slice(0,n).concat(s.slice(n+1)))}else t.model=i}}}):"radio"===t.inputType?s("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"}],ref:"input",staticClass:"input",class:t.inputClasses,attrs:{min:"0",max:"9",maxlength:"1",pattern:"[0-9]",type:"radio"},domProps:{checked:t._q(t.model,null)},on:{input:t.handleOnChange,keydown:t.handleOnKeyDown,paste:t.handleOnPaste,focus:t.handleOnFocus,blur:t.handleOnBlur,change:function(e){t.model=null}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:t.model,expression:"model"}],ref:"input",staticClass:"input",class:t.inputClasses,attrs:{min:"0",max:"9",maxlength:"1",pattern:"[0-9]",type:t.inputType},domProps:{value:t.model},on:{input:[function(e){e.target.composing||(t.model=e.target.value)},t.handleOnChange],keydown:t.handleOnKeyDown,paste:t.handleOnPaste,focus:t.handleOnFocus,blur:t.handleOnBlur}})])])}),[],!1,null,null,null).exports,o={name:"OtpInput",components:{SingleOtpInput:n},props:{numInputs:{default:4},separator:{type:String,default:"**"},inputClasses:{type:String},inputType:{type:String,validator:function(t){return["number","tel","password"].includes(t)}},shouldAutoFocus:{type:Boolean,default:!1}},data:function(){return{activeInput:0,otp:[],oldOtp:[]}},methods:{handleOnFocus:function(t){this.activeInput=t},handleOnBlur:function(){this.activeInput=-1},checkFilledAllInputs:function(){return this.otp.join("").length===this.numInputs?(this.$emit("input",this.otp.join("")),this.$emit("completed"),this.$emit("input",this.otp.join(""))):"Wait until the user enters the required number of characters"},focusInput:function(t){this.activeInput=Math.max(Math.min(this.numInputs-1,t),0)},focusNextInput:function(){this.focusInput(this.activeInput+1)},focusPrevInput:function(){this.focusInput(this.activeInput-1)},changeCodeAtFocus:function(t){this.oldOtp=Object.assign([],this.otp),this.$set(this.otp,this.activeInput,t),this.oldOtp.join("")!==this.otp.join("")&&(this.$emit("on-change",this.otp.join("")),this.checkFilledAllInputs())},handleOnPaste:function(t){t.preventDefault();var e=t.clipboardData.getData("text/plain").slice(0,this.numInputs-this.activeInput).split("");if("number"===this.inputType&&!e.join("").match(/^\d+$/))return"Invalid pasted data";var s=this.otp.slice(0,this.activeInput).concat(e);return this.$set(this,"otp",s.slice(0,this.numInputs)),this.focusInput(s.slice(0,this.numInputs).length),this.checkFilledAllInputs()},handleOnChange:function(t){this.changeCodeAtFocus(t),this.focusNextInput()},clearInput:function(){this.otp.length>0&&this.$emit("on-change",""),this.otp=[],this.activeInput=0},handleOnKeyDown:function(t){switch(t.keyCode){case 8:t.preventDefault(),this.changeCodeAtFocus(""),this.focusPrevInput();break;case 46:t.preventDefault(),this.changeCodeAtFocus("");break;case 37:t.preventDefault(),this.focusPrevInput();break;case 39:t.preventDefault(),this.focusNextInput()}}}},l=Object(i.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{display:"flex","flex-direction":"row-reverse"}},["password"===t.inputType?s("input",{staticStyle:{display:"none"},attrs:{autocomplete:"off",name:"hidden",type:"text"}}):t._e(),t._v(" "),t._l(t.numInputs,(function(e,a){return s("single-otp-input",{key:a,attrs:{focus:t.activeInput===a,value:t.otp[a],separator:t.separator,"input-type":t.inputType,"input-classes":t.inputClasses,"is-last-child":a===t.numInputs-1,"should-auto-focus":t.shouldAutoFocus},on:{"on-change":t.handleOnChange,"on-keydown":t.handleOnKeyDown,"on-paste":t.handleOnPaste,"on-focus":function(e){return t.handleOnFocus(a)},"on-blur":t.handleOnBlur}})}))],2)}),[],!1,null,null,null);e.a=l.exports},yfBN:function(t,e,s){"use strict";var a=s("Ql3O"),i=s("nzbj"),n=s("Wz0r"),o={data:function(){return{input:void 0,loading:!1,passwordChage:!1,resetCode:void 0,password:void 0,password1:void 0}},methods:{changePassord:function(){var t=this;this.loading=!0,axios.post("updatepassword",{newpassword:this.password,code:this.resetCode}).then((function(e){var s=e.data;!1!==s?s.result?(n.Inertia.reload(),n.Inertia.visit("/feed")):t.handleError(s.errors):t.toast("همه فیلد‌ها اجباری است")})).then((function(){return t.loading=!1}))},sendResetCode:function(){var t=this;this.loading=!0,axios.post("rest-password",{input:this.input}).then((function(e){var s=e.data;!1!==s?s.result?(t.toast(s.msg),t.passwordChage=!0):t.handleError(s.errors):t.toast("همه فیلد‌ها اجباری است")})).then((function(){return t.loading=!1}))}},components:{MaterialTextField:s("ZEN3").a},mixins:[a.a],name:"ResetPasswordModal"},l=s("KHd+"),r=Object(l.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"hide-footer":"","hide-header":"",centered:!0},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[s("div",{staticClass:"d-flex flex-column w-100 aling-items-center"},[s("h5",{staticClass:"mt-0 font-16 text-center mb-4 w-25",staticStyle:{"border-bottom":"1px solid #000019",width:"fit-content","align-self":"center","margin-top":"20px","padding-bottom":"10px","padding-left":"0","padding-right":"0"}},[t._v("\n            بازیابی رمزعبور\n        ")])]),t._v(" "),t.passwordChage?s("div",{staticClass:"signup-login d-flex flex-column align-items-center justify-content-center clearfix"},[s("MaterialTextField",{staticClass:"material--sm mb-3",attrs:{placeholder:"کد بازیابی"},model:{value:t.resetCode,callback:function(e){t.resetCode=e},expression:"resetCode"}}),t._v(" "),s("MaterialTextField",{staticClass:"material--sm mb-3",attrs:{type:"password",placeholder:"رمزعبور جدید"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("MaterialTextField",{staticClass:"material--sm mb-3",attrs:{type:"password",placeholder:"تکرار رمزعبور جدید"},model:{value:t.password1,callback:function(e){t.password1=e},expression:"password1"}}),t._v(" "),s("loading-button",{staticClass:"btn btn-dark mt-2 w-50",attrs:{loading:t.loading,type:"button"},nativeOn:{click:function(e){return t.changePassord(e)}}},[t._v("\n            تغییر رمزعبور\n        ")])],1):s("div",{ref:"loginForm",staticClass:"signup-login d-flex flex-column align-items-center justify-content-center clearfix",attrs:{action:"javascript:;"}},[s("div",{staticClass:"w-100"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"form-control bg-transparent mb-2",attrs:{type:"text",name:"username",placeholder:"تلفن، ایمیل یا شناسه"},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}})]),t._v(" "),s("loading-button",{staticClass:"btn btn-dark mt-2 w-50",attrs:{loading:t.loading,type:"button"},nativeOn:{click:function(e){return t.sendResetCode(e)}}},[t._v("\n            ارسال کد بازیابی\n        ")])],1)])}),[],!1,null,null,null).exports,c={data:function(){return{password:void 0,username:void 0,resetpass:!1,loading:!1,loginStep:!0,VerifyStep:!1,recovery:!1,code:null,verifyText:"کد نمایان شده در اپلیکیشن تایید هویت را اینجا وارد کنید"}},methods:{onHide:function(){this.password=void 0,this.username=void 0,this.VerifyStep=!1,this.loginStep=!0,this.resetpass=!1,this.recovery=!1,this.code=null},verifyCode:function(){var t=this;if(null!=this.code){this.loading=!0;var e={code:this.code};this.recovery&&(e.type="recovery"),axios.post("/auth/verify-tfa",e).then((function(e){e.data.result?window.location="/feed":t.toast("کد ورودی نامعتبر است"),t.loading=!1})).catch((function(e){return t.loading=!0}))}},login:function(){var t=this;if(void 0!==this.username&&""!==this.username&&void 0!==this.password&&""!==this.password){this.loading=!0;var e=new FormData;e.append("username",this.username),e.append("password",this.password);var s={method:"post",url:this.$APP_URL+"/auth/login",data:e};axios(s).then((function(e){if(e.data.result)window.location="/feed";else if(e.data.two_factor)t.loginStep=!1,t.VerifyStep=!0,"email"==e.data.type?t.verifyText="کد ارسال شده با ایمیل خود را وارد کنید":"phone"==e.data.type&&(t.verifyText="کد ارسال شده با تلفن‌ خود را وارد کنید");else{var s=e.data.errors;Object.keys(s).forEach((function(e,a){t.$bvToast.toast(s[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(e){t.loading=!1,t.$bvToast.toast("خطا در برقراری ارتباط",{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}}},mixins:[a.a],components:{ResetPasswordModal:r,OtpInput:i.a},name:"LoginModal"},d=Object(l.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("ResetPasswordModal",{attrs:{show:t.resetpass},on:{"update:show":function(e){t.resetpass=e}}}),t._v(" "),s("b-modal",{attrs:{"hide-footer":"","hide-header":"","no-stacking":"",centered:!0},on:{hide:t.onHide},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[s("div",{staticClass:"d-flex flex-column w-100 aling-items-center"},[s("h5",{staticClass:"mt-0 font-16 text-center mb-4 w-25",staticStyle:{"border-bottom":"1px solid #000019",width:"fit-content","align-self":"center","margin-top":"20px","padding-bottom":"10px","padding-left":"0","padding-right":"0"}},[t._v("ورود")])]),t._v(" "),t.loginStep?s("div",{ref:"loginForm",staticClass:"signup-login d-flex flex-column align-items-center justify-content-center clearfix",attrs:{method:"POST",action:"javascript:;"}},[s("div",{staticClass:"w-100"},[s("material-text-field",{staticClass:"material--sm w-100 bg-transparent mb-2",attrs:{type:"text","input-class":"w-100",name:"username",placeholder:"تلفن، ایمیل یا شناسه"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),t._v(" "),s("div",{staticClass:"w-100",staticStyle:{"margin-top":"12px"}},[s("material-text-field",{staticClass:"material--sm w-100 bg-transparent",attrs:{type:"password","input-class":"w-100",name:"password",placeholder:"رمزعبور"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("a",{staticClass:"text-primary float-left font-11",staticStyle:{"margin-top":"3px"},on:{click:function(e){t.resetpass=!0}}},[t._v("فراموشی رمزعبور")])],1),t._v(" "),s("loading-button",{staticClass:"btn btn-dark mt-2",attrs:{loading:t.loading,type:"button"},nativeOn:{click:function(e){return t.login(e)}}},[t._v(" ورود ")])],1):t.VerifyStep?s("div",{ref:"loginForm",staticClass:"signup-login d-flex flex-column align-items-center justify-content-center clearfix",attrs:{method:"POST",action:"javascript:;"}},[s("p",{staticClass:"mb-3"},[t._v(t._s(t.verifyText))]),t._v(" "),s("div",{staticClass:"text-left mb-3"},[t.recovery?t._e():s("otp-input",{staticClass:"material--sm mb-1 text-center",attrs:{"input-class":"w-100",numInputs:6},on:{completed:t.verifyCode},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t._v(" "),t.recovery?t._e():s("small",{staticClass:"text-muted clickable",on:{click:function(e){t.recovery=!0}}},[t._v("استفاده از کد بازیابی")]),t._v(" "),t.recovery?s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"form-control",attrs:{placeholder:"کد بازیابی را وارد کنید",maxlength:"8"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}):t._e(),t._v(" "),t.recovery?s("small",{staticClass:"text-muted clickable",on:{click:function(e){t.recovery=!1}}},[t._v("استفاده از کد تایید")]):t._e()],1),t._v(" "),s("loading-button",{staticClass:"btn btn-dark",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.verifyCode(e)}}},[t._v("تایید")])],1):t._e()])],1)}),[],!1,null,null,null);e.a=d.exports}}]);