<template>
    <el-row>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <Typography :type="'Title'" size="h1" color="#3a3a3a" wrap="span" text="客製化影片撥放器">
                    </Typography>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="p-2">
                    <player
                        cover="ytimg/vi/03RKzQxEC5g/sddefault.jpg"
                        :width.sync="videoW"
                        :height.sync="videoH"
                        title="sample"
                        :playable="true"
                    >
                        <source src="@/assets/video/video.mp4" type="video/mp4" />
                        <track kind="subtitles" chapters metadata srclang="zh" :src="trackTW" default />
                    </player>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
// @ is an alias to /src
import player from '@/components/Video/Player'
import vtt from '!raw-loader!@/assets/track/tw.vtt'
import Typography from '@/layouts/Typography'
export default {
    components: {
        player,
        Typography
        // GoogleMap
    },
    data() {
        return {
            trackTW: URL.createObjectURL(new Blob([vtt], { type: 'text/vtt' })),
            videoW: '800px',
            videoH: '400px'
        }
    },
    props: {},
    methods: {},
    async mounted() {}
}
</script>
<style lang="scss"></style>
