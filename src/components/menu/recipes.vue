<template>
  <div class="recipes-page">
    <module-item :title="'周菜谱'">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 m-t-md" v-for="item,i in menuWeek" @click="jumpDetailedMenu(item.mid)">
            <menu-item :index="i" :item="item" :mode="'week'" @resetMenu="getMenusWeek"></menu-item>
          </div>
          <div class="menu-add col-xs-6 col-sm-4 col-md-3 col-lg-2 m-t-md" @click="openWeek">
              <el-card class="menuItem-box" :body-style="{ padding: '0px' }">
                  <div class="menu-add-title"></div>
                  <div class="menu-add-contain">
                      <div class="menu-plus"><span class="glyphicon glyphicon-plus"></span></div>
                  </div>
                  <div class="menu-add-title"></div>
              </el-card>
          </div>
        </div>
      </div>

      <el-dialog title="添加周菜谱" :visible.sync="dialogWeek">
        <el-form :model="dialogData" size="mini">
          <el-form-item label="现有菜谱" :label-width="'100px'">
            <el-select v-model="dialogData.week" placeholder="请选择添加菜谱">
              <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mid" :disabled="checkHas(item.mid,'week')"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogWeek = false">取 消</el-button>
          <el-button type="primary" @click="subWeek">确 定</el-button>
        </div>
      </el-dialog>

    </module-item>

    <module-item :title="'添加月菜谱'">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 m-t-md" v-for="item,i in menuMonth" @click="jumpDetailedMenu(item.mid)">
            <menu-item :index="i" :item="item" :mode="'month'" @resetMenu="getMenusMonth"></menu-item>
          </div>
          <div class="menu-add col-xs-6 col-sm-4 col-md-3 col-lg-2 m-t-md" @click="openMonth">
            <el-card class="menuItem-box" :body-style="{ padding: '0px' }">
              <div class="menu-add-title"></div>
              <div class="menu-add-contain">
                <div class="menu-plus"><span class="glyphicon glyphicon-plus"></span></div>
              </div>
              <div class="menu-add-title"></div>
            </el-card>
          </div>
        </div>
      </div>

      <el-dialog title="" :visible.sync="dialogMonth">
        <el-form :model="dialogData" size="mini">
          <el-form-item label="现有菜谱" :label-width="'100px'">
            <el-select v-model="dialogData.month" placeholder="请选择添加菜谱">
              <el-option v-for="item in menusList" :key="item.mid" :label="item.mname" :value="item.mid" :disabled="checkHas(item.mid,'month')"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogMonth = false">取 消</el-button>
          <el-button type="primary" @click="subMonth">确 定</el-button>
        </div>
      </el-dialog>
    </module-item>


  </div>
</template>

<script>
    import moduleItem from '../main/indexModule'
    import menuItem from './menuItem'
    export default {
        name: "recipes",
        components:{
          moduleItem,
          menuItem
        },
        data(){
          return {
            menuWeek:[],
            menuMonth:[],
            dialogWeek:false,
            dialogMonth:false,
            menusList:[],
            dialogData:{
              week:"",
              month:""
            }
          }
        },
        methods:{
          jumpDetailedMenu(id){
            this.$router.push({path:"/detailMenu",query:{mid:id}});
          },
          checkHas(mid,mode){
              // if(mode=="week"){
              //   for(var item of this.menuWeek){
              //     console.log(item.mid);
              //     if(mid==item.mwid){
              //           return true;
              //         }
              //     }
              // }else{
              //   for(var item of this.menuMonth){
              //     if(mid==item.monid){
              //       return true;
              //     }
              //   }
              // }
            return false;
          },
          getMenusWeek(){
              this.$http.post("/menu/getMenusWeek").then(result=>{
                this.menuWeek = result.body.list;
              },err=>{
                console.log(err.message);
              })
          },
          getMenusMonth(){
            this.$http.post("/menu/getMenusMonth").then(result=>{
              this.menuMonth = result.body.list;
            },err=>{
              console.log(err.message);
            })
          },
          getMenus(){
            this.$http.get("/activity/geMenus").then(result=>{
              this.menusList = result.body.list;
            },err=>{
              console.log(err.message);
            });
          },
          openWeek(){
            this.dialogWeek = true;
            this.dialogData.week= "";
            this.getMenus();
          },
          openMonth(){
            this.dialogMonth = true;
            this.dialogData.month = "";
            this.getMenus();
          },
          subWeek(){
            if(this.dialogData.week=="") return;
            console.log(this.dialogData.week)
            this.$http.post("/menu/addMenusWeek",{mid:this.dialogData.week},{emulateJSON:true}).then(result=>{
                this.getMenusWeek();
                this.$message({
                  type:result.body.code==1?"success":"error",
                  message:"添加成功"
                });
              this.dialogWeek = false;
            },err=>{
              console.log(err.message);
            })
          },
          subMonth(){
            if(this.dialogData.month=="") return;
            this.$http.post("/menu/addMenusMonth",{mid:this.dialogData.month},{emulateJSON:true}).then(result=>{
                this.getMenusMonth();
                this.$emit("resetMenu");
                this.$message({
                  type:result.body.code==1?"success":"error",
                  message:"添加成功"
                });
              this.dialogMonth = false;
            },err=>{
              console.log(err.message);
            })
          }
        },
        mounted(){
          this.getMenusWeek();
          this.getMenusMonth();
        }
    }
</script>

<style scoped>
.menuItem-box{
  cursor: pointer;
}
.menu-add-title{
  height: 16px;
}
.menu-add-contain{
  padding-bottom: 126%;

}
.menu-plus{
  text-align: center;
  position: absolute;
  top:50%;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-top:-25.5px;
}
.menu-plus .glyphicon{
  font-size: 35px;
  color: #e5e8ef;
}
@media (min-width: 990px) and (max-width:1679px) {
  div.menu-add-contain{
    padding-bottom:136%;
  }
}

</style>
