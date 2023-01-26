export const HEADER_BUTTON_STATUS_CODE = 176
export const GRID_BUTTON_STATUS_CODE = 144
export const VELOCITY_PRESSED = 127
export const VELOCITY_RELEASED = 127

export const HEADER_KEY_INDEX_OFFSET = 104

export class MidiMessage {
  status: number
  key: number
  velocity: number

  constructor(status: number, key: number, velocity: number) {
    this.status = status
    this.key = key
    this.velocity = velocity
  }

  isHeaderButton(): boolean {
    return this.status == HEADER_BUTTON_STATUS_CODE
  }

  isGridButton(): boolean {
    return !this.isHeaderButton()
  }

  isPressed(): boolean {
    return this.velocity == VELOCITY_PRESSED
  }

  isReleased(): boolean {
    return !this.isPressed()
  }
}

export type GridCoordinate = {
  col: number,
  row: number,
}

// Convert an x-y (column-row) grid coordinate to the appropriate grid key number
export function GridCoordinateToKey(coord: GridCoordinate): number {
  return (16 * coord.row) + coord.col;
}

export function CoordToKey(c:number, r:number):number {
  return GridCoordinateToKey({col: c, row: r})
}


// convert a grid key number to a grid coordinate
export function GridKeyToCoordinate(key: number): GridCoordinate {
  return {
    col: key % 16,
    row: Math.floor(key / 16),
  }
}

export function HeaderKeyToIndex(key: number): number {
  return key - HEADER_KEY_INDEX_OFFSET
}

export function HeaderIndexToKey(index: number): number {
  return index + HEADER_KEY_INDEX_OFFSET
}
