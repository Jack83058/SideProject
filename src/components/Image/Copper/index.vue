<template>
    <div class="imageEditer-container-page-container">
        <div class="imageEditer-container-page-img-warp">
            <img :src="currentEditImageUrl" ref="cropperImage" />
        </div>
        <el-row class="imageEditer-container-page-buttom-warp pt-2">
            <el-col :span="8">
                <el-row class="flex-v-center">
                    <el-col :span="8">
                        <label>縮放 </label>
                    </el-col>
                    <el-col :span="16">
                        <el-slider v-model="corpFunctions.scale" :min="1" :max="10" :step="0.01"></el-slider>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="10">
                <el-row>
                    <el-col :span="12">
                        <span class="imageEditer-container-page-buttom" @click="cancleCorpEdit">取消</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="imageEditer-container-page-buttom-confirm" @click="saveCorpEdit">完成</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped lang="scss">
.flex-v-center {
    display: flex;
    align-items: center;
}
.filterImg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.imageEditer-container-page-img-warp {
    height: 75%;
    max-width: 100%;
    overflow: hidden;
}
.imageEditer-container-page-buttom-warp {
    display: flex;
    align-items: center;
    height: 25%;
}

.imageEditer-container-page-buttom-confirm {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    background: #fff;
    color: #494242;
    border-color: #909399;
}
.imageEditer-container-page-buttom {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #494242;
    border-color: #909399;
}
.imageEditer-container-page-container {
    height: 100%;
}
</style>
<style lang="scss"></style>
<style scoped>
.imageEditer-container-page-img-warp >>> img {
    width: 100%;
}
</style>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
export default {
    components: {},
    props: {
        currentEditImageUrl: {
            type: String,
            default: ''
        },
        exportFileType: {
            type: String,
            default: 'image/jpeg'
        }
    },
    data() {
        return {
            corpFunctions: { scale: 1 }
        }
    },

    watch: {
        // 放大縮小
        corpFunctions: {
            handler(newCorp) {
                var zoomValue = parseFloat(newCorp.scale)
                this.cropper.scale(zoomValue.toFixed(3))
            },
            deep: true
        },
        currentEditImageUrl: {
            handler() {
                if (!this.cropper) {
                    this.cropper = this.initCropper(this.$refs.cropperImage)
                } else {
                    this.cropper.destroy()
                    this.cropper = this.initCropper(this.$refs.cropperImage)
                }
            }
        }
    },
    mounted() {
        if (!this.cropper) {
            this.cropper = this.initCropper(this.$refs.cropperImage)
        } else {
            this.cropper.destroy()
            this.cropper = this.initCropper(this.$refs.cropperImage)
        }
    },
    computed: {},
    methods: {
        saveCorpEdit() {
            const self = this
            const tempUrl = self.cropper.getCroppedCanvas().toDataURL('image/jpeg')
            self.resetCorpFunctions()
            self.$emit('update-image', tempUrl)
        },
        cancleCorpEdit() {
            const self = this
            self.resetCorpFunctions()
            self.$emit('cancle-update-image')
        },
        // initCropper
        initCropper(img) {
            return new Cropper(img, {
                viewMode: 3,
                dragMode: 'move',
                center: true,
                autoCrop: true,
                cropBoxMovable: false,
                cropBoxResizable: false,
                autoCropArea: 1,
                strict: true,
                background: true,
                dragCrop: false
            })
        },
        resetCorpFunctions() {
            const self = this
            self.corpFunctions = self.defaultCorpFunctions()
        },
        defaultCorpFunctions() {
            return {
                scale: 1
            }
        }
    }
}
</script>
