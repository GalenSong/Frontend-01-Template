
    let set = new Set()
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

    let queue = []

    
    let data = {
        nodes: [],
        edges: []
    }

    for(let i = 0; i<globalProperties.length;i++) {
        let p = globalProperties[i]
        queue.push({
            label: p,
            path: [p],
            object: this[p],
            x: 100,
            y: i*20
        })
        data.nodes.push({
            label: p,
            id: p,
            // x: 100,
            // y: i*20
        })
    }

    let current

    while (queue.length) {
        current = queue.shift()

        if(set.has(current.object)) continue
        set.add(current.object)
        console.log(current.path.join('.'))
        for(let p of Object.getOwnPropertyNames(current.object)) {
            let property = Object.getOwnPropertyDescriptor(current.object, p)
            let path = current.path.concat([p])
            let label = path.join(".")
            if(property.hasOwnProperty("value") && property.value instanceof Object) {
                queue.push({
                    label,
                    path,
                    object: property.value,
                    x: current.x * path.length*2,
                    y: current.y * path.length
                })
                data.nodes.push({
                    label,
                    id: label,
                    // x: current.x * path.length*2,
                    // y: current.y * path.length
                })
                data.edges.push({
                    label,
                    source: current.label,
                    target: label
                })
            }
                
            else if(property.hasOwnProperty("get") && typeof(property.get) === 'function'){
                queue.push({
                    label,
                    path,
                    object: property.get,
                    x: current.x * path.length*2,
                    y: current.y * path.length
                })
                data.nodes.push({
                    label,
                    id: label,
                    // x: current.x * path.length*2,
                    // y: current.y * path.length
                })
                data.edges.push({
                    label,
                    source: current.label,
                    target: label
                })
            }
                
            else if(property.hasOwnProperty("set") && typeof(property.get) === 'function'){
                queue.push({
                    label,
                    path,
                    object: property.set,
                    x: current.x * path.length*2,
                    y: current.y * path.length
                })
                data.nodes.push({
                    label,
                    id: label,
                    // x: current.x * path.length*2,
                    // y: current.y * path.length
                })
                data.edges.push({
                    label,
                    source: current.label,
                    target: label
                })
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