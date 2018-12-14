import { layers, Model, sequential, Tensor, tensor2d, tidy } from '@tensorflow/tfjs';

export function modelDispose(model: Model) {
  model.dispose();
}

export async function modelOutput(model: Model) {
  const output = model.getLayer(null, model.layers.length - 1);
  const result = (await Promise.all(output.weights.map(_ => _.read()).map(_ => _.data())))
    .reduce((acc, ii) => acc.concat([...Array.from(ii)]), <number[]>[]);
  return result;
}

export async function modelPredict({ model = <Model>null, xx = <number[]>[] }) {
  const _prediction = tidy(() => model.predict(tensor2d(xx, [xx.length, 1])));
  if (Array.isArray(_prediction)) {
    (_prediction as Tensor[]).forEach(_ => _.dispose());
    throw new Error('Not supported yet');
  }
  const prediction = _prediction as Tensor;
  const synced = await prediction.data();
  prediction.dispose();
  return Array.from(synced);
}

export function modelPolynomCreate({ loss = 'meanSquaredError', optimizer = 'sgd' }) {
  const model = sequential();
  tidy(() => {
    model.add(layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss, optimizer });
  });
  return model;
}

export async function modelPolynomTrain({ model = <Model>null, weights = <number[]>[], xyFlatData = <number[]>[], loops = 1 }) {
  tidy(() => {
    const output = model.getLayer(null, model.layers.length - 1);
    const _weights = output.getWeights();
    console.log(_weights.map(_ => _.shape));
    // output.setWeights([tensor2d([weights[0]], [1, 1]), _weights[1]]);
  });

  const points = xyFlatData.length / 2;
  const xs = tensor2d(xyFlatData.filter((_, index) => index % 2 === 0), [points, 1]);
  const ys = tensor2d(xyFlatData.filter((_, index) => index % 2 !== 0), [points, 1]);
  await model.fit(xs, ys, { epochs: loops });
  [xs, ys].forEach(_ => _.dispose());
  return model;
}
