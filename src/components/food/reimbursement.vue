<template>
    <div class="reimbursement-page">
        <el-card>
            <el-tabs v-model="activeName">
                <el-tab-pane label="购菜报销账单" name="first">
                  <el-table :data="reimTable" style="width: 100%;text-align: left" class="table-fixed">
                    <el-table-column fixed="left" prop="rtime" label="日期" height="100%" sortable width="180" :formatter="formatterDate" :filters="filterList" :filter-method="filterDate">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="food" label="菜品" width="180">
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="180">
                    </el-table-column>
                    <el-table-column prop="num" label="合计/元" width="180" :formatter="formatterZong">
                    </el-table-column>
                    <el-table-column prop="rplace" label="采购地点" width="300">
                    </el-table-column>
                    <el-table-column fixed="right" prop="signName" label="主管签名" width="100" :filters="personList" :filter-method="filterPerson" filter-placement="bottom-end">
                      <template slot-scope="scope" class="text-center">
                        <el-tag v-if="scope.row.signName!='未通过'"
                          close-transition>{{scope.row.signName}}</el-tag>
                        <el-button plain size="mini" type="success" @click="signTag(scope.row.rid)" v-if="scope.row.signName=='未通过'&&power<4">签名</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination class="m-t-xl"
                     :page-size="20"
                     layout="prev, pager, next"
                     :total="pageCount"
                     @current-change="changePag"
                  >
                  </el-pagination>
                </el-tab-pane>

                <el-tab-pane label="购菜报销登记" name="second" class="vw-6 m-x-a m-t-lg">
                  <el-form ref="reim" :rules="reimRule" :model="reimData" label-width="100px" size="mini">
                    <el-form-item label="姓名" prop="uname">
                      <el-input v-model="reimData.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品" prop="food">
                      <el-input v-model="reimData.food"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                      <el-input v-model="reimData.price" type="number">></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                      <el-input v-model="reimData.num" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="购买时间" prop="rtime">
                      <el-col :span="24">
                        <el-date-picker type="date" placeholder="选择日期" v-model="reimData.rtime" style="width: 100%;"></el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="购买地点" prop="rplace">
                      <el-input v-model="reimData.rplace"></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                      <el-button type="primary" @click="submit('reim')">立即创建</el-button>
                      <el-button type="warning" @click="reset('reim')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%" class="text-left">
              <span>确定签名这张报销账单吗？</span>
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="sign">确 定</el-button>
              </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "reimbursement",
        data(){
            var unameRule = (rule,value,callback)=>{
                this.$http.get("/goods/checkName?uname="+value).then(result=>{
                    if(result.body.code==1){
                        this.reimData.uid = result.body.msg;
                        callback();
                    }else{
                        callback(new Error("该员工不存在"));
                    }
                },err=>{
                    console.log("网络连接错误");
                    callback(new Error("网络连接错误"));
                });
            };
            return {
              activeName:"first",
              dialogVisible:false,
              rid:0,
              reimTable:[],
              power:5,
              page:1,
              pageCount:0,
              reimData: {
                uname: '',
                food: '',
                price: '',
                num: '',
                rtime: "",
                rplace: "",
                uid:null
              },
              reimRule: {
                uname: [
                  { required: true, message: '姓名不能为空', trigger: 'blur' },
                  { validator: unameRule, trigger: 'blur' }
                ],
                food: [
                  { required: true, message: '菜名不能为空', trigger: 'blur' }
                ],
                price: [
                  { required: true, message: '价格不能为空', trigger: 'blur' }
                ],
                num: [
                  { required: true, message: '数量不能为空', trigger: 'blur' }
                ],
                rtime: [
                  { required: true, message: '日期不能为空', trigger: 'blur' }
                ],
                rplace: [
                  { required: true, message: '地点不能为空', trigger: 'blur' }
                ]
              },
              filterList:[
                {text:"最近一个月",value:"0"},
                {text:"最近三个月",value:"1"},
                {text:"最近一年",value:"2"},
                {text:"一年前",value:"3"}
              ],
              personList:[{
                text:"未通过",
                value:"未通过"
              }]
            }
        },
        methods: {
          formatterZong(row, column) {
            return row.num*row.price;
          },
          formatterDate(row, column) {
            return row.rtime.substr(0,10);
          },
          filterPerson(value, row,column) {
            const property = column['property'];
            return row[property] === value;
          },
          filterDate(value, row, column) {
            const property = column['property'];
            var now = new Date();
            var d = parseInt(row[property].substr(0,10).replace(/-/g,""));
            if(value==0){
              now.setMonth(now.getMonth()-1);
            }else if(value==1){
              now.setMonth(now.getMonth()-3);
            }else if(value==2){
              now.setFullYear(now.getFullYear()-1);
            }else if(value==3){
              now.setFullYear(now.getFullYear()-1);
              now.setDate(1);
              now = ""+now.getFullYear()+(now.getMonth()<10?"0"+(now.getMonth()+1):now.getMonth()+1)+(now.getDate()<10?"0"+now.getDate():now.getDate());
              now = parseInt(now);
              return d<now;
            }
            now.setDate(1);
            now = ""+now.getFullYear()+(now.getMonth()<10?"0"+(now.getMonth()+1):now.getMonth()+1)+(now.getDate()<10?"0"+now.getDate():now.getDate());
            now = parseInt(now);
            return d>now;
          },
          reset(formName){
            this.$refs[formName].resetFields();
          },
          submit(formName){
            this.$refs[formName].validate().then(()=>{
              this.$http.post("/goods/reimbursement",{uid:this.reimData.uid,food:this.reimData.food,price:this.reimData.price,num:this.reimData.num,rplace:this.reimData.rplace,rtime:this.reimData.rtime.getFullYear()+"-"+(this.reimData.rtime.getMonth()+1)+"-"+this.reimData.rtime.getDate()},{emulateJSON:true}).then(result=>{
                if(result.body.code==1){
                  this.$message({
                    type:"success",
                    message:result.body.msg
                  });
                  this.activeName="first";
                  this.reset("reim");
                  this.getCount();
                  this.getData(this.page);
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
                message:"请正确填写信息"
              });
            });
          },
          changePag(count){
              this.page = count;
              this.getData(count);
          },
          signTag(rid){
              this.dialogVisible = true;
              this.rid = rid;
          },
          sign(){
            if(this.power<4){
              this.$http.get("/user/reimSign?rid="+this.rid).then(result=>{
                this.dialogVisible = false;
                this.$message({
                  type:"success",
                  message:result.body.msg
                });
                this.getData(this.page);
              },err=>{
                console.log(err.message);
              })
            }
          },
          getData(page){
            this.$http.get("/goods/getReimbursement?page="+page).then(result=>{
              this.reimTable=result.body.data;
            },err=>{
              console.log(err.message);
            })
          },
          getCount(){
            this.$http.get("/goods/reimbursementCount").then(result=>{
              this.pageCount = result.body.count;
            },err=>{
              console.log(err.message);
            });
          },
          getPower(){
            this.$http.get("/user/getPower").then(result=>{
              this.power = result.body.position;
            },err=>{
              console.log(err.message);
            });
          },
          getBoss(){
            this.$http.get("/user/getBossList").then(result=>{
              result.body.list.map((item,i)=>{
                this.personList.push({
                  uid:item.uid,
                  text:item.name,
                  value:item.name,
                  name:item.name,
                  power:item.p_pid
                });
              });
            },err=>{
              console.log(err.message);
            });
          }
        },
        mounted(){
            this.getCount();
            this.getData(this.page);
            this.getPower();
            this.getBoss();
        }
    }
</script>

<style scoped>
.reimbursement-page{
  padding-top:10px;
  padding-right: 10px;
  margin-left:10px;
}
</style>
