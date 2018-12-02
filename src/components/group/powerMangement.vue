<template>
  <div class="power-page">
    <el-card>
      <el-tabs v-model="activeName">
         <el-tab-pane label="账号管理" name="first">
            <el-table :data="userList" style="width: 100%;text-align: left" class="table-fixed">
              <el-table-column prop="uname" label="账号" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="dname" label="部门" width="180">
              </el-table-column>
              <el-table-column prop="poname" label="职位" width="180">
              </el-table-column>
              <el-table-column prop="uid" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
              <el-form :model="userData" size="mini">
                <el-form-item label="名字" label-width="80px">
                  <el-input v-model="userData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                  <el-input v-model="userData.upwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px">
                  <el-input v-model="userData.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" label-width="80px">
                  <el-input v-model="userData.phone" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="subEdit">确 定</el-button>
              </div>
            </el-dialog>

        </el-tab-pane>

        <el-tab-pane label="权限管理" name="second">
          <el-table :data="userList" style="width: 100%;text-align: left" class="table-fixed">
            <el-table-column prop="uname" label="账号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="dname" label="部门" width="180">
            </el-table-column>
            <el-table-column prop="poname" label="职位" width="180">
            </el-table-column>
            <el-table-column prop="uid" label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="openPower(scope)">权限分配</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="权限信息" :visible.sync="dialogPowerVisible">
            <el-form size="mini">
              <el-form-item label="部门">
                <el-select v-model="powerData.department" class="vw-12" placeholder="">
                  <el-option v-for="item in departmentData"  :label="item.dname" :value="item.dpid" :key="item.uid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位">
                <el-select v-model="powerData.positioner" class="vw-12" placeholder="">
                  <el-option v-for="item in positionerData"  :label="item.poname" :value="item.pid" :key="item.uid"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogPowerVisible = false">取 消</el-button>
              <el-button type="primary" @click="subPower">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import moduleItem from '../main/indexModule'
    export default {
        name: "power-mangement",
        props:["bus"],
        components:{
          moduleItem
        },
        data(){
          return {
            activeName:"first",
            btnlab:"签到",
            userList:[],
            userData:{
              name:"",
              upwd:"",
              email:"",
              phone:""
            },
            powerData:{
              department:"",
              positioner:""
            },
            powerUid:0,
            departmentData:[],
            positionerData:[],
            dialogFormVisible: false,
            dialogPowerVisible: false,
          }
        },
      methods: {
          getuser(){
            this.$http.post("/user/getUserMsg",{emulateJSON:true}).then(result=>{
              this.userList = result.body.data;
            },err=>{
              console.log("网络连接错误");
              this.$message({
                type:"error",
                message:"网络连接错误"
              });
            });
          },
          getDepartment(){
            this.$http.get("/user/getDepartment").then(result=>{
              this.departmentData = result.body.data;
            },err=>{
              console.log("网络连接错误");
              this.$message({
                type:"error",
                message:"网络连接错误"
              });
            });
          },
          getPositioner(){
            this.$http.get("/user/getPositioner").then(result=>{
              this.positionerData = result.body.data;
            },err=>{
              console.log("网络连接错误");
              this.$message({
                type:"error",
                message:"网络连接错误"
              });
            });
          },
          edit(data){
            this.$http.post("/user/editBefore?uid="+data.row.uid).then(result=>{
              if(result.body.code==1){
                  this.userData = result.body.data[0];
                  this.dialogFormVisible = true;
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
          subEdit(){
            this.$http.post("/user/edit",{uid:this.userData.uid,name:this.userData.name,phone:this.userData.phone,email:this.userData.email,upwd:this.userData.upwd},{emulateJSON:true}).then(result=>{
              if(result.body.code==1){
                this.dialogFormVisible = false;
                this.bus.$emit("getUserMsg");
                this.$message({
                  type:"success",
                  message:result.body.msg
                });
                this.getuser();
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
          openPower(data){
            this.$http.post("/user/powerBefore?uid="+data.row.uid).then(result=>{
              if(result.body.code==1){
                this.powerUid = data.row.uid;
                this.powerData.department = result.data.data[0].did;
                this.powerData.positioner = result.data.data[0].p_pid;
                this.dialogPowerVisible = true;
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
          subPower(){
            this.$http.post("/user/setPower",{uid:this.powerUid,pid:this.powerData.positioner,did:this.powerData.department},{emulateJSON:true}).then(result=>{
              if(result.body.code==1){
                this.dialogPowerVisible = false;
                this.getuser();
                this.$message({
                  type:"success",
                  message:result.body.msg
                });
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
      },
      mounted(){
          this.getuser();
          this.getDepartment();
          this.getPositioner();
      }
    }
</script>

<style>
  .power-page{
    padding-top:10px;
    padding-right: 10px;
    margin-left:10px;
  }
  .sign-table{
    margin-top: 10px;
    border-top:1px solid #EBEEF5;
  }
  .sign-table table{
    margin: auto !important;
  }
</style>
