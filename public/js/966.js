(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[966],{966:(s,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});var e=a(9949),o=a(7430),n=a(9250);const l={methods:{savePassword:function(){var s=this,t=new FormData;if(this.password===this.password_repeat){t.append("currentpassword",this.current_password),t.append("password",this.password);var a={method:"post",url:this.$APP_URL+"/auth/change-password",data:t};axios(a).then((function(t){t.data.result?(s.loading=!1,s.$emit("update:show",!1),window.location=s.$APP_URL):s.toast("رمزعبور فعلی نامعتبر است.")})).catch((function(t){s.loading=!1}))}else this.toast("رمزعبور و تاییدیه آن برابر نیست")}},props:{value:{default:null}},mounted:function(){this.phone=this.value},data:function(){return{loading:!1,current_password:null,password:null,password_repeat:null}},components:{LoadingButton:o.Z,LoadingSpinner:n.Z},mixins:[e.Z],name:"PasswordModal"};const r=(0,a(1900).Z)(l,(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("b-modal",{attrs:{"hide-footer":"",title:"تغییر رمزعبور","body-class":"modal-signup",size:"md",centered:!0},model:{value:s.showModal,callback:function(t){s.showModal=t},expression:"showModal"}},[a("div",{staticClass:"d-flex flex-column align-items-center"},[a("div",{staticClass:"d-flex w-100 flex-column",staticStyle:{"align-items":"center"}},[a("material-text-field",{staticClass:"material--sm w-50 mx-1 text-right mb-4",attrs:{"input-class":"w-100",type:"password",name:"current_password",placeholder:"رمزعبور فعلی"},model:{value:s.current_password,callback:function(t){s.current_password=t},expression:"current_password"}}),s._v(" "),a("material-text-field",{staticClass:"material--sm w-50 mx-1 text-right mb-4",attrs:{"input-class":"w-100",type:"password",name:"password",placeholder:"رمزعبور"},model:{value:s.password,callback:function(t){s.password=t},expression:"password"}}),s._v(" "),a("material-text-field",{staticClass:"material--sm w-50 mx-1 text-right",attrs:{"input-class":"w-100",type:"password",name:"password",placeholder:"تکرار رمزعبور"},model:{value:s.password_repeat,callback:function(t){s.password_repeat=t},expression:"password_repeat"}})],1),s._v(" "),a("div",{staticClass:"mt-5"},[a("p",{staticClass:"font-18"},[s._v("نکات امنیتی")]),s._v(" "),a("ul",{staticClass:"font-14 p-0",staticStyle:{"list-style":"none"}},[a("li",[s._v("رمزعبور حداقل ۸ کاراکتر باشد")]),s._v(" "),a("li",[s._v("بهتر است که از حروف کوچک، بزرگ و سمبل‌ها در رمزعبور خود استفاده کنید.")])])]),s._v(" "),a("LoadingButton",{staticClass:"btn btn-dark mx-auto mt-4 signup-save-btn",attrs:{loading:s.loading},nativeOn:{click:function(t){return s.savePassword(t)}}},[s._v("تایید")])],1)])}),[],!1,null,null,null).exports}}]);