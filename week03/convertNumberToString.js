/**
 * convert number to string
 * @param {Number} str - 要转换的数字，如：187, 0b10, 0o71, 0xaf, 12.3e-2
 * @param {Number} base - 字符串表示成该进制 {2, 8, 10, 16}
 * @param {Number} precision - 精度，默认为10，可不传；由于小数部分的处理存在精度丢失，引入该参数设置小数位数
 * @return {String} 转换后的字符串
 * @note 进制转换目前没想好怎么做，暂时遗留
 * @testCase [187], [187, , 3], [0xaf, , 5]
 */

function convertNumberToString(number, base = 10, precision = 10) {
    if(typeof number !== 'number') throw new Errro('请输入数字')
    // 使用Number方法将传入的数字转为十进制数字
    number = Number(number)
    let string = ''
    // 符号
    let sign = ''
    // 当数字为负数时，转换为整数，方便处理
    if(number < 0) {
        sign = '-'
        number *= -1
    }
    // 获取整数部分
    let intPart = Math.floor(number)
    // 获取小数部分
    let decimalPart = number % 1 + Number.EPSILON
    const ZEROSTRCODE = "0".codePointAt(0)
    // 处理整数部分
    while(intPart > 0) {
        let num = intPart % 10
        string = String.fromCodePoint(ZEROSTRCODE + num) + string
        intPart = (intPart - num) / 10
    }

    string = sign + string

    if(decimalPart > 0) {
        string += '.'
    }

    // 处理小数部分，i用于记录小数精度
    let i = 0
    while(decimalPart < 1 && i < precision) {
        decimalPart *= 10 + Number.EPSILON
        let num = Math.floor(decimalPart) 
        string += String.fromCodePoint(ZEROSTRCODE + num)
        decimalPart %= 1 + Number.EPSILON
        i++
    }

    return string
}