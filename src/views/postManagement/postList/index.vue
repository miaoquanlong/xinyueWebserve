s<template>
    <div class="app-container">
        <div class="query main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 帖子列表 </span>
            </div>
            <div class="nav-btns">
                <!-- <el-button plain type="primary" class="iconfont icon-add">新增</el-button> -->
                <el-button plain type="primary" class="iconfont icon-delete" @click="deletePost">删除</el-button>
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
                            </el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col>
                        <el-button @click="initsearch" type="primary" plain> <i class="el-icon-search" style="cursor: pointer;"></i>搜索</el-button>
                        <el-button @click="resolve" type="primary" plain> <i class="el-icon-refresh" style="cursor: pointer;"></i>重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- table -->
        <el-table stripe border :data="tableData" class="table" @select="tableselect">
            <el-table-column type="selection" width="55">
            </el-table-column>
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
                    <el-tag :type="scope.row.status == 1?'success':'warning'"> {{scope.row.status|status}}</el-tag>
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
                    <el-button size="mini" type="text" v-if="scope.row.status == 2" @click='putframe(scope.row.id,2)'>上架</el-button>
                    <el-button size="mini" type="text" v-if="scope.row.status == 1" @click='putframe(scope.row.id,1)'>下架</el-button>
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
            selection: [],
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
            this.selection = selection
            // TODO
            // 删除待定
        },
        // 删除
        deletePost () {
            if (this.selection.length > 0) {
                let arr = []
                this.selection.forEach(item => {
                    arr.push(`'${item.id}'`)
                });
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$request.post('/api/userpost/deletepost', { id: arr.join() }).then(res => {
                        this.getusers(res)
                    })
                        .catch(res => {
                            this.getusers(res)
                        })
                })
            } else {
                this.$message({
                    message: '尚未选择需要删除的额数据',
                    type: 'warning'
                })
            }
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