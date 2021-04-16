export default function MapUILoader(key) {
    const map = new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            let script = document.createElement('script')
            script.type = 'text/javascript'
            // script.async = true
            script.src = 'https://webapi.amap.com/maps?v=1.3&callback=initAMap&key=' + key
            script.onerror = reject
            document.head.appendChild(script)
        }
        window.initAMap = () => {
            resolve(window.AMap)
        }
    })

    const mpUI = new Promise((resolve, reject) => {
        if (window.AMapUI) {
            resolve(window.AMapUI)
        } else {
            var scriptUI = document.createElement('script')
            scriptUI.type = 'text/javascript'
            scriptUI.src = 'https://webapi.amap.com/ui/1.1/main.js?v=1.1.1'
            scriptUI.onerror = reject

            scriptUI.onload = function (su) {
                resolve(window.AMapUI)
            }

            document.head.appendChild(scriptUI)
        }
    })

    return Promise.all([map, mpUI]).then(res => {
        console.log(res[0])
        console.log(res[1])
        return res[1]
    }).catch(e => {
        console.error(e)
    })
}