//匹配所有数字字面量
let reg = /^([0][\.?](?<=\.)\d*|[1-9][.]?[0-9]|0x[\d,a-f, A-F]*|0b[0,1]|0o[0-7]*)$/

//匹配所有字符串直接量，没想太明白
let reg = /[.]*/

//encoding
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}

