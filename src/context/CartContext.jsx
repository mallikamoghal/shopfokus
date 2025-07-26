import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);

  const getProductId = (product) => product.id ?? product.title ?? product._id;

  const addToCart = (product) => {
    const id = getProductId(product);
    const itemInCart = cartItem.find((item) => getProductId(item) === id);

    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        getProductId(item) === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!");
    }
  };

 const updateQuantity = (productId, action) => {
  setCartItem((prevCart) =>
    prevCart
      .map((item) => {
        if (getProductId(item) === productId) {
          let newQuantity = item.quantity;
          if (action === "increase") {
            newQuantity += 1;
            toast.success("Quantity increased");
          } else if (action === "decrease") {
            newQuantity -= 1;
            toast.success("Quantity decreased");
          }
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item) => item !== null)
  );
};


  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => getProductId(item) !== productId));
    toast.success("Product is deleted from cart!");
  };

  const clearCart = () => {
    setCartItem([]);
    localStorage.removeItem("cartItems");
  };

 const getTotalAmount = () => {
  return cartItem.reduce((acc, item) => {
    // Clean the price string by removing any currency symbols, commas or spaces
    const cleanPrice =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^\d.]/g, ""))
        : item.price;

    return acc + cleanPrice * item.quantity;
  }, 0);
};


  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        deleteItem,
        getTotalAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
