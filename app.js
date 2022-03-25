console.log('connected')
const backgroundColor = 'white'
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

function randomInt(min, max){
    return Math.floor(Math.random()*max)+min
}

function degToRad(degrees){
    return degrees / 180 * Math.PI
}

function resizeCanvas(){
    let margin = 0
    let x = window.innerWidth - margin
    let y = window.innerHeight - margin;
    (x > y) ? x = y : y = x
    canvas.width = x
    canvas.height = y
}

resizeCanvas()

function clearCanvas(){
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
}

clearCanvas()

class Circle{
    constructor(){
        this.x = 0
        this.y = 0
        this.cx = canvas.width * 0.5
        this.cy = canvas.height * 0.5
        this.r = 0
        this.arcStart = 0
        this.a = 0.15
        this.rotateSpeed = 0.1
        this.strokeC = 'rgb(66,66,66)'; 
        // this.fillC = 'rgb(66,66,66)'
        this.fillC = 'white'
    }

    draw(){
        context.fillStyle = this.fillC
        context.strokeStyle = this.strokeC
        context.lineWidth = randomInt(2,4)
        
        context.save()
        context.beginPath()

        context.arc(this.cx, this.cy, this.r * 0.5, this.arcStart + this.a, this.arcStart, true)

        context.arc(this.cx, this.cy, this.r, this.arcStart, this.arcStart + this.a)

        context.arc(this.cx, this.cy, this.r * 0.5, this.arcStart + this.a, this.arcStart, true)

        context.stroke()
        context.fill()
        context.restore()

        this.r = randomInt(50, this.cx - 60)
        if(this.r < 50 || this.r >100){
        // console.log(this.r)
        }
    }

    rotate(){
        this.arcStart += this.rotateSpeed
        this.draw()
    }
}

const circle = new Circle()

let pause = true
let cnx = 0

function moveObjects(){
    circle.rotate()
        cnx = window.requestAnimationFrame(moveObjects)

}

moveObjects()

window.addEventListener('click', ()=>{
    if(pause === true){
        console.log('click')
        window.cancelAnimationFrame(cnx)
        pause = false
        return
    }
    if(pause === false){
        moveObjects()
        pause = true
        return
    }
})

window.addEventListener('resize', ()=>{
    location.reload()
})