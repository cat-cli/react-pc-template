export type ApiRes<T> = {
  data: T;
  status: string;
  msg: string;
};

export type Data<T> = {
  total: number;
  items: T;
};
