(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auth"],{"603e":function(e,a,r){"use strict";r.r(a);var t=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("v-container",[r("v-layout",{attrs:{"align-center":"","justify-space-around":"",row:"","fill-height":""}}),r("v-flex",[r("v-card",{staticClass:"elevation-12"},[r("v-toolbar",{attrs:{dark:"",color:"primary"}},[r("v-toolbar-title",[e._v("Update Profile")]),r("v-spacer")],1),r("v-card-text",[r("v-container",{attrs:{"grid-list-4":""}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",sm4:"",md4:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("First Name"),"data-vv-name":"First Name",label:"First Name"},model:{value:e.firstName,callback:function(a){e.firstName=a},expression:"firstName"}})],1),r("v-flex",{attrs:{xs12:"",sm4:"",md4:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("Middle Name"),"data-vv-name":"Middle Name",label:"Middle Name"},model:{value:e.middleName,callback:function(a){e.middleName=a},expression:"middleName"}})],1),r("v-flex",{attrs:{xs12:"",sm4:"",md4:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("Last Name"),"data-vv-name":"Last Name",label:"Last Name"},model:{value:e.lastName,callback:function(a){e.lastName=a},expression:"lastName"}})],1),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{"error-messages":e.errors.collect("Email"),"data-vv-name":"Email",label:"Email"},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}})],1),r("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:8",expression:"'required|min:8'"}],ref:"password",attrs:{label:"Password",type:e.password,counter:"","error-messages":e.errors.collect("Password"),"data-vv-name":"Password"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}})],1),r("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[r("v-text-field",{directives:[{name:"validate",rawName:"v-validate",value:"required|confirmed:password",expression:"'required|confirmed:password'"}],attrs:{label:"Confirm Password",type:e.password,"error-messages":e.errors.collect("Confirm Password"),"data-vv-name":"Confirm Password","data-vv-as":"password"},model:{value:e.confirmPassword,callback:function(a){e.confirmPassword=a},expression:"confirmPassword"}})],1),r("v-card-actions",[r("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},[r("v-btn",{attrs:{block:"",round:"",color:"primary",loading:e.load,disabled:e.load},on:{click:function(a){return a.ctrlKey||a.shiftKey||a.altKey||a.metaKey?null:e.updateUser()}},nativeOn:{click:function(a){e.loader="load"}}},[e._v("Update")])],1)],1)],1)],1)],1),r("v-snackbar",{attrs:{color:e.snackbar.color,bottom:e.snackbar.y,"multi-line":e.snackbar.mode,right:e.snackbar.x,timeout:e.snackbar.timeout},model:{value:e.snackbar.isError,callback:function(a){e.$set(e.snackbar,"isError",a)},expression:"snackbar.isError"}},[e._v("\n        "+e._s(e.snackbar.text)+"\n        "),r("v-btn",{attrs:{flat:""},on:{click:function(a){e.snackbar.isError=!1}}},[e._v("Close")])],1)],1)],1)],1)},s=[],l=r("f499"),o=r.n(l),i=(r("bc3a"),{data:function(){return{valid:!1,loader:null,load:!1,snackbar:{isError:!1,y:!0,x:!0,mode:!0,timeout:6e3,text:null,color:"error"},id:localStorage.getItem("userID"),firstName:null,middleName:null,lastName:null,email:null,password:null,confirmPassword:null}},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;this.$store.dispatch("viewUserId",{id:this.id}).then(function(a){e.firstName=a.data.userDetails.firstName,e.middleName=a.data.userDetails.middleName,e.lastName=a.data.userDetails.lastName,e.email=a.data.userDetails.email,e.username=a.data.userDetails.username,e.password=a.data.userDetails.password})},updateUser:function(){var e=this;this.$refs.form.validate()&&(this.load=!0,this.$store.dispatch("updateUser",{id:this.id,firstName:this.firstName,middleName:this.middleName,lastName:this.lastName,email:this.email,username:this.username,password:this.password}).then(function(a){e.load=!1,200===a.status&&(e.snackbar.color="success",e.snackbar.isError=!0,e.snackbar.text="User Successfully Updated!",setTimeout(function(){return e.$router.push({path:"/users/customerview"})},2e3))}).catch(function(a){console.log(o()(a.response.status)),500===a.response.status&&(e.load=!1,e.snackbar.isError=!0,e.snackbar.text="Sorry, we're slightly having a server error. Please hang on there."),404===a.status&&(e.laod=!1,e.snackbar.isError=!0,e.snackbar.text="Sorry, I'm afraid we can't communicate with the server right now."),401===a.status?(e.snackbar.isError=!0,e.snackbar.text="Session Ended Please Relogin. Will logout in 3 Seconds",e.$router.push("logout")):(e.load=!1,e.snackbar.isError=!0,e.snackbar.text=a.data.errors.errorCode+" "+a.data.errors.message)}))}}}),n=i,d=r("2877"),c=Object(d["a"])(n,t,s,!1,null,null,null);a["default"]=c.exports},a21f:function(e,a,r){var t=r("584a"),s=t.JSON||(t.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}},a55b:function(e,a,r){"use strict";r.r(a);var t=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("v-content",[r("v-container",{attrs:{fluid:"","fill-height":""}},[r("v-layout",{attrs:{"align-center":"","justify-center":""}},[r("v-flex",{attrs:{x12:"",sm8:"",md4:""}},[r("v-card",{staticClass:"elevation-12"},[r("v-toolbar",{attrs:{dark:"",color:"primary"}},[r("v-toolbar-title",[e._v("Login")]),r("v-spacer")],1),r("br"),r("v-card-text",[r("v-flex",{attrs:{xs9:"","offset-xs1":""}},[r("v-form",{ref:"form",model:{value:e.valid,callback:function(a){e.valid=a},expression:"valid"}},[r("v-text-field",{attrs:{"prepend-icon":"person",label:"E-mail",type:"text",rules:e.emailRules},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}}),r("v-text-field",{attrs:{"prepend-icon":"lock",label:"Password",type:"password",rules:e.passwordRules},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}})],1)],1)],1),r("v-card-actions",[r("v-flex",{attrs:{xs4:"","offset-xs4":""}},[r("v-btn",{attrs:{block:"",round:"",color:"primary",loading:e.load,disabled:e.load},on:{click:function(a){return a.ctrlKey||a.shiftKey||a.altKey||a.metaKey?null:e.login()}},nativeOn:{click:function(a){e.loader="load"}}},[e._v("Login")])],1)],1),r("br")],1)],1)],1),r("v-snackbar",{attrs:{color:e.snackbar.color,bottom:e.snackbar.y,"multi-line":e.snackbar.mode,right:e.snackbar.x,timeout:e.snackbar.timeout},model:{value:e.snackbar.isError,callback:function(a){e.$set(e.snackbar,"isError",a)},expression:"snackbar.isError"}},[e._v("\n            "+e._s(e.snackbar.text)+"\n        "),r("v-btn",{attrs:{flat:""},on:{click:function(a){e.snackbar.isError=!1}}},[e._v("\n            Close\n        ")])],1)],1)],1)},s=[],l={data:function(){return{loader:null,load:!1,snackbar:{isError:!1,y:!0,x:!0,mode:!0,timeout:6e3,text:null,color:"error"},valid:!1,email:null,password:null,emailRules:[function(e){return!!e||"Email is Required"}],passwordRules:[function(e){return!!e||"Password is Required"}]}},computed:{loggedIn:function(){return this.$store.getters.loggedIn}},methods:{login:function(){var e=this;this.$refs.form.validate()&&(this.load=!0,this.$store.dispatch("retrieveToken",{email:this.email,password:this.password}).then(function(a){console.log(a),e.$router.push({name:"home"})}).catch(function(a){500===a.status&&(e.load=!1,e.snackbar.isError=!0,e.snackbar.text="Sorry, we're slightly having a server error. Please hang on there."),404===a.status||"Network Error"===a?(e.load=!1,e.snackbar.isError=!0,e.snackbar.text="Sorry, I'm afraid we can't communicate with the server right now."):(e.load=!1,e.snackbar.isError=!0,e.snackbar.text=a.data.errors.errorCode+" "+a.data.errors.message)}))}}},o=l,i=r("2877"),n=Object(i["a"])(o,t,s,!1,null,null,null);a["default"]=n.exports},c100:function(e,a,r){"use strict";r.r(a);var t=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div")},s=[],l={created:function(){this.$store.dispatch("destroyToken"),this.$router.push("login")}},o=l,i=r("2877"),n=Object(i["a"])(o,t,s,!1,null,null,null);a["default"]=n.exports},f499:function(e,a,r){e.exports=r("a21f")}}]);
//# sourceMappingURL=auth.bdf27ae1.js.map