<template>
    <div class="imageEditer-container-page-container">
        <div class="imageEditer-container-page-img-warp">
            <img :src="currentEditImageUrl" class="filterImg" ref="filterImage" :style="filters" />
        </div>
        <el-row class="imageEditer-container-page-buttom-warp pt-2">
            <el-col :span="16">
                <el-row>
                    <el-col :span="24">
                        <el-row class="flex-v-center">
                            <el-col :span="4">
                                <label>亮度 </label>
                            </el-col>
                            <el-col :span="20">
                                <el-slider
                                    :min="0"
                                    :max="5"
                                    :step="0.1"
                                    v-model="filterFunctions.brightness"
                                ></el-slider>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row class="flex-v-center">
                            <el-col :span="4">
                                <label>對比度 </label>
                            </el-col>
                            <el-col :span="20">
                                <el-slider :min="0" :max="5" :step="0.1" v-model="filterFunctions.contrast"></el-slider>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24">
                        <el-row class="flex-v-center">
                            <el-col :span="4">
                                <label>濾鏡 </label>
                            </el-col>
                            <el-col :span="20">
                                <el-switch v-model="enableFilter" active-color="#13ce66" inactive-color="#ff4949">
                                </el-switch>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="4">
                <el-row>
                    <el-col :span="12">
                        <span class="imageEditer-container-page-buttom" @click="cancleFilterEdit">取消</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="imageEditer-container-page-buttom-confirm" @click="saveFilterEdit">完成</span>
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
        limitFileType: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            enableFilter: false,
            filterFunctions: {
                grayscale: 0,
                sepia: 0,
                saturate: 1,
                hueRotate: 0,
                invert: 0,
                brightness: 1,
                contrast: 1,
                blur: 0,
                opacity: 1
            },
            presets: {
                brannes: { name: 'Brannes', filterSet: { sepia: 0.5, contrast: 1.4 } },
                inkwell: {
                    name: 'Inkwell',
                    filterSet: { sepia: 0.3, contrast: 1.1, brightness: 1.1, grayscale: 1 }
                },
                lofi: { name: 'Lo-Fi', filterSet: { saturate: 1.1, contrast: 1.5 } },
                moon: { name: 'Moon', filterSet: { grayscale: 1, contrast: 1.1, brightness: 1.1 } },
                nashville: {
                    name: 'Nashville',
                    filterSet: { sepia: 0.2, contrast: 1.2, brightness: 1.05, saturate: 1.2 }
                },
                toaster: { name: 'Toaster', filterSet: { contrast: 1.5, brightness: 0.9 } },
                walden: {
                    name: 'Walden',
                    filterSet: { brightness: 1.1, hueRotate: '-10', sepia: 0.3, saturate: 1.6, contrast: 1.29 }
                },
                willow: { name: 'Willow', filterSet: { grayscale: 0.5, contrast: 0.95, brightness: 0.9 } },
                xpro2: { name: 'X-pro II', filterSet: { sepia: 0.3 } }
            }
        }
    },

    watch: {
        enableFilter(val) {
            if (val) {
                this.selectAndLoadPreset(this.presets.walden)
            } else {
                this.selectAndLoadPreset()
            }
        }
    },
    computed: {
        filters() {
            return this.makeFilter()
        }
    },
    methods: {
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
        // filter
        makeFilter(filterSet) {
            if (!filterSet) {
                filterSet = this.filterFunctions
            }
            var filterString = ''
            var defaultValues = this.defaultfilterFunctions()
            for (var filterFunc in filterSet) {
                if (filterSet[filterFunc] !== defaultValues[filterFunc]) {
                    if (filterFunc === 'hueRotate') {
                        filterString = filterString + 'hue-rotate(' + filterSet[filterFunc] + 'deg) '
                    } else if (filterFunc === 'blur') {
                        filterString = filterString + filterFunc + '(' + filterSet[filterFunc] + 'px) '
                    } else {
                        filterString = filterString + filterFunc + '(' + filterSet[filterFunc] + ') '
                    }
                }
            }
            return { filter: filterString }
        },

        selectAndLoadPreset(preset) {
            if (preset) {
                this.filterFunctions = preset.filterSet
            } else {
                this.filterFunctions = this.defaultfilterFunctions()
            }
        },
        defaultfilterFunctions() {
            return {
                grayscale: 0,
                sepia: 0,
                saturate: 1,
                hueRotate: 0,
                invert: 0,
                brightness: 1,
                contrast: 1,
                blur: 0,
                opacity: 1
            }
        },
        cancleFilterEdit() {
            const self = this
            self.selectAndLoadPreset()
            self.$emit('cancle-update-image')
        },
        saveFilterEdit() {
            const self = this

            var info = self.getImgSizeInfo(this.$refs.filterImage)
            var w = info.width
            var h = info.height
            const canvas = self.createHiDPICanvas(w, h)
            canvas.width = w
            canvas.height = h
            var ctx = canvas.getContext('2d')
            ctx.filter = this.filters.filter
            ctx.drawImage(this.$refs.filterImage, 0, 0, w, h)
            const tempUrl = canvas.toDataURL('image/jpeg', 1.0)

            self.$emit('update-image', tempUrl)
            self.selectAndLoadPreset()
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
