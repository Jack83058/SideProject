import WebFont from 'webfontloader'

export default function() {
    WebFont.load({
        google: {
            families: ['Noto+Sans+TC:100,300,400,500,700,900&display=swap&subset=chinese-traditional']
        }
    })
}
