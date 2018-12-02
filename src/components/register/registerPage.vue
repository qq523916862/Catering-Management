<template>
    <div class="container-fluid signUp-contain">
        <div class="container signUp-contain">
            <div class="signUp-box">
                <div class="signUp-title">
                    <div class="h3"><img class="m-r-sm" :src="require('@/assets/images/logo.png')" alt="">注册</div>
                </div>
                <el-form ref="register" status-icon :rules="userRule" :model="userSignUp" size="mini">
                  <div class="form-group">
                    <div class="legend-list"></div>
                    <div class="color-defaule register-legend">账号信息</div>
                  </div>

                  <el-form-item label="登录名" prop="uname">
                    <el-input v-model="userSignUp.uname"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="upwd">
                    <el-input v-model="userSignUp.upwd" type="password"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="upwd2">
                    <el-input v-model="userSignUp.upwd2" type="password"></el-input>
                  </el-form-item>

                  <div class="form-group">
                    <div class="legend-list"></div>
                    <div class="color-defaule register-legend">个人信息</div>
                  </div>

                  <el-form-item label="名字" prop="name">
                    <el-input v-model="userSignUp.name" type="text"></el-input>
                  </el-form-item>

                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userSignUp.email" type="text"></el-input>
                  </el-form-item>

                  <el-form-item label="手机" prop="phone">
                    <el-input v-model="userSignUp.phone" type="text"></el-input>
                  </el-form-item>

                  <el-form-item label="生日" prop="birth">
                    <el-date-picker type="date" v-model="userSignUp.birth" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
                  </el-form-item>

                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="userSignUp.sex"  placeholder="请选择" class="vw-12">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="0"></el-option>
                    </el-select>
                  </el-form-item>

                  <div class="row">
                      <div class="col-xs-6">
                          <button class="btn btn-info vw-11" type="button" @click="submit('register')">注册</button>
                      </div>
                      <div class="col-xs-6">
                        <button class="btn btn-warning vw-11" type="button" @click="reset('register')">重置</button>
                      </div>
                  </div>
                </el-form>
                <div class="form-group form-group-sm signIn-contorl">
                  <div class="color-default">已有账号？ <span @click="jumpSignIn">登录</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register-page",
        data(){
          var unameRule = (rule, value, callback) => {
            if(!/^[a-zA-Z0-9]*$/.test(value)){
              callback(new Error('用户名不能含有特殊字符'));
            } else {
              this.$http.post("/user/checkUname",{uname:value},{emulateJSON:true}).then(result=>{
                  if(result.body.code==1){
                    callback();
                  }else{
                    callback(new Error('用户名已经存在'));
                  }
              },err=>{
                console.log("网络连接错误");
              });
            }
          };
          var upwd2Rule = (rule,value,callback)=>{
              if(value!=this.userSignUp.upwd){
                callback(new Error('两次密码不匹配'));
              } else {
                callback();
              }
          };
          var emailRule = (rule,value,callback)=>{
            if(!/^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,6}$/.test(value)){
              callback(new Error('邮箱格式不正确'));
            } else {
              callback();
            }
          };
          var phoneRule =
            (rule,value,callback)=>{
              if(!/^[0-9]*$/.test(value)){
                callback(new Error('手机号只能为数字'));
              } else {
                callback();
              }
            };
          return {
            userSignUp: {
              uname: null,
              upwd:null,
              upwd2:null,
              name:"",
              email:"",
              phone:"",
              birth:"",
              sex:""
            },
            userRule: {
              uname: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 3, max: 16, message: '密码长度在 3 到 16 个字符', trigger: 'blur' },
                { validator: unameRule, trigger: 'blur' }
              ],
              upwd: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
              ],
              upwd2:[
                { required: true, message: '确认密码不能为空', trigger: 'blur' },
                { min: 6, max: 16, message: '确认密码长度在 6 到 16 个字符', trigger: 'blur' },
                { validator: upwd2Rule, trigger: 'blur' }
              ],
              name:[
                { required: true, message: '名字不能为空', trigger: 'blur' },
              ],
              email:[
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { validator: emailRule, trigger: 'blur' }
              ],
              phone:[
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { min: 11, max: 11, message: '手机号为11位数字', trigger: 'blur' },
                { validator: phoneRule, trigger: 'blur' }
              ],
              birth:[
                { required: true, message: '生日不能为空', trigger: 'blur' }
              ],
              sex:[
                { required: true, message: '请选择性别', trigger: 'blur' }
              ]
            }
          }
        },
        methods:{
            jumpSignIn(){
              this.$router.push("/login");
            },
            jumpSignUp(){
              this.$router.push("/login");
            },
            reset(formName){
              this.$refs[formName].resetFields();
            },
            submit(formName){
              this.$refs[formName].validate().then(()=>{
                this.$http.post("/user/register",{uname:this.userSignUp.uname,upwd:this.userSignUp.upwd,name:this.userSignUp.name,email:this.userSignUp.email,phone:this.userSignUp.phone,birth:this.userSignUp.birth.getFullYear()+"-"+(this.userSignUp.birth.getMonth()+1)+"-"+this.userSignUp.birth.getDate(),sex:this.userSignUp.sex},{emulateJSON:true}).then(result=>{
                    if(result.body.code==1){
                      this.$message({
                        type:"success",
                        message:result.body.msg
                      });
                      this.$router.push("/login");
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
              },()=>{
                this.$message({
                  type:"warning",
                  message:"请正确填写用户信息"
                });
              });
            }
        }
    }
</script>

<style scoped>
.signUp-contain{
  min-height:900px;
}
.container-fluid,.container{
  height:100%;
  position: relative;
  background: #ECEFF1;
}
.signUp-box{
  width:50%;
  max-width:450px;
  min-width:300px;
  height:860px;
  position: absolute;
  top:5%;
  right:0px;
  left:0px;
  margin: auto;
  padding:20px;
  background:white;
  border:3px solid #DADCDE;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 30px #c2c4c6;
  -moz-box-shadow: 0px 0px 30px #c2c4c6;
  box-shadow: 0px 0px 30px #c2c4c6;
}
.color-defaule{
  color:#919292;
}
.form-group-sm{
  margin-top:8px;
}
.register-legend{
  display: inline-block;
  background:white;
  padding:0 10px;
  position: relative;
  z-index: 2;
}
.legend-list{
  border-bottom:1px solid #CCCCCC;
  position: relative;
  top:11px;
}

.signUp-title img{
  height:40px;
  position: relative;
  top:-3px;
}
.signIn-contorl{
  color: #919292 ;
  margin-top:30px;
}
.signIn-contorl span{
  color: #0598DE;
  cursor: pointer;
}
.signIn-contorl span:hover{
  text-decoration: underline;
}
</style>
