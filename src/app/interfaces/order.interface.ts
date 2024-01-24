interface Order {
  paid: boolean;
  status: string;
  _id: string;
  orderId: string;
  amount: number;
  product: Product[];
  user: string;
  deliveryName: string;
  contactNumber: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  calAmount: number;
  __v: number;
}

interface Product {
  status: string;
  customerStatus: string;
  _id: string;
  productID: {
    _id: string;
    name: string;
    id: string;
  };
  name: string;
  colour: string;
  price: number;
  image: string;
  quantity: number;
}


interface CartItem {
    date: string;
    _id: string;
    product: string;
    name: string;
    colour: string;
  }

interface OrderResponse {
  status: string;
  results: number;
  data: {
    order: Order[];
  };
}
