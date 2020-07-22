export class Timeline {
    constructor() {
        this.animations = []
        this.requestID = null
        this.state = 'inited'
        this.startTime = null
        this.pauseTime = null
        // this.property = null
        this.tick = this.tick.bind(this)
    }
    tick() {
        let t = Date.now() - this.startTime
        let animations = this.animations.filter(animation => !animation.finished)
        let properties = {}
        for(let animation of animations) {
            let {object, property, template, start, end, duration, timingFunction, delay, addTime} = animation
            if(properties[property] === void 0) {
                properties[property] = ''
            }
            let progression = timingFunction((t - delay - addTime)/duration); //0-1
            if(t > duration + delay + addTime){
                progression = 1
                animation.finished = true
            }
            let value = animation.valueFromProgression(progression)
            let actionValue = template(value)
            properties[property] += actionValue
            object[property] = properties[property]
        }

        if(animations.length) {
            this.requestID = requestAnimationFrame(this.tick)
        }
    }

    pause() {
        if(this.state !== "playing")
            return
        this.state = "paused"
        this.pauseTime = Date.now()
        if(this.requestID !== null) {
            cancelAnimationFrame(this.requestID)
        }
    }

    resume() {
        if(this.state !== "paused")
            return
        this.state = "playing"
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    start() {
        if(this.state !== 'inited') 
            return
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }

    restart() {
        if(this.state === "playing") {
            this.pause()
        } 
        this.animations = []
        this.requestID = null
        this.state = 'playing'
        this.startTime = Date.now()
        this.pauseTime = null

        this.tick()
    }

    add(animation, addTime) {
        this.animations.push(animation)
        animation.finished = false
        if(this.state === "playing") {
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime
        } else {
            animation.addTime = addTime !== void 0 ? addTime : 0
        }
        
    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object
        this.template = template
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay || 0
        this.timingFunction = timingFunction
    }
    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start)
    }
}

export class RotateAnimation extends Animation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        super(object, property, start, end, duration, delay, timingFunction, template)
    }
    valueFromProgression(progression) {
        return progression * 540
    }
}

export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object
        this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`)
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay || 0
        this.timingFunction = timingFunction
    }
    valueFromProgression(progression) {
        debugger
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}

/**
 * let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
 * let animation2 = new Animation(object2, property2, start2, end2, duration2, delay2, timingFunction2)
 * 
 * let timeline = new Timeline()
 * timeline.add(animation)
 * timeline.add(animation2)
 * 
 * timeline.start()
 * 
 * timeline.stop()
 * 
 * timeline.pause()
 * 
 * timeline.resume()
 * 
 * timeline.stop()
 */