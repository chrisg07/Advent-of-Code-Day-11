module.exports = class HeightMap {
	lowPoints = []
	basinPoints = []
	basinSizes = []
	map = []
	answer = 1
	
  constructor(lines) {
		for (let [index, entry] of lines.entries()) {
			if (entry) {
				// row of input
				this.map[index] = entry.split('')
			}
		}
		console.log(this.map)
		for (let x = 0; x < this.map.length; x++) {
			for (let y = 0; y < this.map[x].length; y++) {
				this.isLowPoint(x, y)
			}
		}
		for (let [index, lowPoint] of this.lowPoints.entries()) {
			this.basinPoints[index] = []
			this.getBasinPoints(lowPoint, index)
		}
		this.basinPoints = this.basinPoints.map(points => {
			return points.filter((point, index, self) =>
				index === self.findIndex((t) => (
					t.x === point.x && t.y === point.y
				))
			)
		})
		this.basinPoints = this.basinPoints.map((values) => {
			const uniquePoints = [...new Set(values)]
			const basinSize = uniquePoints.length
			this.basinSizes.push(basinSize)
			return uniquePoints
		})
		for (let i = 0; i < 3; i++) {
			const max = Math.max(...this.basinSizes)
			this.answer *= max
			this.basinSizes.splice(this.basinSizes.indexOf(max), 1)
		}
		console.log(this.basinPoints)
		console.log(this.basinSizes)
		console.log('answer:', this.answer)
  }

	getBasinPoints(point, index) {
		console.log('point', point, index)
		let currentPoint = this.map[point.x][point.y]
		let northPoint
		let eastPoint
		let southPoint
		let westPoint
		if (point.y !== 0) {
			northPoint = this.map[point.x][point.y - 1]
		}
		if (point.y !== this.map[point.x].length - 1) {
			southPoint = this.map[point.x][point.y + 1]
		}
		if (point.x !== this.map.length - 1) {
			eastPoint = this.map[point.x + 1][point.y]
		}
		if (point.x !== 0) {
			westPoint = this.map[point.x - 1][point.y]
		}
		let lowestPoint = true
		if (northPoint && currentPoint < northPoint && northPoint < 9) {
			this.getBasinPoints({x: point.x, y: point.y - 1}, index)
		}
		if (eastPoint && currentPoint < eastPoint && eastPoint < 9) {
			this.getBasinPoints({x: point.x + 1, y: point.y}, index)
		}
		if (southPoint && currentPoint < southPoint && southPoint < 9) {
			this.getBasinPoints({x: point.x, y: point.y + 1}, index)
		}
		if (westPoint && currentPoint < westPoint && westPoint < 9) {
			this.getBasinPoints({x: point.x - 1, y: point.y}, index)
		}
		console.log('pushed point to index', point, index)
		this.basinPoints[index].push(point)
	}

	isPartOfBasin(point) {

	}

	isLowPoint(x, y) {
		const currentPoint = this.map[x][y]
		let northPoint
		let eastPoint
		let southPoint
		let westPoint
		if (y !== 0) {
			northPoint = this.map[x][y - 1]
		}
		if (y !== this.map[x].length - 1) {
			southPoint = this.map[x][y + 1]
		}
		if (x !== this.map.length - 1) {
			console.log('point', x, y)
			eastPoint = this.map[x + 1][y]
		}
		if (x !== 0) {
			westPoint = this.map[x - 1][y]
		}
		let lowestPoint = true
		if (northPoint && currentPoint >= northPoint) {
			lowestPoint = false
		}
		if (eastPoint && currentPoint >= eastPoint) {
			lowestPoint = false
		}
		if (southPoint && currentPoint >= southPoint) {
			lowestPoint = false
		}
		if (westPoint && currentPoint >= westPoint) {
			lowestPoint = false
		}
		if (lowestPoint) {
			this.lowPoints.push({x, y})
		}
	}
}
