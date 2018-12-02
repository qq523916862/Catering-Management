<template>
    <div class="container-fluid bg-default">
        <div class="container">
            <div class="login-box">
              <h2 class="color-title text-ellip">
                  <div class="h3"><img class="m-r-sm" :src="require('@/assets/images/logo.png')" alt="">素食餐厅</div>
              </h2>

              <el-form ref="login" status-icon :rules="userRule" :model="userMessage" size="small">
                <el-form-item label="用户名" prop="uname">
                  <el-input v-model="userMessage.uname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                  <el-input v-model="userMessage.upwd" type="password"></el-input>
                </el-form-item>
                <el-form-item size="large" class="m-t-lg">
                  <el-button type="primary" @click="submit('login')">登录</el-button>
                  <el-button @click="resetForm('login')">重置</el-button>
                </el-form-item>
              </el-form>
                <!--<div class="checkbox-inline form-group form-group-sm sign-keep">-->
                    <!--<input type="checkbox" id="keepSign" v-model="keepSign"><label for="keepSign" class="text-thin color-default">Keep me signed in</label>-->
                <!--</div>-->
                <!--<div class="form-group form-group-sm m-t-lg p-t-lg sign-tool">-->
                    <!--<div class="col-xs-6 text-right m-t-md"><span>Forgot username?</span></div>-->
                    <!--<div class="col-xs-6 text-left m-t-md"><span>Forgot password?</span></div>-->
                <!--</div>-->
                <div class="form-group form-group-sm signUp-control m-t-lg">
                    <div class="col-xs-12 signUp color-default">还没有账号？ <span @click="jumpSignUp">注册</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            var unameRule = (rule, value, callback) => {
              if (!value) {
                callback(new Error('用户名不能为空'));
              } else if (value.length<3||value.length>16) {
                callback(new Error('用户名长度在3-16之间!'));
              } else if(!/^[a-zA-Z0-9]*$/.test(value)){
                callback(new Error('用户名不能含有特殊字符'));
              } else {
                callback();
              }
            };
            return {
              userMessage: {
                uname: null,
                upwd:null
              },
              userRule: {
                uname: [
                  { validator: unameRule, trigger: 'blur' }
                ],
                upwd: [
                  { required: true, message: '密码不能为空', trigger: 'blur' },
                  { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
                ]
              }
            }
        },
        methods:{
            jumpSignUp(){
                this.$router.push("/register");
            },
            jumpMain(){
                this.$router.push("/main");
            },
            submit(formName){
              this.$refs[formName].validate().then(()=>{
                this.$http.post("/user/login",{uname:this.userMessage.uname,upwd:this.userMessage.upwd},{emulateJSON:true}).then(result=>{
                  if(result.body.code==1){
                    this.jumpMain();
                  }
                  this.$message({
                    type:result.body.code==1?"success":"warning",
                    message:result.body.msg
                  });
                },err=>{
                  console.log("网络连接错误");
                  this.$message({
                    type:"error",
                    message:"网络连接错误"
                  });
                })
              },()=>{
                this.$message({
                    type:"warning",
                    message:"请正确填写信息"
                  });
              });
            },
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>
.login-box{
  min-width:300px;
  width:50%;
  max-width:450px;
  vertical-align: middle;
  height: 440px;
  position: absolute;
  top:20%;
  bottom:20px;
  left:0px;
  right:0px;
  margin: 0 auto;
  padding:20px;
  background:white;
  border:3px solid #DADCDE;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 30px #c2c4c6;
  -moz-box-shadow: 0px 0px 30px #c2c4c6;
  box-shadow: 0px 0px 30px #c2c4c6;
}
.btn{
  -webkit-transition: all .5s ease 0s;
  -moz-transition: all .5s ease 0s;
  -ms-transition: all .5s ease 0s;
  -o-transition: all .5s ease 0s;
  transition: all .5s ease 0s;
}
.container{
  position: relative;
  height:100%;
}
.container-fluid{
  height:100%;
}
.color-default{
  color:#919292;
}
.color-title{
  color:#454545;
}
.text-thin{
  font-weight: 500;
}
.sign-keep{
  padding-top:20px;
}
.sign-tool,.signUp span{
  padding-top:10px;
  color: #0589D1;
  font-size:12px;
}
.sign-tool div span:hover,.signUp span:hover{
  text-decoration: underline;
  cursor: pointer;
}
.bg-default{
  background:#ECEFF1;
}
.signUp-control{
  margin-top:60px;
  font-size:12px;
}
.login-box img{
  height:40px;
  position: relative;
  top:-3px;
}
</style>
