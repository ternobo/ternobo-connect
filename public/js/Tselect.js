(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[5765],{2089:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>n});const s={created:function(){this.selectedItem=this.value},watch:{value:function(e){this.selectedItem=e}},directives:{"click-outside":{bind:function(e,t){var i=function(i){e.contains(i.target)||e===i.target||t.value(i)};e.__vueClickEventHandler__=i,document.addEventListener("click",i)},unbind:function(e){document.removeEventListener("click",e.__vueClickEventHandler__)}}},props:{newItemPlaceholder:{type:String,default:"New Item",required:!1},value:{type:Object,default:void 0,required:!1},items:{type:Array,default:void 0,required:!0},valueOption:{type:String,default:"value",required:!1},labelOption:{type:String,default:"name",required:!1},showNewItem:{type:Boolean,default:!0,required:!1},direction:{type:String,default:"ltr",required:!1}},data:function(){return{showItems:!1,dropdownWidth:"0px",newItemInput:void 0,selectedItem:void 0}},name:"Tselect",methods:{close:function(e){this.showItems=!1,this.$refs.titleSection.classList.remove("active")},isChecked:function(e){return void 0!==this.selectedItem&&this.selectedItem[this.valueOption]===e[this.valueOption]},selectItem:function(e){this.selectedItem=e,this.$emit("input",e),this.showItems=!1,this.$refs.titleSection.classList.remove("active")},newItem:function(){this.$emit("new-item",this.newItemInput),this.newItemInput=void 0},openDropdown:function(){this.$refs.titleSection.classList.toggle("active");var e=this.$refs.titleSection.offsetWidth;this.showItems=!this.showItems,this.dropdownWidth=e+"px"}}};const n=(0,i(1900).Z)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.close,expression:"close"}],staticClass:"tselect",attrs:{dir:e.direction}},[i("div",{ref:"titleSection",staticClass:"tselect_title",on:{click:e.openDropdown}},[i("div",{staticClass:"title-text"},[void 0===e.selectedItem?i("span",[e._t("default")],2):e._e(),e._v(" "),void 0!==e.selectedItem?i("span",[e.selectedItem.hasOwnProperty("icon")?i("i",{staticClass:"material-icons verical-middle"},[e._v(e._s(e.selectedItem.icon))]):e._e(),i("span",[e._v(" "+e._s(e.selectedItem.name)+" ")])]):e._e()]),e._v(" "),i("i",{staticClass:"material-icons tselect_arrow"},[e._v("keyboard_arrow_down")])]),e._v(" "),i("transition",{attrs:{name:"slide"}},[e.showItems?i("div",{ref:"itemsElement",staticClass:"tselect-items",style:{width:e.dropdownWidth}},[i("div",{staticClass:"items"},e._l(e.items,(function(t){return i("div",{key:t[e.valueOption],staticClass:"tselect_item",class:{active:e.isChecked(t)},on:{click:function(i){return e.selectItem(t)}}},[i("label",{staticClass:"tselect_item--text"},[t.hasOwnProperty("icon")?i("i",{staticClass:"material-icons verical-middle"},[e._v(e._s(t.icon))]):e._e(),e._v("\n                        "+e._s(t[e.labelOption])+"\n                    ")])])})),0),e._v(" "),e.showNewItem?i("div",{staticClass:"tselect_new-item"},[i("div",{staticClass:"d-flex w-100 px-1"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.newItemInput,expression:"newItemInput"}],staticClass:"add-category-field form-control bg-transparent font-12 px-2",attrs:{type:"text",placeholder:"دسته بندی جدید را وارد کنید"},domProps:{value:e.newItemInput},on:{input:function(t){t.target.composing||(e.newItemInput=t.target.value)}}}),e._v(" "),i("button",{staticClass:"btn add-btn d-flex justify-content-center align-items-center",style:{width:"20px"},attrs:{disabled:!(null!=e.newItemInput&&e.newItemInput.length>0)},on:{click:e.newItem}},[i("i",{staticClass:"material-icons font-14"},[e._v("add")])])])]):e._e()]):e._e()])],1)}),[],!1,null,"5a414a9e",null).exports}}]);
//# sourceMappingURL=Tselect.js.map