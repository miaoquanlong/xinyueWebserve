s<template>
    <div class="app-container">
        <div class="query main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 渠道列表 </span>
            </div>
            <div class="nav-btns">
                <el-button plain type="primary" class="iconfont icon-add" @click="$router.push({name:'chnneldetail',params:{key:'add',id:'1'}})">新增</el-button>
                <el-button plain type="primary" class="iconfont icon-delete">删除</el-button>
            </div>
            <el-form label-width="120px" class="filters">
                <el-row>
                    <el-col :md="12" :lg="12">
                        <el-form-item label="应用名称:">
                            <el-input v-model="searchUserobject.keywords" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col>
                        <el-button @click="getusers" type="primary" plain> <i class="el-icon-search" style="cursor: pointer;"></i>搜索</el-button>
                        <el-button @click="restart" type="primary" plain> <i class="el-icon-refresh" style="cursor: pointer;"></i>重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- table -->
        <el-table stripe border :data="tableData">
            <el-table-column label="序号" type="index" width="55" align="center">
            </el-table-column>
            <el-table-column label="id" prop="id" align="center">
            </el-table-column>
            <el-table-column label="渠道编号" prop="chnnelNumbering" align="center">
            </el-table-column>
            <el-table-column label="渠道名称" prop="" align="center">
                <template slot-scope="scope">
                    <el-tag type="success"> {{scope.row.chnnelName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="$router.push({name:'chnneldetail',params:{key:'edit',id:scope.row.id}})">编辑</el-button>
                    <el-button size="mini" type="text" @click="deletechnnel(scope.row.id)">删除</el-button>
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
                keywords: '',
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
            this.$request.post('/api/chnnel/searchnnel', this.searchUserobject).then(res => {
                this.tableData = res.result
            })
        },
        // 重置
        restart () {
            this.searchUserobject = {}
            this.getusers()
        },
        // 删除用户
        deletechnnel (id) {
            this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$request.post('/api/chnnel/deletechnnel', { id: id }).then(res => {
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