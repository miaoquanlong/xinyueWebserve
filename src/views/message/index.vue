s<template>
    <div class="app-container">
        <div class="query main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 广告位管理 </span>
            </div>
            <div class="nav-btns">
                <!-- <el-button plain type="primary" class="iconfont icon-add" @click="$router.push({name:'spacedetal',params:{key:'add',id:'1'}})">新增</el-button> -->
                <el-button plain type="primary" class="iconfont icon-delete" @click="deletemessage">删除</el-button>
            </div>
            <el-form label-width="120px" class="filters">
                <el-row>
                    <el-col :md="12" :lg="7">
                        <el-form-item label="渠道名称:">
                            <el-select v-model="searchSpace.channel" placeholder="请选择" clearable>
                                <el-option label="纠结鸭" value="1"></el-option>
                                <el-option label="塔罗占卜" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="8">
                        <el-form-item label="关键字:">
                            <el-input v-model="searchSpace.keywords" clearable placeholder="支持广告名称">
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
        <el-table stripe border :data="tableData" class="table" @select="tableselect" @select-all="tableselect">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="序号" type="index" width="50">
            </el-table-column>
            <el-table-column label="留言编号" prop="messageid" align="center">
            </el-table-column>
            <el-table-column label="客户编号" prop="userid" align="center">
            </el-table-column>
            <el-table-column label="渠道" align="center">
                <template slot-scope="scope">
                    {{scope.row.channel == '1' ?'纠结鸭':'塔罗占卜'}}
                </template>
            </el-table-column>
            <el-table-column label="内容" prop="content" align="center">
            </el-table-column>
            <el-table-column label="发布时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.submitTime|momentTime("YYYY-MM-DD HH:mm:ss")}}
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="deletemessage(scope.row.id)">删除</el-button>
                </template>
            </el-table-column> -->
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
                    value: '1',
                    label: '启用'
                }, {
                    value: '2',
                    label: '停用'
                }],
            StartTime: '',
            EndTime: '',
            currentPage4: 1,
            total: 0,
            selection: [],
            searchSpace: {
                channel: '',
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
                '1': "首页",
                '2': "列表",
                '3': "资讯",
                '4': "个人中心",
            };
            return statusMap[status];
        },
        linkType (status) {
            const statusMap = {
                '1': "内部链接",
                '2': "外部链接",
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
        getusers (res) {
            this.$request.post('/api/message/searchmessage', this.searchSpace).then(res => {
                console.log(res, "33");

                this.tableData = res.result
                this.total = res.count
            })
            if (res) {
                this.$message({
                    message: res,
                    type: 'success'
                })
            }

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
        // 勾选
        tableselect (selection, row) {
            console.log(selection, row);
            this.selection = selection
        },

        // 删除
        deletemessage () {
            let arr = []
            this.selection.forEach(item => {
                arr.push(`'${item.id}'`)
            });
            this.$request.post('/api/message/deletemessage', { id: arr.join() }).then(res => {
                this.getusers(res)
            })
        }
    },
    created () {
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