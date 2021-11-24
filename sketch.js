const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const palette = random.pick(palettes).slice(0, 2)

  const createGrid = () => {
    const points = []
    const count = 50

    for (let x = 0; x < count; x++ ){
      
      for (let y = 0; y < count; y++){
        const u = count <= 1? 0.5 : x / (count - 1)
        const v = count <= 1? 0.5 : y / (count - 1)

        const radius = Math.abs(random.noise2D(u, v)) * 0.05

        points.push({
          color: random.pick(palette),
          radius,
          position: [u, v]
        })
      }
    }
    return points
  }

  // random.setSeed(420)
  const points = createGrid().filter(() => Math.abs(random.gaussian() * 0.000001))
  const margin = 200

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(data => {
      const { position, radius, color } = data
      const [u, v] = position


      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius*width, 0, Math.PI * 2, false)
      context.strokeStyle = 'black'
      context.lineWidth = 2
      // context.stroke()

      context.fillStyle = color
      context.fill()
    })
  };
};

canvasSketch(sketch, settings);
