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

/**
 * Convert an {@link API.ColorValue} to a color value usable by the
 * launchpad mk1. The function discards the Blue component of the Color as
 * Launchpad only has green and blue LEDs.
 * For reference, the number returned follows the following format bitwise
 * format (Most Significant Bit First):
 * * 6    -> Always 0
 * * 5,4  -> Green Component
 * * 3    -> Clear-Bit
 * * 2    -> Copy-Bit ( Set to 0 to enable flashing )
 * * 1,0  -> Red Component
 *
 * @param bitwigColor The Color that should be converted
 * @param flashing Weather or not Flashing should be enabled on the launchpad
 * for this color
 *
 * @returns The closest color value the launchpad supports.
*/
export function BitwigToLaunchpadColor(bitwigColor: API.ColorValue, flashing: boolean): number {
  // TODO: Make sure that red() and green() return 0...1 value and not 0...255
  let bwRed = bitwigColor.red()
  let bwGreen = bitwigColor.green()

  return ConvertToLaunchpadColor(bwRed, bwGreen, flashing)
}

export function ConvertToLaunchpadColor(red: number, green: number, flashing: boolean): number {

  let lpRed = Math.round(red * 3) // launchpad values can be [0...3]
  let lpGreen = Math.round(green * 3)

  let flags = flashing ? 8 : 12 // Unset COPY Bit when Flashing required

  return (16 * lpGreen) + lpRed + flags
}



export function MatrixFilter<T>(matrix: T[][], fn: (value: T, col: number, row: number, matrix: T[][]) => boolean): T[] {
  let out: T[] = new Array()
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (fn(matrix[i][j], i, j, matrix)) {
        out.push(matrix[i][j])
      }
    }
  }
  return out
}

export function calculateQuarterNotesPerBar(timeSignature: string): number {
  let [numString, denomString] = timeSignature.split("/")

  let numerator: number = Number.parseInt(numString)
  let denominator: number = Number.parseInt(denomString)

  return numerator * 4 / denominator
}
