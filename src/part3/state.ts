export type State<S, A> = (initialState: S) => [S, A];

export const bind: <S, A, B>(
  state: State<S, A>,
  f: (x: A) => State<S, B>
) => State<S, B> = <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => {
  return (initialState: S): [S, B] => {
    const [newState, result] = state(initialState);
    return f(result)(newState);
  };
};
