import {FC, useEffect} from 'react'
import Grid from '../../../../helpers/circleGrid'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import { schemeTableau10 } from 'd3-scale-chromatic'
// import { transition } from 'd3-transition'
// import { easeLinear } from 'd3-ease'
import './EducationCircles.scss'

interface Props {
  width: number
  height: number
  skillList: {name: string}[]
}

export const EducationCircles: FC<Props> = ({width, height, skillList}: Props) => {
  useEffect(() => {
    draw()
  })

  const draw = () => {
    const circleCount = skillList.length
    const g = new Grid(150, width, height)
    // stick circles into the grid
    const circles: any[] = []
    const radii = [46, 51, 55, 44, 63]
    const color = scaleOrdinal(schemeTableau10)
    for (let i = 0; i < circleCount; i++) {
      let radius
      let circle
      let check = 0
      const iterations = 500
      do {
        radius = radii[Math.floor(Math.random()*radii.length)]
        circle = {
          x: Math.random() * (width - radius * 2) + radius,
          y: Math.random() * (height - radius * 2) + radius,
          radius: radius
        }
      } while(g.hasCollisions(circle) && ++check < iterations)
      circles.push({...circle, name: skillList[i].name})
      g.add({...circle, name: skillList[i].name})
    }

    const svg = select('#circleCanvas')
      .attr('width', width)
      .attr('height', height)

    // Group
    const svgGroup = svg.selectAll('groupOfCircles')
      .data(circles)
      .enter()
      .append('g')
      .attr('class', (d, i) => `circle_${i}`)

    // const t = transition()
    //   .duration(750)
    //   .ease(easeLinear)

    svgGroup.each(function(d: any, i: number) {
      // Circle
      select(this)
        .append('circle')
        .attr('cx', circles[i].x)
        .attr('cy', circles[i].y)
        .attr('r', circles[i].radius)
        .attr('fill', color(i.toString()))
        // .transition(t as any)
        // .style("fill", "red")

      // Text
      select(this)
        .append('text')
        .attr('fill', '#fff')
        .attr('font-family', 'Rubik, sans-serif')
        .attr('font-weight', 700)
        .attr('transform', `translate(${circles[i].x}, ${circles[i].y})`)
        .text(`${circles[i].name}`)
    })
  }

  return (
    <div className="Rectangle">
      <svg id="circleCanvas" />
    </div>
  )
}
