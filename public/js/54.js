(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{yBUj:function(t,e,a){"use strict";a.r(e);var i=a("Ql3O"),n=a("xBln"),o=a("mRTQ"),l={methods:{sendVcode:function(){var t=this;this.loading=!0;var e=new FormData;e.append("email",this.email);var a={method:"post",url:this.$APP_URL+"/auth/verification",data:e};axios(a).then((function(e){if(e.data.result)t.verification_step=!0;else{var a=e.data.errors;t.handleError(a)}t.loading=!1})).catch((function(e){t.loading=!1}))},verifyCode:function(){var t=this;this.loading=!0;var e=new FormData;e.append("code",this.code);var a={method:"post",url:this.$APP_URL+"/auth/verify-email",data:e};axios(a).then((function(e){e.data.result?(t.$emit("update:show",!1),t.$emit("updated",t.email)):t.toast("کد تایید نامعتبر است"),t.loading=!1})).catch((function(e){t.loading=!1}))}},props:{value:{default:null}},mounted:function(){this.email=this.value},data:function(){return{loading:!1,code:null,verification_step:!1,email:null}},components:{LoadingButton:n.a,LoadingSpinner:o.a},mixins:[i.a],name:"EmailModal"},s=a("KHd+"),r=Object(s.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-modal",{attrs:{"hide-footer":"",title:"ثبت / ویرایش ایمیل","body-class":"modal-signup",size:"md",centered:!0},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[a("div",{staticClass:"d-flex ephone-input-group py-0 justify-content-between align-items-center"},[a("LoadingButton",{staticClass:"btn signup-save-btn btn-dark",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.sendVcode()}}},[t._v("ثبت")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control mx-1 text-left",attrs:{type:"tel",readonly:t.verification_step,placeholder:"example@ternobo.com"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})],1),t._v(" "),a("transition",{attrs:{name:"slide"}},[t.verification_step?a("div",[a("label",{staticClass:"ml-1 mt-2 text-left clickable",on:{click:function(e){t.verification_step=!1}}},[t._v("ایمیل اشتباه است؟")]),t._v(" "),a("div",{staticClass:"input-group d-flex align-items-center flex-column justify-content-center mt-4"},[a("label",{staticClass:"w-100"},[t._v("کد تایید خود ‌را وارد کنید")]),t._v(" "),a("div",{staticClass:"input-group-icon"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"form-control mx-1 text-center",attrs:{type:"tel",placeholder:"111111",maxlength:"6"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),a("i",{staticClass:"material-icons-outlined"},[t._v("verified_user")])])]),t._v(" "),a("LoadingButton",{staticClass:"btn btn-dark mx-3 mt-4 w-50",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.verifyCode(e)}}},[t._v("بعدی")])],1):t._e()])],1)}),[],!1,null,null,null);e.default=r.exports}}]);