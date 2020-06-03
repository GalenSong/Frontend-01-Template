
const CSSwhat = require("css-what")

function match(element, selector) {
    if(!selector || !element.attributes) {
        return false
    }

    let isMatched = false
    let selectorList = []
    const selectorStructures = CSSwhat.parse(selector)
    for(let selectorStructure of selectorStructures) {
        let selectorParts = {
            selectors: [],
            hasParent: false
        }
        let selectors = selectorParts.selectors
        selectorList.push(selectorParts)
        let i = 0
        for(let item of selectorStructure) {
            if(!selectors[i]) {
                selectors[i] = []
            }
            if(item.type === 'descendant') {
                i++
                continue
            }

            if(item.type === 'child') {
                selectorParts.hasParent = true
                i++
                continue
            }
            selectors[i].push(item)
        }
        selectors.reverse()
    }

    for (let {selectors, hasParent} of selectorList) {
        let ancestor = null
        isMatched = matchPart(selectors[0], element)
        if(hasParent) {
            isMatched = matchPart(selectors[1], element.parent)
            ancestor = selectors.slice(2, selectors.length - 1)
        } else {
            ancestor = selectors.slice(1, selectors.length - 1)
        }

        if(!ancestor) break

        let elementParentNode = getElementAncestorList(element)
        for(let parent of elementParentNode) {
            for(let item of ancestor) {
                isMatched = matchPart(item, parent)
                if(isMatched) {
                    elementParentNode.shift()
                    ancestor.shift()
                }
            }
        }
    }
    return isMatched
}

function getElementAncestorList(element) {
    let ancestor = []
    getElementAncestor(element)
    function getElementAncestor(element) {
        if(element.parent) {
            ancestor.push(element.parent)
            getElementAncestor(element.parent)
        }
    }
    return ancestor
}

function matchPart(selector, element) {
    let {type, name, value, action, data} = selector
    if(type === 'tag') {
        if(name !== element.tagName) {
            return false
        }
    }
    if(type === "attribute"){
        if(name === "id") {
            let attr = element.attributes.filter(attr => attr.name === "id")[0]
            if(attr && attr.value !== value) {
                return false
            }
        } else if(name === "class") {
            let attr = element.attributes.filter(attr => attr.name === "class")[0]
            if(attr) {
                // 匹配带空格的 Class 选择器
                let classList = attr.split(" ")
                if(classList.length && !classList.includes(value)) {
                    return false
                }
            }
        } else {
            let attr = element.attributes.filter(attr => attr.name === name)[0]
            if(!attr)  return false
            if(action === "equals") {
                if(attr.value !== value) {
                    return false
                }
            } else if(action === "start") {
                if(attr.value.indexOf(value) !== 0) {
                    return false
                }
            }
        }
    }
    return true
}