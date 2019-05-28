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
              <el-input placeholder="请输入内容" v-model="addUserobject.username" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="昵称：">
              <el-input placeholder="请输入昵称" v-model="addUserobject.nikename" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="手机号：">
              <el-input placeholder="请输入手机号" v-model="addUserobject.phoneNum" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="18" :lg="18">
            <el-form-item label="地址：">
              <el-input placeholder="请输入地址" v-model="addUserobject.address" clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="8" :lg="10">
            <el-form-item label="渠道:">
              <el-select v-model="addUserobject.channel" placeholder="请选择">
                <el-option v-for="item in channelList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button @click="adduser" type="primary" plain>{{submit}}</el-button>
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
      addUserobject: {
        username: '',
        nikename: '',
        phoneNum: '',
        address: '',
        channel: '',
      },
      channelList: [
        {
          value: 1,
          label: '服务端'
        }, {
          value: 2,
          label: '小程序端'
        }, {
          value: 3,
          label: 'APP端'
        }, {
          value: 4,
          label: 'WEB端'
        }, {
          value: 5,
          label: '其他'
        }
      ]
    };
  },

  components: {},
  created () {
    console.log(this.$route.params.key);
    if (this.$route.params.key == 'edit') {
      this.searchuser(this.$route.params.id)
    }

  },
  computed: {
    submit () {
      return this.$route.params.key == 'add' ? '新增' : '修改'
    }

  },


  methods: {
    closepage () {
      const view = {
        path: "/addusers"
      }
      this.$store.dispatch('delView', view)
      this.$router.back()
    },
    adduser () {
      switch (this.$route.params.key) {
        case 'add':
          this.$request.post('/api/user/adduser', this.addUserobject).then(res => {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.$router.back()
          })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })

          break;
        case 'edit':
          this.$request.post('/api/user/updateuser', this.addUserobject).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.back()
          })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
          break

        default:
          break;
      }
    },
    // 获取数据
    searchuser (userID) {
      this.$request.post('api/user/searchuser', { id: userID }).then(res => {
        this.addUserobject = res[0]

      })
    }
  },


}

</script>
<style lang='scss' scoped>
</style>