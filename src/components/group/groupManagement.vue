<template>
  <div class="group-page">
    <el-card>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="分组列表" name="first">
          <work-group :workList="workList" @resetList="getWorkList"></work-group>
        </el-tab-pane>
        <el-tab-pane label="新建分组" name="second" >
            <div class="vw-6 m-x-a m-t-lg">
                <el-form ref="groupForm" label-width="100px" size="mini" :rules="groupRule" :model="groupForm">
                  <el-form-item label="组名" prop="wname">
                    <el-input v-model="groupForm.wname"></el-input>
                  </el-form-item>
                  <el-form-item label="主要负责人" prop="wperson">
                    <el-select v-model="groupForm.wperson" class="vw-12" placeholder="主要负责人">
                      <el-option v-for="item in userList"  :label="item.name" :value="item.uid" :key="item.uid"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="分组所属" prop="w_activity">
                    <el-select v-model="groupForm.w_activity" placeholder="请选择活动区域" class="vw-12">
                      <el-option v-for="item in activityList" :label="item.text" :value="item.aid" :key="item.aid"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="时间要求" prop="wtime">
                    <el-input v-model="groupForm.wtime"></el-input>
                  </el-form-item>
                  <el-form-item label="任务所属" prop="wblong">
                    <el-input v-model="groupForm.wblong"></el-input>
                  </el-form-item>
                  <el-form-item label="完成标准" prop="wfinish">
                    <el-input v-model="groupForm.wfinish"></el-input>
                  </el-form-item>
                  <el-form-item label="岗位描述" prop="wmaterials">
                    <el-input v-model="groupForm.wmaterials"></el-input>
                  </el-form-item>
                  <el-form-item label="任务标准" prop="wstandard">
                    <el-input v-model="groupForm.wstandard"></el-input>
                  </el-form-item>
                  <el-form-item label="组员">
                    <el-select v-model="groupForm.worker" class="vw-12" placeholder="组员" multiple>
                      <el-option v-for="item in userList"  :label="item.name" :value="item.uid" :key="item.uid"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item size="large" class="m-t-lg">
                    <el-button type="primary" @click="subWork">立即创建</el-button>
                    <el-button @click="cancel" type="warning">取消</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="临时员工分组申请" name="thred" class="vw-12 m-x-a m-t-lg">

          <el-form ref="group_tForm" :model="group_tForm" :rules="group_tRule" label-width="100px" size="mini">
            <div class="vw-6 m-x-a">
              <el-form-item label="组名" prop="wname">
                <el-input v-model="group_tForm.wname"></el-input>
              </el-form-item>
              <el-form-item label="主要负责人" prop="wperson">
                <el-select v-model="group_tForm.wperson" class="vw-12" placeholder="主要负责人">
                  <el-option v-for="item in userList"  :label="item.name" :value="item.uid" :key="item.uid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分组所属" prop="w_activity">
                <el-select v-model="group_tForm.w_activity" placeholder="请选择活动区域" class="vw-12">
                  <el-option v-for="item in activityList" :label="item.text" :value="item.aid" :key="item.aid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间要求" prop="wtime">
                <el-input v-model="group_tForm.wtime"></el-input>
              </el-form-item>
              <el-form-item label="任务所属" prop="wblong">
                <el-input v-model="group_tForm.wblong"></el-input>
              </el-form-item>
              <el-form-item label="完成标准" prop="wfinish">
                <el-input v-model="group_tForm.wfinish"></el-input>
              </el-form-item>
              <el-form-item label="岗位描述" prop="wmaterials">
                <el-input v-model="group_tForm.wmaterials"></el-input>
              </el-form-item>
              <el-form-item label="任务标准" prop="wstandard">
                <el-input v-model="group_tForm.wstandard"></el-input>
              </el-form-item>
            </div>

            <div class="last-person">临时员工</div>

            <el-table :data="temporaryData" style="width: 100%;text-align: left" class="table-fixed">
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="sex" label="性别" width="180">
              </el-table-column>
              <el-table-column prop="year" label="年龄" width="180">
              </el-table-column>
              <el-table-column prop="contact" label="联系方式" width="240">
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="300" >
              </el-table-column>
            </el-table>

            <el-form-item size="large" class="m-t-lg">
              <el-button type="warning" @click="openDialog">添加临时员工</el-button>
              <el-button type="primary" @click="subTWork">立即创建</el-button>
            </el-form-item>
          </el-form>

          <el-dialog title="添加临时员工" :visible.sync="dialogFormVisible">
            <el-form :model="temporaryForm" ref="temporaryForm" :rules="temporaryRule" label-width="100px" size="mini">

                <el-form-item label="名字" prop="name">
                  <el-input v-model="temporaryForm.name" type="text"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                  <el-select v-model="temporaryForm.sex"  placeholder="请选择" class="vw-12">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="年龄" prop="year">
                  <el-input v-model="temporaryForm.year" type="number"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="contact">
                  <el-input v-model="temporaryForm.contact" type="text"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                  <el-input v-model="temporaryForm.remark" type="text"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="SubDialog">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
  import workGroup from './workerGroup'
    export default {
        name: "group-management",
        components:{
          workGroup
        },
        data(){
          return {
            activeName:"first",
            groupForm:{
              wname:"",
              wperson:"",
              w_activity:"",
              wtime:"",
              wblong:"",
              wfinish:"",
              wmaterials:"",
              wstandard:"",
              worker:[]
            },
            groupRule:{
              wname: [
                { required: true, message: '请输入组名', trigger: 'blur' },
                { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },

              ],
              wperson: [
                { required: true, message: '请选择主要负责人', trigger: 'blur' }
              ],
              w_activity: [
                {required: true, message: '请选择任务所属', trigger: 'blur' }
              ],
              wtime: [
                {required: true, message: '请填写时间要求', trigger: 'blur' },
              ],
              wblong: [
                {required: true, message: '请填写任务所属', trigger: 'blur' }
              ],
              wfinish: [
                { required: true, message: '请填写完成标准', trigger: 'blur' }
              ],
              wmaterials: [
                { required: true, message: '请填写岗位描述', trigger: 'blur' }
              ],
              wstandard: [
                { required: true, message: '请填写任务标准', trigger: 'blur' }
              ]
            },
            activityList:[],
            group_tForm:{
              wname:"",
              wperson:"",
              w_activity:"",
              wtime:"",
              wblong:"",
              wfinish:"",
              wmaterials:"",
              wstandard:""
            },
            group_tRule:{
              wname: [
                { required: true, message: '请输入组名', trigger: 'blur' },
                { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },

              ],
              wperson: [
                { required: true, message: '请选择主要负责人', trigger: 'blur' }
              ],
              w_activity: [
                {required: true, message: '请选择任务所属', trigger: 'blur' }
              ],
              wtime: [
                {required: true, message: '请填写时间要求', trigger: 'blur' },
              ],
              wblong: [
                {required: true, message: '请填写任务所属', trigger: 'blur' }
              ],
              wfinish: [
                { required: true, message: '请填写完成标准', trigger: 'blur' }
              ],
              wmaterials: [
                { required: true, message: '请填写岗位描述', trigger: 'blur' }
              ],
              wstandard: [
                { required: true, message: '请填写任务标准', trigger: 'blur' }
              ]
            },
            temporaryData: [],
            temporaryForm:{
                name:"",
                sex:"",
                year:"",
                contact:"",
                remark:""
            },
            temporaryRule: {
              name:[
                { required: true, message: '名字不能为空', trigger: 'blur' }
              ],
              year:[
                { required: true, message: '年龄不能为空', trigger: 'blur' }
              ],
              contact:[
                { required: true, message: '联系方式不能为空', trigger: 'blur' }
              ]
            },
            userList:[],
            dialogFormVisible: false,
            workList:[]
          };
        },
        methods: {
            resetForm(formName) {
              this.$refs[formName].resetFields();
            },
            cancel(){
                this.resetForm("groupForm");
                this.activeName = "first";
            },
            SubDialog(){
              this.$refs["temporaryForm"].validate().then(()=>{
                var str = JSON.stringify(this.temporaryForm);
                var obj = JSON.parse(str);
                this.temporaryData.push(obj);
                this.dialogFormVisible = false;
                this.$message({
                  type:"success",
                  message:"添加成功"
                });
              },err=>{
                  this.$message({
                    type:"warning",
                    message:"请确认信息是否填写完整"
                  });
              });
            },
            openDialog(){
              this.dialogFormVisible = true;
              if(this.$refs.temporaryForm){
                this.resetForm("temporaryForm");
              }
            },
            subWork() {
                this.$http.get("/user/getPower").then(result=>{
                  if(result.body.position<4){
                    this.$http.post("/work/addworkGroup", {
                      wname: this.groupForm.wname,
                      wperson: this.groupForm.wperson,
                      w_activity:this.groupForm.w_activity ,
                      wtime: this.groupForm.wtime,
                      wblong: this.groupForm.wblong,
                      wfinish: this.groupForm.wfinish,
                      wmaterials: this.groupForm.wmaterials,
                      wstandard: this.groupForm.wstandard,
                      worker: JSON.stringify(this.groupForm.worker)
                    }, {emulateJSON: true}).then(result => {
                      if (result.body.code == 1) {
                        this.getWorkList();
                        this.$message({
                          type: "success",
                          message: result.body.msg
                        });
                        this.activeName = "first";
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
                })
            },
            subTWork() {
              this.$http.get("/user/getPower").then(result=>{
                if(result.body.position<4){
                  this.$http.post("/work/addworkTGroup", {
                    wname: this.group_tForm.wname,
                    wperson: this.group_tForm.wperson,
                    w_activity:this.group_tForm.w_activity ,
                    wtime: this.group_tForm.wtime,
                    wblong: this.group_tForm.wblong,
                    wfinish: this.group_tForm.wfinish,
                    wmaterials: this.group_tForm.wmaterials,
                    wstandard: this.group_tForm.wstandard,
                    worker: JSON.stringify(this.temporaryData)
                  }, {emulateJSON: true}).then(result => {
                    if (result.body.code == 1) {
                      this.getWorkList();
                      this.$message({
                        type: "success",
                        message: result.body.msg
                      });
                      this.activeName = "first";
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
              })
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
            getActivity(){
              this.$http.get("/activity/getAllActivity").then(result=>{
                result.body.list.map((item,i)=>{
                  this.activityList.push({
                    aid:item.aid,
                    text:item.aname,
                    value:item.aname,
                    name:item.aname,
                  });
                });
              },err=>{
                console.log(err.message);
              });
            },
            getWorkList(){
              this.$http.get("/work/getWorkList").then(result=>{
                this.workList = result.body.data;
              },err=>{
                console.log(err.message)
              });
            },
        },
        mounted(){
            this.getUser();
            this.getActivity();
            this.getWorkList();
        }
    }
</script>

<style scoped>
.group-page{
  padding-top:10px;
  padding-right: 10px;
  margin-left:10px;
}
.last-person{
  font-size: 18px;
  padding:20px;
  border-bottom: 2px solid #D31A1A;
  margin-bottom:20px;
}
</style>
