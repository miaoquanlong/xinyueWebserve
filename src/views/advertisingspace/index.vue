s<template>
    <div class="app-container">
        <div class="query main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 广告位管理 </span>
            </div>
            <div class="nav-btns">
                <el-button plain type="primary" class="iconfont icon-add">新增</el-button>
                <el-button plain type="primary" class="iconfont icon-delete">删除</el-button>
            </div>
            <el-form label-width="120px" class="filters">
                <el-row>
                    <el-col :md="12" :lg="10">
                        <el-form-item label="渠道名称:">
                            <el-input v-model="searchSpace.keywords" clearable placeholder="支持内容和帖子id编号搜索">
                                <template slot="append">
                                    <i class="el-icon-search" style="cursor: pointer" @click="initsearch"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="12">
                        <el-form-item label="状态:">
                            <el-select v-model="searchSpace.status" placeholder="请选择" clearable>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :md="12" :lg="1">
                        <el-button @click="resolve">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- table -->
        <el-table stripe border :data="tableData" class="table" @select="tableselect">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="序号" prop="id" align="center">
            </el-table-column>
            <el-table-column label="图片" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.image" />
                </template>
            </el-table-column>
            <el-table-column label="渠道名称" align="center">
                <template slot-scope="scope">
                    {{scope.row.channelName == 1 ?'纠结鸭':'塔罗占卜'}}
                </template>
            </el-table-column>
            <el-table-column label="位置" align="center">
                <template slot-scope="scope">
                    {{scope.row.position|position}}
                </template>
            </el-table-column>

            <el-table-column label="链接类型" align="center">
                <template slot-scope="scope">
                    {{scope.row.linkType|linkType}}
                </template>
            </el-table-column>
            <el-table-column label="链接" prop="link" align="center">
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status=='1'?'已启用':'已停用'}}
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="selectIid" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" v-if="scope.row.status == 2" @click='putframe(scope.row.id,2)'>上移</el-button>
                    <el-button size="mini" type="text" v-if="scope.row.status == 1" @click='putframe(scope.row.id,1)'>下移动</el-button>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime|momentTime("YYYY-MM-DD HH:mm:ss")}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" v-if="scope.row.status == 2" @click='putframe(scope.row.id,2)'>启用</el-button>
                    <el-button size="mini" type="text" v-if="scope.row.status == 1" @click='putframe(scope.row.id,1)'>编辑</el-button>
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
                    label: '启用'
                }, {
                    value: 2,
                    label: '停用'
                }],
            StartTime: '',
            EndTime: '',
            currentPage4: 1,
            total: 0,
            searchSpace: {
                status: '',
                postid: '',
                keywords: '',
                pageindex: 1,
                pagesize: 10,
            },

        };
    },

    filters: {
        position (status) {
            const statusMap = {
                1: "首页",
                2: "列表",
                2: "资讯",
                2: "个人中心",
            };
            return statusMap[status];
        },
        linkType (status) {
            const statusMap = {
                1: "内部链接",
                2: "外部链接",
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
            this.$request.post('/api/advertisingSpacea/searchspace', this.searchSpace).then(res => {
                console.log(res, "2626");
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
            this.searchSpace = {}
            this.getusers()
        },
        // 上下架
        putframe (id, status) {
            this.$request.post('/api/userpost/putframe', { id: id, status: status }).then(res => {
                this.getusers()
                this.$message({
                    message: res,
                    type: 'success'
                })
            })
        },
        // 勾选
        tableselect (selection, row) {
            console.log(selection, row);
            // TODO
            // 删除待定
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