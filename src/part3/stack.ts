import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push: (x: number) => State<Stack, any> = (x: number) => {
  return (init: Stack) => [[x].concat(init), undefined];
};

export const pop: State<Stack, number> = (init: Stack) => [
  R.tail(init),
  init[0],
];

export const stackManip: State<Stack, number> = bind(pop, (x: number) =>
  bind(push(x * x), (a: any) => bind(pop, (y: number) => push(x + y)))
);
