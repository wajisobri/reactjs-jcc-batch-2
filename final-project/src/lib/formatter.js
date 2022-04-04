export const formatDescription = (desc) => 
    (typeof desc == "string" && desc.length >= 140) ? `${desc.substring(0, 140)}...` : desc

export const formatPrice = (price) => 
    (price === 0) ? "FREE" : new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(price)