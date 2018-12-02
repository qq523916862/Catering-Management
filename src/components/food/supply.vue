<template>
  <div class="supply-page">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="供给品列表" name="first">
          <el-table :data="supplyTable" style="width: 100%;text-align: left" class="table-fixed">
            <el-table-column prop="ftime" label="日期" sortable width="180" :formatter="formatterDate" :filters="filterList" :filter-method="filterDate">
            </el-table-column>
            <el-table-column prop="sname" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="num" label="数量" width="180">
            </el-table-column>
            <el-table-column prop="fplace" label="来源" width="300">
            </el-table-column>
            <el-table-column prop="name" label="签收人" width="180" :filters="personList" :filter-method="filterPerson" filter-placement="bottom-end" >
            </el-table-column>
          </el-table>
          <el-pagination class="m-t-xl"
                         :page-size="20"
                         layout="prev, pager, next"
                         :total="supplyCount"
                         @current-change="changePagSupply"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="供给品登记" name="second"  class="vw-6 m-x-a m-t-lg">
            <el-form ref="supplyForm" :rules="supplyRule" :model="supplyData" label-width="100px" size="mini">
              <el-form-item label="名称" prop="name">
                <el-input v-model="supplyData.name"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="num">
                <el-input v-model="supplyData.num" type="number"></el-input>
              </el-form-item>
              <el-form-item label="来源" prop="fplace">
                <el-input v-model="supplyData.fplace"></el-input>
              </el-form-item>
              <el-form-item label="日期" prop="ftime">
                <el-col :span="24">
                  <el-date-picker type="date" placeholder="选择日期" v-model="supplyData.ftime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="签收人" prop="uname">
                <el-input v-model="supplyData.uname"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="supplySubmit">立即创建</el-button>
                <el-button type="warning" @click="reset('supplyForm')">重置</el-button>
              </el-form-item>
            </el-form>

        </el-tab-pane>

        <el-tab-pane label="米面供给列表" name="threrd">
            <el-table :data="riceTable" style="width: 100%;text-align: left" class="table-fixed">
              <el-table-column prop="rtime" label="日期" sortable width="180" :formatter="formatterDate2" :filters="filterList" :filter-method="filterDate">
              </el-table-column>
              <el-table-column prop="name" label="签收人" width="180" :filters="personList" :filter-method="filterPerson" filter-placement="bottom-end" >
              </el-table-column>
              <el-table-column prop="ricenum" label="大米(斤)" width="180">
              </el-table-column>
              <el-table-column prop="flournum" label="面粉(斤)" width="180">
              </el-table-column>
              <el-table-column prop="fsource" label="来源" width="180">
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="250">
              </el-table-column>
            </el-table>
            <el-pagination class="m-t-xl"
                           :page-size="20"
                           layout="prev, pager, next"
                           :total="riceCount"
                           @current-change="changePagRice"
            >
            </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="米面供给登记" name="fourth" class="vw-6 m-x-a m-t-lg">

          <el-form ref="riceForm" :rules="riceRule" :model="riceData" label-width="80px" size="mini">
            <el-form-item label="大米/斤" prop="ricenum">
              <el-input v-model="riceData.ricenum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="面粉/斤" prop="flournum">
              <el-input v-model="riceData.flournum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="来源" prop="rsource">
              <el-input v-model="riceData.rsource"></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="rtime">
              <el-col :span="24">
                <el-date-picker type="date" placeholder="选择日期" v-model="riceData.rtime" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="签收人" prop="uname">
              <el-input v-model="riceData.uname"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="riceData.remark"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="riceSubmit()">立即创建</el-button>
              <el-button type="warning" @click="reset('riceForm')">重置</el-button>
            </el-form-item>
          </el-form>


        </el-tab-pane>
      </el-tabs>
    </el-card>


  </div>
</template>

<script>
    export default {
        name: "supply",
        data(){
          var unameRule = (rule,value,callback)=>{
            this.$http.get("/goods/checkName?uname="+value).then(result=>{
              if(result.body.code==1){
                this.uid = result.body.msg;
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
            supplyCount:0,
            riceCount:0,
            supplyPage:1,
            ricePage:1,
            activeName:"first",
            tableData: [
              {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              tag: '梁宝承'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
              tag: '梁宝承'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              tag: '梁宝承'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              tag: '梁宝承'
            }],
            supplyTable:[],
            riceTable:[],
            uid:null,
            supplyData: {
              name: '',
              num: '',
              fplace: '',
              ftime: '',
              uname: ''
            },
            riceData: {
              name: '',
              ricenum: '',
              flournum: '',
              rsource: '',
              rtime: '',
              remark: ''
            },
            filterList:[
              {text:"最近一个月",value:"0"},
              {text:"最近三个月",value:"1"},
              {text:"最近一年",value:"2"},
              {text:"一年前",value:"3"}
            ],
            personList:[],
            supplyRule: {
              uname: [
                { required: true, message: '姓名不能为空', trigger: 'blur' },
                { validator: unameRule, trigger: 'blur' }
              ],
              num: [
                { required: true, message: '数量不能为空', trigger: 'blur' }
              ],
              name: [
                { required: true, message: '名称不能为空', trigger: 'blur' }
              ],
              ftime: [
                { required: true, message: '日期不能为空', trigger: 'blur' }
              ],
              fplace: [
                { required: true, message: '地点不能为空', trigger: 'blur' }
              ]
            },
            riceRule: {
              uname: [
                { required: true, message: '姓名不能为空', trigger: 'blur' },
                { validator: unameRule, trigger: 'blur' }
              ],
              ricenum: [
                { required: true, message: '数量不能为空', trigger: 'blur' }
              ],
              flournum: [
                { required: true, message: '数量不能为空', trigger: 'blur' }
              ],
              rtime: [
                { required: true, message: '日期不能为空', trigger: 'blur' }
              ],
              rsource: [
                { required: true, message: '来源不能为空', trigger: 'blur' }
              ]
            },
          }
        },
      methods: {
        formatterDate(row, column) {
          return row.ftime.substr(0,10);
        },
        formatterDate2(row, column) {
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
        supplySubmit(){
          this.$refs['supplyForm'].validate().then(()=>{
            this.$http.post("/goods/supply",{uid:this.uid,name:this.supplyData.name,num:this.supplyData.num,fplace:this.supplyData.fplace,ftime:this.supplyData.ftime.getFullYear()+"-"+(this.supplyData.ftime.getMonth()+1)+"-"+this.supplyData.ftime.getDate()},{emulateJSON:true}).then(result=>{
              if(result.body.code==1){
                this.$message({
                  type:"success",
                  message:result.body.msg
                });
                this.getSupplyData(this.supplyPage);
                this.activeName="first";
                this.reset('supplyForm');
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
        riceSubmit(){
          this.$refs['riceForm'].validate().then(()=>{
            this.$http.post("/goods/rice",{uid:this.uid,ricenum:this.riceData.ricenum,flournum:this.riceData.flournum,rsource:this.riceData.rsource,rtime:this.riceData.rtime.getFullYear()+"-"+(this.riceData.rtime.getMonth()+1)+"-"+this.riceData.rtime.getDate(),remark:this.riceData.remark},{emulateJSON:true}).then(result=>{
              if(result.body.code==1){
                this.$message({
                  type:"success",
                  message:result.body.msg
                });
                this.getRiceData(this.ricePage);
                this.activeName="threrd";
                this.reset('riceForm');
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
        getSupplyData(page){
          this.$http.get("/goods/getSupply?page="+page).then(result=>{
            this.supplyTable=result.body.data;
          },err=>{
            console.log(err.message);
          })
        },
        getRiceData(page){
          this.$http.get("/goods/getRice?page="+page).then(result=>{
            this.riceTable=result.body.data;
          },err=>{
            console.log(err.message);
          })
        },
        getUser(){
          this.$http.get("/user/getAllUser").then(result=>{
            result.body.list.map((item,i)=>{
              this.personList.push({
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
        changePagSupply(count){
          this.page = count;
          this.getSupplyData(count);
        },
        changePagRice(count){
          this.page = count;
          this.getRiceData(count);
        },
        getCountSupply(){
          this.$http.get("/goods/supplyCount").then(result=>{
            this.supplyCount = result.body.count;
          },err=>{
            console.log(err.message);
          });
        },
        getCountRice(){
          this.$http.get("/goods/riceCount").then(result=>{
            this.riceCount = result.body.count;
          },err=>{
            console.log(err.message);
          });
        }
      },
      mounted(){
          this.getSupplyData(this.supplyPage);
          this.getRiceData(this.ricePage);
          this.getUser();
          this.getCountSupply();
          this.getCountRice();
      }
    }
</script>

<style scoped>
.supply-page{
  padding-top:10px;
  padding-right: 10px;
  margin-left:10px;
}
</style>
