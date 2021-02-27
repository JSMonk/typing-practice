type Factory<A, R> = { of(value: A): R }

export default function or<I, A, B>(a: Factory<I, A>, b: Factory<I, B>) {
  return (value: I): A | B => {
    try {
      return a.of(value);
    } catch (e1) {
      try {
        return b.of(value);
      } catch (e2) {
        throw new TypeError(e1.mesage + " and " + e2.message);
      }
    }
  };
}
