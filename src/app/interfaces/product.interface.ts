export interface IProductResponse {
  status: string;
  results: number;
  data: {
    data: IProduct[];
  };
}

interface IProductColour {
  _id: string;
  colour: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  colourImage: string;
}

interface IReviews {
  _id: string;
  rating: number;
  product: string;
  user: {
    _id: string;
    name: string;
    id: string;
  };
  createdAt: string;
  id: string;
}

export interface IProduct {
  priceDiscountPercent: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  sales: number;
  images: string[];
  shipping: boolean;
  _id: string;
  name: string;
  description: string;
  tag: string;
  category: {
    _id: string;
    name: string;
    id: string;
  };
  colour: IProductColour[];
  specification: {
    model: string;
    material: string;
    shipping: string | boolean;
  };
  createdAt: string;
  updatedAt: string;
  lowPrice: number;
  highPrice: number;
  discountedLowPrice: number;
  discountedHighPrice: number;
  slug: string;
  __v: number;
  imageCover: string;
  quantity: number;
  reviewStats: {
    star1: number;
    star2: number;
    star3: number;
    star4: number;
    star5: number;
  };
  reviews: IReviews[];
  id: string;
}
