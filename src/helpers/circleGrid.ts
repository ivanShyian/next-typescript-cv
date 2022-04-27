export default class Grid {
  gridX: number
  gridY: number
  cellWidth: number
  cellHeight: number
  grid: any[]

  constructor(radius: number, width: number, height: number) {
    // I'm not sure offhand how to find the optimum grid size.
    // Let's use a radius as a starting point
    this.gridX = Math.floor(width / radius)
    this.gridY = Math.floor(height / radius)
    // Determine cell size
    this.cellWidth = width / this.gridX
    this.cellHeight = height / this.gridY
    // Create the grid structure
    this.grid = []
    for (let i = 0; i < this.gridY; i++) {
      // grid row
      this.grid[i] = []
      for (let j = 0; j < this.gridX; j++) {
        // Grid cell, holds refs to all circles
        this.grid[i][j] = []
      }
    }
  }

  getCells(circle: any): any[] {
    const cells = []
    const grid = this.grid
    // For simplicity, just intersect the bounding boxes
    const gridX1Index = Math.floor(
      (circle.x - circle.radius) / this.cellWidth
    )
    const gridX2Index = Math.ceil(
      (circle.x + circle.radius) / this.cellWidth
    )
    const gridY1Index = Math.floor(
      (circle.y - circle.radius) / this.cellHeight
    )
    const gridY2Index = Math.ceil(
      (circle.y + circle.radius) / this.cellHeight
    )
    for (let i = gridY1Index; i < gridY2Index; i++) {
      for (let j = gridX1Index; j < gridX2Index; j++) {
        // Add cell to list
        cells.push(grid[i][j])
      }
    }
    return cells
  }

  add(circle: any): void {
    this.getCells(circle).forEach((cell) => {
      cell.push(circle)
    })
  }

  hasCollisions(circle: any): any {
    return this.getCells(circle).some((cell) => {
      return cell.some((other: any) => {
        return this.collides(circle, other)
      }, this)
    }, this)
  }

  collides(circle: any, other: any): any {
    if (circle === other) return false
    const dx = circle.x - other.x
    const dy = circle.y - other.y
    const rr = circle.radius + other.radius
    return (dx * dx + dy * dy < rr * rr)
  }
}
