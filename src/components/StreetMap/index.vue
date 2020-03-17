<template>
    <div class="home row no-gutters">
        <el-row>
            <el-col :span="6">
                <div v-if="cityName.length" class="toolbox">
                    <el-row>
                        <el-col :span="24">
                            <div class="toolbox-top">
                                <el-row class="flex-center p-1" :gutter="10">
                                    <el-col :span="6"><label class="">縣市</label></el-col>
                                    <el-col :span="18">
                                        <el-select
                                            v-model="select.city"
                                            @change="select.area = ''"
                                            placeholder="請選擇"
                                        >
                                            <el-option
                                                v-for="c in cityName"
                                                :value="c.CityName"
                                                :key="c.CityName"
                                                :label="c.CityName"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <el-row class="flex-center p-1" :gutter="10">
                                    <el-col :span="6"><label class="">地區</label></el-col>
                                    <el-col :span="18">
                                        <el-select
                                            v-if="select.city.length"
                                            v-model="select.area"
                                            @change="updateSelect"
                                            placeholder="請選擇"
                                        >
                                            <el-option
                                                :value="a.AreaName"
                                                v-for="a in cityName.find(city => city.CityName === select.city)
                                                    .AreaList"
                                                :key="a.AreaName"
                                                :label="a.AreaName"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="marker-list-item">
                        <el-col :span="24">
                            <el-card
                                v-for="(item, key) in filterdata"
                                shadow="hover"
                                :key="key"
                                class="text-left"
                                :class="{ highlight: item.properties.mask_adult || item.properties.mask_child }"
                                @click="penTo(item)"
                            >
                                <h3>{{ item.properties.name }}</h3>
                                <p class="mb-0">
                                    成人口罩：{{ item.properties.mask_adult }} | 兒童口罩：{{
                                        item.properties.mask_child
                                    }}
                                </p>
                                <p class="mb-0">
                                    地址：<a target="_blank" title="Google Map"> {{ item.properties.address }}</a>
                                </p>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="18">
                <div ref="map" style="height:100vh;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import cityName from '@/assets/json/cityName.json'
let osmMap = {}
const iconsConfig = {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
}
const icons = {
    green: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        ...iconsConfig
    }),
    grey: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
        ...iconsConfig
    })
}
const osm = {
    addMapMarker(x, y, item) {
        const icon = item.mask_adult || item.mask_child ? icons.green : icons.grey
        L.marker([y, x], {
            icon
        }).addTo(osmMap).bindPopup(`<strong>${item.name}</strong> <br>
    口罩剩餘：<strong>成人 - ${item.mask_adult ? `${item.mask_adult} 個` : '未取得資料'}/ 兒童 - ${
            item.mask_child ? `${item.mask_child} 個` : '未取得資料'
        }</strong><br>
    地址: <a href="https://www.google.com.tw/maps/place/${item.address}" target="_blank">${item.address}</a><br>
    電話: ${item.phone}<br>
    <small>最後更新時間: ${item.updated}</small>`)
    },
    removeMapMarker() {
        osmMap.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                osmMap.removeLayer(layer)
            }
        })
    },
    penTo(x, y, item) {
        const icon = item.mask_adult || item.mask_child ? icons.green : icons.grey
        osmMap.panTo(new L.LatLng(y, x))
        L.marker([y, x], {
            icon
        })
            .addTo(osmMap)
            .bindPopup(
                `<strong>${item.name}</strong> <br>
    口罩剩餘：<strong>成人 - ${item.mask_adult ? `${item.mask_adult} 個` : '未取得資料'}/ 兒童 - ${
                    item.mask_child ? `${item.mask_child} 個` : '未取得資料'
                }</strong><br>
    地址: <a href="https://www.google.com.tw/maps/place/${item.address}" target="_blank">${item.address}</a><br>
    電話: ${item.phone}<br>
    <small>最後更新時間: ${item.updated}</small>`
            )
            .openPopup()
    }
}
export default {
    data: () => ({
        cityName,
        data: [],
        osmMap: {},
        select: {
            city: '臺北市',
            area: '大安區'
        }
    }),
    computed: {
        filterdata() {
            return this.data
                ? this.data.filter(pharmacy => {
                      if (!this.select.area) {
                          return pharmacy.properties.county === this.select.city
                      }
                      return pharmacy.properties.town === this.select.area
                  })
                : []
        }
    },
    methods: {
        updateMarker() {
            const pharmacies = this.filterdata
            pharmacies.forEach(pharmacy => {
                const { properties, geometry } = pharmacy
                osm.addMapMarker(geometry.coordinates[0], geometry.coordinates[1], properties)
            })
            this.penTo(pharmacies[0])
        },
        removeMarker() {
            osm.removeMapMarker()
        },
        penTo(pharmacy) {
            const { properties, geometry } = pharmacy
            osm.penTo(geometry.coordinates[0], geometry.coordinates[1], properties)
        },
        updateSelect() {
            this.removeMarker()
            this.updateMarker()
            const pharmacy = this.data.find(item => item.properties.town === this.select.area)
            const { geometry, properties } = pharmacy
            osm.penTo(geometry.coordinates[0], geometry.coordinates[1], properties)
        }
    },
    mounted() {
        // OSM
        osmMap = L.map(this.$refs.map, {
            center: [25.03, 121.55],
            preferCanvas: true,
            zoom: 15
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
            maxZoom: 18
        }).addTo(osmMap)

        this.$axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json').then(res => {
            this.data = res.data.features

            this.updateMarker()
        })
    }
}
</script>

<style lang="scss">
.highlight {
    background: #e9ffe3;
}
.flex-center {
    display: flex;
    align-items: center;
}
.marker-list-item {
    overflow-y: auto;
    height: inherit;
}
.toolbox {
    height: 100vh;
    a {
        cursor: pointer;
    }
    .toolbox-top {
        border-bottom: 1px solid #ececec;
    }
}
</style>
