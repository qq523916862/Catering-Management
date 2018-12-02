<template>
    <div class="detailActivty-page">
        <div class="container-fluid">
            <div class="row">
              <div class="col-xs-6 col-md-4 col-lg-3 p-l-lg">
                <div class="activity-img-box">
                  <div class="activity-img" v-if="activity.pic_url" :style="{'background-image':'url(/static/images/activity/'+activity.pic_url+')'}"></div>
                </div>
              </div>
              <div class="col-xs-6 col-md-8 col-lg-9 menu-contain">
                <div class="menu-title text-left">
                  <span>活动</span>
                  <span>{{activity.aname}}</span>
                </div>
                <div class="menu-label text-left p-l-lg m-t-md">
                  <span class="glyphicon glyphicon-tag text-primary p-r-sm"></span> 标签: <span class="label label-warning">{{activity.alabel}}</span>
                </div>
                <div class="menu-label text-left p-l-lg m-t-md">
                  <span class="glyphicon glyphicon-user text-primary p-r-sm"></span>主要负责人: <span>{{person}}</span>
                </div>
                <div class="menu-label text-left m-t-md p-l-lg">
                  <span class="glyphicon glyphicon-time text-danger p-r-sm"></span>活动时间: <span>{{activity.abegin}}~{{activity.aend}}</span>
                </div>
                <div class="menu-label text-left p-l-lg m-t-md hidden-xs p-r-lg">
                  <span class="glyphicon glyphicon-hand-down text-danger p-r-sm"></span>介绍: <p class="p-l-md">{{activity.amaterials}}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="menu-label text-left p-l-lg p-r-lg m-t-lg m-l-lg visible-xs">
                <span class="glyphicon glyphicon-hand-down text-danger p-r-sm"></span>介绍: <p class="p-l-md">{{activity.amaterials}}</p>
              </div>
            </div>

            <div class="container-fluid row m-t-lg">
              <div class="recipes-title text-danger m-t-lg">
                活动菜谱
              </div>
              <div class="table-responsive">
                <table class="table-bordered table m-t-lg activity-table table-hover">
                    <thead>
                        <tr>
                            <th class="vw-3">日期</th>
                            <th class="vw-3">早斋</th>
                            <th class="vw-3">午斋</th>
                            <th class="vw-3">晚斋</th>
                        </tr>
                    </thead>
                  <tbody>
                    <tr v-for="item in menus">
                      <td class=" text-middle text-center text-primary">{{item.date}}</td>
                      <td>主食：<span class="p-r-xs">{{item.backfast.main}}，</span>副食：<span>{{item.backfast.backup.join(",")}}</span></td>
                      <td>主食：<span class="p-r-xs">{{item.lunch.main}}，</span>副食：<span>{{item.lunch.backup.join(",")}}</span></td>
                      <td>主食：<span class="p-r-xs">{{item.dinner.main}}，</span>副食：<span>{{item.dinner.backup.join(",")}}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          <div class="container-fluid row m-t-lg">
            <div class="recipes-title text-danger m-t-lg">
              活动分工
            </div>
            <div class="table-responsive">
              <table class="table-bordered table m-t-lg activity-table table-hover">
                <thead>
                <tr>
                  <th class="vw-2">分组</th>
                  <th class="vw-2">组长</th>
                  <th class="vw-4">组员</th>
                  <th class="vw-4">备注</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="item in work">
                    <td class=" text-middle text-center text-primary">{{item.wname}}</td>
                    <td class="text-middle">{{getPerson(item)}}</td>
                    <td class="text-middle">{{getPersons(item)}}</td>
                    <td class="text-middle text-left">时间：{{item.wtime}}<br>完成标准：{{item.wfinish}}<br>岗位描述：{{item.wmaterials}}<br>任务描述：{{item.wstandard}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail-active",
        props:["item"],
        data(){
          return {
            activity:[],
            person:"",
            menus:[],
            work:[],
            workList:[
              {
                work:"洗菜组",
                responsiblePerson:"梁宝承",
                remarks:"喜欢在这种氛围里，好像在一间没有一丝光线照进的密闭空间里；每一个节奏，如同听到自己的心跳一样，是希望，却凸显了周围的孤寂； 喜欢这份慵懒，可以让自己不紧不慢，感受这庸庸碌碌繁华里面的一份小清净。",
                workers:[
                  "吴泳雅",
                  "吴用牙",
                  "冬瓜雅",
                  "番薯雅",
                  "大头雅"
                ]
              },
              {
                work:"洗菜组",
                responsiblePerson:"梁宝承",
                remarks:"喜欢在这种氛围里，好像在一间没有一丝光线照进的密闭空间里；每一个节奏，如同听到自己的心跳一样，是希望，却凸显了周围的孤寂； 喜欢这份慵懒，可以让自己不紧不慢，感受这庸庸碌碌繁华里面的一份小清净。",
                workers:[
                  "吴泳雅",
                  "吴用牙",
                  "冬瓜雅",
                  "番薯雅",
                  "大头雅"
                ]
              },
              {
                work:"洗菜组",
                responsiblePerson:"梁宝承",
                remarks:"喜欢在这种氛围里，好像在一间没有一丝光线照进的密闭空间里；每一个节奏，如同听到自己的心跳一样，是希望，却凸显了周围的孤寂； 喜欢这份慵懒，可以让自己不紧不慢，感受这庸庸碌碌繁华里面的一份小清净。",
                workers:[
                  "吴泳雅",
                  "吴用牙",
                  "冬瓜雅",
                  "番薯雅",
                  "大头雅"
                ]
              },
              {
                work:"洗菜组",
                responsiblePerson:"梁宝承",
                remarks:"喜欢在这种氛围里，好像在一间没有一丝光线照进的密闭空间里；每一个节奏，如同听到自己的心跳一样，是希望，却凸显了周围的孤寂； 喜欢这份慵懒，可以让自己不紧不慢，感受这庸庸碌碌繁华里面的一份小清净。",
                workers:[
                  "吴泳雅",
                  "吴用牙",
                  "冬瓜雅",
                  "番薯雅",
                  "大头雅"
                ]
              }
            ]
          }
        },
        methods:{
            getActivity(){
                this.$http.post("/activity/getOneActivity",{aid:this.aid},{emulateJSON:true}).then(result=>{
                    this.activity = result.body.data[0];
                    this.$http.get("/work/getPerson?uid="+this.activity.aperson_uid).then(result=>{
                      this.person = result.body.msg;
                    },err=>{
                      console.log(err.message)
                    });
                },err=>{
                    console.log(err.message);
                })
            },
            getMenus(){
              this.$http.post("/activity/getActivityMenus",{aid:this.aid},{emulateJSON:true}).then(result=>{
                var arr = [];
                var arr1 = [];
                var rearr = [];
                result.body.data.map((item,index)=>{
                  item.a_date = item.a_date.substr(0,10);
                });
                result.body.data.map((item,index)=>{
                    if(arr[item.a_date]){
                      if(item.a_mode==0){
                        arr[item.a_date].backfast.main = item.mname;
                      }else if(item.a_mode==1){
                        arr[item.a_date].backfast.backup.push(item.mname);
                      }else if(item.a_mode==2){
                        arr[item.a_date].lunch.main = item.mname;
                      }else if(item.a_mode==3){
                        arr[item.a_date].lunch.backup.push(item.mname);
                      }else if(item.a_mode==4){
                        arr[item.a_date].dinner.main = item.mname;
                      }else if(item.a_mode==5){
                        arr[item.a_date].dinner.backup.push(item.mname);
                      }
                    }else{
                      arr1.push(item.a_date);
                      arr[item.a_date] = {
                        backfast:{
                          main:"",
                          backup:[]
                        },
                        lunch:{
                          main:"",
                          backup:[]
                        },
                        dinner:{
                          main:"",
                          backup:[]
                        },
                        date:item.a_date
                      };
                      if(item.a_mode==0){
                        arr[item.a_date].backfast.main = item.mname;
                      }else if(item.a_mode==1){
                        arr[item.a_date].backfast.backup.push(item.mname);
                      }else if(item.a_mode==2){
                        arr[item.a_date].lunch.main = item.mname;
                      }else if(item.a_mode==3){
                        arr[item.a_date].lunch.backup.push(item.mname);
                      }else if(item.a_mode==4){
                        arr[item.a_date].dinner.main = item.mname;
                      }else if(item.a_mode==5){
                        arr[item.a_date].dinner.backup.push(item.mname);
                      }
                    }
                });
                for(var i = 0 ; i<arr1.length;i++){
                  rearr.push(arr[arr1[i]])
                }
                this.menus = rearr;
              },err=>{
                console.log(err.message);
              })
            },
            getWork(){
              this.$http.post("/activity/getActivityWork",{aid:this.aid},{emulateJSON:true}).then(result=>{
                this.work = result.body.data;
              },err=>{
                console.log(err.message);
              })
            },
            getPerson(item){
              this.$http.get("/work/getPerson?uid="+item.wperson).then(result=>{
                item.personMsg = result.body.msg;
              },err=>{
                console.log(err.message)
              });
              return item.personMsg;
            },
            getPersons(item){
              this.$http.get("/work/getPersons?wid=" + item.wid + "&mode=" + item.mode).then(result => {
                var arr = [];
                if(item.mode==1){
                  result.body.data.map((item,index)=>{
                    arr.push(item.name);
                  });
                }else{
                  result.body.data.map((item,index)=>{
                    arr.push(item.uname);
                  });
                }
                item.personsMsg = arr.join(",");
              }, err => {
                console.log(err.message)
              });
              return item.personsMsg;
            }
        },
        created(){
            this.aid = this.$route.query.aid;
        },
        mounted(){
            this.getActivity();
            this.getMenus();
            this.getWork();
        }
    }
</script>

<style scoped>
.detailActivty-page{
  padding-top:50px;
  position: relative;
}
.activity-img-box{
  padding:5px;
  border-radius: 3px;
  border:1px solid #C7D6D5;
}
.activity-img{
  width:100%;
  padding-bottom: 100%;
  background-size:cover;
  background-position: center center;
}
.menu-contain{
  margin-top:20px;
}
.menu-title span:nth-child(2){
  font-weight: 600;
  font-size: 18px;
  position: relative;
  top:2px;
}
.menu-title span:first-child{
  padding: 7px 20px;
  background: #D71D1D;
  color: white;
  font-weight: 600;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  position: relative;
  margin-right: 20px;
}
.menu-title span:first-child::after{
  content: '';
  width: 0px;
  height: 0px;
  border: 15px solid transparent;
  border-left-color:#D71D1D ;
  position: absolute;
  right: -30px;
  top:0px;
}
.menu-label{
  color: #7F7F7F;
  font-size: 15px;
}
.menu-label .label{
  position: relative;
  top:-2px;
  left:5px;
}
.recipes-title{
  font-size: 15px;
  font-weight: 600;
  position: relative;
}
.recipes-title::before{
  content: "";
  width: 35%;
  height: 2px;
  background: #F0AD4E;
  left:8%;
  position: absolute;
  top:6px;
}
.recipes-title::after{
  content: "";
  width: 35%;
  height: 2px;
  background: #F0AD4E;
  position: absolute;
  right: 8%;
  top:6px;
}
.activity-table{
  background: white;
  min-width: 800px;
}
.activity-table th{
  text-align: center;
  table-layout: fixed;
}
.text-middle{
  vertical-align: middle;
}
</style>
