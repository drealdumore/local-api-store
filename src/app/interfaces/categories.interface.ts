export interface ICategoryResponse {
  status: string;
  results: number;
  data: {
    data: ICategory[];
  };
}

export interface ICategory {
  createdAt: Date;
  id: string;
  name: string;
  _id: string;
  updatedAt: Date;
}
