import {PureComponent, ContextType} from 'react'
import {select} from 'd3-selection'
import {scaleOrdinal} from 'd3-scale'
import {schemeTableau10} from 'd3-scale-chromatic'
import {transition} from 'd3-transition'
import {line, curveCardinalClosed, Line} from 'd3-shape'
import './EducationCircles.scss'
import {AppContext} from '@/ctx/auth'
import {Techs} from '@/models/Education'

select.prototype.transition = transition

interface Props {
  width: number
  height: number
  skillList: Techs[]
  onCourseClick: (id: string) => void
}

export default class EducationCircles extends PureComponent<Props> {
  declare context: ContextType<typeof AppContext>

  componentDidMount() {
    this.draw({...this.props} as Props, this.context.isAdmin)
  }

  draw = (props: Props, isAdmin: boolean): void => {
    const {width, height, skillList, onCourseClick} = props
    const clientWidth = document.documentElement.clientWidth
    const r = clientWidth > 1824 ? 70 : clientWidth > 767 ? 45 : 30
    const margin = (r * 2) / 1.5
    const w = width - margin
    const h = (clientWidth > 767 ? height : height / 2) - margin

    const datasets: [{ x: number, y: number }][] | [] = []
    const selectionList: any[] = []

    const createDatasets = (iterations: number) => {
      for (let i = 0; i <= iterations; i++) {
        for (let j = 0; j < 4; j++) {
          const x = Math.floor((Math.random() * w) + 1)
          const y = Math.floor((Math.random() * h) + 1)
          if (datasets[i]) {
            datasets[i].push({
              'x': x,
              'y': y
            })
          } else {
            datasets[i] = [{
              'x': x,
              'y': y
            }]
          }
        }
      }
    }

    createDatasets(skillList.length - 1)

    const lineFunction = line()
      .x(() => Math.random() * (w - margin) + margin)
      .y(() => Math.random() * (h - margin) + margin)
      .curve(curveCardinalClosed)

    const svg = select('#circleCanvas')
      .attr('width', w + margin)
      .attr('height', h + margin)

    const color = scaleOrdinal(schemeTableau10)

    const createPathCircle = (dataset: any[], cRad = 30, idx: number) => {
      const path = svg.append('path')
        .datum(dataset)
        .attr('d', lineFunction as Line<[number, number]>)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'none')
        .attr('class', `path_${idx}`)

      const group = svg.append('g')
        .attr('transform', 'translate(' + [0] + ')')
        .attr('class', `group_${idx}`)
        .style('cursor', 'pointer')
        .style('position', 'relative')
        .style('z-index', '1')
        .on('click', (e) => {
          onCourseClick((skillList[idx] as Techs).id!)
        })
        .on('mouseover', function() {
          select(this)
            .raise()
            .transition()
            .duration(0)
            .style('opacity', 1)
            .style('z-index', 2)
        })
        .on('mouseleave', function() {
          select(this)
            .style('opacity', 0.7)
            .style('z-index', 1)

          const mouseLeaveTransition = () => {
            const n = this.className.baseVal.split('_')[1]
            const transform = this.getAttribute('transform')
            const [all, x, y] = transform!.match(/\((.*?),(.*?)\)/)!

            const newDataset = {x: +x, y: +y}
            const foundDatasetIndex = datasets.findIndex(d => d === dataset)
            datasets[foundDatasetIndex][0] = newDataset

            const pathEl = selectionList[n].path.node().getAttribute('d')
            let result = pathEl.split(/(?=[LMC])/)

            const fCoordinates = result[0].split(',')
            const lCoordinates = result[result.length - 1].split(',')

            fCoordinates[0] = `M${x}`
            fCoordinates[1] = y

            lCoordinates[lCoordinates.length - 2] = x
            lCoordinates[lCoordinates.length - 1] = y

            result[0] = fCoordinates.join()
            result[result.length - 1] = lCoordinates.join()
            result = result.join('')

            select(`path_${n}`).remove()

            selectionList[n].path = svg.append('path')
              .datum(datasets[foundDatasetIndex])
              .attr('d', result)
              .attr('stroke', 'black')
              .attr('stroke-width', 1)
              .attr('fill', 'none')
              .attr('class', `path_${idx}`)

            transition(n)
          }

          !isAdmin && mouseLeaveTransition()
        })


      const circle = group.append('circle')
        .attr('r', cRad)
        .attr('class', `circle_${idx}`)
        .attr('fill', color((idx * 2).toString()))
        .style('transition', 'transform 0.5s ease-out')

      const text = group.append('text')
        .text(`${skillList[idx].name}`)

      selectionList.push({path, circle, group})
    }

    const transition = (n: number) => {
      selectionList[n].group.transition()
        .duration(10000)
        .attrTween('transform', translateAlong(selectionList[n].path.node()))
        .on('end', () => transition(n))
    }

    const adminTransition = (n: number) => {
      selectionList[n].group.transition()
        .attrTween('transform', translateAlong(selectionList[n].path.node()))
    }

    for (let i = 0; i <= skillList.length - 1; i++) {
      const cRadius = r + i
      createPathCircle(datasets[i], cRadius, i)
    }
    for (let i = 0; i <= skillList.length - 1; i++) {
      isAdmin ? adminTransition(i) : transition(i)
    }

    function translateAlong(path: any) {
      const l = path.getTotalLength()
      return function(d: any, i: any, a: any) {
        return function(t: any) {
          const p = path.getPointAtLength(t * l)
          return 'translate(' + p.x + ',' + p.y + ')'
        }
      }
    }
  }

  render() {
    return (
      <div className="education-circles">
        <svg id="circleCanvas"/>
      </div>
    )
  }
}
