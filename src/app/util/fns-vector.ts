import {fnAnd, fnCompose, fnIndexOf, fnLift2to2, fnLift2x2, fnSame, fnSome, fnSum, fnWrapGet, fnWrapKey, fnWrapSet} from './fns';

export interface Vector {
  x: number;
  y: number;
}

const vectorX = fnWrapKey<Vector, 'x'>('x');
export const getX = fnWrapGet(vectorX);
export const setX = fnWrapSet(vectorX);

const vectorY = fnWrapKey<Vector, 'y'>('y');
export const getY = fnWrapGet(vectorY);
export const setY = fnWrapSet(vectorY);

export const makeVector = (x: number) => (y: number) => fnCompose(setX(x), setY(y))(null);

export const vecZero = makeVector(0)(0);

export const isVecSameX = fnLift2to2(fnSame)(getX)(getX);
export const isVecSameY = fnLift2to2(fnSame)(getY)(getY);

export const sumVecX = fnLift2to2(fnSum)(getX)(getX);
export const sumVecY = fnLift2to2(fnSum)(getY)(getY);

export const equalVectors = fnLift2x2(fnAnd)(isVecSameX)(isVecSameY);
export const sumVectors = fnLift2x2(makeVector)(sumVecX)(sumVecY);
export const isZeroVector = equalVectors(vecZero);
export const includesVector = fnSome(equalVectors);
export const indexOfVector = fnIndexOf(equalVectors);
