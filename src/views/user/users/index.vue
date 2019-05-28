s<template>
  <div class="app-container">
    <div class="query main-filters">
      <div class="nav-btns">
        <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 用户列表 </span>
      </div>
      <div class="nav-btns">
        <el-button plain type="primary" class="iconfont icon-add" @click="$router.push({name:'addusers',params:{key:'add'}})">新增</el-button>
        <el-button plain type="primary" class="iconfont icon-delete">删除</el-button>
      </div>
      <el-form label-width="120px" class="filters">
        <el-row>
          <el-col :md="12" :lg="6">
            <el-form-item label="注册时间:">
              <date-select @ObtainDate="dateselects"></date-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="5">
            <el-form-item label="渠道:">
              <el-select v-model="searchUserobject.channel" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="5">
            <el-form-item label="客户状态:">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="6">
            <el-form-item label="关键字:">
              <el-input v-model="value" clearable>
                <template slot="append">
                  <i class="el-icon-search"></i>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="1">
            <el-button>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- table -->
    <el-table stripe border :data="tableData">
      <el-table-column label="id" prop="id" align="center">
      </el-table-column>
      <el-table-column label="姓名" prop="username" align="center">
      </el-table-column>
      <el-table-column label="昵称" prop="nikename" align="center">
      </el-table-column>
      <el-table-column label="电话" prop="phoneNum" align="center">
      </el-table-column>
      <el-table-column label="地址" prop="address" align="center">
      </el-table-column>
      <el-table-column label="渠道" prop="channel" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="$router.push({name:'addusers',params:{key:'edit',id:scope.row.id}})">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dateSelect from "@/components/DateSelection/index";

export default {
  name: '',
  props: [''],
  data () {
    return {
      tableData: [],
      options: [
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
        }],

      value: '',
      search: '',
      value2: '',
      StartTime: '',
      EndTime: '',
      searchUserobject: {
        id: '',
        userName: '',
        nikename: '',
        phoneNum: '',
        address: '',
        channel: '',
      },
    };
  },

  components: { dateSelect },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    dateselects (start, end) {
      this.StartTime = start;
      this.EndTime = end;
    },
    getusers () {
      this.$request.get('/api/user/getuser').then(res => {
        this.tableData = res
      })
    },
    // 删除用户
    handleDelete (row) {
      this.$request.post('/api/user/deleteusers', { id: row.id }).then(res => {
        this.$message({
          message: res,
          type: 'success'
        })
        this.getusers()
      })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    }
  },
  created () {
    this.getusers()
  },

  watch: {}

}

</script>
<style lang='' scoped>
</style>