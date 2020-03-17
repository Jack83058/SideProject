<template>
    <el-row>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <Typography :type="'Title'" size="h1" color="#3a3a3a" wrap="span" text="圖片剪裁"> </Typography>
                </el-col>
            </el-row>
            <el-row class="flex-center">
                <el-col :span="24" class="flex-min-fit">
                    <div class="basic-circle">
                        <div class="block">
                            <el-avatar :size="136" :src="imageUrl"> </el-avatar>
                        </div>
                    </div>
                    <el-button
                        class="upload-avatar"
                        @click="$refs.file.click()"
                        type="primary"
                        size="mini"
                        icon="el-icon-camera-solid"
                        circle
                    ></el-button>
                    <input
                        ref="file"
                        type="file"
                        id="uploads"
                        :value="imgFile"
                        style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="uploadImg($event, 1)"
                    />
                    <ImageEditer
                        v-if="imageUrlForEdit.length > 0"
                        :imageUrlForEdit="imageUrlForEdit"
                        :fileType="fileType"
                        :error="errorHandler"
                        @edit-cancle="cancle"
                        @edit-update="update"
                    >
                    </ImageEditer>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<style scoped>
.basic-circle >>> img {
    width: 100%;
}
</style>
<style scoped lang="scss">
.upload-avatar {
    position: relative;
    left: 100px;
    top: -32px;
}
</style>
<script>
import ImageEditer from '@/components/Image/Editer'
import Typography from '@/layouts/Typography'
export default {
    components: {
        Typography,
        ImageEditer
    },
    data() {
        return {
            imgFile: '',
            imageUrlForEdit: '',
            fileName: '',
            fileType: '',
            imageUrl: ''
        }
    },
    mounted() {
        const self = this

        console.log(self)
    },
    methods: {
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = error => reject(error)
            })
        },
        uploadImg(e) {
            console.log('uploadImg')
            var _this = this
            // 上传图片
            var file = e.target.files[0]
            _this.fileName = file.name
            _this.fileType = file.type
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('圖片必須符合以下格式.gif,.jpeg,.jpg,.png')
                return false
            }
            _this.getBase64(file).then(data => {
                _this.imageUrlForEdit = data
            })
        },
        cancle() {
            this.imageUrlForEdit = ''
            return true
        },
        update(file) {
            var _this = this
            _this.getBase64(file).then(data => {
                _this.imageUrl = data
                _this.imageUrlForEdit = ''
            })
        },
        errorHandler() {}
    }
}
</script>
