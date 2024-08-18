import { CartItem, Product } from "../types";

export const addItemToCart = (
  cart: CartItem[],
  product: Product
): CartItem[] => {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cart, { ...product, quantity: 1 }];
};

export const removeItemFromCart = (
  cart: CartItem[],
  productId: number
): CartItem[] => {
  return cart.filter((item) => item.id !== productId);
};

export const updateItemQuantity = (
  cart: CartItem[],
  productId: number,
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, newQuantity) }
        : item
    )
    .filter((item) => item.quantity > 0);
};

export const getItem = (cart: CartItem[], productId: number) => {
  return cart.find(item => item.id === productId);
}

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateCartItemsCount = (cart: CartItem[]): number => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
