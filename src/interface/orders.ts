interface ProductInOrder {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface CartItem {
  id: string;
  product: ProductInOrder;
  count: number;
  price: number;
}

interface OrderI {
  id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  cartItems: CartItem[];
}
