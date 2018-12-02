<template>
  <div class="dishes-page">
      <div class="container-fluid dishes-box">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="现有菜式" name="first">
              <div class="container-fluid">
                <div class="row">
                  <div @click="jumpDetailedMenu(item.mid)" class="col-xs-6 col-sm-4 col-md-3 col-lg-2 m-t-md clearfix" v-for="item,i in menus">
                    <menu-item :index="i" :item="item" @resetMenu="getMenus" :mode="'all'"></menu-item>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="新增菜式" name="second">
                <add-dishes @resetData="getMenus"></add-dishes>
            </el-tab-pane>
          </el-tabs>
      </div>
  </div>
</template>

<script>
    import menuItem from './menuItem'
    import addDishes from './addDishes'
    export default {
        name: "dshes",
        data(){
          return {
            activeName:"first",
            menus:[]

          }
        },
        methods:{
          jumpDetailedMenu(mid){
            this.$router.push({path:"/detailMenu",query:{mid:mid}});
          },
          getMenus(){
              this.$http.post("/menu/getAllMenu").then(result=>{
                this.menus = result.body.list;
              },err=>{
                console.log(err.message);
              })
          }
        },
        components:{
            menuItem,
            addDishes
        },
        mounted(){
          this.getMenus();
        }
    }
</script>

<style scoped>
.dishes-page{
  position: relative;
  height: 100% !important;
}
.dishes-box{
  padding: 10px;
}
</style>
