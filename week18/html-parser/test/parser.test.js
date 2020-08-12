import { parseHTML } from '../src/parser.js'
// let {parseHTML} = require('../src/parser')
let assert = require("assert")

it('parse a single element', () => {
    let doc = parseHTML("<div></div>")
    assert.equal(doc.type, 'document')
    let div = doc.children[0]
    assert.equal(div.tagName, "div")
    assert.equal(div.children.length, 0)
    assert.equal(div.type, "element")
    assert.equal(div.attributes.length, 2)
})

it('parse a single element with text content', () => {
    let doc = parseHTML("<div>HTML</div>")
    let div = doc.children[0]
    let text = div.children[0]
    assert.equal(text.type, 'text')
    assert.equal(text.content, 'HTML')
})

it('tag mismatch', () => {
    try{
        let doc = parseHTML("<div></vid>")
    }catch(e) {
        assert.equal(e.message, "Tag start end doesn't match!")
    }
    
})

it('text with <', () => {
    let doc = parseHTML("<div>a < b</div>")
    let text = doc.children[0].children[0]
    assert.equal(text.content, "a < b")
    assert.equal(text.type, 'text')
})

it('text property', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>")
    let div = doc.children[0]
    let count = 0
    console.log(div.attributes)
    for(let attr of div.attributes) {
        if(attr.name === 'id') {
            count++
            assert.equal(attr.value, 'a')
        }
        if(attr.name === 'class') {
            count++
            assert.equal(attr.value, 'cls')
        }
        if(attr.name === 'data') {
            count++
            assert.equal(attr.value, 'abc')
        }
    }
    assert.ok(false)
})

it('with double quoted property', () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
    let div = doc.children[0]
    let count = 0
    console.log(div.attributes)
    for(let attr of div.attributes) {
        if(attr.name === 'id') {
            count++
            assert.equal(attr.value, 'a')
        }
        if(attr.name === 'class') {
            count++
            assert.equal(attr.value, 'cls')
        }
        if(attr.name === 'data') {
            count++
            assert.equal(attr.value, 'abc')
        }
    }
    assert.ok(count === 3)
})

it('script', () => {
    let doc = parseHTML(`<script>
        <div>abc</div>
        <span></span>
        <script
        script/>
    </script>`)
})