# p5.rnd

![Preview](https://media.giphy.com/media/jRYBD5UNl99I238H4T/source.gif)

## Resizable and draggable box for p5.js

I couldn't find any resizable and draggable elements in p5.js which I needed in many of my works. I found myself writing the same code again and again. So I made it into a library.

Here is a [working example in p5.js online text editor](https://editor.p5js.org/jithunni.ks/sketches/tzwNxMNcH)

Example
```
let rndCircle

function setup() {
  createCanvas(640, 400);
  rndCircle = new RndBox({
    x:width/2, 
    y:height/2,
    s:100,
    drawInside
  })
}

function draw() {
  background(0);
  rndCircle.display()
  rndCircle.drag()
  rndCircle.resize()
}

function drawInside({ s }) {
  fill(200,10,50)
  stroke(0)
  circle(0,0,s)
}
```
