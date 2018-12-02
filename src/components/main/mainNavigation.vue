<template>
  <div class="">
      <div  v-for="item,i in navList" class="nav-item" @click="setActiveItemList(i)"  v-show="navigationMode==1">
          <div class="text-left p-sm nav-title">
              {{item.title}}
          </div>
          <ul class="list-unstyled nav-list">
            <li v-for="indexItem,a in item.data" class="text-ellip" @click="setActiveItem(a)" :class="{'active':activeChoose[0]==i&&activeChoose[1]==a}"><span v-html="parseHtml(indexItem.icon)"></span>{{indexItem.content}}<span class="glyphicon glyphicon-menu-right"></span></li>
          </ul>
      </div>

      <div class="nav-icon-item-box animated bounceInUp" v-show="navigationMode==0">
          <div  v-for="item,i in navList" class="nav-icon-item" @click="setActiveItemList(i)"  >
            <ul class="list-unstyled nav-list">
              <li v-for="indexItem,a in item.data" @click="setActiveItem(a)" :class="{'active':activeChoose[0]==i&&activeChoose[1]==a}"><span v-html="parseHtml(indexItem.icon)"></span></li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "mainNavigation",
        props:["navigationMode"],
        data(){
           return {
               navList:[
                 {
                   title:"",
                   data:[
                     {icon:'home',content:'主页',router:"index"}
                   ]
                 },
                 {
                   title:"菜谱",
                   data:[
                     {icon:'th-list',content:'菜式管理',router:"dishes"},
                     {icon:'certificate',content:'菜谱',router:"recipes"}
                   ]
                 },
                 {
                   title:"活动",
                   data:[
                     {icon:'bookmark',content:'活动管理',router:"activity"},
                     {icon:'plus-sign',content:'新增活动',router:"addActivity"}
                   ]
                 },
                 {
                   title:"物品管理",
                   data:[
                     {icon:'tower',content:'购菜报销账',router:"reimbursement"},
                     {icon:'euro',content:'购菜登记',router:"foodRegister"},
                     {icon:'list-alt',content:'供给品',router:"supply"},
                     {icon:'print',content:'全年大米食用油',router:"riceYear"}
                   ]
                 },
                 {
                   title:"人员管理",
                   data:[
                     {icon:'bishop',content:'分组管理',router:"group"},
                     {icon:'user',content:'账号管理',router:"power"}
                   ]
                 }
               ],
               activeChoose:[0,0]
           }
        },
        methods:{
          setActiveItemList(i){
              this.$set(this.activeChoose,0,i);
          },
          setActiveItem(i){
              this.$set(this.activeChoose,1,i);

          },
          parseHtml(icon){
              return `<span class="p-r-sm glyphicon glyphicon-${icon}" ></span>`
          }

        },
        watch:{
            activeChoose(newVal,oldVal){
                this.$router.push("/"+this.navList[newVal[0]].data[newVal[1]].router);
            }
        },
        mounted(){
          if(this.$route.path=="/group"){
              this.activeChoose = [4,0];
          }else if(this.$route.path=="/dishes"){
              this.activeChoose = [1,0];
          }else if(this.$route.path=="/recipes"){
            this.activeChoose = [1,1];
          }else if(this.$route.path=="/activity"){
            this.activeChoose = [2,0];
          }else if(this.$route.path=="/addActivity"){
            this.activeChoose = [2,1];
          }else if(this.$route.path=="/reimbursement"){
            this.activeChoose = [3,0];
          }else if(this.$route.path=="/foodRegister"){
            this.activeChoose = [3,1];
          }else if(this.$route.path=="/supply"){
            this.activeChoose = [3,2];
          }else if(this.$route.path=="/riceYear"){
            this.activeChoose = [3,3];
          }else if(this.$route.path=="/power"){
            this.activeChoose = [4,1];
          };
        }
    }
</script>

<style scoped>
.nav-item.active>li{
  color: #757575;
}
.nav-title{
  color: #A6A6A6;
  margin-top:0px;
  font-size: 13px;
  font-family: "Microsoft YaHei UI";
}
.nav-list{
  color: #9E9E9E;
}
.nav-item{
  background: #ffffff;
  padding-bottom:10px;
}
.nav-icon-item-box{
  position: relative;
  bottom:0px;
  left:-1px;
}
.nav-icon-item{
  margin-left:180px;
  width:50px;
  background: #ffffff;
  padding-bottom:10px;
}
.nav-icon-item li{
  line-height: 40px;
}
.nav-icon-item li .glyphicon{
  margin-top:-20px;
}
.nav-list>li{
  text-align: left;
  padding:7px;
  padding-left:15px;
  cursor: pointer;
  color:#7F7F7F;
}
.nav-list>li:hover{
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  background: #cbcbcb;
}
/*.nav-list>li:last-child{*/
  /*border-bottom-width: 1px;*/
/*}*/
.nav-list>.active{
  color: #0288D1;
  position: relative;
}
.nav-list .glyphicon:last-child{
  display: none;
  font-size: 8px;
  position: absolute;
  top:11.5px;
  right:15px;
}
.nav-list>.active .glyphicon:last-child{
  display: inline-block;
}
</style>
