<template>
    <fragment>
        <el-dialog
            title="圖片修正"
            class="image-editer-dialog"
            :visible="dialogVisible"
            :before-close="hideModal"
            append-to-body
            top="1%"
        >
            <div class="imageEditer-container">
                <div class="main imageEditer-container-page" v-show="showMain">
                    <div class="imageEditer-container-page-img-warp">
                        <img ref="img" :src="currentEditImageUrl" class="filterImg" />
                    </div>
                    <el-row>
                        <el-col :span="12" :offset="6">
                            <el-row class="imageEditer-container-page-buttom-warp pt-4">
                                <el-col :span="6">
                                    <div @click="showPage('rotate')"><i class="fas fa-undo"></i>旋轉</div>
                                </el-col>
                                <el-col :span="6">
                                    <div @click="showPage('corp')"><i class="fas fa-crop"></i>裁減</div>
                                </el-col>
                                <el-col :span="6">
                                    <div @click="showPage('filter')"><i class="fas fa-sun"></i>調整</div>
                                </el-col>
                                <el-col :span="6">
                                    <span class="imageEditer-container-page-buttom" @click="tiggerUpdate">
                                        儲存並替換
                                    </span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div class=" imageEditer-container-page" v-if="showRotate">
                    <RotateImage
                        :currentEditImageUrl="currentEditImageUrl"
                        @cancle-update-image="showPage('main')"
                        @update-image="updateImage"
                    ></RotateImage>
                </div>
                <div class=" imageEditer-container-page" v-if="showCorp">
                    <CorpImage
                        :currentEditImageUrl="currentEditImageUrl"
                        @cancle-update-image="showPage('main')"
                        @update-image="updateImage"
                    ></CorpImage>
                </div>
                <div class=" imageEditer-container-page" v-show="showFilter">
                    <FilterImage
                        :currentEditImageUrl="currentEditImageUrl"
                        @cancle-update-image="showPage('main')"
                        @update-image="updateImage"
                    ></FilterImage>
                </div>
            </div>
        </el-dialog>
    </fragment>
</template>
<style scoped lang="scss">
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
</style>
<style lang="scss">
.image-editer-dialog {
    .el-dialog {
        background: #2f2a2a;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: 0 !important;
        transform: translate(-50%, -50%);
        max-height: calc(100vh - 10px);
        max-width: calc(100% - 30px);
        display: flex;
        flex-direction: column;
    }
}
.imageEditer-container {
    height: 80vh;
    color: #fff;
}
.imageEditer-container-page {
    height: 100%;
}
</style>
<style scoped>
.imageEditer-container-page-img-warp >>> img {
    width: 100%;
}
</style>
<script>
import { Fragment } from 'vue-fragment'
import FilterImage from '@/components/Image/Filter'
import CorpImage from '@/components/Image/Copper'
import RotateImage from '@/components/Image/Rotater'
export default {
    components: {
        Fragment,
        FilterImage,
        CorpImage,
        RotateImage
    },
    props: {
        imageUrlForEdit: {
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
            currentPage: 'main',
            tempUrl: ''
        }
    },
    watch: {},
    computed: {
        showRotate() {
            return this.currentPage === 'rotate'
        },
        showFilter() {
            return this.currentPage === 'filter'
        },
        showCorp() {
            return this.currentPage === 'corp'
        },
        showMain() {
            return this.currentPage === 'main'
        },
        currentEditImageUrl() {
            const self = this
            return self.tempUrl.length > 0 ? self.tempUrl : self.imageUrlForEdit
        },
        dialogVisible() {
            const self = this
            return self.imageUrlForEdit.length > 0
        }
    },
    methods: {
        // modal controll
        vhTOpx(value) {
            var w = window
            var d = document
            var e = d.documentElement
            var g = d.getElementsByTagName('body')[0]
            var y = w.innerHeight || e.clientHeight || g.clientHeight

            var result = (y * value) / 100
            return result
        },
        vwTOpx(value) {
            var w = window
            var d = document
            var e = d.documentElement
            var g = d.getElementsByTagName('body')[0]
            var x = w.innerWidth || e.clientWidth || g.clientWidth

            var result = (x * value) / 100
            return result
        },
        hideModal() {
            const self = this
            self.showPage('main')
            self.tiggerCancle()
        },
        tiggerCancle() {
            this.$emit('edit-cancle')
        },
        tiggerUpdate() {
            const self = this
            const canvas = document.createElement('canvas')
            var info = self.getImgSizeInfo(self.$refs.img)
            var w = info.width
            var h = info.height
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d')
            ctx.drawImage(self.$refs.img, 0, 0, canvas.width, canvas.height)
            canvas.toBlob(function(blob) {
                self.$emit('edit-update', blob)
            })
        },
        // page controll
        updateImage(url) {
            const self = this
            self.tempUrl = url
            self.showPage('main')
        },
        showPage(page) {
            this.currentPage = page
        },
        // canvas
        createHiDPICanvas: function(w, h, ratio) {
            if (!ratio) {
                ratio = (function() {
                    var ctx = document.createElement('canvas').getContext('2d')
                    var dpr = window.devicePixelRatio || 1
                    var bsr =
                        ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio ||
                        1

                    return dpr / bsr
                })()
            }
            var can = document.createElement('canvas')
            can.width = w * ratio
            can.height = h * ratio
            can.style.width = w + 'px'
            can.style.height = h + 'px'
            can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
            return can
        },
        getRenderedSize(contains, cWidth, cHeight, width, height, pos) {
            var oRatio = width / height
            var cRatio = cWidth / cHeight
            // eslint-disable-next-line wrap-iife
            return function() {
                if (contains ? oRatio > cRatio : oRatio < cRatio) {
                    this.width = cWidth
                    this.height = cWidth / oRatio
                } else {
                    this.width = cHeight * oRatio
                    this.height = cHeight
                }
                this.left = (cWidth - this.width) * (pos / 100)
                this.right = this.width + this.left
                return this
            }.call({})
        },
        getImgSizeInfo(img) {
            const self = this
            var pos = window
                .getComputedStyle(img)
                .getPropertyValue('object-position')
                .split(' ')
            return self.getRenderedSize(
                true,
                img.width,
                img.height,
                img.naturalWidth,
                img.naturalHeight,
                parseInt(pos[0])
            )
        }
    }
}
</script>
