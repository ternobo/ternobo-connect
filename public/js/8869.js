(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[8869],{8869:(t,e,i)=>{"use strict";i.r(e),i.d(e,{default:()=>l});var a=i(9949);const s={props:{categories:{type:Array,default:[],required:!0},pageId:{type:Number,default:0,required:!0},activeCategory:{default:null}},mixins:[a.Z],name:"CategoriesList"};const l=(0,i(1900).Z)(s,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-modal",{attrs:{"hide-footer":"","modal-class":"slide-up",size:"md",centered:!0},scopedSlots:t._u([{key:"modal-header",fn:function(){return[i("div",{staticClass:"w-100 d-flex justify-content-between"},[i("div",[t.checkUser(t.pageId)?i("i",{staticClass:"material-icons-outlined btn d-flex align-items-center justify-content-center btn-edit",on:{click:function(e){return t.$emit("edit")}}},[t._v("edit")]):t._e()]),t._v(" "),i("div",{staticClass:"slideup-title"},[i("i",{staticClass:"material-icons"},[t._v("layers")]),t._v("\n\t\t\t\tدسته‌بندی‌ها\n\t\t\t")]),t._v(" "),i("i",{staticClass:"material-icons ml-1",on:{click:function(e){return t.$emit("update:show",!1)}}},[t._v("check")])])]},proxy:!0}]),model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[t._v(" "),i("p",{staticClass:"font-10"},[t._v("توجه داشته باشید که فقط "),i("strong",{staticClass:"text-dark"},[t._v("یک دسته بندی")]),t._v(" را می‌توانید به عنوان فیلتر استفاده کنید.")]),t._v(" "),i("ul",{staticClass:"categories-list-mobile"},t._l(t.categories,(function(e){return i("li",{key:"mobile_category_"+e.id,class:{active:e===t.activeCategory}},[e==t.activeCategory?i("i",{staticClass:"material-icons close-icon text-muted",on:{click:function(e){return t.$emit("update:activeCategory",null)}}},[t._v("close")]):t._e(),t._v(" "),i("div",{on:{click:function(i){return t.$emit("update:activeCategory",e)}}},[i("i",{staticClass:"material-icons-outlined"},[t._v("layers")]),t._v(" "+t._s(e.name))])])})),0)])}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=8869.js.map