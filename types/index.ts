export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
}

export interface CartItemProps {
  item: CartItem;
}

export interface ProductCardProps {
  product: Product;
}
