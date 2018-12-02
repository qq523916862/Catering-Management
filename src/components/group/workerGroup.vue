<template>
    <div class="workerGroup-page">
        <el-table :data="workList" style="width: 100%" class="table-fixed">
          <el-table-column type="expand">
            <template slot-scope="props">
                <div class="container-fluid">
                    <div class="row p-t-sm">
                        <div class="col-xs-6 text-left">时间要求：{{props.row.wtime}}</div>
                        <div class="col-xs-6 text-left">任务所属：{{props.row.wblong}}</div>
                    </div>
                    <div class="row p-t-sm">
                      <div class="col-xs-6 text-left">完成标准：{{props.row.wfinish}}</div>
                      <div class="col-xs-6 text-left">岗位描述：{{props.row.	wmaterials}}</div>
                    </div>
                    <div class="row text-left p-t-sm">
                        <div class="col-xs-12">任务描述：{{props.row.	wstandard}}</div>
                    </div>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="所属" prop="w_activity" :formatter="setActivityName"></el-table-column>
          <el-table-column label="组名" prop="wname" ></el-table-column>
          <el-table-column label="组长" prop="name" :formatter="setPerson"></el-table-column>
          <el-table-column label="组员" prop="desc" :formatter="setPersons"></el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteWork(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "worker-group",
        props:["workList"],
        methods:{
            setPerson(row, column){
              this.$http.get("/work/getPerson?uid="+row.wperson).then(result=>{
                row.personMsg = result.body.msg;
              },err=>{
                console.log(err.message)
              });
              return row.personMsg;
            },
            setActivityName(row, column) {
              this.$http.get("/work/getAName?aid="+row.w_activity).then(result=>{
                row.activityMsg = result.body.msg;
              },err=>{
                console.log(err.message)
              });
              return row.activityMsg;
            },
            setPersons(row, column) {
              this.$http.get("/work/getPersons?wid=" + row.wid + "&mode=" + row.mode).then(result => {
                var arr = [];
                if(row.mode==1){
                  result.body.data.map((item,index)=>{
                    arr.push(item.name);
                  });
                }else{
                  result.body.data.map((item,index)=>{
                    arr.push(item.uname);
                  });
                }
                row.personsMsg = arr.join(",");

              }, err => {
                console.log(err.message)
              });
              return row.personsMsg;
            },
            deleteWork(data){
                this.$confirm('此操作将永久删除该任务组, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$http.get("/user/getPower").then(result=>{
                    if(result.body.position<4){
                        this.$http.get("/work/deleteWork?wid="+data.row.wid+"&mode="+data.row.mode).then(result=>{
                          if(result.body.code==1){
                            this.$emit("resetList");
                            this.$message({
                              type: 'success',
                              message: '删除成功!',
                            });
                          }else{
                            this.$message({
                              type: 'error',
                              message: '删除失败!',
                            });
                          }
                        },err=>{
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
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
            }

        }
    }
</script>

<style>
.workerGroup-page{
    position: relative;

}
.workerGroup-page .cell{
    text-align: left;
}
</style>
