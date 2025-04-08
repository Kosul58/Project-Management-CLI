export interface ProductOptions {
  productid?: string;
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
