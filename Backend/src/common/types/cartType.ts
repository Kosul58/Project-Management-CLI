export interface Cart {
  userid: string;
  products: CartProduct[];
}

export interface CartProduct {
  userid?: string;
  productid: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  category?: string;
  active?: boolean;
}

export interface UpdateCart {
  // name?: string;
  price?: number;
  quantity: number;
  description?: string;
  category?: string;
}
