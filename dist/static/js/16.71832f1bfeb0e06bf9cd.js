webpackJsonp([16],{121:function(e,t,n){function s(e){n(278)}var o=n(3)(n(220),n(302),s,null,null);e.exports=o.exports},220:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},methods:{loginOut:function(){var e=this;console.log("1"),this.$http.get("/api/loginOut").then(function(t){"y"==t.data.status?(console.log(t.data),e.$message({type:"success",message:t.data.message}),e.$router.replace("/")):e.$message.error(t.data.message)},function(e){console.log(e)})}},created:function(){this.loginOut()}}},257:function(e,t,n){t=e.exports=n(113)(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"LoginOut.vue",sourceRoot:""}])},278:function(e,t,n){var s=n(257);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n(114)("235ece6e",s,!0)},302:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},staticRenderFns:[]}}});
//# sourceMappingURL=16.71832f1bfeb0e06bf9cd.js.map