(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[2089],{9184:(s,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>a});const r={name:"UserInfoCard"};const a=(0,t(1900).Z)(r,(function(){var s=this,e=s.$createElement,t=s._self._c||e;return null!=s.$store.state.user?t("div",{staticClass:"card sticky-aside pb-4"},[t("lazy-image",{staticClass:"card-img-top page-cover",attrs:{src:s.$store.state.user.cover}}),s._v(" "),t("wire-link",{staticClass:"userinfo-card",attrs:{href:"/"+s.$store.state.user.username}},[t("div",{staticClass:"d-flex flex-column align-items-center"},[t("div",{staticClass:"profile-image"},[t("vue-circle",{attrs:{progress:s.$store.state.shared.profile_steps.percent,size:82,"empty-fill":"#F5F5F5","show-percent":!1,"start-angle":-Math.PI/2,fill:{color:"#0898DF"}}},[t("lazy-image",{attrs:{src:s.$store.state.user.profile}})],1)],1),s._v(" "),t("strong",{staticClass:"text-black"},[s._v(s._s(this.$store.state.user.name)+" "),1===s.$store.state.user.is_verified?t("i",{staticClass:"verificationcheck"},[s._v("check_circle")]):s._e()]),s._v(" "),t("small",{staticClass:"text-muted"},[s._v(s._s(this.$store.state.user.short_bio))])]),s._v(" "),t("div",{staticClass:"done-precent d-flex"},[t("strong",{staticClass:"text-white"},[s._v(s._s(s.$store.state.shared.profile_steps.percent)+"%")])])])],1):s._e()}),[],!1,null,null,null).exports}}]);
//# sourceMappingURL=UserInfoCard.js.map
