import { Product } from './../models/product.interface';
import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0
}

export const CartStore = signalStore({providedIn: 'root'}, 
  withState(initialState), 
  withComputed(({products}) => ({
      productsCount: computed(() => calculateTotalCount(products())),
      totalAmount: computed(() => calculateTotalAmount(products()))
    })),
  withMethods(({products, ...store}) => ({
  addToCart(product:Product){
    const isProductInCart = products().find((item:Product)=> item.id === product.id);
    if(isProductInCart){
      isProductInCart.qty += 1;
      isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
      patchState(store, { products: [...products()] });
    } else {
      patchState(store, { products: [...products(), product] });
    }
   
   },
  removeFromCart(id:number){
    const updatedProducts = products().filter(product => product.id !== id);
    patchState(store, { products: updatedProducts });
   },   
  clearCart(){ 
    patchState(store, initialState);
  }
})));

const calculateTotalAmount = (products: Product[]): number => {
  return products.reduce((acc, product) => acc + product.price, 0);
}

const calculateTotalCount = (products: Product[]): number => {
  return products.reduce((acc, product) => acc + product.qty, 0);
}