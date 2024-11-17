export type BulkOperationData<Create extends object, Update extends object> = {
  add: Array<Create>;
  update: Array<Update>;
  remove: Array<string>;
};

export type Body<B extends object, K extends keyof B = never, O extends keyof B = never> = Pick<B, K> &
  Partial<Pick<B, O>>;

export type ResponseData<F extends (...args: any) => any> = Awaited<ReturnType<F>>;

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;

export type DottedObjectStringPaths<O extends Record<string, unknown>> = Join<PathsToStringProps<O>, '.'>;
