export interface Coords {
  row: number
  col: number
}

/**
   * Check if two sets of coordinates are adjacent to each other,
   * including diagonally adjacent.
   */
export const isAdjacent = (coords1: Coords, coords2: Coords): boolean => {
  const { row: x1, col: y1 } = coords1
  const { row: x2, col: y2 } = coords2
  return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1
}