// FontAwesome
// import 'normalize.css'
// import 'es6-promise/auto'
import fontawesome from '@fortawesome/fontawesome'
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(regular)
fontawesome.library.add(solid)
fontawesome.library.add(brands)

const requirePlugins = require.context('@/plugins', true, /\.js/)
// 找出所有plugins底下的js
requirePlugins
    .keys()
    .filter(fileName => fileName !== './index.js')
    .forEach(fileName => {
        // require 該 plugin
        const reqPlugin = requirePlugins(fileName)
        reqPlugin.default()

        console.log(reqPlugin)
    })
