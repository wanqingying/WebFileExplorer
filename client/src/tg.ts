type Fsn<A extends Array<any>, R> = (...args: A) => Promise<R>;

const b: Partial<any>;

type Enp<T extends Record<string, Fsn<any, any>>> = {
  [P in keyof T]?: { id: string; fn: T[P] };
};

function createLargeObj<T extends Record<string, any>>(obj: T): Enp<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [key, { id: 333, data: value }];
    })
  ) as any;
}

const xb = createLargeObj({
  name: (b: string) => {
    return "xxx";
  },
});

function isNumber<T extends any>(x: T): (T extends number ? true : false) {
  return (typeof x === "number") as any;
}
const b = isNumber(4);

function isString(x: any): x is string {
  return typeof x === "string";
}
