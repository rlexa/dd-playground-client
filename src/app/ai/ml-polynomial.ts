import { Rank, Tensor, scalar, tensor1d, tidy, train, variable } from '@tensorflow/tfjs';
import { times } from './util';

export async function detectPolynom({ xyFlatData = <number[]>[], initialWeights = <number[]>[], loops = 1, learningRate = .05 }) {
  // VARIABLES
  const variables = initialWeights.map(ii => variable(scalar(ii || 0)));

  // MODEL
  const doPredict = (xs: Tensor) => tidy(() =>
    variables.reduce((acc, weight, index) => acc.add(weight.mul(xs.pow(scalar(variables.length - 1 - index)))), scalar(0))
  );

  // LOSS: MSE (mean squared error) i.e. mean of squares per diff
  const doLoss = (predictions: Tensor, labels: Tensor) => tidy(() => predictions.sub(labels).square().mean());

  // OPTIMIZER
  const optimizer = train.adam(learningRate);

  // TRAIN
  const doTrain = (xs: Tensor, ys: Tensor) => tidy(() =>
    optimizer.minimize(() => <Tensor<Rank.R0>>doLoss(doPredict(xs), ys)));
  const doTrainTimes = (xs: Tensor, ys: Tensor, count: number) =>
    times(count).map(ii => doTrain(xs, ys)).filter(ii => !!ii).forEach(ii => ii.dispose());

  // EXECUTE
  const xData = tensor1d(xyFlatData.filter((ii, index) => index % 2 === 0));
  const yData = tensor1d(xyFlatData.filter((ii, index) => index % 2 !== 0));
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
