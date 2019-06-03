<template>
    <div class="app-container">
        <div class=" main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-plus" style="color:red;font-size:20px"></i> {{submit}}渠道 </span>
            </div>
            <el-form label-width="240px" class="filters">
                <el-row>
                    <el-col :md="18" :lg="18">
                        <el-form-item label="名称">
                            <el-input v-model="addUpdateSapceDetal.chnnelname" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button @click="adduser" type="primary" plain>{{submit}}</el-button>
                    <el-button @click="routerBack()" type="info" plain>关闭</el-button>
                </el-row>
            </el-form>
            <!-- <el-button @click="closepage">关闭</el-button> -->
        </div>
    </div>
</template>

<script>

export default {
    name: '',
    data () {
        return {
            addUpdateSapceDetal: {
                chnnelname: '',
                postId: ''
            },
        }
    },

    components: {},
    activated () {
        if (this.$route.params.key == 'edit') {
            this.searchuser(this.$route.params.id)
        } else {
            this.addUpdateSapceDetal = {}
        }

    },
    created () {
    },
    computed: {
        submit () {
            return this.$route.params.key == 'add' ? '新增' : '修改'
        }

    },


    methods: {
        adduser () {
            switch (this.$route.params.key) {
                case 'add':
                    this.$request.post('/api/chnnel/addchnnel', this.addUpdateSapceDetal).then(res => {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        })
                        this.routerBack()
                    })
                        .catch(err => {
                            this.$message({
                                message: err,
                                type: 'error'
                            })
                        })

                    break;
                case 'edit':
                    this.$request.post('/api/chnnel/editchnnel', this.addUpdateSapceDetal).then(res => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.routerBack()
                    })
                        .catch(err => {
                            this.$message({
                                message: err,
                                type: 'error'
                            })
                        })
                    break

                default:
                    break;
            }
        },
        // 获取数据
        searchuser (userID) {
            let that = this
            this.$request.post('api/chnnel/getchnnel', { id: userID }).then(res => {
                this.addUpdateSapceDetal.chnnelname = res.result[0].chnnelName
                this.addUpdateSapceDetal.postId = res.result[0].id
            })
        }
    },


}

</script>
<style lang='scss' scoped>
</style>