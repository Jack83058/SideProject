<template>
    <div ref="container" class="force-player-container" @fullscreenchange="onFullscreenChange">
        <img v-if="initial" class="force-player-container-cover" :src="cover" />
        <div v-if="initial" class="force-player-playbtn" @click="startPlay">
            <i class="fas fa-play"></i>
        </div>
        <div class="video-container">
            <video ref="video" :style="{ height: height, width: width }">
                <slot></slot>
            </video>
        </div>
        <!-- <transition name="slide-down-fade">
            <div v-show="showToolbox" class="force-player-title">{{ title }}</div>
        </transition> -->
        <transition name="slide-up-fade">
            <div
                v-show="showToolbox"
                style="
    position: absolute;
    width: 100%;
    bottom: 30px;"
            >
                <Track
                    :progress="progress"
                    @progressChanging="changeCurrentTime"
                    @progressChanged="changeCurrentTime"
                />
            </div>
        </transition>
        <el-row class="force-player-toolbox" :class="{ fullscreen: isFullscreen }">
            <el-col :span="14">
                <el-row style="max-width:30vw">
                    <el-col :span="8">
                        <el-row>
                            <el-col :span="8">
                                <span @click="backward">
                                    <i class="fas fa-backward force-player-control-btn"></i>
                                </span>
                            </el-col>
                            <el-col :span="8">
                                <span v-show="!playing" @click="changePlayState">
                                    <i class="fas fa-play force-player-control-btn"></i>
                                </span>
                                <span v-show="playing" @click="changePlayState">
                                    <i class="fas fa-pause force-player-control-btn"></i>
                                </span>
                            </el-col>
                            <el-col :span="8">
                                <span @click="forword">
                                    <i class="fas fa-forward force-player-control-btn"></i>
                                </span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="16">
                        <span class="force-player-progress-display">
                            {{ displayTime(currentTime) }} / {{ displayTime(duration) }}
                        </span>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="10" style="text-align: center;">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <div @mouseenter="toggleVolumnbox" @mouseleave="toggleVolumnbox">
                            <el-row :gutter="10">
                                <el-col :span="3" :offset="showVolumnbox ? 0 : 15" class="showOnHover">
                                    <span v-show="!isMute" @click="mute">
                                        <i class="fas fa-volume-up force-player-control-btn"></i>
                                    </span>
                                    <span v-show="isMute" @click="unMute">
                                        <i class=" fas fa-volume-off force-player-control-btn"></i>
                                    </span>
                                </el-col>
                                <el-col :span="15" :class="{ showOnHover: true, hide: !showVolumnbox }">
                                    <Track
                                        style="top: 5px;"
                                        :progress="volume"
                                        @progressChanging="changeVolumn"
                                        @progressChanged="changeVolumn"
                                    />
                                </el-col>
                                <el-col :span="3">
                                    <span @click="playbackRateVisible = !playbackRateVisible">
                                        <i class="fas fa-cog force-player-control-btn"></i>
                                    </span>

                                    <div
                                        class="playbackRate-container"
                                        v-show="playbackRateVisible"
                                        @mouseleave="playbackRateVisible = false"
                                    >
                                        <div
                                            class="playbackRate-menuitem"
                                            v-for="(rate, index) in playbackRateList"
                                            :key="index"
                                            @click="changePlaybackRate(rate)"
                                        >
                                            <div
                                                class="playbackRate-menuitem-label"
                                                :style="{ paddingLeft: playbackRate === rate ? '15px' : '35px' }"
                                            >
                                                <span v-if="playbackRate === rate">
                                                    <i class="fas fa-check" style="padding-right: 5px;"></i>
                                                </span>
                                                {{ rate }}
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="3">
                                    <span v-show="!isFullscreen" @click="fullscreen">
                                        <i class="fas fa-expand force-player-fullscreen-btn"></i>
                                    </span>
                                    <span v-show="isFullscreen" @click="cancelFullscreen">
                                        <i class="fas fa-compress force-player-fullscreen-btn"></i>
                                    </span>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Track from '@/components/Video/Track'
export default {
    components: {
        Track
    },
    props: {
        width: {
            type: String,
            default: '600px'
        },
        height: {
            type: String,
            default: '400px'
        },
        cover: {
            type: String
        },
        title: {
            type: String
        },
        playable: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            initial: true,
            isFullscreen: false,
            showToolbox: true,
            playbackRateVisible: false,
            volume: 100,
            progress: 0,
            playing: false,
            isMute: false,
            duration: 0,
            currentTime: 0,
            lastVolumn: 0,
            lastWidth: 0,
            lastHeight: 0,
            showVolumnbox: false,
            playbackRate: 1,
            playbackRateList: [0.5, 1, 2]
        }
    },
    methods: {
        forword() {
            this.changeCurrentTime(this.progress + 10)
        },
        backward() {
            this.changeCurrentTime(this.progress - 10)
        },
        mute() {
            this.lastVolumn = this.volume
            this.changeVolumn(0)
            this.isMute = true
        },
        unMute() {
            this.changeVolumn(this.lastVolumn)
            this.isMute = false
        },
        startPlay() {
            this.initial = false
            this.$refs.video.play()
        },
        changePlayState() {
            if (this.playing) {
                this.$refs.video.pause()
            } else {
                this.$refs.video.play()
            }
        },
        toggleToolbox() {
            if (!this.initial) {
                this.showToolbox = !this.showToolbox
            }
        },
        toggleVolumnbox() {
            this.showVolumnbox = !this.showVolumnbox
        },

        changeVolumn(volume) {
            this.volume = volume
        },
        fullscreen() {
            this.isFullscreen = true
            this.lastWidth = this.width
            this.lastHeight = this.height
            this.$refs.container.requestFullscreen()
            this.$emit('update:width', '100vw')
            this.$emit('update:height', 'calc(100vh - 30px)')
        },
        displayTime(time) {
            const minute = parseInt(time / 60)
            const second = parseInt(time % 60)
            return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
        },
        changeCurrentTime(progress) {
            this.progress = progress
            this.currentTime = (progress / 100) * this.duration
            this.$refs.video.currentTime = this.currentTime
        },
        changePlaybackRate(rate) {
            this.playbackRate = rate
            this.$refs.video.playbackRate = this.playbackRate
            this.playbackRateVisible = false
        },
        updateDuration(e) {
            this.duration = e.target.duration
        },
        updateTime(e) {
            this.currentTime = e.target.currentTime
            if (this.duration !== 0) {
                this.progress = (e.target.currentTime / this.duration) * 100
            } else {
                this.updateDuration(e)
                this.duration = e.target.duration
                this.progress = (e.target.currentTime / this.duration) * 100
            }
        },
        updatePlaying() {
            this.playing = true
        },
        updatePause() {
            this.playing = false
        },
        updateEnded() {
            this.playing = false
        },
        registerEvent() {
            const self = this
            self.$nextTick(() => {
                try {
                    self.$refs.video.addEventListener('durationchange', self.updateDuration)
                    self.$refs.video.addEventListener('timeupdate', self.updateTime)
                    self.$refs.video.addEventListener('playing', self.updatePlaying)
                    self.$refs.video.addEventListener('pause', self.updatePause)
                    self.$refs.video.addEventListener('ended', self.updateEnded)
                } catch (error) {
                    debugger
                }
            })
        },
        destroyEvent() {
            const self = this
            try {
                self.$refs.video.removeEventListener('durationchange', self.updateDuration)
                self.$refs.video.removeEventListener('timeupdate', self.updateTime)
                self.$refs.video.removeEventListener('playing', self.updatePlaying)
                self.$refs.video.removeEventListener('pause', self.updatePause)
                self.$refs.video.removeEventListener('ended', self.updateEnded)
            } catch (error) {
                console.log(error)
            }
        },
        onFullscreenChange() {
            if (!document.fullscreenElement) {
                this.isFullscreen = false
                this.$emit('update:width', this.lastWidth)
                this.$emit('update:height', this.lastHeight)
            }
        },
        cancelFullscreen() {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }
    },
    watch: {
        volume: function() {
            this.$refs.video.volume = this.volume / 100
        },
        playable: {
            handler(newVal) {
                const self = this
                if (newVal) {
                    self.registerEvent()
                } else {
                    self.destroyEvent()
                }
            },
            immediate: true
        }
    },
    mounted: function() {
        // this.registerEvent()
        // self.$nextTick(() => {
        // })
    }
}
</script>
<style>
.noBackground {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
}
.noBackground .popper__arrow {
    display: none !important;
}
video::-webkit-media-controls-enclosure {
    display: none !important;
}
</style>
<style scoped>
.fullscreen {
    z-index: 2147483647;
    position: absolute;
    width: 100vw;
}
.playbackRate-container {
    background: rgba(28, 28, 28, 0.9);
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    width: 125px;
    height: 125px;
    transition: opacity 0.1s cubic-bezier(0, 0, 0.2, 1);
    padding: 6px 0;
    display: table;
    color: #eee;
    box-sizing: border-box;
    position: absolute;
    right: 0px;
    bottom: 40px;
}
.playbackRate-menuitem {
    display: table-row;
    cursor: default;
    outline: none;
    height: 33px;
    text-align: left;
}
.playbackRate-menuitem .playbackRate-menuitem-label {
    padding-left: 35px;
    padding-right: 20px;
    border-bottom: none;
}
.playbackRate-menuitem-label {
    font-size: 118%;
    font-weight: 500;
}

.playbackRate-menuitem-label {
    display: table-cell;
    vertical-align: middle;
    padding: 0 15px;
}
video {
    object-fit: unset;
}
.hide {
    width: 0px !important;
    transition: all 0.5s linear;
    padding-left: 0px !important;
    padding-right: 0px !important;
    visibility: hidden;
}
.showOnHover {
    transition: all 0.5s linear;
}
.video-container {
    background-color: black;
}
.force-player-container {
    position: relative;
    display: inline-block;
    overflow: hidden;
}
.force-player-container-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4000;
}
.force-player-playbtn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: rgb(37, 37, 175);
    font-size: 40px;
    /* border-radius: 50%;
    border: 1px solid rgb(37, 37, 175); */
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    z-index: 5000;
}
.force-player-playbtn:hover {
    cursor: pointer;
    color: rgb(175, 37, 152);
    /* background: black; */
}
.force-player-toolbox {
    background: black;
    height: 30px;
    display: flex;
    padding: 10px;
    align-items: center;
    color: #ffffff;
}
.force-player-title {
    background: black;
    position: absolute;
    height: 30px;
    top: 0;
    left: 0;
    right: 0;
    line-height: 30px;
    text-align: center;
}
.slide-down-fade-enter-active {
    transition: all 0.3s linear;
}
.slide-down-fade-leave-active {
    transition: all 0.3s linear;
}
.slide-down-fade-enter,
.slide-down-fade-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
.slide-up-fade-enter-active {
    transition: all 0.3s linear;
}
.slide-up-fade-leave-active {
    transition: all 0.3s linear;
}
.slide-up-fade-enter,
.slide-up-fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
.force-player-play-btn {
    background: none;
    outline: none;
    border: none;
    box-sizing: border-box;
    width: 24px;
    font-size: 20px;
    color: #ffffff;
}
.force-player-play-btn:hover {
    cursor: pointer;
}
.force-player-control-btn {
    background: none;
    outline: none;
    border: none;
    box-sizing: border-box;
    width: 20px;
    font-size: 18px;
    color: #ffffff;
}
.force-player-fullscreen-btn {
    background: none;
    outline: none;
    border: none;
    box-sizing: border-box;
    width: 20px;
    font-size: 18px;
    color: #ffffff;
}
.force-player-fullscreen-btn:hover {
    cursor: pointer;
}
.force-player-progress-display {
    font-size: 14px;
}
</style>
