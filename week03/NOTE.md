# 每周总结可以写在这里
javaScript中的内置对象
1. 函数对象 
Function （全局Function对象没有自己的属性或方法，但会从Function.prototype上继承属性和方法）
    属性：length[writable: false, enumerable: false, configurable: true]，获取函数接收参数个数
    方法：Function.prototype.apply()、Function.prototype.bind()、Function.prototype.call()、Function.prototype.toString()
    由 Function 构造器创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造器创建时所在的作用域的变量。

2. 错误对象
Error （当代码运行时的发生错误，会创建新的Error 对象，并将其抛出。）
    属性：[全部继承自Error.prototype] Error.prototype.message、Error.prototype.name
    方法：Error.prototype.toString()
    RangeError：RangeError对象标明一个错误，当一个值不在其所允许的范围或者集合中。
    ReferenceError：referenceError（引用错误） 对象代表当一个不存在的变量被引用时发生的错误。
    SyntaxError：SyntaxError 对象代表尝试解析语法上不合法的代码的错误。如：1 = a
    TypeError：TypeError（类型错误） 对象用来表示值的类型非预期类型时发生的错误。
    URIError

3. 数字对象
Number（Number 对象是经过封装的能让你处理数字值的对象）
直接调用Number返回基本类型数字或NaN，通过new Number()调用返回包装对象
属性：
    Number.EPSILON
    Number.MAX_SAFE_INTEGER
    Number.MAX_VALUE 能表示的最大正数
    Number.MIN_SAFE_INTEGER 
    Number.MIN_VALUE 能表示的最小正数即最接近 0 的正数
    Number.NaN
    Number.NEGATIVE_INFINITY （Number.NEGATIVE_INFINITY === -Infinity）
    Number.POSITIVE_INFINITY （Number.POSITIVE_INFINITY === Infinity）

方法：
    Number.isNaN() [Number.isNaN !== isNaN] (和全局函数 isNaN() 相比，Number.isNaN() 不会自行将参数转换成数字，只有在参数是值为 NaN 的数字时，才会返回 true。)
    Number.isNaN = Number.isNaN || function(value) {
        return typeof value === "number" && isNaN(value);
    }

    Number.isFinite() (和全局的 isFinite() 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。)

    Number.isInteger()
    Number.isInteger = Number.isInteger || function(value) {
        return typeof value === "number" && 
            isFinite(value) && 
            Math.floor(value) === value;
    };

    Number.parseFloat() (和全局对象 parseFloat() 一样。)
    如果 parseFloat 在解析过程中遇到了正号（+）、负号（- U+002D HYPHEN-MINUS）、数字（0-9）、小数点（.）、或者科学记数法中的指数（e 或 E）以外的字符，则它会忽略该字符以及之后的所有字符，返回当前已经解析到的浮点数。
    第二个小数点的出现也会使解析停止（在这之前的字符都会被解析）。
    参数首位和末位的空白符会被忽略。
    如果参数字符串的第一个字符不能被解析成为数字,则 parseFloat 返回 NaN。
    parseFloat 也可以解析并返回 Infinity。
    parseFloat解析 BigInt 为 Numbers, 丢失精度。因为末位 n 字符被丢弃。
    parseFloat无法解析用字符串表示的其它进制数字。
    考虑使用 Number(value) 进行更严谨的解析，只要参数带有无效字符就会被转换为 NaN 。

    parseFloat 也可以转换一个已经定义了 toString 或者 valueOf 方法的对象，它返回的值和在调用该方法的结果上调用 parseFloat 值相同。

    Number.parseInt(string[, radix]) (和全局对象 parseInt() 一样。) 依据指定基数 [ 参数 radix 的值]，把字符串 [ 参数 string 的值] 解析成整数。
        参数string：要解析的值。 如果此参数不是字符串，则使用ToString抽象操作将其转换为字符串。忽略此参数中的前导空格。
        参数radix：一个介于2到36之间的整数，代表字符串的基数(数学数字系统中的基)。小心-这并不是默认为10。

Math （Math 是一个内置对象，它拥有一些数学常数属性和数学函数方法。Math 用于 Number 类型。它不支持 BigInt。）
属性：
    Math.E
    Math.LN2
    Math.LN10
    Math.LOG2E
    Math.LOG10E
    Math.PI
    Math.SQRT1_2
    Math.SQRT2
方法：
    Math.abs(x) 返回一个数的绝对值。
    Math.cbrt(x) 返回一个数的立方根。
    Math.ceil(x) 返回大于一个数的最小整数，即一个数向上取整后的值。
    Math.floor(x) 返回小于一个数的最大整数，即一个数向下取整后的值。
    Math.fround(x) 返回最接近一个数的单精度浮点型表示。
    Math.hypot([x[, y[, …]]]) 返回其所有参数平方和的平方根。
    Math.max([x[, y[, …]]]) 返回零到多个数值中最大值。 Math.max(...arr);
    Math.min([x[, y[, …]]]) 返回零到多个数值中最小值。
    Math.pow(x, y) 返回一个数的 y 次幂。
    Math.random() 返回一个 0 到 1 之间的伪随机数。
    Math.round(x) 返回四舍五入后的整数。
    Math.sign(x) 返回一个数的符号，得知一个数是正数、负数还是 0。
    Math.sqrt(x) 返回一个数的平方根。
    Math.trunc(x) 返回一个数的整数部分，直接去除其小数点及之后的部分。

4. 日期对象
Date


5. 正则对象
RegExp

6. 结构化数据对象
JSON