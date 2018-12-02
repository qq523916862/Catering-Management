<template>
  <el-card>
      <div slot="header" class="work-card-header">
        <span class="h4">{{item.title}}</span>
        <span class="work-time pull-right">活动时间：{{item.timeBefore}}~{{item.timeAfter}}</span>
      </div>
      <div class="p-b-md p-l-sm">
          <p>
            <span class="glyphicon glyphicon-stats p-r-sm color-success"></span>分组 ：
            {{item.responsiblePerson}}
          </p>
          <p>
              <span class="glyphicon glyphicon-user p-r-sm color-warning"></span>主要负责人：
              {{item.responsiblePerson}}
          </p>
          <p>
               <span class="glyphicon glyphicon-hand-right p-r-sm color-danger"></span>任务描述&nbsp;&nbsp;&nbsp;：
              {{item.remarks}}
          </p>
      </div>
      <el-table :data="item.arrange" border style="width: 100%">
        <el-table-column prop="taskTitle" label="任务" width="100">
        </el-table-column>
        <el-table-column class="text-center" prop="person" label="参与人员" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.person.join(",")}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="任务描述">
        </el-table-column>
      </el-table>
      <div class="text-center m-t-md look-more">查看详情</div>
  </el-card>
</template>

<script>
    export default {
        name: "work-item",
        props:["item"]
    }
</script>

<style scoped>
.work-time{
  font-size: 11px;
  position: relative;
  top:5px;
  color: #acacac;
}
.look-more{
  text-decoration: underline;
}
.look-more:hover{
  color: #5965ff;
  cursor: pointer;
}
.color-danger{
  color: #DD4E41;
}
.color-warning{
  color: #F4B04F;
}
.el-card{
  border:1px solid #cccfd4;
}

</style>
