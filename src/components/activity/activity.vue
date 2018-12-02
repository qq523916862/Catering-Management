<template>
      <div class="activity-page">
          <el-card>
              <div class="container-fluid">
                  <div class="activity-head">
                      <el-tabs v-model="active">
                          <el-tab-pane label="全部活动" name="0"></el-tab-pane>
                          <el-tab-pane label="最近活动" name="1"></el-tab-pane>
                          <el-tab-pane label="过期活动" name="2"></el-tab-pane>
                      </el-tabs>
                  </div>
                  <div class="row" v-show="active==0">
                      <div class="col-xs-6 col-md-4 col-lg-3 m-t-sm" @click="jumpToDetail(item.aid)" v-for="item in activityList">
                        <activityItem :item="item" :remove="true" @resetList="getActivityList"></activityItem>
                      </div>
                  </div>
                  <div class="row" v-show="active==1">
                    <div class="col-xs-6 col-md-3 col-lg-3 m-t-sm" @click="jumpToDetail(item.aid)" v-for="item in nowActivity">
                      <activityItem :item="item" :remove="true" @resetList="getActivityList"></activityItem>
                    </div>
                  </div>

                  <div class="row" v-show="active==2">
                    <div class="col-xs-6  col-md-3 col-lg-3 m-t-sm" @click="jumpToDetail(item.aid)" v-for="item in beforeActivity">
                      <activityItem :item="item" :remove="true" @resetList="getActivityList"></activityItem>
                    </div>
                  </div>
              </div>
          </el-card>
      </div>
</template>

<script>
    import activityItem from '../card/activityItem'
    export default {
        name: "activity",
        data(){
            return {
              activityList:[],
              active:0
            }
        },
        methods:{
            jumpToDetail(aid){
                this.$router.push({path:"/detailActivity",query:{aid:aid}});
            },
            getActivityList(){
                this.$http.post("/activity/getActivity").then(result=>{
                    this.activityList = result.body.list;
                },err=>{
                    console.log(err.message);
                })
            }
        },
        computed:{
            nowActivity(){
                var now = new Date();
                var arr = [];
                var activityTime = [];
                for(var item of this.activityList){
                  activityTime = item.aend.split("-");
                  if(parseInt(activityTime[0]) > now.getFullYear() || (parseInt(activityTime[1]) > now.getMonth()+1&&parseInt(activityTime[0]) >= now.getFullYear()) || (parseInt(activityTime[2]) >= now.getDate()&&parseInt(activityTime[1]) >= now.getMonth()+1&&parseInt(activityTime[0]) >= now.getFullYear())){
                      arr.push(item);
                  }
                  }
                return arr;
            },
            beforeActivity(){
                var now = new Date();
                var arr = [];
                var activityTime = [];
                for(var item of this.activityList){
                  activityTime = item.abegin.split("-");
                  if(!(parseInt(activityTime[0]) > now.getFullYear() || (parseInt(activityTime[1]) > now.getMonth()+1&&parseInt(activityTime[0]) >= now.getFullYear()) || (parseInt(activityTime[2]) >= now.getDate()&&parseInt(activityTime[1]) >= now.getMonth()+1&&parseInt(activityTime[0]) >= now.getFullYear()))){
                    arr.push(item);
                  }
                }
                return arr;
            }
        },
        components:{
          activityItem
        },
        mounted(){
          this.getActivityList();
        }

    }
</script>

<style scoped>
.activity-page{
  margin:0 10px;
  position: relative;
  top:60px;
}
</style>
