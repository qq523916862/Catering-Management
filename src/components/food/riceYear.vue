<template>
  <div class="riceYear-page">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="全年大米食用油用量表" name="first">
            <el-table :data="riceYearTable" style="width: 100%;text-align: left" class="table-fixed">
              <el-table-column fixed="left" prop="year" label="日期" sortable width="180" :formatter="formatterDate">
              </el-table-column>
              <el-table-column prop="ricenum" label="大米(斤)" width="180">
              </el-table-column>
              <el-table-column prop="flournum" label="面粉(斤)" width="180">
              </el-table-column>
              <el-table-column prop="oilnum" label="油(升)" width="180">
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
        <el-tab-pane label="大米食用油登记" name="second"  class="vw-6 m-x-a m-t-lg">
          <el-form ref="riceYearForm" :rules="riceYearRule" :model="riceYearData" label-width="80px" size="mini">
            <el-form-item label="大米/斤" prop="ricenum">
              <el-input v-model="riceYearData.ricenum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="面粉/斤" prop="flournum">
              <el-input v-model="riceYearData.flournum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="油/升" prop="oilnum">
              <el-input v-model="riceYearData.oilnum" type="number"></el-input>
            </el-form-item>
            <el-form-item label="年份" prop="ryear">
              <el-input v-model="riceYearData.ryear" type="number"></el-input>
            </el-form-item>
            <el-form-item label="月份" prop="rmonth">
              <el-input v-model="riceYearData.rmonth" type="number"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submit('riceYearForm')">立即创建</el-button>
              <el-button type="warning" @click="reset('riceYearForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>

    import echarts from 'echarts'

    export default {
        name: "rice-year",
        data(){
          var rmonthRule = (rule,value,callback)=>{
            if(value<1||value>12){
              callback(new Error('月份为1~12之间'));
            } else {
              if(this.riceYearData.ryear){
                  this.$http.get("/goods/checkMonth?year="+this.riceYearData.ryear+"&month="+value,{emulateJSON:true}).then(result=>{
                    if(result.body.code==1){
                      callback();
                    }else{
                      callback(new Error(result.body.msg));
                    }
                  },err=>{
                    console.log("网络连接错误");
                  });
              }
            }
          };
          return {
            page:1,
            pageCount:0,
            activeName:"first",
            riceYearTable:[],
            riceYearData: {
              ricenum: '',
              flournum: '',
              oilnum: '',
              ryear: '',
              rmonth: ''
            },
            riceYearRule: {
              ricenum: [
                { required: true, message: '数量不能为空', trigger: 'blur' }
              ],
              flournum: [
                { required: true, message: '数量不能为空', trigger: 'blur' }
              ],
              oilnum: [
                { required: true, message: '数量不能为空', trigger: 'blur' }
              ],
              ryear: [
                { required: true, message: '年份不能为空', trigger: 'blur' },
                { min:4, max:4, message: '年份为4位数', trigger: 'blur' }
              ],
              rmonth: [
                { required: true, message: '月份不能为空', trigger: 'blur' },
                { validator: rmonthRule, trigger: 'blur' }
              ]
            }
          }
        },
      methods: {
        formatterDate(row, column) {
          return row.year+"-"+(row.month<10?("0"+row.month):row.month)
        },
        reset(formName){
          this.$refs[formName].resetFields();
        },
        submit(formName){
          this.$refs[formName].validate().then(()=>{
            this.$http.post("/goods/riceyear",{ricenum:this.riceYearData.ricenum,flournum:this.riceYearData.flournum,oilnum:this.riceYearData.oilnum,ryear:this.riceYearData.ryear,rmonth:this.riceYearData.rmonth},{emulateJSON:true}).then(result=>{
              if(result.body.code==1){
                this.$message({
                  type:"success",
                  message:result.body.msg
                });
                this.activeName="first";
                this.reset('riceYearForm');
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
          this.$http.get("/goods/getRiceYear?page="+page).then(result=>{
            this.riceYearTable=result.body.data;
          },err=>{
            console.log(err.message);
          })
        },
        getCount(){
          this.$http.get("/goods/riceYearCount").then(result=>{
            this.pageCount = result.body.count;
          },err=>{
            console.log(err.message);
          });
        },
      },
      mounted(){
          this.getCount();
          this.getData(this.page);
          console.log(echarts,1111);
      }
    }
</script>

<style scoped>
.riceYear-page{
  padding-top:10px;
  padding-right: 10px;
  margin-left:10px;
}
</style>
