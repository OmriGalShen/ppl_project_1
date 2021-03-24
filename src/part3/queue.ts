import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

export const enqueue: (x: number) => State<Queue, undefined> = (x: number) => {
  return (q: Queue) => [q.concat([x]), undefined];
};

export const dequeue: State<Queue, number> = (q: Queue) => [
  R.slice(1, Infinity, q),
  q[0],
];

export const queueManip: State<Queue, number> = bind(dequeue, (x: number) =>
  bind(enqueue(2 * x), (y: undefined) =>
    bind(enqueue(x / 3), (z: undefined) => dequeue)
  )
);
