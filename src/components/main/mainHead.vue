<template>
    <div class="height-fluid">
        <div class="main-head-title m-l-0 p-x-lg pull-left" :class="{'active':navigationMode==0}">
          <img class="m-r-sm" :src="require('@/assets/images/logo.png')" alt="">素食餐厅
        </div>
        <div class="main-navigation-toolbtn pull-left p-l-md" @click="toggleNavigation" :class="{'active':navigationMode==0}">
            <span class="glyphicon" :class="{'glyphicon-align-justify':navigationBtnLife==0,'glyphicon-align-center':navigationBtnLife==1,'glyphicon-align-left':navigationBtnLife==2,'glyphicon-align-right':navigationBtnLife==3}"></span>
        </div>
        <div class="pull-right main-navigation-userTool">
            <ul class="list-inline text-center">
                <!--<li class="message-btn">-->
                    <!--<div class="height-fluid vw-12 message-drop" data-toggle="dropdown">-->
                        <!--<span class="glyphicon glyphicon-envelope"></span>-->
                        <!--<span class="label">{{message.length}}</span>-->
                    <!--</div>-->
                    <!--<ul id="message" class="dropdown-menu dropdown-menu-right message-dropdown" role="menu">-->
                      <!--<li v-for="item in message" class="p-t-lg">-->
                          <!--<a href="" @click="prevent($event)">-->
                              <!--<div>-->
                                <!--<span><span class="glyphicon glyphicon-comment"></span> {{item.user}}</span>-->
                                <!--<span class="pull-right">{{item.time}}</span>-->
                              <!--</div>-->
                              <!--<div class="p-b-sm">-->
                                <!--{{item.content}}-->
                              <!--</div>-->
                          <!--</a>-->
                      <!--</li>-->
                    <!--</ul>-->
                <!--</li>-->
                <li>
                    <div class="" data-toggle="dropdown">
                        <span data-toggle="dropdown" class="glyphicon glyphicon-user m-r-sm"></span>
                        {{userName}}
                        <span class="caret"></span>
                    </div>
                    <ul class="dropdown-menu dropdown-menu-right user-dropdown" role="menu">
                      <li :class="{'disabled':signActive=='已签到'}"><a href="" @click="sign($event)"><span class="glyphicon glyphicon-signal"></span> {{signActive}}</a></li>
                      <li><a href="" @click="destory($event)"><span class="glyphicon glyphicon-off"></span> 退出登录</a></li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "main-head",
        props:["bus"],
        data(){
          return {
            navigationBtnLife:0,
            navigationMode:1,
            userName:"user",
            signActive:"签到"
            // message:[
            //   {
            //     time:"16min",
            //     user:"leungboasing",
            //     content:"活动A"
            //   },
            //   {
            //     time:"16min",
            //     user:"leungboasing",
            //     content:"活动A"
            //   },
            //   {
            //     time:"16min",
            //     user:"leungboasing",
            //     content:"活动A"
            //   },
            //   {
            //     time:"16min",
            //     user:"leungboasing",
            //     content:"活动A"
            //   },
            //   {
            //     time:"16min",
            //     user:"leungboasing",
            //     content:"活动A"
            //   }
            // ]
          }
        },
        methods:{
            toggleNavigation(){
                if(this.navigationMode==0){
                    this.navigationMode=1;
                    this.$parent.$data.navigationMode=1;
                    setTimeout(()=>{
                      this.navigationBtnLife=1;
                      setTimeout(()=>{
                        this.navigationBtnLife=2;
                        setTimeout(()=>{
                          this.navigationBtnLife=1;
                          setTimeout(()=>{
                            this.navigationBtnLife=3;
                            setTimeout(()=>{
                              this.navigationBtnLife=0;
                            },100);
                          },100);
                        },100);
                      },100);
                    },100);
                }else{
                    this.navigationMode=0;
                    this.$parent.$data.navigationMode=0;
                    setTimeout(()=>{
                      this.navigationBtnLife=3;
                      setTimeout(()=>{
                        this.navigationBtnLife=1;
                        setTimeout(()=>{
                          this.navigationBtnLife=2;
                          setTimeout(()=>{
                            this.navigationBtnLife=1;
                            setTimeout(()=>{
                              this.navigationBtnLife=3;
                            },100);
                          },100);
                        },100);
                      },100);
                    },100);
                }
            },
            prevent(e){
               e.preventDefault();
            },
            destory(e){
              e.preventDefault();
              this.$http.get("/user/userdestory").then(rsult=>{
                this.$message({
                  type:"success",
                  message:"注销成功"
                });
                this.$router.push("/login");
              },err=>{
                console.log("网络连接错误");
                this.$message({
                  type:"error",
                  message:"网络连接错误"
                });
              });
            },
            checkSign(){
              this.$http.get("/user/checkLogin").then(result=>{
                if(result.data.code==1){
                  this.userName=result.data.msg;
                }else{
                  this.$message({
                    type:"warning",
                    message:"请登录"
                  });
                  this.$router.push("/login");
                }
              },err=>{
                console.log("网络连接错误");
                this.$message({
                  type:"error",
                  message:"网络连接错误"
                });
              });
            },
            sign(e){
              e.preventDefault();
              if(this.signActive=="已签到") return;
              this.$http.post("/user/signDay",{emulateJSON:true}).then(result=>{
                if(result.body.code==1){
                  this.$message({
                    type:"success",
                    message:result.body.msg
                  });
                  this.signActive="已签到";
                }else{
                  this.$message({
                    type:"error",
                    message:result.body.msg
                  });
                }
              },err=>{
                console.log("网络连接错误");
                this.$message({
                  type:"error",
                  message:"网络连接错误"
                });
              });
            },
            checkSignUp(){
              this.$http.get("/user/checkSign").then(result=>{
                if(result.body.code==1){
                  this.signActive="已签到";
                }
              },err=>{
                console.log("网络连接错误");
                this.$message({
                  type:"error",
                  message:"网络连接错误"
                });
              });
            },
        },
        mounted(){
        document.body.onresize = ()=>{
            if(window.innerWidth>=798){
                return ;
            }else{
                if(this.navigationMode==0) return ;
                this.navigationMode=0;
                this.$parent.$data.navigationMode=0;
                setTimeout(()=>{
                  this.navigationBtnLife=3;
                  setTimeout(()=>{
                    this.navigationBtnLife=1;
                    setTimeout(()=>{
                      this.navigationBtnLife=2;
                      setTimeout(()=>{
                        this.navigationBtnLife=1;
                        setTimeout(()=>{
                          this.navigationBtnLife=3;
                        },100);
                      },100);
                    },100);
                  },100);
                },100);
            }
        };
        this.checkSign();
        this.bus.$on("getUserMsg",()=>{
          this.checkSign();
        });
        this.checkSignUp();
        }
    }
</script>

<style scoped>
.main-head-title{
  line-height: 51px;
  display: inline-block;
  font-size: 20px;
  font-family: STXINWEI;
  color: white;
  background: #422f1c;
  -webkit-transition: all 0.5s linear 0s;
  -moz-transition: all 0.5s linear 0s;
  -ms-transition: all 0.5s linear 0s;
  -o-transition: all 0.5s linear 0s;
  transition: all 0.5s linear 0s;
  width: 230px;
}
.main-head-title.active{
  margin-left:-230px;
}
.main-head-title img{
  height:40px;
}
.main-navigation-toolbtn{
  height: 50px;
  width: 50px;
  line-height: 50px;
  display: inline-block;
  color: #ffffff;
  font-size: 20px;
}
.main-navigation-toolbtn.active{
  background: #37aff0;
}
.main-navigation-userTool{
  position: relative;
  height: 50px;
  min-width: 200px;
}
.main-navigation-userTool>ul{
  height: 50px;
  position: relative;
  top:-6px;
}
.main-navigation-userTool>ul>li{
  color: #ffffff;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  position: relative;
  top: 6px;
  padding:0 30px;
}
.main-navigation-userTool>ul>li:hover{
  background: rgba(255,255,255,0.1);
}
.label{
  border-radius: 50%;
  padding:2px 4px;
  background: #D50000;
  position: absolute;
  top:8px;
  left:40px;
  padding-right:5px;
}
.message-btn{
  width:76px;
}
.message-dropdown{
  position: absolute;
  width:400px;
}
.user-dropdown{
  width:100%;
  z-index: 11;
}
.dropdown-menu li a:hover{
  background: #0288D1;
  height:100%;
  color: #ffffff;
}
</style>
