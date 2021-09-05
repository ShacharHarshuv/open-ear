export type ArrayItemType<GArray> = GArray extends Array<infer U> ? U : never;
