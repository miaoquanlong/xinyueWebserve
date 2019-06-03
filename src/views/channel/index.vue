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
                    <!-- <el-col :md="12" :lg="6">
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
                    </el-col> -->
                    <el-col :md="12" :lg="12">
                        <el-form-item label="应用名称:">
                            <el-input v-model="searchUserobject.keywords" clearable>
                                <template slot="append">
                                    <i class="el-icon-search" style="cursor: pointer;" @click="getusers"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :lg="1">
                        <el-button @click="restart">重置</el-button>
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
            <el-table-column label="渠道名称" prop="chnnelName" align="center">
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
        }
    },
    //   created () {
    //     console.log(933);

    //     this.getusers()
    //   },
    activated () {
        this.getusers()
    },

    watch: {}

}

</script>
<style lang='' scoped>
</style>