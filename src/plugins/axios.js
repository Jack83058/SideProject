import axios from 'axios'
import Vue from 'vue'

export default function() {
    Vue.use({
        install(Vue) {
            // here the plugin is initialized
            // then added to the prototype Vue under $plugin allias
            Vue.prototype.$axios = axios
        }
    })
}
