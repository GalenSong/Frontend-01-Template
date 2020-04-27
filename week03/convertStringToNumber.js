function convertStringToNumber (str) {
    if (typeof str !== 'string') throw new Error('请输入字符串')
    let rowNumString = getRawNumString(str)
    if(!rowNumString) return NaN
    let {base, nums: [signStr, integerStr, decimalStr, powerSignStr, powerStr]} = rowNumString
    let number = 0
    const ZEROCODE = "0".codePointAt(0)

    for (let c of integerStr) {
        number *= base
        number += c.codePointAt(0) - ZEROCODE
    }

    if(base !== 10) return number

    if(decimalStr) {
        let decimal = 0
        let i = -1
        for(let c of decimalStr) {
            decimal += (c.codePointAt(0) - ZEROCODE)*base**i--
        }
        number += decimal
    }

    if(powerStr) {
        let power = 0
        for (let c of powerStr) {
            power *= base
            power += c.codePointAt(0) - ZEROCODE
        }
        if(powerSignStr.codePointAt(0) === 45) power *= -1
        number **= power
    }

    if(signStr.codePointAt(0) === 45) number *= -1

    return number
}

function getRawNumString (str) {
    let rawData = null
    const regList = [
        {
            base: 10, 
            reg: /^(-?)([1-9]\d*|0)(?:\.?(\d+))?(?:e?(-?)([1-9]\d*))?$/
        }, 
        {
            base: 2, 
            reg: /^(?:0[bB])([01]+)$/
        }, 
        {
            base: 8, 
            reg: /^(?:0[oO])([0-7]+)$/
        }, 
        {
            base: 16, 
            reg: /^(?:0[xX])([0-9A-f]+)$/
        }]

    for(let i = 0; i < regList.length; i++) {
        const {base, reg} = regList[i]
        if(reg.test(str)) {
            rawData = {
                base,
                nums: base === 10 ? reg.exec(str).splice(1) : ["", reg.exec(str)[1]]
            }
            break
        }
    }
    return rawData
}