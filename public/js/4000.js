(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[4e3],{4e3:(s,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>d});var n=t(9949);const o={data:function(){return{loading:!1}},methods:{doDelete:function(){var s=this;axios.delete("/sessions/"+this.session.id).then((function(e){e.data.result?s.$emit("deleted"):s.toast("خطایی رخ داده"),s.loading=!1})).catch((function(e){s.toast("خطا در برقراری ارتباط"),s.loading=!1}))}},props:{canRemove:{type:Boolean,default:!0,required:!1},session:{type:Object,default:void 0,required:!0}}};var i=t(1900);const a=(0,i.Z)(o,(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"d-flex justify-content-between w-100 align-items-center"},[t("div",{staticClass:"d-flex align-items-center"},[t("i",{staticClass:"material-icons-outlined font-32 ml-2"},[s._v("\n      "+s._s(s.session.user_agent.isMobile?"phone_android":"computer")+"\n    ")]),s._v(" "),t("div",{staticClass:"d-flex flex-column"},[t("strong",{staticClass:"font-14"},[s._v(s._s(s.session.user_agent.platform))]),s._v(" "),t("div",{staticClass:"text-muted font-12"},[t("span",{staticClass:"ml-1",class:{"text-success":s.session.isActive}},[s._v(s._s(s.session.isActive?"همین دستگاه":s.time(s.session.updated_at)))]),s._v(" "),t("span",[s._v(s._s(s.session.location))])])])]),s._v(" "),s.canRemove?t("div",[s.loading&&!s.session.isActive?t("loading-spinner",{staticStyle:{height:"10px",width:"10px","border-width":"2px"}}):s.session.isActive?s._e():t("i",{staticClass:"material-icons text-muted hover-danger",on:{click:s.doDelete}},[s._v("close")])],1):s._e()])}),[],!1,null,null,null).exports;var l=t(3679);const c={data:function(){return{loading:!0,canRemove:!1,sessions:null}},methods:{onDelete:function(s){this.sessions.splice(s,1)},onShow:function(){var s=this;axios.post("/sessions").then((function(e){s.sessions=e.data.sessions,s.canRemove=e.data.canRemove,s.loading=!1})).catch((function(e){s.loading=!1}))}},mixins:[n.Z],components:{SessionItem:a,Skeleton:l.Od},name:"SessionsModal"};const d=(0,i.Z)(c,(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("b-modal",{attrs:{"hide-footer":"",title:"دستگاه‌های متصل",size:"md",centered:!0},on:{show:s.onShow},model:{value:s.showModal,callback:function(e){s.showModal=e},expression:"showModal"}},[s.loading?t("div",[t("Skeleton",{attrs:{count:5,height:3}})],1):t("div",[t("div",{staticClass:"row"},s._l(s.sessions,(function(e,n){return t("div",{key:"session_item_"+e.id,staticClass:"col-md-12 pb-3"},[t("session-item",{attrs:{"can-remove":s.canRemove,session:e},on:{deleted:function(e){return s.onDelete(n)}}})],1)})),0)])])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=4000.js.map