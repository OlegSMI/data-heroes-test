export interface IResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Array<T>;
}

export interface IRequest {}
