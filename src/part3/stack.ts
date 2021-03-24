import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push: (x: number) => State<Stack, undefined> = (x: number) => {
  return (s: Stack) => [[x].concat(s), undefined];
};

export const pop: State<Stack, number> = (s: Stack) => [R.tail(s), s[0]];

export const stackManip: State<Stack, undefined> = bind(pop, (x: number) =>
  bind(push(x * x), (a: undefined) => bind(pop, (y: number) => push(x + y)))
);
