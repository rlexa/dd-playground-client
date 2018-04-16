export function generatePolynomialPoints({ weights = <number[]>[], points = 10, xFrom = 0, xTo = 100 }) {
  const flatPoints = Array<number>(points * 2);
  for (let ii = 0; ii < points; ++ii) {
    const xx = xFrom + Math.random() * (xTo - xFrom);
    const yy = weights.reduce((acc, val, index) => acc + val * xx ** (weights.length - 1 - index), 0);
    flatPoints[2 * ii] = xx;
    flatPoints[2 * ii + 1] = yy;
  }
  return flatPoints;
}

export const times = (val: number) => Array.from(Array(Math.max(val || 0, 0)).keys());
