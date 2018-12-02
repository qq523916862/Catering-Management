<template>
    <div class="menuPage-box">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-6 col-md-4 col-lg-3 p-l-lg">
                   <div class="menu-img-box">
                      <div class="menu-img" :style="{'background-image':'url(/static/images/menu/'+menu.pic_url+')'}"></div>
                   </div>
                </div>
                <div class="col-xs-6 col-md-8 col-lg-9 menu-contain">
                    <div class="menu-title text-left">
                        <span>热菜</span>
                        <span>{{menu.mname}}</span>
                    </div>
                    <div class="menu-label text-left p-lg">
                        标签: <span class="label label-warning">{{menu.mlabel}}</span>
                      <span class="label label-warning">{{menu.mmode}}</span>
                      <span class="label label-warning">{{menu.meffect}}</span>
                    </div>
                    <div class="menu-label text-left p-l-lg">
                      用料: <span>{{menu.mmaterials}}</span>
                    </div>
                    <div class="menu-label text-left p-l-lg m-t-lg hidden-xs p-r-lg">
                      介绍: <p class="p-l-md">{{menu.mintroduction}}</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="menu-label text-left p-l-lg p-r-lg m-t-lg m-l-lg visible-xs">
                  介绍: <p class="p-l-md">{{menu.mintroduction}}</p>
                </div>
            </div>
            <div class="row p-t-lg m-t-lg container-fluid">
                <div class=" recipes-title text-danger">
                    制作方法
                </div>

                <div class="row" v-for="item in steps">
                    <div class="text-left p-lg ">
                        <span class=" menu-list-count text-danger p-r-lg">{{item.last+1}}.</span>
                        {{item.sdetailed}}
                    </div>
                    <div class="m-l-lg p-l-lg p-t-xs p-r-lg m-b-lg">
                        <img :src="'/static/images/menu/'+item" class="img-responsive vw-12" alt=""  v-for="item in (JSON.parse(item.src))">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "menuPage",
      data(){
        return {
          mid:0,
          menu:"",
          steps:[]
        }
      },
      methods:{
        getMenu(){
          this.$http.post("/menu/getMenu",{mid:this.mid},{emulateJSON:true}).then(result=>{
            this.menu = result.body.list[0];
            console.log(this.menu);
          },err=>{
            console.log(err.message);
          })
        },
        getSteps(){
          this.$http.post("/menu/getStep",{mid:this.mid},{emulateJSON:true}).then(result=>{
            this.steps = result.body.list;
            console.log(this.steps);
          },err=>{
            console.log(err.message);
          })
        }
      },
      created(){
        this.mid = this.$route.query.mid
      },
      mounted(){
        this.getMenu();
        this.getSteps();
      }
    }
</script>

<style scoped>
.menuPage-box{
  margin-top:50px;
}
.menu-img-box{
  padding:5px;
  border: 1px solid #c7d6d5;;
}
.menu-img{
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  padding-bottom: 100%;
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
.menu-list-count{
  font-size: 30px;
  font-weight: 600;
}
</style>
