<template>
  <div class="app-container">
    <div class=" main-filters">
    <div class="nav-btns">
        <span> <i class="el-icon-plus" style="color:red;font-size:20px"></i> 新增用户 </span>
      </div>
       <el-form label-width="240px" class="filters">
         <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="姓名：">
              <el-input
                placeholder="请输入内容"
                v-model="userName"
                clearable>
              </el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="昵称：">
              <el-input
                placeholder="请输入昵称"
                v-model="nickname"
                clearable>
              </el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="手机号：">
              <el-input
                placeholder="请输入手机号"
                v-model="phoneNum"
                clearable>
              </el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="地址：">
              <el-input
                placeholder="请输入地址"
                v-model="address"
                clearable>
              </el-input>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row>
          <el-col :md="8" :lg="10">
            <el-form-item label="渠道:">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in channel" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
         </el-row>
         <el-row>
            <el-button @click="addUser" type="primary" plain>确定</el-button>
            <el-button @click="closepage" type="info" plain>关闭</el-button> 
         </el-row>
       </el-form>
    <!-- <el-button @click="closepage">关闭</el-button> -->
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      userName:'',
      nikename:'',
      phoneNum:'',
      address:'',
      channel:[
        {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }
      ]
    };
  },

  components: {},
  created(){
    
  },
  computed: {
   
  },

 
  methods: { 
    closepage () {
      const view = { 
        path: "/addusers"     
      }
      this.$store.dispatch('delView', view)
      this.$router.back()
    }
  },
 addUser(){

 }

}

</script>
<style lang='scss' scoped>
 
</style>