
    let globalProperties = [
        'eval',
        'isFinite',
        'isNaN',
        'parseFloat',
        'parseInt',
        'URIError',
        'decodeURI',
        'decodeURIComponent',
        'encodeURI',
        'encodeURIComponent',
        'Array',
        'ArrayBuffer',
        'Boolean',
        'DataView',
        'Date',
        'Error',
        'EvalError',
        'Float32Array',
        'Float64Array',
        'Function',
        'Int8Array',
        'Int16Array',
        'Int32Array',
        'Map',
        'Number',
        'Object',
        'Promise',
        'Proxy',
        'RangeError',
        'ReferenceError',
        'RegExp',
        'Set',
        'SharedArrayBuffer',
        'String',
        'Symbol',
        'SyntaxError',
        'TypeError',
        'Uint8Array',
        'Uint8ClampedArray',
        'Uint16Array',
        'Uint32Array',
        'URIError',
        'WeakMap',
        'WeakSet',
        'Atomics',
        'JSON',
        'Math',
        'Reflect'
    ]

    let subQueue = []
    let set = new Set(globalProperties)
    let tree = [{
        id: "root",
        children: []
    }]

    let i = 0
    function createTree(tree) {
        while(globalProperties.length) {
            let p = globalProperties.shift()
            let o = this[p]
            let node = {id: p}
            tree.push(node)
            for(let p of Object.getOwnPropertyNames(o)) {
                let d = Object.getOwnPropertyDescriptor(o, p)
                if((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) {
                    if(!set.has(d.value)) {
                        subQueue.push(d.value)
                        set.add(d.value)
                    }
                    if(d.get) {
                        if(!set.has(d.get)) {
                            subQueue.push(d.get)
                            set.add(d.set)
                        }
                    }
                    if(d.set) {
                        if(!set.has(d.set)) {
                            subQueue.push(d.set)
                            set.add(d.set)
                        }
                    }
                }
            }
        } 
    }
 

    
    // 创建 G6 图实例
    const graph = new G6.Graph({
        container: "app", // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        direction: 'TB',
        width: 2000,
        height: 2000,
        layout: {
            type: 'force',
            preventOverlap: true,
            linkDistance: 400
          },
          defaultNode: {
            size: 20,
            color: '#5B8FF9',
            style: {
              lineWidth: 1,
              fill: '#C6E5FF',
            },
          },
          defaultEdge: {
            size: 1,
            color: '#e2e2e2',
          }
      });

      graph.data({
        nodes: data.nodes,
        edges: data.edges.map(function(edge, i) {
          edge.id = 'edge' + i;
          return Object.assign({}, edge);
        }),
      });
      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();