// g/L
const permissible = {
    cd: 0.003,
    cr: 0.05,
    pb: 0.05,
    fe: 0.3,
    mn: 0.1,
    co: 0.05,
    ni: 0.02,
    zn: 3,
    cu: 0.05
}


const gLToMgL = (con) => {
    return con * 1000
}

const findCd = (hms) => {
    let res = 0
    for(const hm of hms)
    {
        ci = hm.val / permissible[hm.name]
        cif = ci - 1
        res += cif
    }
    
    return res
}

const findHei = (hms) => {
    let res = 0
    for(const hm of hms)
    {
        ri = hm.val / permissible[hm.name]
        res += ri
    }
 
    return res
}

const findSafetyDeg = (hms) => {
    const c = findCd(hms)
    if(c < 1) 
        return 0
    
    if(c >= 1 && c < 3)
        return 1

    if(c >= 3)
        return 2
}

const findPoluDeg = (hms) => {
    const c = findHei(hms)
    if(c < 10) 
        return 0
    
    if(c >= 10 && c < 20)
        return 1

    if(c >= 20)
        return 2
}

const findHmpi = (hms) => {
    let ui = li = 0
    for(const hm of hms)
    {
        qi = hm.val / permissible[hm.name] * 100
        wi = 1 / permissible[hm.name]

        ui += (wi * qi)
        li += wi
    }
 
    res = ui / li
    return res
}

const isCriticalToDrink = (hms) => {
    const c = findHmpi(hms)
    if (c > 100) return 1
    return 0
}

module.exports = { gLToMgL, findCd, findHei, findHmpi, findSafetyDeg, findPoluDeg, isCriticalToDrink }