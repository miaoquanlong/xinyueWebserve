s<template>
    <div class="app-container">
        <div class="query main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 用户列表 </span>
            </div>
            <div class="nav-btns">
                <!-- <el-button plain type="primary" class="iconfont icon-add" @click="$router.push({name:'addusers',params:{key:'add'}})">新增</el-button> -->
                <el-button plain type="primary" class="iconfont icon-delete" @click="deleteuser">删除</el-button>
            </div>
            <el-form label-width="120px" class="filters">
                <el-row>
                    <el-col :md="12" :lg="8">
                        <el-form-item label="注册时间:">
                            <date-select @ObtainDate="dateselects"></date-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="5">
                        <el-form-item label="渠道:">
                            <el-select v-model="searchUserobject.channel" placeholder="请选择" clearable>
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="5">
                        <el-form-item label="客户状态:">
                            <el-select v-model="searchUserobject.customerStatus" placeholder="请选择" clearable>
                                <el-option v-for="item in userstatusList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="6">
                        <el-form-item label="关键字:">
                            <el-input v-model="searchUserobject.keywords" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-button @click="getusers" type="primary" plain> <i class="el-icon-search" style="cursor: pointer;"></i>搜索</el-button>
                        <el-button @click="reload" type="primary" plain> <i class="el-icon-refresh" style="cursor: pointer;"></i>重置</el-button>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <!-- table -->
        <el-table stripe border :data="tableData" @select="tableSelect" @select-all="tableSelect">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column label="序号" type="index" align="center" width="50">
            </el-table-column>
            <el-table-column label="用户编号" prop="userid" align="center">
            </el-table-column>
            <el-table-column label="账号" prop="account" align="center">
            </el-table-column>
            <el-table-column label="注册手机号" prop="regestPhone" align="center">
            </el-table-column>
            <el-table-column label="姓名" prop="customerName" align="center">
            </el-table-column>
            <el-table-column label="客户状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.customerStatus == '1'?'已绑定':'未绑定'}}
                </template>
            </el-table-column>
            <el-table-column label="渠道" align="center">
                <template slot-scope="scope">
                    {{scope.row.channel|channel}}
                </template>
            </el-table-column>
            <el-table-column label="注册时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.regestTime|momentTime('YYYY-MM-DD HH:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="用户地址" prop="address" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" disabled>忘记密码</el-button>
                    <!-- <el-button size="mini" type="text">删除</el-button> -->
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
                    value: '1',
                    label: '运营后台'
                }, {
                    value: '2',
                    label: 'web端'
                },
                {
                    value: '3',
                    label: '小程序'
                },
                {
                    value: '4',
                    label: '其他'
                }],
            userstatusList: [
                {
                    value: '1',
                    label: '已绑定'
                },
                {
                    value: '2',
                    label: '未绑定'
                },
            ],

            value: '',
            search: '',
            value2: '',
            StartTime: '',
            EndTime: '',
            currentPage4: 1,
            total: 0,
            selection: [],
            searchUserobject: {
                id: '',
                customerStatus: '',
                keywords: '',
                channel: '',
            },
        };
    },

    components: { dateSelect },

    computed: {},

    beforeMount () { },

    mounted () { },
    filters: {
        channel (status) {
            const statusMap = {
                '1': "运营后台",
                '2': "web端",
                '3': "小程序",
                '4': "其他",
            };
            return statusMap[status];
        },
    },
    methods: {
        dateselects (start, end) {
            this.StartTime = start;
            this.EndTime = end;
        },
        getusers () {
            this.$request.post('/api/user/searchuser', this.searchUserobject).then(res => {
                this.tableData = res.result
                this.total = res.count
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
        },
        // 多选
        tableSelect (selection, row) {
            console.log(selection);

            this.selection = selection
        },
        handleSizeChange () {

        },
        handleCurrentChange () {

        },
        //重置
        reload () {
            this.searchUserobject = {}
            this.getusers()
        },
        // 多选删除
        deleteuser () {
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
                    this.$request.post('/api/user/deleteuser', { id: arr.join() }).then(res => {
                        this.getusers()
                        this.$message({
                            message: res,
                            type: 'success'
                        })
                    })
                        .catch(res => {
                            this.$message({
                                message: res,
                                type: 'error'
                            })

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
<style lang='' scoped>
</style>