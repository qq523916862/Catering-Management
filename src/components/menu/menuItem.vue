<template>
  <el-card class="menuItem-box" :body-style="{ padding: '0px' }">
    <div class="menuItem-title">
        <div class="text-ellip meunItem-title p-xs text-left">
          {{item.mname}}
          <a href="#" class="pull-right menu-btn" @click.stop="delMenu($event,item)"><span class="glyphicon glyphicon-remove"></span></a>
        </div>
    </div>
    <div class="menuItem-img" :style="{'background-image':'url(/static/images/menu/'+item.pic_url+')'}">
      <div class="menuItem-effect">{{item.mlabel}}</div>
    </div>
    <div>
      <div class="menuItem-contain">
        <div class="menuItem-contain-rolling p-t-xs text-left">
            <div class="text-ellip p-l-sm">
              <span class="glyphicon glyphicon-indent-right text-warning"></span>  大概{{item.mtime}}分钟
            </div>
            <div class="text-ellip p-l-sm">
              <span class="glyphicon glyphicon-fire text-warning"></span> &nbsp;&nbsp;{{item.mmode}} / {{item.mlabel}}
            </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
    export default {
        name: "menu-item",
        props:["item","mode"],
        methods:{
            delMenu(e,item){
              e.preventDefault();
              var sql = this.mode=="all"?"/menu/delMenu":(this.mode=="week"?"/menu/delMenusWeek":"/menu/delMenusMonth");
              this.$confirm('此操作将永久删除该菜式, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$http.get("/user/getPower").then(result=>{
                  if(result.body.position<4){
                    this.$http.post(sql,{mid:this.mode=="all"?item.mid:(this.mode=="week"?item.mwid:item.monid)},{emulateJSON:true}).then(result=>{
                      if(result.body.code==1){
                        this.$emit("resetMenu");
                        this.$message({
                          type:"success",
                          message:"删除成功"
                        });
                      }
                    },err=>{
                      console.log(err.message);
                    })
                  }else{
                    this.$message({
                      type: 'error',
                      message: '您没有权限'
                    });
                  }
                },err=>{
                  console.log(err.message);
                })
              }).catch((err) => {
                console.log(err)
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
.menuItem-box{
  cursor: pointer;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -ms-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.menuItem-box:hover .menuItem-title{
  background: #F5F7FA;
}
.menuItem-box:hover .menu-btn{
  display: block;
}
.menuItem-img{
  padding-bottom:100%;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  border:#dddddd 1px solid;
}
.menuItem-effect{
  position: absolute;
  display: inline-block;
  padding:5px 30px;
  background: #60A531;
  font-size: 15px;
  color: #ffffff;
  font-family: STXINWEI;
  box-shadow: 1px 0px 3px #747474;
  top:15%;
  right:6px;
  transition: all 0.3s linear;
}
.menuItem-effect::after{
  content:"";
  position: absolute;
  width: 0px;
  height: 0px;
  border:8px solid transparent;
  border-bottom-color: #003800;
  transform: rotateZ(-45deg);
  top:23px;
  right:3px;
}
.menuItem-contain{
  position: relative;
  padding-bottom:26%;
  top:-1px;
  overflow: hidden;
}
.menuItem-contain-rolling{
  position: absolute;
  height:200%;
  width:100%;
  -webkit-transition: all 0.6s;
  -moz-transition: all 0.6s;
  -ms-transition: all 0.6s;
  -o-transition: all 0.6s;
  transition: all 0.6s;
}
.meunItem-title{
  font-size: 14px;
}
.text-warning{
  color: #F0AD4E;
}
.menu-btn{
  display: none;
}
@media (min-width: 990px) and (max-width:1679px) {
  div.menuItem-contain{
    padding-bottom:36%;
  }
}

</style>
