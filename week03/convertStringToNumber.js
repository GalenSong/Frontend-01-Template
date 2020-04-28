/**
 * convert string to number
 * @param {string} str - any string
 * @return {Number} | {NaN}
 * @testCase [197], [0b101], [0o75], [0xaf], [-4e-2]
 */

function convertStringToNumber (str) {
    // 参数非字符串时抛出异常
    if (typeof str !== 'string') throw new Error('请输入字符串')
    // 识别字符序列所标识的数字进制及组成部分
    let rowNumString = getRawNumString(str)
    // 如果无法识别，则返回NaN
    if(!rowNumString) return NaN
    // base: 进制, signStr: 符号位, integerStr: 整数位, decimalStr: 小数位, powerSignStr: 指数权值符号位, powerStr: 指数权值位
    let {base, nums: [signStr, integerStr, decimalStr, powerSignStr, powerStr]} = rowNumString
    let number = 0
    const ZEROCODE = "0".codePointAt(0)

    //十六进制包含字母字符，需要单独处理
    if(base === 16) {
        const DIFF = "a".codePointAt(0) - 10
        for (let c of integerStr) {
            number *= base
            if(/[ABCDEFabcdef]/.test(c)) {
                number += c.toLowerCase().codePointAt(0) - DIFF
                continue
            }
            number += c.codePointAt(0) - ZEROCODE
        }
        return number
    }

    //处理整数部分
    for (let c of integerStr) {
        number *= base
        number += c.codePointAt(0) - ZEROCODE
    }

    // 整数部分处理完成后，如果非十进制数，返回；暂不支持其他进制小数处理
    if(base !== 10) return number

    //处理小数部分
    if(decimalStr) {
        let decimal = 0
        let i = -1
        for(let c of decimalStr) {
            decimal += (c.codePointAt(0) - ZEROCODE)*base**i--
        }
        number += decimal
    }

    //处理指数部分
    if(powerStr) {
        let power = 0
        for (let c of powerStr) {
            power *= base
            power += c.codePointAt(0) - ZEROCODE
        }
        if(powerSignStr.codePointAt(0) === 45) power *= -1
        number *= 10**power
    }

    //处理符号位，仅支持十进制，其他进制不支持符号位处理
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