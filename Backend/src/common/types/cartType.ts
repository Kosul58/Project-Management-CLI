export interface Cart {
  productid: string;
  userid: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  category?: string;
}

export interface UpdateCart {
  // name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  category?: string;
}
