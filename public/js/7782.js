(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[7782],{7782:(t,n,e)=>{"use strict";e.r(n),e.d(n,{default:()=>s});const o={props:{phone:{type:String,default:void 0,required:!0}},created:function(){axios.post("/two-factor-auth/setup",{type:"phone"})},mounted:function(){this.countDownTimer()},methods:{resend:function(){this.countdown>0||(this.countdown=30*this.resendtimes,axios.post("/two-factor-auth/setup",{type:"phone"}),this.countDownTimer())},countDownTimer:function(){var t=this;this.countdown>0&&setTimeout((function(){t.countdown-=1,t.countDownTimer()}),1e3)},verify:function(){var t=this;null!=this.code&&this.code.length>0&&(this.loading=!0,axios.post("/two-factor-auth/enable",{type:"phone",code:this.code}).then((function(n){var e=n.data;e.result?t.$emit("enabled",JSON.parse(e.recovery)):t.toast("کد تایید نامعتبر است"),t.loading=!1})).catch((function(n){return t.loading=!1})))}},data:function(){return{loading:!1,code:null,qr:null,countdown:30,resendtimes:1}}};const s=(0,e(1900).Z)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"d-flex flex-column"},[e("div",[e("div",{staticClass:"d-flex justify-content-between align-content-center"},[e("strong",[t._v(" یک کد تایید برای شما ارسال شد ")]),t._v(" "),e("span",[t._v(t._s(t.phone))])]),t._v(" "),e("div",{staticClass:"d-flex justify-content-between mt-4 align-items-end"},[e("material-text-field",{staticClass:"material--sm",attrs:{placeholder:"کد را وارد کنید"},model:{value:t.code,callback:function(n){t.code=n},expression:"code"}}),t._v(" "),e("div",{staticClass:"d-flex justify-content-end",staticStyle:{height:"min-content"}},[e("button",{staticClass:"btn button-transparent",on:{click:function(n){return t.$emit("cancel")}}},[t._v("لغو")]),t._v(" "),e("loading-button",{staticClass:"btn btn-primary",attrs:{loading:t.loading},nativeOn:{click:function(n){return t.verify(n)}}},[t._v("تایید")])],1)],1),t._v(" "),e("div",{staticClass:"mt-2"},[e("span",{staticClass:"clickable",class:{"disabled text-muted":t.countdown>0,"text-action":!(t.countdown>0)},on:{click:t.resend}},[t._v("ارسال مجدد "+t._s(t.countdown>0?"("+t.countdown+")":""))])])])])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=7782.js.map