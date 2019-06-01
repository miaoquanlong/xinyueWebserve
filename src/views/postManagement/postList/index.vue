s<template>
  <div class="app-container">
    <div class="query main-filters">
      <div class="nav-btns">
        <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 帖子列表 </span>
      </div>
      <div class="nav-btns">
        <el-button plain type="primary" class="iconfont icon-add">新增</el-button>
        <el-button plain type="primary" class="iconfont icon-delete">删除</el-button>
      </div>
      <el-form label-width="120px" class="filters">
        <el-row>
          <el-col :md="12" :lg="8">
            <el-form-item label="帖子状态:">
              <el-select v-model="searchUserobject.status" placeholder="请选择" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="12" :lg="8">
            <el-form-item label="帖子编号">
              <el-input v-model="searchUserobject.postid" placeholder="" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :md="12" :lg="6">
            <el-form-item label="关键字:">
              <el-input v-model="searchUserobject.keywords" clearable placeholder="支持内容和帖子id编号搜索">
                <template slot="append">
                  <i class="el-icon-search" style="cursor: pointer" @click="initsearch"></i>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="1">
            <el-button @click="resolve">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- table -->
    <el-table stripe border :data="tableData" class="table">
      <el-table-column label="id" prop="id" align="center">
      </el-table-column>
      <el-table-column label="帖子编号" prop="postid" align="center">
      </el-table-column>
      <el-table-column label="帖子内容" prop="postcontent" align="center">
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgsrc" />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.status|status}}
        </template>
      </el-table-column>
      <el-table-column label="选项ID" prop="selectIid" align="center">
      </el-table-column>
      <el-table-column label="选项个数" align="center">
        <template slot-scope="scope">
          {{scope.row.selectnumber}} 个
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{scope.row.releasetime|momentTime("YYYY-MM-DD HH:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="$router.push({name:'editusers',params:{key:'edit',id:scope.row.id}})">上架</el-button>
          <el-button size="mini" type="text">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
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
          value: 1,
          label: '下架'
        }, {
          value: 2,
          label: '上架'
        }],
      StartTime: '',
      EndTime: '',
      currentPage4: 1,
      total: 0,
      searchUserobject: {
        status: '',
        postid: '',
        keywords: '',
        pageindex: 1,
        pagesize: 10,
      },

    };
  },

  filters: {
    status (status) {
      const statusMap = {
        1: "上架",
        2: "下架"
      };
      return statusMap[status];
    },
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
    //加载数据
    getusers () {
      this.$request.post('/api/userpost/searchpostlist', this.searchUserobject).then(res => {
        console.log(res, "纠结列表");
        this.tableData = res.result
        this.total = res.count
      })
    },
    //搜索
    initsearch () {
      this.getusers()
    },
    //   分页
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    // 重置
    resolve () {
      this.searchUserobject = {}
      this.getusers()
    }
  },


  activated () {
    this.getusers()
  },

  watch: {}

}

</script>
<style lang='scss' scoped>
.table img {
  width: 50%;
  border-radius: 10px;
}
</style>