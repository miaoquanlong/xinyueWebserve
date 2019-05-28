<template>
    <div class="app-container">
        <div class="query main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-sugar" style="color:red;font-size:20px"></i> 用户列表 </span>
            </div>
            <div class="nav-btns">
                <el-button plain type="primary" class="iconfont icon-add" @click="$router.push({name:'addusers'})">新增</el-button>
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
                            <el-select v-model="value" placeholder="请选择">
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
                    <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            tableData: [
                {
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

            value: '',
            search: '',
            value2: '',
            StartTime: '',
            EndTime: '',
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
            this.$request.get('/api/channel').then(res => {
                console.log(res);

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