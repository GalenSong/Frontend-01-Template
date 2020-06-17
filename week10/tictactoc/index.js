void new class ticTac {
    pattern = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]

    color = 1


    constructor() {
        this.render()
    }

    layout() {
        let fragment = new DocumentFragment()
        let len = this.pattern.length
        for(let i = 0; i<len; i++) {
            let x = i%3, y=(i-x)/3
            let cellDom = document.createElement("div")
            cellDom.classList.add("cell")
            if(this.pattern[i] === -1) {
                cellDom.appendChild(document.createTextNode('O'))
            } else if(this.pattern[i] === 1) {
                cellDom.appendChild(document.createTextNode('X'))
            }
            fragment.appendChild(cellDom)
            cellDom.addEventListener('click', () => {this.play(x, y)})
        }
        return fragment
    }

    render() {
        let rootDom = document.getElementById("root")
        rootDom.innerHTML = ''
        let layoutDom = this.layout()
        rootDom.appendChild(layoutDom)
    }

    play(x, y) {
        if(this.pattern[x+3*y] !== 0) {
            return
        }
        this.color = -this.color
        this.pattern[x+3*y] = this.color
        this.render()
        this.check(x, y, this.color)
    }

    check(x, y, color) {
        //有bug，待修改
        let observePoints = [[x, y-1], [x, y+1], [x-1, y], [x+1, y], [x-1,y-1], [x-1, y+1], [x+1, y-1], [x+1, y+1]]
        for(let [m, n] of observePoints) {
            if(m < 0 || n < 0 || m > 2 || n > 2) {
                continue
            }

            if(this.pattern[m+3*n] === color) {
                let winPoints = []
                if(x === m) {
                    winPoints.push(...[[x, Math.max(n, y) + 1], [x, Math.min(n, y) - 1]])
                } 

                if(y === n) {
                    winPoints.push(...[[Math.max(x, m) + 1, y], [Math.min(x, m) - 1, y]])
                }

                if(x > m && y > n) {
                    winPoints.push(...[[x-1, y+1], [m+1, y-1]])
                }

                if(x < m && y < n) {
                    winPoints.push(...[[m-1, n-1], [x+1, y+1]])
                }

                if(x > m && y < n) {
                    winPoints.push(...[[x+1, y-1], [m-1, n+1]])
                }

                if(x < m && y > n) {
                    winPoints.push(...[[x-1, y-1], [m+1, n+1]])
                } 

                for(let [x, y] of winPoints) {
                    if(x < 0 || y < 0) {
                        continue
                    }
                    if(this.pattern[x+3*y] === color) {
                        alert(color + "胜")
                        break
                    }
                }
                
            }
        }
    }
}()