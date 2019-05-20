<template>
  <div class="app-container">
    <div class="query main-filters">
      <div class="nav-btns">
        <span>
          <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 用户列表
        </span>
      </div>
      <el-form label-width="120px" class="filters">
        <el-row>
          <el-col :md="12" :lg="8">
            <el-form-item label="渠道:">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="客户编号:">
              <el-input v-model="value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="注册账号：">
              <el-input v-model="value"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :md="12" :lg="8">
            <el-form-item label="注册时间:">
              <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="客户姓名:">
              <el-input v-model="value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8">
            <el-form-item label="客户状态:">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button>重置</el-button>
            <el-button>查询</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <!-- table -->
    <el-table stripe border :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="Date" prop="date">
      </el-table-column>
      <el-table-column label="Name" prop="name">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  name: '',
  props: [''],
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎ss',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      options: [{
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
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value: '',
      search: '',
    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='' scoped>
</style>