export function printVar(name: String, key: any) {
  println(name + ": " + key.toString())
}

export enum Color {
  OFF = 12,
  RED_LOW = 13,
  RED_FULL = 15,
  AMBER_LOW = 29,
  AMBER_FULL = 63,
  YELLOW_FULL = 62,
  YELLOW_LOW = 0x2D,
  ORANGE = 39,
  ORANGE_FLASHING = 35,
  LIME = 0x3D,
  GREEN_LOW = 28,
  GREEN_FULL = 60,
  RED_FLASHING = 11,
  AMBER_FLASHING = 59,
  YELLOW_FLASHING = 58,
  GREEN_FLASHING = 56,
}

export enum ScrollDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export function RandomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue;
}

export function MatrixForEach<T>(matrix: T[][], fn: (value: T, col: number, row: number, matrix: T[][]) => void) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      fn(matrix[i][j], i, j, matrix)
    }
  }
}

export function MatrixFilter<T>(matrix: T[][], fn: (value: T, col: number, row: number, matrix: T[][]) => boolean): T[] {
  let out: T[] = new Array()
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if(fn(matrix[i][j], i, j, matrix)) {
        out.push(matrix[i][j])
      }
    }
  }
  return out
}
