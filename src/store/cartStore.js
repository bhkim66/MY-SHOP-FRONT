import { create } from 'zustand';
import { getCartCount } from '../api/buyer.api';

const useCartStore = create((set) => ({
    cartCount: 0,

    setCartCount: (count) => set({ cartCount: count }),

    incrementCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),

    decrementCartCount: (amount = 1) =>
        set((state) => ({ cartCount: Math.max(0, state.cartCount - amount) })),

    fetchCartCount: async () => {
        try {
            const response = await getCartCount();
            set({ cartCount: response ?? 0 });
        } catch (error) {
            console.error('장바구니 개수 조회 실패:', error);
        }
    },
}));

export default useCartStore;
