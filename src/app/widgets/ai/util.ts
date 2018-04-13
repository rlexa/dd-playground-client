import * as tf from '@tensorflow/tfjs';

const arrayFrom = (len: number) => Array.from(Array(Math.max(len || 0, 0)).keys());

function generatePolynomialPoints(weights: number[], points: number, xUntil = 10) {
  const flatPoints = Array<number>(points * 2);
  for (let ii = 0; ii < points; ++ii) {
    const xx = Math.random() * 100;
    const yy = weights.reduce((acc, val, index) => acc + val * xx ** (weights.length - 1 - index), 0);
    flatPoints[2 * ii] = xx;
    flatPoints[2 * ii + 1] = yy;
  }
  return flatPoints;
}

/** Detect n weights of a polynom. */
async function detectPolynom({ xyFlatData = <number[]>[], initialWeights = <number[]>[], loops = 100, learningRate = .01 }) {
  // VARIABLES
  const variables = initialWeights.map(ii => tf.variable(tf.scalar(ii || 0)));

  // MODEL
  const doPredict = (xs: tf.Tensor) => tf.tidy(() =>
    variables.reduce((acc, weight, index) => acc.add(weight.mul(xs.pow(tf.scalar(variables.length - 1 - index)))), tf.scalar(0))
  );

  // LOSS: MSE (mean squared error) i.e. mean of squares per diff
  const doLoss = (predictions: tf.Tensor, labels: tf.Tensor) => tf.tidy(() => predictions.sub(labels).square().mean());

  // OPTIMIZER
  const optimizer = tf.train.adam(learningRate);

  // TRAIN
  const doTrain = (xs: tf.Tensor, ys: tf.Tensor) => tf.tidy(() =>
    optimizer.minimize(() => <tf.Tensor<tf.Rank.R0>>doLoss(doPredict(xs), ys)));
  const doTrainTimes = (xs: tf.Tensor, ys: tf.Tensor, times: number) =>
    arrayFrom(times).map(ii => doTrain(xs, ys)).filter(ii => !!ii).forEach(ii => ii.dispose());

  // EXECUTE
  const xData = tf.tensor1d(xyFlatData.filter((ii, index) => index % 2 === 0));
  const yData = tf.tensor1d(xyFlatData.filter((ii, index) => index % 2 !== 0));
  if (variables.length > 0 && xyFlatData.length > 0 && loops > 0) {
    doTrainTimes(xData, yData, loops);
  }

  // RESULT
  const result = (await Promise.all(variables.map(ii => ii.data())))
    .reduce((acc, ii) => acc.concat([...ii]), <number[]>[]);

  // CLEANUP
  [...variables, xData, yData].forEach(ii => ii.dispose());

  return result;
}

function tryDetectPolynom(xyFlatData: number[], polynomWeights = <number[]>[], initialWeights: number[], loops: number, learningRate: number) {
  const now = Date.now();
  detectPolynom({ xyFlatData, initialWeights, loops, learningRate })
    .then(weights => {
      console.log(`\nWeights of f(x) of ${polynomWeights.length}. order, weights: ${polynomWeights.join(', ')}`);
      console.log(`\t> ${loops} times in ${Date.now() - now}ms, weights: ${weights.join(', ')}`);
      for (let ii = 0; ii < xyFlatData.length; ii += 2) {
        const x = xyFlatData[ii];
        const y = xyFlatData[ii + 1];
        const yTrained = weights.reduce((acc, val, index) => acc + val * x ** (weights.length - 1 - index), 0);
        console.log(`\t\tx: ${x}, y: ${y} <=> ${yTrained} ==> ${Math.abs(yTrained - y)}`);
      }
    });
}

export function approximatePolynom({ polynomWeights = <number[]>[], pointCount = 10, xRange = 100 }) {
  const initWeights = polynomWeights.map(ii => 0);
  const rateLearn = .5;
  const generatedPoints = generatePolynomialPoints(polynomWeights, pointCount, xRange);
  [1, 10, 100, 1000, 10000].forEach(loops => tryDetectPolynom(generatedPoints, polynomWeights, initWeights, loops, rateLearn));
}
