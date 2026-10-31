import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'atelier-dimanche-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const addItem = (item) => {
      // Chaque pièce est unique : la quantité est plafonnée au stock disponible.
      const max = item.max ?? 1;
      setItems((prev) => {
        const existing = prev.find((entry) => entry.id === item.id);
        if (existing) {
          return prev.map((entry) =>
            entry.id === item.id
              ? { ...entry, max, quantity: Math.min(entry.quantity + (item.quantity || 1), max) }
              : entry,
          );
        }
        return [...prev, { ...item, max, quantity: Math.min(item.quantity || 1, max) }];
      });
      setIsOpen(true);
    };

    return {
      items,
      isOpen,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
      addItem,
      removeItem: (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
      setQuantity: (id, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((item) => item.id !== id)
            : prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.min(quantity, item.max ?? 1) } : item,
              ),
        ),
      clear: () => setItems([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart doit être utilisé dans un CartProvider');
  return context;
}