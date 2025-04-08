export interface ProductOptions {
  productid?: string;
  userid?: string;
  orderid?: string;
  name?: string;
  quantity?: number | string;
  price?: number;
  inventory?: number;
  total?: number;
  [key: string]: any; // For additional properties
}

export interface myProduct {
  productid: string;
  name: string;
  price: number;
  inventory: number;
  description?: string;
  category?: string;
}
export interface myCart {
  productid: string;
  userid: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  category?: string;
}

export interface updateCart {
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  category?: string;
}

export interface myOrder {
  orderid: string;
  userid: string;
  timestamp: string;
  status: string;
  items: myCart[];
  total: number;
}
// export interface myProduct extends ProductOptions {
//   productid: string;
//   name: string;
//   price: number;
//   inventory: number;
//   description?: string;
//   category?: string;
// }
export interface productResponse {
  message: string;
  response: string | myProduct[] | myProduct;
}

export interface cartResponse {
  message: string;
  response: string | myCart[] | myCart;
}

export interface orderResponse {
  message: string;
  response: string | myOrder[] | myOrder;
}
