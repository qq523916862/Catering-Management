<template>
    <div class="height-fluid container-fluid p-0 main-page">
          <div class="main-head vw-12 text-left">
              <mainHead :bus="bus"></mainHead>
          </div>
          <div class="main-tap" :class="{'active':navigationMode==0}">
              <main-navigation :navigationMode="navigationMode"></main-navigation>
          </div>
          <router-view :bus="bus" class="childRouter"
                       :class="{'navigation-close':navigationMode==0}"
                       :navigationMode="navigationMode" >
          </router-view>
    </div>
</template>

<script>
    import mainNavigation from './mainNavigation'
    import mainHead from './mainHead'
    import vue from 'vue'
    export default {
        name: "mainPage",
        data(){
          return {
            navigationMode:1,
            bus:new vue
          }
        },
        components:{
          mainNavigation,
          mainHead,
        }
    }
</script>

<style scoped>
body .navigation-close{
  padding-left:51px;
}
.main-page{
  background: #ECEFF1;
  position: relative;
}
.main-head{
  height:50px;
  background: linear-gradient(120deg, rgba(2,144,221,0.8) 0%, rgba(1,70,114,0.8) 100%);
  box-shadow: 2px 3px 5px rgba(0,0,0,0.4);
  position: fixed;
  top:0px;
  z-index: 10;
  min-width: 610px;
}

.main-tap{
  width:230px;
  background:#ffffff;
  position: absolute;
  top: 50px;
  height: auto;
  bottom: 0px;
  z-index: 9;
  border-right:1px #CFD2D4 solid;
  box-shadow: 2px -3px 2px rgba(0,0,0,0.1);
  -webkit-transition: all 0.5s linear 0s;
  -moz-transition: all 0.5s linear 0s;
  -ms-transition: all 0.5s linear 0s;
  -o-transition: all 0.5s linear 0s;
  transition: all 0.5s linear 0s;
  z-index: 11;
}
.main-tap.active{
  margin-left:-179px;
}
.childRouter{
  position: relative;
  top:50px;
  padding-left:230px;
  -webkit-transition: all 0.5s linear;
  -moz-transition: all 0.5s linear;
  -ms-transition: all 0.5s linear;
  -o-transition: all 0.5s linear;
  transition: all 0.5s linear;
}




</style>
