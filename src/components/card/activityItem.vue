<template>
  <div class="activity-box">
      <div class="pull-right activity-btn" v-show="remove==true" ><span class="glyphicon glyphicon-remove" @click.stop="deleteAct(item.aid)"></span></div>
      <div class="activity-head" :style="{'background-image':'url(/static/images/activity/'+item.pic_url+')'}">
          <div class="activity-label">{{item.alabel}}</div>
          <div class="activity-head-hoverbg"></div>
      </div>
      <div class="activity-foot">
          <div class="text-ellip h4">{{item.aname}}</div>
          <div class="text-ellip text-default">{{item.amaterials.substr(0,10)+(item.amaterials.length>10?"...":"")}}</div>
          <div class="text-default">活动时间：</div>
          <div class="text-ellip text-default">{{item.abegin}}~{{item.aend}}</div>
      </div>
  </div>

</template>

<script>
    export default {
        name: "activity-item",
        props:["item","remove"],
        methods:{
          deleteAct(aid){
            this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.get("/user/getPower").then(result=>{
                if(result.body.position<4){
                  this.$http.post("/activity/delActivity",{aid:aid},{emulateJSON:true}).then(result=>{
                    if(result.body.code==1){
                      this.$emit("resetList");
                      this.$message({
                        type:"success",
                        message:"删除成功"
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
              })
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

<style scoped>
.activity-box{
    position: relative;
    margin-top:10px;
    padding:20px;
    border:1px solid #cccfd4;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow:  0px 0px 5px #e4e7ee;
    -moz-box-shadow:  0px 0px 5px #e4e7ee;
    box-shadow:  0px 0px 5px #dcdfe6;
    cursor: pointer;
}
.activity-box:hover .activity-btn{
  display: block;
}
.activity-head{
  padding-bottom:100%;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  position: relative;
  border: 1px solid gray;
}
.activity-label{
  position: absolute;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  display: inline-block;
  padding: 4px 25px;
  background: #f4b04f;
  box-shadow: 2px 2px 3px #6d4f23;
  z-index: 3;
  top: -10px;
  left:-7px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.activity-label::after{
  content: '';
  width: 0px;
  height: 0px;
  border: 6px solid transparent;
  border-left-color: #59401f;
  position: absolute;
  transform: rotateZ(135deg);
  right:-6px;
  top:4px;
}
.activity-head-hoverbg{
  width: 100%;
  height:100%;
  position: absolute;
  z-index:2;
}
.activity-head-hoverbg:hover{
  background: rgba(0,0,0,0.5);
}
.activity-btn{
  position: absolute;
  top:5px;
  right: 5px;
  display: none;
}
</style>
