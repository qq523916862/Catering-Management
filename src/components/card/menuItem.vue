<template>
  <el-card class="menuItem-box" :body-style="{ padding: '0px' }">
    <div class="menuItem-img" :style="{'background-image':'url(/static/images/menu/'+item.pic_url+')'}">
      <div class="menuItem-effect">{{item.mlabel}}</div>
    </div>
    <div>
      <div class="menuItem-contain">
        <div class="menuItem-contain-rolling">
          <div class="menuItem-contain-rolling-block1">
            <div class="text-ellip meunItem-title">&nbsp{{item.mname}}</div>
            <div class="text-ellip"><span class="glyphicon glyphicon-asterisk text-warning"></span>原料：{{item.mmaterials}}</div>
          </div>
          <div class="menuItem-contain-rolling-block2 p-t-sm">
            <div class="text-ellip p-l-sm">
              <span class="glyphicon glyphicon-indent-right text-warning"></span>  大概{{item.mtime}}分钟
            </div>
            <div class="text-ellip p-l-sm">
              <span class="glyphicon glyphicon-fire text-warning"></span> &nbsp;&nbsp;{{item.mmode}} / {{item.meffect}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
    export default {
        name: "menu-item",
        props:["item"]
    }
</script>

<style scoped>
.menuItem-box{
  cursor: pointer;
}
.menuItem-img{
  padding-bottom:100%;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  border:#dddddd 1px solid;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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
.menuItem-contain:hover>.menuItem-contain-rolling{
  margin-top:-26%;
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
.menuItem-contain-rolling-block1,.menuItem-contain-rolling-block2{
  height:50%;
  width:100%;
  padding:5px;
}
.menuItem-contain-rolling-block2{
  background: #FFFFFF;
}
.meunItem-title{
  font-weight: 600;
  font-size: 13px;
}
.text-warning{
  color: #F0AD4E;
}
@media (min-width: 1000px) and (max-width:1679px) {
  div.menuItem-contain{
    padding-bottom:36%;
  }
  div.menuItem-contain:hover>.menuItem-contain-rolling{
    margin-top:-36%;
  }
}
</style>
