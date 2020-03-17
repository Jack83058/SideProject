<template>
    <div class="imageEditer-container-page-container">
        <div class="imageEditer-container-page-img-warp">
            <img :src="currentEditImageUrl" class="filterImg" ref="rotateImage" />
        </div>
        <el-row class="imageEditer-container-page-buttom-warp pt-2">
            <el-col :span="4">
                <el-row class="flex-v-center">
                    <el-col :span="12">
                        <div @click="transformFunctions.rotate -= 90"><i class="el-icon-refresh-left"></i>向左轉</div>
                    </el-col>
                    <el-col :span="12">
                        <div @click="transformFunctions.rotate += 90"><i class="el-icon-refresh-right"></i>向右轉</div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="10">
                <el-row>
                    <el-col :span="12">
                        <span class="imageEditer-container-page-buttom" @click="cancleRotateEdit">取消</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="imageEditer-container-page-buttom-confirm" @click="saveRotateEdit">完成</span>
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
            transformFunctions: {
                rotate: 0
            }
        }
    },

    watch: {
        // 旋轉
        transformFunctions: {
            handler(newtransformFunctions) {
                this.rotateCropper.rotate(newtransformFunctions.rotate)
            },
            deep: true
        },
        currentEditImageUrl: {
            handler() {
                if (!this.rotateCropper) {
                    this.rotateCropper = this.initCropper(this.$refs.rotateImage)
                } else {
                    this.rotateCropper.destroy()
                    this.rotateCropper = this.initCropper(this.$refs.rotateImage)
                }
            }
        }
    },
    mounted() {
        if (!this.rotateCropper) {
            this.rotateCropper = this.initCropper(this.$refs.rotateImage)
        } else {
            this.rotateCropper.destroy()
            this.rotateCropper = this.initCropper(this.$refs.rotateImage)
        }
    },
    computed: {
        transforms() {
            return this.makeTransform()
        }
    },
    methods: {
        cancleRotateEdit() {
            const self = this
            self.resetTransformFunctions()
            self.$emit('cancle-update-image')
        },
        saveRotateEdit() {
            const self = this
            const tempUrl = self.rotateCropper.getCroppedCanvas().toDataURL(self.exportFileType)
            self.resetTransformFunctions()
            self.$emit('update-image', tempUrl)
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
        resetTransformFunctions() {
            const self = this
            self.transformFunctions = self.defaultTransformFunctions()
        },
        defaultTransformFunctions() {
            return {
                rotate: 0
            }
        },
        makeTransform(transformSet) {
            if (!transformSet) {
                transformSet = this.transformFunctions
            }
            var transformString = ''
            var defaultValues = this.defaultTransformFunctions()
            for (var func in transformSet) {
                if (transformSet[func] !== defaultValues[func]) {
                    if (func === 'rotate') {
                        transformString = transformString + 'rotate(' + transformSet[func] + 'deg) '
                    } else {
                        transformString = transformString + transformSet + '(' + transformString[transformSet] + ') '
                    }
                }
            }

            return { transform: transformString }
        }
    }
}
</script>
