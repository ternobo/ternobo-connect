(self.webpackChunkternobo=self.webpackChunkternobo||[]).push([[4141,7608],{9242:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var a=s(3645),i=s.n(a)()((function(t){return t[1]}));i.push([t.id,".comment .pagedetail[data-v-34bf7fe6]{display:flex;flex-direction:column}",""]);const o=i},5903:(t,e,s)=>{"use strict";s.d(e,{Z:()=>_});var a=s(431),i=s(8126),o=s(9250),n=s(3914),l=s(4139),r=s(9170);i.Z.addLocale(n);const c={mounted:function(){this.liked=this.comment.is_liked},data:function(){return{deleted:!1,showReply:!1,replies:[],repliesLoading:!0,showReplies:!1,next_page_url:null,loadingMore:!1,liked:!1,showReport:!1,showNewComment:!1,showLikes:!1}},methods:{commentDelete:function(){var t=this.comments.indexOf(comment);t>-1&&(this.comments.splice(t,1),this.loadMore())},likeComment:function(){this.liked?this.liked=!1:this.liked=!0,axios.post(this.$APP_URL+"/comments/"+this.comment.id+"/like")},loadReplies:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.showReplies&&!this.showNewComment&&e?this.showNewComment=e:(this.showNewComment=e,this.showReplies=!this.showReplies),this.showReplies&&(this.repliesLoading=!0,axios.post(this.$APP_URL+"/comments/"+this.comment.id+"/replies").then((function(e){var s=e.data;s.result&&(t.next_page_url=s.data.next_page_url,t.replies=s.data.data),t.repliesLoading=!1})).catch((function(t){return console.log(t)})).then((function(){return t.repliesLoading=!1})))},deleteComment:function(){var t=this;this.deleted=!0,axios.delete("/posts/"+this.comment.post_id+"/comments/"+this.comment.id).then((function(e){t.$emit("deleted",t.comment)})).catch((function(t){return console.log(t)}))},loadMore:function(){var t=this;null===this.next_page_url||this.loadingMore||(this.loadingMore=!0,axios.get(this.next_page_url).then((function(e){var s=e.data;s.result&&(t.next_page_url=s.data.next_page_url,t.replies=t.replies.concat(s.data.data)),t.loadingMore=!1})).catch((function(t){return console.log(t)})).then((function(){return t.loadingMore=!1})))},submit:function(t){var e=this;void 0!==this.replyTo?this.$emit("replied",t):(this.replies.unshift(t),setTimeout((function(){var t=e.$el;e.$parent.$el.scrollTop+=t.getBoundingClientRect().top}),300))}},computed:{comment_time:function(){return new i.Z("fa-FA").format(Date.parse(this.comment.created_at),"twitter")}},components:{NewComment:a.Z,LoadingSpinner:o.Z,ReportModal:l.Z,LikesModal:r.default},props:{replyTo:{default:void 0,required:!1},comment:{type:Object,default:void 0,required:!0}},name:"Comment"};var d=s(3379),m=s.n(d),p=s(9242),u={insert:"head",singleton:!1};m()(p.Z,u);p.Z.locals;const _=(0,s(1900).Z)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"comment-item"},[s("report-modal",{attrs:{show:t.showReport,type:"comment","comment-id":t.comment.id},on:{"update:show":function(e){t.showReport=e}}}),t._v(" "),s("likes-modal",{attrs:{item:t.comment.id,type:"comment",show:t.showLikes},on:{"update:show":function(e){t.showLikes=e}}}),t._v(" "),null!=t.replyTo&&t.comment.replyto.page?s("div",[s("span",{staticClass:"text-superlight"},[s("i",{staticClass:"material-icons"},[t._v("reply")]),t._v(" پاسخ به "+t._s(t.comment.replyto.page.name)+" ")])]):t._e(),t._v(" "),t.deleted?t._e():s("div",{staticClass:"comment"},[s("div",{staticClass:"comment-header"},[s("wire-link",{staticClass:"d-flex align-items-center",attrs:{href:"/"+t.comment.page.slug}},[s("img",{staticClass:"profile-sm",attrs:{src:t.comment.page.profile}}),t._v(" "),s("div",{staticClass:"pr-2 pagedetail"},[s("span",{staticClass:"name"},[s("strong",[t._v(" "+t._s(t.comment.page.name)+" "),1===t.comment.page.is_verified?s("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()])]),t._v(" "),t.comment.page.short_bio?s("small",{staticClass:"text-muted"},[t._v("\n\t\t\t\t\t\t"+t._s(t.comment.page.short_bio)+"\n\t\t\t\t\t")]):t._e()])]),t._v(" "),s("div",{staticClass:"d-flex align-items-center"},[s("span",{staticClass:"font-10 text-muted"},[t._v(t._s(t.comment_time))]),t._v(" "),s("div",[s("b-dropdown",{attrs:{size:"lg",variant:"link","toggle-class":"text-decoration-none","no-caret":""},scopedSlots:t._u([{key:"button-content",fn:function(){return[s("i",{staticClass:"material-icons openmenu clickale text-muted hover-dark"},[t._v("more_vert")])]},proxy:!0}],null,!1,3552891933)},[t._v(" "),t.checkUser(t.comment.page.user_id)?t._e():s("b-dropdown-item",[s("div",{staticClass:"d-flex align-items-center",on:{click:function(e){t.showReport=!0}}},[s("i",{staticClass:"material-icons ml-2 text-dark"},[t._v("link")]),t._v(" "),s("div",[s("div",[s("strong",[t._v(" گزارش تخلف ")])]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v(" این دیدگاه در تضاد با قوانین ترنوبو است ")])])])]),t._v(" "),t.checkUser(t.comment.page.user_id)?s("b-dropdown-item",{on:{click:t.deleteComment}},[s("div",{staticClass:"d-flex hover-danger align-items-center"},[s("i",{staticClass:"material-icons-outlined ml-2"},[t._v("delete_sweep")]),t._v(" "),s("div",[s("div",[s("strong",[t._v(" حذف ")])])])])]):t._e()],1)],1)])],1),t._v(" "),s("div",{staticClass:"comment-body"},[s("div",{staticStyle:{"unicode-bidi":"plaintext",width:"100% !important",display:"block","text-align":"justify"},domProps:{innerHTML:t._s(t.comment.text)}})])]),t._v(" "),s("div",{staticClass:"w-100 d-flex align-content-center justify-content-between pt-2"},[s("div",[null!=t.comment.mutual_likes&&t.comment.mutual_likes.length>0?s("div",{staticClass:"d-flex post-likes-text text-muted clickable",on:{click:function(e){t.showLikes=!0}}},[s("span",{staticClass:"ml-1"},[t._v("پسندیده شده توسط")]),t._v(" "),t.comment.mutual_likes[0]?s("wire-link",{staticClass:"text-dark",attrs:{href:"/"+t.comment.mutual_likes[0].page.slug}},[s("strong",{staticClass:"text-light"},[t._v(t._s(t.comment.mutual_likes[0].page.name))])]):t._e(),t._v(" "),t.comment.mutual_likes.length>1?s("div",[s("span",{staticClass:"mr-1"},[t._v("و")]),t._v(" "),t.comment.mutual_likes[1]?s("wire-link",{staticClass:"text-dark",attrs:{href:"/"+t.comment.mutual_likes[0].page.slug}},[s("strong",{staticClass:"text-light"},[t._v(t._s(t.comment.mutual_likes[1].page.name))])]):t._e()],1):t._e(),t._v(" "),t.comment.mutual_likes.length>2?s("span",{staticClass:"mx-1"},[t._v(" و ... ")]):t._e()],1):t._e()]),t._v(" "),s("div",{staticClass:"actions"},[t.comment.replies_count>0&&null==t.replyTo?s("small",{staticClass:"clickable ml-2",on:{click:function(e){return t.loadReplies(!1)}}},[s("strong",{class:{"text-muted":!t.showReplies,"text-dark":t.showReplies}},[t._v(" "+t._s(t.comment.replies_count)+" پاسخ ")])]):t._e(),t._v(" "),s("i",{staticClass:"hover-dark clickable",class:{"material-icons-outlined":!t.showReplies||!t.showNewComment,"material-icons":t.showReplies&&t.showNewComment},on:{click:t.loadReplies}},[t._v(" insert_comment ")]),t._v(" "),t.checkUser(t.comment.page.user_id)?t._e():s("i",{staticClass:"hover-dark clickable material-icons",class:{"text-danger":t.liked},on:{click:t.likeComment}},[t._v("\n\t\t\t\t"+t._s(t.liked?"favorite":"favorite_border")+"\n\t\t\t")])])]),t._v(" "),s("transition",{attrs:{name:"slide"}},[t.showReplies?s("div",{staticClass:"comment-replies"},[t.showNewComment?s("new-comment",{attrs:{post:t.comment.post_id,"reply-to":t.comment.id},on:{submit:t.submit}}):t._e(),t._v(" "),void 0===t.replyTo?s("div",{staticClass:"border-right pr-3",staticStyle:{"border-color":"#212121 !important"}},[t._l(t.replies,(function(e){return s("comment",{key:e.id,attrs:{"reply-to":t.comment.id,comment:e},on:{replied:t.submit,deleted:t.commentDelete}})})),t._v(" "),t.repliesLoading?s("div",{staticClass:"w-100 d-flex p-2 justify-content-center align-items-center"},[s("loading-spinner")],1):t._e()],2):t._e(),t._v(" "),s("div",{staticClass:"w-100 d-flex align-items-center justify-content-center p-2"},[null!==t.next_page_url?s("loading-button",{staticClass:"btn btn-outline-dark",attrs:{loading:t.loadingMore},nativeOn:{click:function(e){return t.loadMore(e)}}},[t._v("بارگیری بیشتر")]):t._e()],1)],1):t._e()])],1)}),[],!1,null,"34bf7fe6",null).exports},5740:(t,e,s)=>{"use strict";s.d(e,{Z:()=>l});var a=s(9250),i=s(5903),o=s(431);const n={methods:{submit:function(t){this.comments.unshift(t)},commentDelete:function(t){var e=this.comments.indexOf(t);e>-1&&(this.comments.splice(e,1),this.loadMore())},loadMore:function(){var t=this;null===this.next_page_url||this.commentsLoading||(this.commentsLoading=!0,axios.get(this.next_page_url).then((function(e){var s=e.data;s.result&&(t.next_page_url=s.data.next_page_url,t.comments=t.comments.concat(s.data.data)),t.commentsLoading=!1})).catch((function(t){return console.log(t)})).then((function(){return t.commentsLoading=!1})))}},props:{noScroll:{type:Boolean,default:!1,required:!1},post:{type:Number,default:void 0,required:!0}},mounted:function(){var t=this;axios.get(this.$APP_URL+"/posts/"+this.post+"/comments").then((function(e){var s=e.data;s.result&&(t.next_page_url=s.data.next_page_url,t.comments=s.data.data),t.commentsLoading=!1})).catch((function(t){return console.log(t)}))},data:function(){return{commentsLoading:!0,comments:void 0,next_page_url:null}},name:"CommentsList",components:{LoadingSpinner:a.Z,Comment:i.Z,NewComment:o.Z}};const l=(0,s(1900).Z)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"comments",attrs:{"infinite-scroll-disabled":t.commentsLoading,"infinite-scroll-distance":5}},[s("new-comment",{attrs:{post:t.post},on:{submit:t.submit}}),t._v(" "),t._l(t.comments,(function(e){return s("comment",{key:"comment_"+e.id,attrs:{comment:e},on:{deleted:t.commentDelete}})})),t._v(" "),t.commentsLoading?s("div",{staticClass:"d-flex w-100 justify-content-center align-items-center py-3"},[s("LoadingSpinner")],1):t._e()],2)}),[],!1,null,null,null).exports},431:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var a=s(5410);const i={watch:{text:function(t){t.length>0?this.showSubmit=!0:this.showSubmit=!1}},props:{post:{type:Number,default:void 0,required:!0},replyTo:{default:void 0,required:!1}},data:function(){return{loading:!1,showSubmit:!1,text:""}},methods:{submit:function(){var t=this;if(this.text.length>0){this.loading=!0;var e={text:this.text};void 0!==this.replyTo&&(e.reply_to=this.replyTo),axios.post(this.$APP_URL+"/posts/"+this.post+"/comments",e).then((function(e){e.data.result?(t.text="",t.$emit("submit",e.data.comment)):t.handleError(e.data.errors)})).catch((function(t){return console.log(t)})).then((function(){return t.loading=!1}))}}},name:"NewComment",components:{MaterialTextArea:a.Z}};const o=(0,s(1900).Z)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return null!=t.$store.state.user?s("div",{staticClass:"sendcomment clearfix"},[s("div",{staticClass:"input-group-btn mb-0"},[s("img",{staticClass:"profile-sm ml-3",attrs:{src:t.$store.state.user.profile}}),t._v(" "),s("MaterialTextArea",{staticClass:"w-100",attrs:{"input-class":"form-control autoresize",placeholder:"نظر شما چیست؟",name:"text",maxlength:"2500"},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1),t._v(" "),s("transition",{attrs:{name:"slide"}},[t.showSubmit?s("div",{staticClass:"justify-content-end mt-0"},[s("loading-button",{staticClass:"btn btn-primary",attrs:{loading:t.loading},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("ارسال")])],1):t._e()])],1):t._e()}),[],!1,null,null,null).exports},9170:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>r});var a=s(9949),i=s(2880),o=s(1378),n=s(9250);const l={watch:{likesPaginate:function(t){this.likes=t.data,this.next_page_url=t.next_page_url}},props:{item:{default:0,required:!0},type:{default:"post",required:!1}},data:function(){return{error:!1,loading:!0,likesPaginate:null,likes:[],next_page_url:null,loadingMore:!1,typeBasedData:{}}},methods:{loadMore:function(){var t=this;if(!this.loadingMore&&null!==this.next_page_url){var e={method:"POST",url:this.next_page_url,data:this.typeBasedData};this.loadingMore=!0,axios(e).then((function(e){var s=e.data.likes;s&&(t.likes=t.likes.concat(s.data),t.next_page_url=s.next_page_url)})).catch((function(s){t.next_page_url=e.url})).then((function(){t.loadingMore=!1}))}},onShown:function(){var t=this;this.likes=!0,this.loading=!0,this.error=!1,"comment"==this.type?this.typeBasedData={comment_id:this.item}:this.typeBasedData={post_id:this.item},axios.post("/likes/get",this.typeBasedData).then((function(e){t.likesPaginate=e.data.likes})).catch((function(e){t.error=!0})).then((function(){return t.loading=!1}))}},components:{LazyImage:o.Z,FollowButton:i.Z,LoadingSpinner:n.Z},mixins:[a.Z],name:"LikesModal"};const r=(0,s(1900).Z)(l,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"hide-footer":"",title:"پسند‌ها",size:"md",centered:!0},on:{show:t.onShown},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[t.loading||t.error?s("div",{staticClass:"d-flex align-items-center justify-content-center loading",staticStyle:{"min-height":"200px"}},[t.loading?s("loading-spinner"):t._e(),t._v(" "),t.error?s("div",{staticClass:"d-flex flex-column justify-center align-items-center w-100 err"},[s("i",{staticClass:"hover-dark text-muted material-icons-outlined",on:{click:t.onShown}},[t._v("refresh")]),t._v(" "),s("br"),t._v(" "),s("span",{staticClass:"text-muted"},[t._v("خطا در برقراری ارتباط")])]):t._e()],1):t._e(),t._v(" "),t.loading||t.error?t._e():s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"likes-list",attrs:{"infinite-scroll-distance":10}},[t._l(t.likes,(function(e){return s("div",{key:"like_"+e.id,staticClass:"like-item"},[s("wire-link",{staticClass:"userinfo",attrs:{href:"/"+e.page.slug}},[s("lazy-image",{staticClass:"mb-0",class:{"profile-sm":t.$root.isDesktop,"profile-md":!t.$root.isDesktop},attrs:{imgClass:{"profile-sm":t.$root.isDesktop,"profile-md":!t.$root.isDesktop},src:e.page.profile}}),t._v(" "),s("div",{staticClass:"page-name d-flex flex-column"},[s("strong",[t._v(" "+t._s(e.page.name)+" "),1===e.page.is_verified?s("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),s("span",{staticClass:"shortbio"},[t._v(" "+t._s(e.page.short_bio)+" ")])])],1),t._v(" "),s("follow-button",{attrs:{page:e.page.id}})],1)})),t._v(" "),null!=this.next_page_url?s("infinite-loading",{attrs:{spinner:"spiral"},on:{infinite:t.loadMore}}):t._e()],2)])}),[],!1,null,null,null).exports},4139:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var a=s(9949);const i={props:{type:{type:String,default:"post",required:!1},postId:{type:Number,default:void 0,required:!1},commentId:{type:Number,default:void 0,required:!1}},mixins:[a.Z],methods:{setReason:function(t){this.reason=t},submit:function(){var t=this;this.loading=!0;var e={};"post"==this.type?e.post_id=this.postId:"comment"==this.type&&(e.comment_id=this.commentId),axios.post("/reportpost",e).then((function(e){t.toast("درخواست شما با موفقیت ثبت شد","check","text-success"),t.$emit("update:show",!1)})).catch((function(e){return t.toast("خطا در برقراری ارتباط")})).then((function(){return t.loading=!1}))}},data:function(){return{reportFor:null,loading:!1,description:null,moreInfo:!1,reason:null}}};const o=(0,s(1900).Z)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-modal",{attrs:{"hide-footer":"",size:"md",title:"چرا می‌‌خواهید این محتوا را گزارش دهید؟",centered:!0},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[null==t.reportFor?s("div",{staticClass:"reportreseaons"},[s("div",{staticClass:"report-item",on:{click:function(e){t.reportFor="notrelated",t.reason="نامرتبط با ترنوبو"}}},[s("span",{staticClass:"text"},[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" مناسب ترنوبو نیست")]),t._v(" "),s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_left")])]),t._v(" "),s("div",{staticClass:"report-item",on:{click:function(e){t.reportFor="fakeorspam"}}},[s("span",{staticClass:"text"},[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" جعلی، هرز یا کلاهبراری است‌")]),t._v(" "),s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_left")])]),t._v(" "),s("div",{staticClass:"report-item",on:{click:function(e){t.reportFor="other-reasons"}}},[s("span",{staticClass:"text"},[t._v("برای گزارش "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" دلایل دیگری دارم")]),t._v(" "),s("i",{staticClass:"material-icons"},[t._v("keyboard_arrow_left")])])]):t._e(),t._v(" "),t.moreInfo?t._e():s("div",["fakeorspam"===t.reportFor?s("div",{staticClass:"fakeorspam reportfor"},[s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"fakeaccount"}},[s("span",[t._v("فکر می‌کنم این حساب کاربری غیرواقعی است")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : گزارش حساب ساختگی یا جعل شده")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌کنم این حساب کاربری غیرواقعی است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌کنم این حساب کاربری غیرواقعی است"},domProps:{checked:t._q(t.reason,"فکر می‌کنم این حساب کاربری غیرواقعی است")},on:{change:function(e){t.reason="فکر می‌کنم این حساب کاربری غیرواقعی است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"wronginformation"}},[s("span",[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" دارای اطلاعات نادرست است")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : اطلاعات ارائه شده در "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" نادرست بوده و تحت عنوان اطلاعت درست و واقعی ارائه شده است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"},domProps:{checked:t._q(t.reason,"فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است")},on:{change:function(e){t.reason="فکر می‌‌کنم این محتوا دارای اطلاعات نادرست است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"spamcotent"}},[s("span",[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" هرز است")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" دارای ارزش خاصی نمی‌باشد و صرفا جهت جذب بازدید ارائه شده است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می این محتوا هرز است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می این محتوا هرز است"},domProps:{checked:t._q(t.reason,"فکر می این محتوا هرز است")},on:{change:function(e){t.reason="فکر می این محتوا هرز است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"phisingorvirus"}},[s("span",[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده‌")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" به جهت دریافت اطلاعات شخصی، پول یا ارائه لینک‌های مشکوک و آلوده قرار گرفته است.")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"},domProps:{checked:t._q(t.reason,"فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده")},on:{change:function(e){t.reason="فکر می‌‌کنم این محتوا جهت کلاهبرداری، فیشینگ یا انتقال ویروس و باج افزار ارائه شده"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])])]):t._e(),t._v(" "),"other-reasons"===t.reportFor?s("div",{staticClass:"other-reasons reportfor"},[s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"hatewordsreport"}},[s("span",[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" توهین آمیز است")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" به صوتر هدفمند به اشخصا حقیقی، قومیت یا مذهبی خاص توهین کرده است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌کنم این محتوا توهین آمیز است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌کنم این محتوا توهین آمیز است"},domProps:{checked:t._q(t.reason,"فکر می‌کنم این محتوا توهین آمیز است")},on:{change:function(e){t.reason="فکر می‌کنم این محتوا توهین آمیز است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"sexualreport"}},[s("span",[t._v("فکر می‌کنم شامل محتوای جنسی است")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : شامل محتوای برهنگی، صحنه‌ها و زبان جنسی، فحشا یا قاچاق جنسی است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌‌کنم شامل محتوای جنسی است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌‌کنم شامل محتوای جنسی است"},domProps:{checked:t._q(t.reason,"فکر می‌‌کنم شامل محتوای جنسی است")},on:{change:function(e){t.reason="فکر می‌‌کنم شامل محتوای جنسی است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"terorismreport"}},[s("span",[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" اشاعه دهنده خشونت و تروریسم است")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : شامل شکنجه، تجاوز یا سوء استفاده، عمل تروریستی یا عضوگیری برای گروه‌های تروریستی است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"},domProps:{checked:t._q(t.reason,"فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است")},on:{change:function(e){t.reason="فکر می‌کنم  این محتوا اشاعه دهنده خشونت و تروریسم است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"threatandhatereport"}},[s("span",[t._v("فکر می‌کنم "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" آزار دهنده و تهدید آمیز است‌")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : شامل حمله به شخص/اشخاص یا تهدید و قلدری است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"},domProps:{checked:t._q(t.reason,"فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است")},on:{change:function(e){t.reason="فکر می‌‌کنم این محتوا آزار دهنده و تهدید آمیز است"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"suicidereport"}},[s("span",[t._v("من نگران هستم این فرد بخواهد خودکشی کند‌")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : این شخص تهدید می‌کند که به خودش آسیب می‌رساند")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="من نگران هستم این فرد بخواهد خودکشی کند"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"من نگران هستم این فرد بخواهد خودکشی کند"},domProps:{checked:t._q(t.reason,"من نگران هستم این فرد بخواهد خودکشی کند")},on:{change:function(e){t.reason="من نگران هستم این فرد بخواهد خودکشی کند"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])]),t._v(" "),s("div",{staticClass:"report-reason"},[s("label",{attrs:{for:"copyrightreport"}},[s("span",[s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" حقوق شخصی مرا نقض می‌کند‌‌")]),t._v(" "),s("small",{staticClass:"text-muted"},[t._v("مثال : اقتراء، نقص حقوق چاپ یا علائم تجاری است")])]),t._v(" "),s("div",{staticClass:"radio clickable",on:{click:function(e){t.reason="این محتوا حقوق شخصی مرا نقض می‌کند"}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],staticClass:"radio__input",attrs:{type:"radio",name:"reason",value:"این محتوا حقوق شخصی مرا نقض می‌کند"},domProps:{checked:t._q(t.reason,"این محتوا حقوق شخصی مرا نقض می‌کند")},on:{change:function(e){t.reason="این محتوا حقوق شخصی مرا نقض می‌کند"}}}),t._v(" "),s("label",{staticClass:"radio__label"})])])]):t._e(),t._v(" "),"notrelated"===t.reportFor?s("div",{staticClass:"notrelated reportfor px-3"},[s("label",[t._v("از گزارش "),s("span",{staticClass:"reportTitle"},[t._v("این محتوا")]),t._v(" به عنوان محتوای نامناسب و نامرتبط اطمینان دارید؟")]),t._v(" "),s("input",{staticStyle:{display:"none"},attrs:{type:"radio",name:"report",checked:"",value:"نامرتبط با ترنوبو"}})]):t._e()]),t._v(" "),t.moreInfo?s("div",[s("div",{staticClass:"moreinfo px-2"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control h-100",attrs:{placeholder:"توضیحات خود را اینجا بنویسید",name:"moreinfo"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"moreinfo-footer text-left py-2"},[s("button",{staticClass:"btn button-transparent",attrs:{type:"button"},on:{click:function(e){t.moreInfo=!1,t.description=null}}},[t._v("لغو")]),t._v(" "),s("button",{staticClass:"btn btn-dark",attrs:{id:"moreinfo-close"},on:{click:function(e){t.moreInfo=!1}}},[t._v("افزودن")])])]):null!=t.reportFor?s("div",{staticClass:"d-flex pt-3 justify-content-between"},[s("div",{staticClass:"align-self-start"},[s("button",{staticClass:"btn btn-outline-primary rounded-pill",on:{click:function(e){t.moreInfo=!0}}},[t._v("ارائه توضیحات")])]),t._v(" "),s("div",{staticClass:"d-flex"},[s("button",{staticClass:"btn button-transparent",on:{click:function(e){t.reportFor=null}}},[t._v("برگشت")]),t._v(" "),s("loading-button",{staticClass:"btn btn-primary",attrs:{loading:t.loading,disabled:null==t.reason},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("ثبت")])],1)]):t._e()])}),[],!1,null,null,null).exports},2880:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var a=s(7430);const i={mounted:function(){if(null!==this.$store.state.user){var t=this.page;"number"!=typeof t&&(t=parseInt(t)),this.page_id=t,this.$store.state.shared.followings.includes(t)&&(this.followed=!0,this.text="دنبال شده",this.$emit("followed"))}},data:function(){return{loading:!1,followed:!1,text:"دنبال کردن",page_id:-1}},props:{page:{type:Number,default:void 0,required:!0}},methods:{follow:function(){var t=this;if(this.loading=!0,this.followed){e={method:"post",url:this.$APP_URL+"/unfollow/"+this.page};axios(e).then((function(e){if(e.data.result)t.loading=!1,t.text="دنبال کردن",t.followed=!1,t.$emit("unfollowed"),t.$store.commit("unfollow",t.$store.state.followings.indexOf(t.page_id));else{var s=e.data.errors;Object.keys(s).forEach((function(e,a){t.$bvToast.toast(s[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(t){this.loading=!1}))}else{var e={method:"post",url:this.$APP_URL+"/follow/"+this.page};axios(e).then((function(e){if(e.data.result)t.loading=!1,t.$store.commit("addFollower",t.page_id),t.text="دنبال شده",t.followed=!0,t.$emit("followed");else{var s=e.data.errors;Object.keys(s).forEach((function(e,a){t.$bvToast.toast(s[e][0],{noCloseButton:!0,toaster:"b-toaster-bottom-left",bodyClass:["bg-dark","text-right","text-white"],solid:!0})}))}t.loading=!1})).catch((function(e){t.loading=!1}))}}},components:{LoadingButton:a.Z}};const o=(0,s(1900).Z)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return null!==t.$store.state.user?s("LoadingButton",{staticClass:"btn follow-btn",class:{"btn-followed-connected":t.followed},attrs:{loading:t.loading},nativeOn:{click:function(e){return t.follow(e)}}},[t._v(t._s(t.text))]):t._e()}),[],!1,null,null,null).exports},4141:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>p});var a=s(8126),i=s(5740),o=s(3914);a.Z.addLocale(o);const n={data:function(){return{liked:!1,openComment:!1}},created:function(){this.liked=this.post.is_liked},methods:{like:function(){this.liked?this.liked=!1:this.liked=!0;this.$axios({method:"post",url:this.$APP_URL+"/like/"+this.post.id}).catch((function(t){}))}},name:"SimpleEmbed",components:{CommentsList:i.Z},props:{post:{type:Object,default:void 0,required:!0}},computed:{post_time:function(){return new a.Z("fa-FA").format(Date.parse(this.post.created_at),"twitter")+" ● "},updated_at:function(){return null!==this.post.updated_at?new a.Z("fa-FA").format(Date.parse(this.post.updated_at),"twitter")+" ● ":""}}};var l=s(1900);const r=(0,l.Z)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"post-box",staticStyle:{margin:"0 !important","box-shadow":"none !important",width:"100vw"}},[s("div",{staticClass:"post-header"},[s("a",{staticClass:"publisher",attrs:{href:"/"+t.post.page.slug}},[s("img",{attrs:{src:t.post.page.profile}}),t._v(" "),s("div",[s("strong",[t._v(" "+t._s(t.post.page.name)+" "),1===t.post.page.is_verified?s("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),s("span",{staticClass:"text-muted font-12"},[t._v("\n\t\t\t\t\t"+t._s(t.post.page.short_bio)+"\n\t\t\t\t")]),t._v(" "),s("small",{staticClass:"text-light font-10"},[t._v("\n\t\t\t\t\t"+t._s(t.post_time)+"\n\t\t\t\t\t"),null!==t.post.updated_at?s("small",{staticClass:"text-light font-10"},[t._v(" ویرایش شده در "+t._s(t.updated_at)+" ")]):t._e(),t._v(" "),s("i",{staticClass:"material-icons-outlined font-14 text-light verical-middle"},[t._v("\n\t\t\t\t\t\t"+t._s("public"===t.post.show?"public":"group")+"\n\t\t\t\t\t")])])])]),t._v(" "),s("div",{staticClass:"actions"})]),t._v(" "),s("div",{staticClass:"post-body"},[s("pre",{staticClass:"text",attrs:{id:"posteditable-93"}},[t._v(t._s(t.post.text))])]),t._v(" "),s("div",{staticClass:"post-footer"},[s("div",{staticClass:"tagandcate"},[s("div",{staticClass:"tags"},t._l(t.post.tags,(function(e){return s("a",{key:e,staticClass:"tag-item",attrs:{href:"/tags/"+e}},[t._v("\n\t\t\t\t\t"+t._s(e)+"\n\t\t\t\t")])})),0),t._v(" "),null!==t.post.category?s("a",{staticClass:"category",attrs:{href:"/"+t.post.page.slug+"/categories/"+t.post.category.id}},[s("i",{staticClass:"material-icons text-grey"},[t._v("layers")]),s("span",{staticClass:"text-grey"},[t._v(" "+t._s(t.post.category.name))])]):t._e()]),t._v(" "),null!==t.post.medias&&void 0!==t.post.medias&&t.post.medias.length>0?s("div",{staticClass:"images"},[s("lazy-image",{staticClass:"m-0",staticStyle:{"min-height":"400px"},attrs:{alt:"",src:t.post.medias}})],1):t._e()])])}),[],!1,null,null,null).exports;a.Z.addLocale(o);const c={data:function(){return{liked:!1}},created:function(){this.liked=this.post.is_liked},methods:{like:function(){this.liked?this.liked=!1:this.liked=!0;this.$axios({method:"post",url:this.$APP_URL+"/like/"+this.post.id}).catch((function(t){}))}},name:"ArticleEmbed",props:{post:{type:Object,default:void 0,required:!0}},computed:{post_time:function(){return new a.Z("fa-FA").format(Date.parse(this.post.created_at),"twitter")+" ● "},postSlug:function(){var t=this.post.id;this.post.slug.length>0&&(function(t){throw new Error('"'+t+'" is read-only')}("post_slug"),t=this.post.slug);var e=this.post.page.slug;return this.$APP_URL+"/"+e+"/"+t},updated_at:function(){return null!==this.post.updated_at?new a.Z("fa-FA").format(Date.parse(this.post.updated_at),"twitter")+" ● ":""}}};const d=(0,l.Z)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"post-box",staticStyle:{margin:"0 !important","box-shadow":"none !important",width:"100vw"},attrs:{id:"post-24"}},[s("div",{staticClass:"post-header"},[s("a",{staticClass:"publisher",attrs:{href:"/"+t.post.page.slug}},[s("img",{attrs:{src:t.post.page.profile}}),t._v(" "),s("div",[s("strong",[t._v(" "+t._s(t.post.page.name)+" "),1===t.post.page.is_verified?s("i",{staticClass:"verificationcheck"},[t._v("check_circle")]):t._e()]),t._v(" "),s("span",{staticClass:"text-muted font-12"},[t._v("\n\t\t\t\t\t"+t._s(t.post.page.short_bio)+"\n\t\t\t\t")]),t._v(" "),s("small",{staticClass:"text-light font-10"},[t._v("\n\t\t\t\t\t"+t._s(t.post_time)+"\n\t\t\t\t\t"),null!==t.post.updated_at?s("small",{staticClass:"text-light font-10"},[t._v(" ویرایش شده در "+t._s(t.updated_at)+" ")]):t._e(),t._v(" "),s("i",{staticClass:"material-icons-outlined font-14 text-light verical-middle"},[t._v("\n\t\t\t\t\t\t"+t._s("public"===t.post.show?"public":"group")+"\n\t\t\t\t\t")])])])]),t._v(" "),s("div",{staticClass:"actions"})]),t._v(" "),s("a",{staticClass:"post-body clickale",attrs:{href:t.postSlug}},[s("div",{staticClass:"images articleimg"},[s("lazy-image",{staticClass:"m-0",staticStyle:{"min-height":"400px"},attrs:{alt:"",src:t.post.medias}})],1),t._v(" "),s("h4",{staticClass:"mt-3 mb-0"},[t._v(t._s(t.post.title))])]),t._v(" "),s("div",{staticClass:"post-footer"},[s("div",{staticClass:"tags"},t._l(t.post.tags,(function(e){return s("abbr",{key:e,staticClass:"tag-item",attrs:{href:"/tags/"+e}},[t._v("\n\t\t\t\t"+t._s(e)+"\n\t\t\t")])})),0),t._v(" "),null!==t.post.category?s("a",{staticClass:"category",attrs:{href:"/"+t.post.page.slug+"/categories/"+t.post.category.id}},[s("i",{staticClass:"material-icons text-grey"},[t._v("layers")]),s("span",{staticClass:"text-grey"},[t._v(" "+t._s(t.post.category.name))])]):t._e()])])}),[],!1,null,null,null).exports,m={created:function(){"article"===this.post.type?this.component=d:"post"===this.post.type&&(this.component=r)},data:function(){return{component:r}},name:"Widget",layout:null,props:{post:{type:Object,default:void 0}}};const p=(0,l.Z)(m,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.component,{tag:"component",attrs:{post:t.post}})}),[],!1,null,null,null).exports}}]);