<template>
  <div class="indexPage height-fluid">
      <!--<menu-item></menu-item>-->
      <index-module :title="'今天菜谱'" :link="true" :router="'recipes'">
          <div class="container-fluid">
              <div class="row">
                  <div  @click="jumpDetailedMenu(item.mid)" class="col-xs-6 col-sm-4 col-md-3 col-lg-2 m-t-md" v-for="item,i in menuList">
                      <menu-item :index="i" :item="item"></menu-item>
                  </div>
              </div>
          </div>
      </index-module>

    <index-module :title="'最近活动'" :link="true" :router="'activity'">
      <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-3 m-t-sm" @click="jumpDetailedActivity(item.aid)" v-for="item,i in activityList">
                <activity-card :item="item"></activity-card>
            </div>
        </div>
      </div>
    </index-module>

    <!--<index-module :title="'当天工作安排'" :link="true">-->
      <!--<div class="container-fluid">-->
        <!--<div class="row">-->
          <!--<div class="col-md-6 m-t-md" v-for="item,i in workList">-->
              <!--<work-card :item="item"></work-card>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</index-module>-->

  </div>
</template>

<script>
  import menuItem from '../card/menuItem'
  import indexModule from './indexModule'
  import activityCard from '../card/activityItem'
  import workCard from '../card/workItem'
  export default {
        name: "index",
        props:['navigationMode'],
        data(){
          return {
              menuList:[],
              activityList:[],
              // workList:[
              //   {
              //     title:"活动A分工",
              //     responsiblePerson:"华软网络系梁宝承",
              //     remarks:"这是一个该好好干的项目",
              //     timeBefore:"2018-03-11",
              //     timeAfter:"2018-03-22",
              //     arrange:[
              //       {
              //         taskTitle:"擦地板",
              //         person:["吴泳雅"],
              //         remark:"擦干净地板",
              //
              //       },
              //       {
              //         taskTitle:"擦厕所",
              //         person:["吴用呀"],
              //         remark:"擦干净厕所拉屎"
              //       },
              //       {
              //         taskTitle:"煮饭",
              //         person:["吴用牙"],
              //         remark:"煮饭，3送一汤加饭后甜品"
              //       }
              //     ]
              //   },
              //   {
              //     title:"活动B分工",
              //     responsiblePerson:"华软网络系梁宝承",
              //     remarks:"这是一个该好好干的项目",
              //     timeBefore:"2018-03-11",
              //     timeAfter:"2018-03-22",
              //     arrange:[
              //       {
              //         taskTitle:"擦地板",
              //         person:["吴泳雅"],
              //         remark:"擦干净地板"
              //       },
              //       {
              //         taskTitle:"擦厕所",
              //         person:["吴用呀"],
              //         remark:"擦干净厕所拉屎"
              //       },
              //       {
              //         taskTitle:"煮饭",
              //         person:["吴用牙"],
              //         remark:"煮饭，3送一汤加饭后甜品"
              //       }
              //     ]
              //   },
              //   {
              //     title:"活动C分工",
              //     responsiblePerson:"华软网络系梁宝承",
              //     remarks:"这是一个该好好干的项目",
              //     timeBefore:"2018-03-11",
              //     timeAfter:"2018-03-22",
              //     arrange:[
              //       {
              //         taskTitle:"擦地板",
              //         person:["吴泳雅"],
              //         remark:"擦干净地板"
              //       },
              //       {
              //         taskTitle:"擦厕所",
              //         person:["吴用呀"],
              //         remark:"擦干净厕所拉屎"
              //       },
              //       {
              //         taskTitle:"煮饭",
              //         person:["吴用牙"],
              //         remark:"煮饭，3送一汤加饭后甜品"
              //       }
              //     ]
              //   }
              // ]
          }
        },
        methods:{
          jumpDetailedMenu(mid){
            this.$router.push({path:"/detailMenu",query:{mid:mid}});
          },
          jumpDetailedActivity(aid){
            this.$router.push({path:"/detailActivity",query:{aid:aid}});
          },
          getMenus(){
            this.$http.post("/menu/getMenusIndex").then(result=>{
              this.menuList = result.body.list;
            },err=>{
              console.log(err.message);
            })
          },
          getActivity(){
            this.$http.get("/activity/getActivityIndex").then(result=>{
              this.activityList = result.body.list;
            },err=>{
              console.log(err.message);
            })
          }
        },
        components:{
            menuItem,
            indexModule,
            activityCard,
            workCard
        },
        mounted(){
            this.getMenus();
            this.getActivity();
        }
    }
</script>

<style scoped>
.navigation-close{
  padding-left:51px;
}
.indexPage{
  -webkit-transition: all 0.5s linear;
  -moz-transition: all 0.5s linear;
  -ms-transition: all 0.5s linear;
  -o-transition: all 0.5s linear;
  transition: all 0.5s linear;
}
</style>
