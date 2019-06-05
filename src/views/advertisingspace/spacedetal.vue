<template>
    <div class="app-container">
        <div class=" main-filters">
            <div class="nav-btns">
                <span> <i class="el-icon-plus" style="color:red;font-size:20px"></i> {{submit}}广告位 </span>
            </div>
            <el-form label-width="240px" class="filters">
                <el-row>
                    <el-col :md="18" :lg="18">
                        <el-form-item label="图片：">
                            <el-upload action="http://localhost:3001/api/multer/upload" :file-list="fileList" list-type="picture-card" :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :md="18" :lg="18">
                        <el-form-item label="名称：">
                            <el-input placeholder="请输入名称" v-model="addUpdateSapceDetal.spacename" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :md="8" :lg="10">
                        <el-form-item label="渠道:">
                            <el-select v-model="addUpdateSapceDetal.channel" placeholder="请选择">
                                <el-option v-for="item in channelList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :md="18" :lg="18">
                        <el-form-item label="链接：">
                            <el-radio-group v-model="addUpdateSapceDetal.linkType">
                                <el-radio label="1">内部链接</el-radio>
                                <el-radio label="2">外部链接</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :md="18" :lg="18">
                        <el-form-item label="是否启用：">
                            <el-radio-group v-model="addUpdateSapceDetal.status">
                                <el-radio label="1">启用</el-radio>
                                <el-radio label="2">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :md="18" :lg="18">
                        <el-form-item label="展示位置：">
                            <el-select v-model="addUpdateSapceDetal.position" placeholder="请选择展示位置">
                                <el-option v-for="item in Placement" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
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
                image: '',
                spacename: '',
                channel: '',
                linkType: '',
                position: '',
                status: '',
                postId: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            photoDate: {
                name: 'photoUpload'
            },
            fileList: [],
            channelList: [
                {
                    value: '1',
                    label: '纠结鸭'
                }, {
                    value: '2',
                    label: '塔罗占卜'
                },
            ],
            Placement: [
                {
                    value: '1',
                    label: '首页'
                }, {
                    value: '2',
                    label: '列表'
                }, {
                    value: '3',
                    label: '资讯'
                }, {
                    value: '4',
                    label: '个人中心'
                },
            ]

        };
    },

    components: {},
    created () {
        if (this.$route.params.key == 'edit') {
            this.searchuser(this.$route.params.id)
        } else {
            this.addUpdateSapceDetal = {}
        }
    },
    computed: {
        submit () {
            return this.$route.params.key == 'add' ? '新增' : '修改'
        },
        uploadHeaders () {
            return {
                Authorization: this.$store.state.id_token
            }
        }

    },
    mounted () {
    },


    methods: {
        adduser () {
            switch (this.$route.params.key) {
                case 'add':
                    this.$request.post('/api/advertisingSpacea/putspace', this.addUpdateSapceDetal).then(res => {
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
                    this.$request.post('/api/advertisingSpacea/editspace', this.addUpdateSapceDetal).then(res => {
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
        handleRemove (file, fileList) {
            fileList.splice(file, 1);
            this.addUpdateSapceDetal.image = ""
        },
        // 获取数据
        searchuser (userID) {
            let that = this
            this.$request.post('api/advertisingSpacea/gethspace', { id: userID }).then(res => {
                // this.addUpdateSapceDetal = res[0]
                console.log(res.result[0], "25");
                that.addUpdateSapceDetal.image = res.result[0].image,
                    that.addUpdateSapceDetal.spacename = res.result[0].spacename,
                    that.addUpdateSapceDetal.channel = res.result[0].channelName,
                    that.addUpdateSapceDetal.linkType = res.result[0].linkType,
                    that.addUpdateSapceDetal.position = res.result[0].position,
                    that.addUpdateSapceDetal.status = res.result[0].status
                that.addUpdateSapceDetal.postId = res.result[0].id
                that.addUpdateSapceDetal.image = res.result[0].image
                that.fileList.push({ name: res.result[0].image, url: 'http://193.112.58.152:3303/routes' + res.result[0].image })

            })
        },
        // 图片上传成功回调
        handleAvatarSuccess (res, file) {
            console.log(res, file);
            this.addUpdateSapceDetal.image = res.data.url
        },

        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

    },
}

</script>
<style lang='scss' scoped>
</style>