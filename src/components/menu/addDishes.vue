<template>
    <div class="container-fluid  addDishes-box">
      <el-form :model="dishData" :rules="dishRules" ref="dishForm" label-width="90px" size="mini">
      <div class="row">
            <div class="h3 m-b-lg addDishes-item-title p-b-sm">菜式信息</div>
        </div>
        <div class="row addDishes-form">
            <div class="col-xs-7">
                <el-form-item label="菜式名" prop="mname">
                  <el-input v-model="dishData.mname"></el-input>
                </el-form-item>
                <el-form-item label="烹饪方式" prop="mmode">
                  <el-input v-model="dishData.mmode"></el-input>
                </el-form-item>
                <el-form-item label="烹饪时间" prop="mtime">
                    <el-input v-model="dishData.mtime" type="number" placeholder="单位/分钟"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="mlabel">
                  <el-input v-model="dishData.mlabel"></el-input>
                </el-form-item>
                <el-form-item label="效果" prop="meffect">
                  <el-input v-model="dishData.meffect"></el-input>
                </el-form-item>

                <el-form-item label="简介" prop="mintroduction">
                  <el-input type="textarea" v-model="dishData.mintroduction"></el-input>
                </el-form-item>

            </div>
            <div class="col-xs-5 p-0 uploadImg">
                <!--<div class="p-b-sm h4">展示图片</div>-->
                <el-upload v-if="!imgUrl" class="vw-12" drag action="/menu/uploadImg?index=0"
                           :on-success="successUploadMenus" :before-upload="beforeAvatarUpload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>菜谱展示图片</div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
                <div class="vh-12 vh-12" v-if="imgUrl">
                  <div class="uploadImg-show" @click="imgUrl=''">
                      <div :style="{'backgroundImage':'url(/static/images/menu/'+imgUrl+')'}"></div>
                      <div>
                          <span class="el-icon-delete"></span>
                      </div>
                  </div>
                </div>
            </div>
        </div>

        <div class="row p-t-md">
          <div class="h3 m-b-lg addDishes-item-title p-b-sm">制作步骤</div>
        </div>

      <div class="form-group form-group-sm row text-left">
          <el-form-item label="制作用料" prop="mmaterials" >
            <el-input v-model="dishData.mmaterials"></el-input>
          </el-form-item>
      </div>

      <div class="form-group form-group-sm row m-t-lg" v-for="item,index in dishData.step">
        <div class="recipes-title text-danger">
            步骤{{index+1}}
        </div>
        <el-form-item label="具体操作">
          <el-input type="textarea" v-model="item.sdetailed"></el-input>
        </el-form-item>

        <div class="col-xs-12">
          <el-upload :action="'/menu/uploadImg?index='+index" list-type="picture-card" :on-success="successUploadStep" :before-upload="beforeAvatarUpload"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="p-sm">
              添加示例图片
          </div>
        </div>
      </div>
      <div class="m-lg">
          <button type="button" class="btn btn-warning m-r-lg" @click="addStep">添加步骤</button>
          <button type="button" class="btn btn-success m-l-lg" @click="submit('dishForm')">确认添加</button>
      </div>
      </el-form>
    </div>

</template>

<script>
    export default {
        name: "add-dishes",
        data(){
          return {
            imgUrl:"",
            dialogImageUrl: '',
            dialogVisible: false,
            recipesCount:0,
            active:0,
            setDate:null,
            dishData: {
              mname: '',
              mmode: '',
              mtime: '',
              mlabel: '',
              meffect: '',
              mintroduction: '',
              mmaterials: '',
              step:[
                {
                  imgUrl:[],
                  sdetailed:""
                }
              ]
            },
            dishRules: {
              mname: [
                { required: true, message: '请输入菜式名', trigger: 'blur' }
              ],
              mmode: [
                { required: true, message: '请输入烹饪模式', trigger: 'blur' }
              ],
              mtime: [
                { required: true, message: '请输入烹饪事件', trigger: 'blur' }
              ],
              mlabel: [
                { required: true, message: '请输入标签', trigger: 'blur' },
                {min:1,max:6,message:"标签长度为1~6个字符",trigger: 'blur'}
              ],
              meffect: [
                { required: true, message: '请输入菜式效果', trigger: 'blur' }
              ],
              mintroduction: [
                { required: true, message: '请输入菜式简介', trigger: 'blur' }
              ],
              mmaterials: [
                { required: true, message: '请输入用料', trigger: 'blur' }
              ],
              sdetailed:[
                { required: true, message: '请输入详细步骤', trigger: 'blur' }
              ]
            }
          }
        },
        methods: {
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/pjpeg' || file.type === 'image/png' || file.type === 'image/x-png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传图片只能是 JPG 或者 NPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          successUploadStep(response,file, fileList){
              this.dishData.step[response.index].imgUrl.push(response.path);
          },
          successUploadMenus(response,file, fileList){
              this.imgUrl=response.path;
          },
          addStep(){
            this.dishData.step.push({
                imgUrl:[],
                sdetailed:""
            });
          },
          reset(formName){
            this.$refs[formName].resetFields();
          },
          submit(formName){
            this.$refs[formName].validate().then(()=>{
              if(this.imgUrl==''){
                this.$message({
                  type:"warning",
                  message:'请选菜谱图片'
                });
                return ;
              }
              this.$http.get("/user/getPower").then(result=>{
                if(result.body.position<4){
                  this.$http.post("/menu/addmenu",{
                    mname:this.dishData.mname,
                    mmode:this.dishData.mmode,
                    mtime:this.dishData.mtime,
                    mlabel:this.dishData.mlabel,
                    meffect:this.dishData.meffect,
                    mintroduction:this.dishData.mintroduction,
                    mmaterials:this.dishData.mmaterials,
                    pic_url:this.imgUrl,
                    step:JSON.stringify(this.dishData.step)
                  },{emulateJSON:true}).then(result=>{
                    if(result.body.code==1){
                      this.$message({
                        type:"success",
                        message:result.body.msg
                      });
                      this.$emit("resetData");
                      this.dishData.step=[{imgUrl:[], sdetailed:""}];
                      this.imgUrl = "";
                      this.reset('dishForm');
                    }else{
                      this.$message({
                        type:"error",
                        message:result.body.msg
                      });
                    }
                  },err=>{
                    console.log("网络连接错误");
                    this.$message({
                      type:"error",
                      message:"网络连接错误"
                    });
                  });
                }else{
                  this.$message({
                    type: 'error',
                    message: '您没有权限'
                  });
                }
              },err=>{
                console.log(err.message);
              });
            },()=>{
              this.$message({
                type:"warning",
                message:"请正确填写信息"
              });
            });
          }
        }
    }
</script>

<style scoped>
.addDishes-box label{
  font-weight: 500;
}
.accept{
  width:100%;
  height:70px;
  resize: none;
  border-color: #CCCCCC;
  border-radius: 3px;
}
input[type="file"] {
  display: none;
}
.addDishes-item-title{
  border-bottom: 3px solid #D31A1A;
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
.uploadImg{
  position: absolute;
  top:0px;
  bottom: 18px;
  right: 0px;
}
.addDishes-form{
  position: relative;
}
.uploadImg-show{
  width: 100%;
  height:100%;
  border-radius: 5px;
  border:1px solid #ececec;
  padding:15px;
}
.uploadImg-show div:first-child{
  width:100%;
  height:100%;
  border-radius: 3px;
  background-position: center;
  background-size: cover;
}
.uploadImg-show div:last-child{
  display: none;
  width: 100%;
  height:100%;
  border-radius: 3px;
  background: rgba(0,0,0,0.5);
  position: relative;
  z-index: 10;
  top:-100%;
  cursor: pointer;
}
.uploadImg-show div:last-child span{
  color: #ffffff;
  font-size: 60px;
  display: inline-block;
  position: relative;
  top:50%;
  margin-top:-60px;
}
.uploadImg-show:hover div:last-child{
  display: block;
}
</style>
