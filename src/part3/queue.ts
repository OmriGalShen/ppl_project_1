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

// export const queueManip: State<Queue, number> = (init: Queue) => {
//   //   const [s1, x] = dequeue(init);
//   //   const [s2, y] = enqueue(x * 2)(s1);
//   //   const [s3, res3] = enqueue(x / 3)(s2);
//   //   const [s4, z] = dequeue(s3);
//   //   return [s4, z];

// //   const b1 = bind(dequeue, (x: number) => enqueue(x * 2));
// //   const b2 = bind(b1, (x: number) => enqueue(x / 3));
// };

export const queueManip: State<Queue, number> = bind(
  bind(dequeue, (x: number) =>
    bind(enqueue(x * 2), (y: number) => enqueue(x / 3))
  ),
  (z: number) => dequeue
);

console.log("before: [6,7,8]");
console.log(queueManip([6, 7, 8]));
