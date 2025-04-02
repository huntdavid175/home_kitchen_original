import { atom } from "jotai";

export interface MealPlanState {
  people: number;
  mealsPerWeek: number;
  total: number;
  prices: {
    boxPrice: number;
    pricePerServing: number;
    firstBoxTotal: number;
    discount: number;
  };
}

export const mealPlanAtom = atom<MealPlanState>({
  people: 4,
  mealsPerWeek: 3,
  total: 0,
  prices: {
    boxPrice: 0,
    pricePerServing: 0,
    firstBoxTotal: 0,
    discount: 0,
  },
});

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export const cartAtom = atom<CartItem[]>([]);
