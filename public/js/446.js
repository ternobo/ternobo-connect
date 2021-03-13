(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[446],{446:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>a});var n=o(2880),s=o(4363);const i={props:{page:{type:Object,default:void 0,required:!0}},components:{FollowButton:n.Z,ConnectionButton:s.Z},name:"PeopleSuggestion"};const a=(0,o(1900).Z)(i,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"people-sugestion d-flex justify-content-between align-items-center"},[o("wire-link",{staticClass:"d-flex h-100 align-items-center w-100",attrs:{href:"/"+t.page.slug}},[o("lazy-image",{staticClass:"profile-sm my-0 ml-2",attrs:{"img-class":"profile-sm",alt:"",src:t.page.profile}}),t._v(" "),o("div",{staticClass:"d-flex ml-2 align-items-start flex-column justify-content-center w-100"},[o("strong",{staticClass:"person-name"},[t._v(t._s(t.page.name)+" "),1===t.page.is_verified?o("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),o("small",{staticClass:"text-muted person-short-bio"})])],1),t._v(" "),o("ConnetionButtons",{staticClass:"follow-buttons actions",staticStyle:{"margin-left":"4px",width:"80px"},attrs:{vertical:!0,"btn-style":"padding: 7px","page-id":t.page.id,"user-id":t.page.user_id}})],1)}),[],!1,null,null,null).exports},4363:(t,e,o)=>{"use strict";o.d(e,{Z:()=>s});const n={mounted:function(){if(this.$store.state.user){var t=this.user;"number"!=typeof t&&(t=parseInt(t)),this.user_id=t,this.$store.state.shared.connectedPeople.includes(t)?(this.connected=!0,this.text="متصل شده",this.$emit("connected")):this.$store.state.shared.waitingConnections.includes(t)&&(this.waiting=!0,this.text="انتظار تایید")}},data:function(){return{loading:!1,connected:!1,waiting:!1,followed:!0,text:"متصل شدن",user_id:-1}},props:{user:{default:void 0,required:!0}},methods:{connect:function(){var t=this;if(this.loading=!0,this.connected||this.waiting){e={method:"post",url:this.$APP_URL+"/disconnect/"+this.user};axios(e).then((function(e){if(e.data.result)t.loading=!1,t.text="متصل شدن",-1!=t.$store.state.connectedPeople.indexOf(t.user)?t.$store.commit("diconnect",t.$store.state.connectedPeople.indexOf(t.user_id)):-1!=t.$store.state.waitingConnections.indexOf(t.user)&&t.$store.commit("removeWaitingConnection",t.$store.state.waitingConnections.indexOf(t.user_id)),t.connected=!1,t.waiting=!1,t.$emit("disconnected");else{var o=e.data.errors;Object.keys(o).forEach((function(e,n){t.$bvToast.toast(o[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(e){console.log(e),t.loading=!1}))}else{var e={method:"post",url:this.$APP_URL+"/connect/"+this.user};axios(e).then((function(e){if(e.data.result)t.loading=!1,t.$store.commit("addWaitingConnection",t.user_id),t.text="انتظار تایید",t.waiting=!0;else{var o=e.data.errors;Object.keys(o).forEach((function(e,n){t.$bvToast.toast(o[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(e){t.loading=!1}))}}},components:{LoadingButton:o(7430).Z}};const s=(0,o(1900).Z)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return null!==t.$store.state.user?o("LoadingButton",{staticClass:"btn connect-btn",class:{"btn-followed-connected":t.connected,"btn-connection-waiting":t.waiting},attrs:{loading:t.loading},nativeOn:{click:function(e){return t.connect(e)}}},[t._v(t._s(t.text))]):t._e()}),[],!1,null,null,null).exports},2880:(t,e,o)=>{"use strict";o.d(e,{Z:()=>i});var n=o(7430);const s={mounted:function(){if(null!==this.$store.state.user){var t=this.page;"number"!=typeof t&&(t=parseInt(t)),this.page_id=t,this.$store.state.shared.followings.includes(t)&&(this.followed=!0,this.text="دنبال شده",this.$emit("followed"))}},data:function(){return{loading:!1,followed:!1,text:"دنبال کردن",page_id:-1}},props:{page:{type:Number,default:void 0,required:!0}},methods:{follow:function(){var t=this;if(this.loading=!0,this.followed){e={method:"post",url:this.$APP_URL+"/unfollow/"+this.page};axios(e).then((function(e){if(e.data.result)t.loading=!1,t.text="دنبال کردن",t.followed=!1,t.$emit("unfollowed"),t.$store.commit("unfollow",t.$store.state.followings.indexOf(t.page_id));else{var o=e.data.errors;Object.keys(o).forEach((function(e,n){t.$bvToast.toast(o[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(t){this.loading=!1}))}else{var e={method:"post",url:this.$APP_URL+"/follow/"+this.page};axios(e).then((function(e){if(e.data.result)t.loading=!1,t.$store.commit("addFollower",t.page_id),t.text="دنبال شده",t.followed=!0,t.$emit("followed");else{var o=e.data.errors;Object.keys(o).forEach((function(e,n){t.$bvToast.toast(o[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(e){t.loading=!1}))}}},components:{LoadingButton:n.Z}};const i=(0,o(1900).Z)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return null!==t.$store.state.user?o("LoadingButton",{staticClass:"btn follow-btn",class:{"btn-followed-connected":t.followed},attrs:{loading:t.loading},nativeOn:{click:function(e){return t.follow(e)}}},[t._v(t._s(t.text))]):t._e()}),[],!1,null,null,null).exports}}]);