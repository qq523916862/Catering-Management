<template>
    <div class="module-box">
        <div class="module-title">
            <span>{{title}} <span>·</span></span>
            <a  href="" class="pull-right" v-show="link" @click="jump($event)">更多 <span class="glyphicon glyphicon-arrow-right"></span></a>
        </div>
        <div class="module-item">
          <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index-title",
        props:["title","link","router"],
        methods:{
          jump(e){
              e.preventDefault();
              this.$router.push("/"+this.router);
          }
        }
    }
</script>

<style scoped>

.module-box{
  text-align: left;
  margin:10px;
  padding: 20px;
  background: #ffffff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.3);
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.3);
}
.module-title>span{
  background: #D31A1A;
  padding: 7px;
  padding-right: 2px;
  color: #ffffff;
  font-size: 18px;
  border-radius: 3px;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  font-weight: 500;
  position: relative;
  top:-5px;
}
.module-title>span::after{
  content: "";
  width: 0px;
  height: 0px;
  display: inline-block;
  border: 14px solid transparent;
  border-left-color: #D31A1A;
  position: absolute;
  right:-27px;
  top:4px;
}
.module-title>a{
  color: gray;
  position: relative;
  top:10px;
}
.module-item{
  padding:10px;
  margin-top:5px;
  border-top:3px solid #D31A1A;
}
</style>
