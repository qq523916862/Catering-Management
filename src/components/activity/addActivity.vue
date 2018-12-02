<template>
    <div class="addActivity-Page p-sm m-l-sm">
      <el-card>
          <div class="row">
              <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                <el-step title="活动信息" ></el-step>
                <el-step title="活动菜谱" ></el-step>
                <el-step title="确认添加" ></el-step>
              </el-steps>
          </div>
          <div class="row">
            <div class="h3 m-b-md addDishes-item-title p-b-sm"></div>
            <div class="h3 p-b-md" v-show="active==0">活动信息</div>
            <div class="h3 p-b-md" v-show="active==1">活动菜谱</div>
            <div class="h3 p-b-md" v-show="active==2">确认活动</div>
          </div>
              <div class="row addActive-tabContain addActivity-form" v-show="active==0">
                <div class="col-xs-7">
                  <el-form :model="activityData" :rules="activityRules" ref="activity" label-width="100px" size="mini">
                    <el-form-item label="活动名称" prop="aname">
                      <el-input v-model="activityData.aname"></el-input>
                    </el-form-item>
                    <el-form-item label="主要负责人" prop="aperson">
                      <el-select v-model="activityData.aperson" class="vw-12" placeholder="主要负责人" @change="setUser">
                        <el-option v-for="item in userList"  :label="item.name" :value="item.uid" :key="item.uid"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                      <el-col :span="11">
                        <el-form-item prop="abegin">
                          <el-date-picker type="date" placeholder="选择日期" v-model="activityData.abegin" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="aend">
                          <el-date-picker type="date" placeholder="选择日期" v-model="activityData.aend" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="活动标签" prop="alabel">
                      <el-radio-group v-model="activityData.alabel">
                          <el-radio label="热门"></el-radio>
                          <el-radio label="最新"></el-radio>
                          <el-radio label="超值"></el-radio>
                          <el-radio label="推荐"></el-radio>
                          <el-radio label="招牌"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动描述" prop="amaterials">
                      <el-input type="textarea" v-model="activityData.amaterials"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="col-xs-5 p-0 uploadImg">
                  <!--<div class="p-b-sm h4">展示图片</div>-->
                  <el-upload v-if="!imgUrl" class="vw-12" drag action="/activity/uploadImg?index=0" :on-success="successUploadActivity" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>菜谱展示图片</div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
                  </el-upload>
                  <div class="vh-12 vh-12" v-if="imgUrl">
                    <div class="uploadImg-show" @click="imgUrl=''">
                      <div :style="{'backgroundImage':'url(/static/images/activity/'+imgUrl+')'}"></div>
                      <div>
                        <span class="el-icon-delete"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

           <div class="row addActive-tabContain" v-show="active==1">
              <div class="table-responsive m-lg">
                  <el-table style="width: 100%;" :data="menus" :stripe=" true" :border="true" size="small">
                    <el-table-column prop="data" label="日期" width="200"></el-table-column>
                    <el-table-column label="菜谱">
                      <el-table-column label="早斋">
                        <el-table-column prop="backfast[main]" label="主食"></el-table-column>
                        <el-table-column prop="backfast[backup]" label="副食"></el-table-column>
                      </el-table-column>
                      <el-table-column label="午斋">
                        <el-table-column prop="lunch[main]" label="主食"></el-table-column>
                        <el-table-column prop="lunch[backup]" label="副食"></el-table-column>
                      </el-table-column>
                      <el-table-column label="晚斋">
                        <el-table-column prop="dinner[main]" label="主食"></el-table-column>
                        <el-table-column prop="dinner[backup]" label="副食"></el-table-column>
                      </el-table-column>
                      <el-table-column label="编辑" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="openDialog(scope)">编辑</el-button>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                  <el-dialog title="设置菜谱" :visible.sync="dialogFormVisible">
                    <el-form size="mini" :label-position="'right'" class="m-b-lg">
                      <div class="setMenuTitle">早斋</div>
                      <div class="row container-fluid">
                        <div class="col-xs-12 col-md-6">
                            <el-form-item label="主食">
                              <el-select v-model="dialogData.backfast.main"  placeholder="请选择主食" class="vw-12">
                                <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mname"></el-option>
                              </el-select>
                            </el-form-item>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <el-form-item label="副食">
                              <el-select v-model="dialogData.backfast.backup" multiple placeholder="请选择副食" class="vw-12" >
                                <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mname"></el-option>
                              </el-select>
                            </el-form-item>
                        </div>
                      </div>
                      <div class="setMenuTitle">午斋</div>
                      <div class="row container-fluid">
                        <div class="col-xs-12 col-md-6">
                          <el-form-item label="主食">
                            <el-select v-model="dialogData.lunch.main"  placeholder="请选择主食" class="vw-12">
                              <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mname"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="col-xs-12 col-md-6">
                          <el-form-item label="副食" >
                            <el-select v-model="dialogData.lunch.backup" multiple placeholder="请选择副食" class="vw-12" >
                              <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mname"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="setMenuTitle">晚斋</div>
                      <div class="row container-fluid">
                        <div class="col-xs-12 col-md-6">
                          <el-form-item label="主食">
                            <el-select v-model="dialogData.dinner.main"  placeholder="请选择主食" class="vw-12">
                              <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mname"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <div class="col-xs-12 col-md-6">
                          <el-form-item label="副食" >
                            <el-select v-model="dialogData.dinner.backup" multiple placeholder="请选择副食" class="vw-12" >
                              <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mname"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                    <button type="button" class="btn btn-warning m-r-lg" @click="dialogFormVisible=false">取消</button>
                    <button type="button" class="btn btn-success m-l-lg" @click="dialogSetMenu">确定</button>
                  </el-dialog>
              </div>
          </div>

           <div class="row addActive-tabContain" v-if="active==2">
             <div class="detailActivty-page">
               <div class="container-fluid">
                 <div class="row">
                   <div class="col-xs-6 col-md-4 col-lg-3 p-l-lg">
                     <div class="activity-img-box">
                       <div class="activity-img" :style="{'backgroundImage':'url(/static/images/activity/'+imgUrl+')'}"></div>
                     </div>
                   </div>
                   <div class="col-xs-6 col-md-8 col-lg-9 menu-contain">
                     <div class="menu-title text-left">
                       <span>活动</span>
                       <span>{{activityData.aname}}</span>
                     </div>
                     <div class="menu-label text-left p-l-lg m-t-md">
                       <span class="glyphicon glyphicon-tag text-primary p-r-sm"></span> 标签: <span class="label label-warning">{{activityData.alabel}}</span>
                     </div>
                     <div class="menu-label text-left p-l-lg m-t-md">
                       <span class="glyphicon glyphicon-user text-primary p-r-sm"></span>主要负责人: <span>{{user}}</span>
                     </div>
                     <div class="menu-label text-left m-t-md p-l-lg">
                       <span class="glyphicon glyphicon-time text-danger p-r-sm"></span>活动时间: <span>{{activityData.abegin.getFullYear()+"-"+(activityData.abegin.getMonth()+1)+"-"+activityData.abegin.getDate()}} ~ {{activityData.aend.getFullYear()+"-"+(activityData.aend.getMonth()+1)+"-"+activityData.aend.getDate()}}</span>
                     </div>
                     <div class="menu-label text-left p-l-lg m-t-md hidden-xs p-r-lg">
                       <span class="glyphicon glyphicon-hand-down text-danger p-r-sm"></span>介绍: <p class="p-l-md">{{activityData.amaterials}}</p>
                     </div>
                   </div>
                 </div>
                 <div class="row">
                   <div class="menu-label text-left p-l-lg p-r-lg m-t-lg m-l-lg visible-xs">
                     <span class="glyphicon glyphicon-hand-down text-danger p-r-sm"></span>介绍: <p class="p-l-md">{{activityData.amaterials}}</p>
                   </div>
                 </div>
                 <div class="container-fluid row m-t-lg">
                   <div class="recipes-title text-danger m-t-lg">
                     活动菜谱
                   </div>
                   <div class="table-responsive">
                     <table class="table-bordered table m-t-lg activity-table table-hover">
                       <thead>
                       <tr>
                         <th class="vw-3">日期</th>
                         <th class="vw-3">早斋</th>
                         <th class="vw-3">午斋</th>
                         <th class="vw-3">晚斋</th>
                       </tr>
                       </thead>
                       <tbody>
                       <tr v-for="item in menus">
                         <td class=" text-middle text-center text-primary">{{item.data}}</td>
                         <td>主食：<span class="p-r-xs">{{item.backfast.main}}，</span>副食：<span>{{item.backfast.backup.join(",")}}</span></td>
                         <td>主食：<span class="p-r-xs">{{item.lunch.main}}，</span>副食：<span>{{item.lunch.backup.join(",")}}</span></td>
                         <td>主食：<span class="p-r-xs">{{item.dinner.main}}，</span>副食：<span>{{item.dinner.backup.join(",")}}</span></td>
                       </tr>
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <div class="m-lg">
            <button type="button" class="btn btn-warning m-r-lg" v-show="active==0">重置</button>
            <button type="button" class="btn btn-warning m-r-lg" v-show="active==1||active==2" @click="setActive(false)">上一步</button>
            <button type="button" class="btn btn-success m-l-lg" v-show="active==0" @click="setActive(true)">下一步</button>
            <button type="button" class="btn btn-success m-l-lg" v-show="active==1" @click="setMenus">下一步</button>
            <button type="button" class="btn btn-success m-l-lg" v-show="active==2" @click="submit">完成</button>
          </div>

      </el-card>

    </div>
</template>

<script>
    export default {
        name: "add-activity",
        data() {
          var aendRules = (rule,value,callback)=>{
              if(typeof this.activityData.abegin !="object"){
                callback(new Error("请先填写开始日期"));
                this.activityData.aend = "";
              }else{
                if(value<this.activityData.abegin){
                  callback(new Error("结束日期不能比开始日期早"));
                }else{
                  callback();
                }
              }
          };
          return {
            imgUrl:"",
            active:0,
            setDate:null,
            uid:'',
            indexMenu:0,
            dialogFormVisible:false,
            user:[],
            userList:[],
            menus:[],
            menusList:[],
            dialogData:{
              backfast: {
                main: "",
                backup:[]
              },
              lunch:{
                main: "",
                backup:[]
              },
              dinner:{
                main: "",
                backup:[]
              }
            },
            activityData: {
              aname: '',
              aperson: '',
              abegin: '',
              aend: '',
              alabel: [],
              amaterials:''
            },
            activityRules: {
              aname: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },

              ],
              aperson: [
                { required: true, message: '请填写主要负责人', trigger: 'change' }
              ],
              abegin: [
                {required: true, message: '请填写活动开始时间', trigger: 'change' }
              ],
              aend: [
                {required: true, message: '请填写活动结束时间', trigger: 'change' },
                { validator: aendRules, trigger: 'blur' }
              ],
              alabel: [
                {required: true, message: '请选择一个活动标签', trigger: 'change' }
              ],
              amaterials: [
                { required: true, message: '请输入活动描述', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
            }
          };
        },
        methods: {
          resMid(mname){
            for(var item of this.menusList){
              if(mname==item.mname){
                return item.mid;
              }
            }
          },
          submit(formName) {
            var men = [];
            this.menus.map((item,index)=>{
              var date = item.data;
              var backfast = item.backfast;
              var lunch = item.lunch;
              var dinner = item.dinner;
              men.push({date:date,mode:0,mid:this.resMid(backfast.main)});
              men.push({date:date,mode:2,mid:this.resMid(backfast.main)});
              men.push({date:date,mode:4,mid:this.resMid(dinner.main)});
              for(var data of backfast.backup){
                men.push({date:date,mode:1,mid:this.resMid(data)});
              }
              for(var data of lunch.backup){
                men.push({date:date,mode:3,mid:this.resMid(data)});
              }
              for(var data of dinner.backup){
                men.push({date:date,mode:5,mid:this.resMid(data)});
              }
            });
            this.$http.get("/user/getPower").then(result=>{
              if(result.body.position<4){
                this.$http.post("/activity/addActivity", {
                  aname: this.activityData.aname,
                  aperson: this.activityData.aperson,
                  abegin: this.activityData.abegin.getFullYear()+"-"+(this.activityData.abegin.getMonth()+1)+"-"+this.activityData.abegin.getDate(),
                  aend: this.activityData.aend.getFullYear()+"-"+(this.activityData.aend.getMonth()+1)+"-"+this.activityData.aend.getDate(),
                  alabel: this.activityData.alabel,
                  amaterials: this.activityData.amaterials,
                  pic_url: this.imgUrl,
                  menus: JSON.stringify(men)
                }, {emulateJSON: true}).then(result => {
                  if (result.body.code == 1) {
                    this.$message({
                      type: "success",
                      message: result.body.msg
                    });
                    this.$router.push("activity");
                  } else {
                    this.$message({
                      type: "error",
                      message: result.body.msg
                    });
                  }
                }, err => {
                  console.log(err.message);
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '您没有权限'
                });
              }
            },err=>{
              console.log(err.message);
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          setActive(mode){
            if(this.imgUrl==""){
              this.$message({
                type:"warning",
                message:"请选择活动宣传照片"
              });
              return;
            }
            if(mode){
              this.$refs['activity'].validate('activity').then(()=>{
                this.menus.length = 0;
                var beginDate = this.activityData.abegin.getDate();
                var AfterDate = this.activityData.aend.getDate();
                var beginMonth = this.activityData.abegin.getMonth()+1;
                var AfterMonth = this.activityData.aend.getMonth()+1;
                var beginYear = this.activityData.aend.getFullYear();
                var AfterYear = this.activityData.aend.getFullYear();
                for(var y = beginYear ; y <= AfterYear ; y++){
                  for(var m = beginMonth ; m <= AfterMonth ; m++){
                    for(var d = beginDate ; d <= AfterDate ; d++){
                      this.menus.push({
                        data: `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`,
                        backfast: {
                          main: "",
                          backup:[]
                        },
                        lunch:{
                          main: "",
                          backup:[]
                        },
                        dinner:{
                          main: "",
                          backup:[]
                        }
                      })
                    }
                  }
                };
                this.active = this.active+1;
              },()=>{
                this.active = 0;
                this.$message({
                  type:"warning",
                  message:"请正确填写活动信息"
                });
              })
            }else{
              this.active = this.active-1;
            }
          },
          setMenus(){
             for(var item of this.menus){
               for(var item1 in item){
                 if(item1=='data') continue;
                 if(item[item1].main==""||item[item1].backup.length==0){
                     this.$message({
                       type:"warning",
                       message:"请确认菜谱信息是否填写完整"
                     });
                     return ;
                 }
               }
             }
             this.active = 2;
          },
          openDialog(data){
            this.dialogFormVisible=true;
            this.indexMenu = data.$index;
            this.dialogData = this.menus[data.$index];
          },
          dialogSetMenu(){
            var str = JSON.stringify(this.dialogData);
            var obj = JSON.parse(str);
             this.$set(this.menus,this.indexMenu,obj);
             this.dialogFormVisible=false;
          },
          successUploadActivity(response,file, fileList){
            this.imgUrl=response.path;
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/pjpeg' || file.type === 'image/png' || file.type === 'image/x-png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传图片只能是 JPG 或者 NPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          getUser(){
            this.$http.get("/user/getAllUser").then(result=>{
              result.body.list.map((item,i)=>{
                this.userList.push({
                  uid:item.uid,
                  text:item.name,
                  value:item.name,
                  name:item.name,
                });
              });
            },err=>{
              console.log(err.message);
            });
          },
          getMenus(){
            this.$http.get("/activity/geMenus").then(result=>{
              this.menusList = result.body.list;
            },err=>{
              console.log(err.message);
            });
          },
          setUser(value){
            this.userList.map((item,index)=>{
              if(item.uid==value){
                this.user = item.name;
                return ;
              }
            })
          }
        },
        mounted(){
            this.getUser();
            this.getMenus();
        }
    }
</script>

<style scoped>
.addActivity-Page{
  position: relative;
}
.addDishes-box label{
  font-weight: 500;
}
textarea{
  width:100%;
  height:70px;
  resize: none;
}
input[type="file"] {
  display: none;
}
.addDishes-item-title{
  border-bottom: 3px solid #D31A1A;
}
.uploadImg{
  position: absolute;
  top:0px;
  bottom: 18px;
  right: 0px;
}
.addActivity-form{
  position: relative;
}
.uploadImg-show{
  width: 100%;
  height:100%;
  border-radius: 5px;
  border:1px solid #ececec;
  padding:15px;
}
.uploadImg-show div:first-child{
  width:100%;
  height:100%;
  border-radius: 3px;
  background-position: center;
  background-size: cover;
}
.uploadImg-show div:last-child{
  display: none;
  width: 100%;
  height:100%;
  border-radius: 3px;
  background: rgba(0,0,0,0.5);
  position: relative;
  z-index: 10;
  top:-100%;
  cursor: pointer;
}
.uploadImg-show div:last-child span{
  color: #ffffff;
  font-size: 60px;
  display: inline-block;
  position: relative;
  top:50%;
  margin-top:-60px;
}
.uploadImg-show:hover div:last-child{
  display: block;
}
.setMenuTitle{
  margin-top:10px;
  font-weight: 600;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 2px solid #FFF0F0;
  margin-bottom: 10px;
  text-align: left;
}
.detailActivty-page{
  padding-top:50px;
  position: relative;
}
.activity-img-box{
  padding:5px;
  border-radius: 3px;
  border:1px solid #C7D6D5;
}
.activity-img{
  width:100%;
  padding-bottom: 100%;
  background-size:cover;
  background-position: center center;
}
.menu-contain{
  margin-top:20px;
}
.menu-title span:nth-child(2){
  font-weight: 600;
  font-size: 18px;
  position: relative;
  top:2px;
}
.menu-title span:first-child{
  padding: 7px 20px;
  background: #D71D1D;
  color: white;
  font-weight: 600;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  position: relative;
  margin-right: 20px;
}
.menu-title span:first-child::after{
  content: '';
  width: 0px;
  height: 0px;
  border: 15px solid transparent;
  border-left-color:#D71D1D ;
  position: absolute;
  right: -30px;
  top:0px;
}
.menu-label{
  color: #7F7F7F;
  font-size: 15px;
}
.menu-label .label{
  position: relative;
  top:-2px;
  left:5px;
}
.recipes-title{
  font-size: 15px;
  font-weight: 600;
  position: relative;
}
.recipes-title::before{
  content: "";
  width: 35%;
  height: 2px;
  background: #F0AD4E;
  left:8%;
  position: absolute;
  top:6px;
}
.recipes-title::after{
  content: "";
  width: 35%;
  height: 2px;
  background: #F0AD4E;
  position: absolute;
  right: 8%;
  top:6px;
}
.activity-table{
  background: white;
  min-width: 800px;
}
.activity-table th{
  text-align: center;
  table-layout: fixed;
}
.text-middle{
  vertical-align: middle;
}
</style>
