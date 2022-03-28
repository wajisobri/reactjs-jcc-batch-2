export const formatPrice = (price) => 
    (price === 0) ? "FREE" : new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(price)

export const formatSize = (size) => 
    (size >= 1000) ? `${(Number.isInteger(size/1000) ? size/1000 : parseFloat(size/1000).toFixed(2))} GB` : `${size} MB`
    
export const formatPlatformToStr = (is_android_app, is_ios_app) =>
    `${(is_android_app) ? "android" : ""} \n ${(is_ios_app) ? "IOS" : ""}`

export const formatPlatform = (platform) =>
    `${(platform) ? "true" : "false"}`

export const formatDescription = (desc) => 
    (typeof desc == "string" && desc.length >= 20) ? `${desc.substring(0, 20)}...` : desc