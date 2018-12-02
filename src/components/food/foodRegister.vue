<template>
  <div class="foodRegister-page">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="购菜记录" name="first">
            <div class="table-responsive">
              <el-table :data="foodRegisterTable" style="width: 100%;text-align: left" class="table-fixed">
                <el-table-column fixed="left" :formatter="formatterDate" prop="ftime" label="日期" sortable width="180" :filters="filterList" :filter-method="filterDate">
                </el-table-column>
                <el-table-column prop="food" label="菜品" width="180">
                </el-table-column>
                <el-table-column prop="price" label="单价" width="180">
                </el-table-column>
                <el-table-column prop="num" label="数量" width="180">
                </el-table-column>
                <el-table-column prop="num" label="合计/元" :formatter="formatterZong" width="180">
                </el-table-column>
                <el-table-column prop="remak" label="备注" width="300">
                </el-table-column>
                <el-table-column fixed="right" prop="name" label="购买者" width="100" :filters="personList" :filter-method="filterPerson" filter-placement="bottom-end">
                  <template slot-scope="scope">
                    <el-tag
                      close-transition>{{scope.row.name}}</el-tag>
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
            </div>
        </el-tab-pane>

        <el-tab-pane label="购菜登记" name="second" class="vw-6 m-x-a m-t-lg">

            <el-form ref="foodRegister" :model="registerFoodDate" :rules="registerFoodRule" label-width="100px" size="mini">
              <el-form-item label="购买者" prop="uname">
                <el-input v-model="registerFoodDate.uname"></el-input>
              </el-form-item>
              <el-form-item label="菜品" prop="food">
                <el-input v-model="registerFoodDate.food"></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="price">
                <el-input v-model="registerFoodDate.price"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="num">
                <el-input v-model="registerFoodDate.num"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="registerFoodDate.remark"></el-input>
              </el-form-item>
              <el-form-item label="购买时间" prop="ftime">
                <el-col :span="24">
                  <el-date-picker type="date" placeholder="选择日期" v-model="registerFoodDate.ftime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="购买地点" prop="fplace">
                <el-input v-model="registerFoodDate.fplace"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="submit('foodRegister')">立即创建</el-button>
                <el-button type="warning" @click="reset('foodRegister')">重置</el-button>
              </el-form-item>
            </el-form>


        </el-tab-pane>
      </el-tabs>
    </el-card>


  </div>
</template>

<script>
    export default {
        name: "food-register",
        data(){
          var unameRule = (rule,value,callback)=>{
            this.$http.get("/goods/checkName?uname="+value).then(result=>{
              if(result.body.code==1){
                this.registerFoodDate.uid = result.body.msg;
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
            page:1,
            pageCount:0,
            activeName:"first",
            foodRegisterTable:[],
            personList:[{
              text:"未通过",
              value:"未通过"
            }],
            filterList:[
              {text:"最近一个月",value:"0"},
              {text:"最近三个月",value:"1"},
              {text:"最近一年",value:"2"},
              {text:"一年前",value:"3"}
            ],
            registerFoodDate: {
              uname: '',
              food: '',
              price: '',
              num: '',
              remark:'',
              ftime: "",
              fplace: "",
              uid:null
            },
            registerFoodRule: {
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
              ftime: [
                { required: true, message: '日期不能为空', trigger: 'blur' }
              ],
              fplace: [
                { required: true, message: '地点不能为空', trigger: 'blur' }
              ]
            }
          }
        },
        methods: {
          formatterZong(row, column) {
            return row.num*row.price;
          },
          formatterDate(row, column) {
            return row.ftime.substr(0,10);
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
              this.$http.post("/goods/foodRegister",{uid:this.registerFoodDate.uid,food:this.registerFoodDate.food,price:this.registerFoodDate.price,num:this.registerFoodDate.num,remark:this.registerFoodDate.remark,fplace:this.registerFoodDate.fplace,ftime:this.registerFoodDate.ftime.getFullYear()+"-"+(this.registerFoodDate.ftime.getMonth()+1)+"-"+this.registerFoodDate.ftime.getDate()},{emulateJSON:true}).then(result=>{
                if(result.body.code==1){
                  this.$message({
                    type:"success",
                    message:result.body.msg
                  });
                  this.getData(this.page);
                  this.activeName="first";
                  this.reset('foodRegister');
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
          getData(page){
            this.$http.get("/goods/getfoodRegister?page="+page).then(result=>{
              this.foodRegisterTable=result.body.data;
            },err=>{
              console.log(err.message);
            })
          },
          getCount(){
            this.$http.get("/goods/foodRegisterCount").then(result=>{
              this.pageCount = result.body.count;
            },err=>{
              console.log(err.message);
            });
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
          }
        },
        mounted(){
          this.getCount();
          this.getData(this.page);
          this.getUser();
        }
    }
</script>

<style scoped>
.foodRegister-page{
  padding-top:10px;
  padding-right: 10px;
  margin-left:10px;
}
</style>
