const WHITE = '#ffffff'
const ASPHALT = '#15151e'

function channel(value: number): number {
  const c = value / 255

  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/** WCAG relative luminance of a #rrggbb color. */
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const r = channel((n >> 16) & 0xff)
  const g = channel((n >> 8) & 0xff)
  const b = channel(n & 0xff)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two #rrggbb colors, from 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)

  return (light + 0.05) / (dark + 0.05)
}

/** White or asphalt text, whichever reads better on the given fill. */
export function readableInk(background: string): string {
  return contrastRatio(background, WHITE) >= contrastRatio(background, ASPHALT) ? WHITE : ASPHALT
}
