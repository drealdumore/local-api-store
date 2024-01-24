interface ContactAddress {
  _id: string;
  streetAddress: string;
  city: string;
  province: string;
  country: string;
  zip: number;
  defaultAddress: boolean | null;
}

export interface CartItem {
  data: any;
  date: string;
  _id: string;
  product: string;
  name: string;
  colour: string;
}

interface UserData {
  emailConfirm: boolean;
  photo: string;
  role: string;
  wishList: any[]; // Adjust the type accordingly
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  interest: string;
  cart: CartItem[];
  contactAddress: ContactAddress[];
  id: string;
}

interface LoginResponseData {
  user: UserData;
}

export interface LoginResponse {
  status: string;
  token: string;
  data: LoginResponseData;
}
