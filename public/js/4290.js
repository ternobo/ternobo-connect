(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[4290],{4290:(t,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>n});const e={data:function(){return{loading:!1,password:null}},methods:{deactive:function(){var t=this;null!=this.password&&(this.loading=!0,axios.post("/auth/deactive",{password:this.password}).then((function(s){s.data.result?window.location="/":t.handleError(s.data.errors),t.loading=!1})).catch((function(s){return t.loading=!0})))}},mixins:[a(9949).Z],name:"DeactiveModal"};const n=(0,a(1900).Z)(e,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("b-modal",{attrs:{"hide-footer":"",title:"غیرفعال کردن حساب","body-class":"modal-signup",size:"lang",centered:!0},model:{value:t.showModal,callback:function(s){t.showModal=s},expression:"showModal"}},[a("div",{staticClass:"d-flex flex-column align-items-center"},[a("div",{staticClass:"d-flex w-100 flex-column",staticStyle:{"align-items":"center"}},[a("material-text-field",{staticClass:"material--sm w-50 mx-1 text-right my-4",attrs:{"input-class":"w-100",required:!0,type:"password",name:"current_password",placeholder:"رمزعبور"},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}})],1),t._v(" "),a("div",{staticClass:"mt-3"},[a("p",[t._v("به این مورد توجه داشته باشید که در صورتی که حساب کاربری خود را غیرفعال کنید، محتوا و صفحه شما برای دیگر کاربران از دسترس خارج می‌شود.")]),t._v(" "),a("p",[t._v("در صورتی بیش از "),a("strong",{staticClass:"text-danger"},[t._v("۲ سال")]),t._v(" حساب کاربری شما غیرفعال باشد تمامی اطلاعات«پست‌ها، مقالات، اطلاعات پروفایل و صفحه شخصی و صفحات شرکتی» شما به طور "),a("strong",{staticClass:"text-danger"},[t._v("غیرقابل بازگشتی")]),t._v(" حذف خواهد شد.")]),t._v(" "),a("strong",{staticClass:"text-warning"},[t._v(" حساب شما تا زمانی که مجدد وارد نشده‌ای غیرفعال خواهد بود. ")])]),t._v(" "),a("loading-button",{staticClass:"btn btn-dark mx-auto mt-4 w-50",attrs:{loading:t.loading,disabled:!(null!=this.password&&this.password.length>0)},nativeOn:{click:function(s){return t.deactive(s)}}},[t._v("غیرفعال کردن حساب")])],1)])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=4290.js.map