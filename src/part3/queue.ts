import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

export const enqueue: (x: number) => State<Queue, any> = (x: number) => {
  return (init: Queue) => [init.concat([x]), undefined];
};

export const dequeue: State<Queue, number> = (init: Queue) => [
  R.slice(1, Infinity, init),
  init[0],
];

export const queueManip: State<Queue, number> = bind(dequeue, (x: number) =>
  bind(enqueue(2 * x), (y: any) => bind(enqueue(x / 3), (z: any) => dequeue))
);
