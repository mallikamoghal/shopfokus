import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";

const Cart = () => {
  const { cartItem, updateQuantity, deleteItem, getTotalAmount, clearCart } = useCart();

  const handlingCharge = 5;
  const totalAmount = getTotalAmount();
  const grandTotal = totalAmount + handlingCharge;

  const getProductId = (item) => item.id ?? item.title ?? item._id;

  const [delivery, setDelivery] = useState({
    name: "",
    phone: "",
    address: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!delivery.name || !delivery.phone || !delivery.address) {
      alert("Please fill all the required fields.");
      return;
    }
    alert("Order submitted successfully!");
    clearCart();
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const address = data.display_name;
          setDelivery((prev) => ({ ...prev, location: address, address }));
        } catch {
          alert("Failed to retrieve address.");
        }
      },
      () => alert("Unable to fetch location.")
    );
  };

  const Box = ({ children, style }) => (
    <div style={{
      borderRadius: "20px",
      padding: "20px",
      background: "#fffef7",
      border: "1.5px solid #F2C12E",
      ...style,
    }}>{children}</div>
  );

  const gridStyle = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    margin: "40px 0",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    background: "#fff",
    color: "#000",
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "#fffef7",
      paddingTop: "80px" // ✅ Fix overlap from fixed navbar
    }}>
      <div style={{
        flex: 1,
        padding: "40px 20px",
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}>
        <Box style={{ background: "#F25774", color: "white", textAlign: "center", position: "relative" }}>
          <h1><FaShoppingBag /> My Fresh Cart</h1>
          <p>{cartItem.length} item{cartItem.length !== 1 ? "s" : ""} ready to order</p>
          <svg viewBox="0 0 1440 320" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px" }}>
            <path fill="none" stroke="#F2C12E" strokeWidth="3" d="M0,96L80,106.7C160,117,320,139,480,160C640,181,800,203,960,186.7C1120,171,1280,117,1360,90.7L1440,64" />
          </svg>
        </Box>

        {cartItem.length === 0 ? (
          <Box style={{ background: "#F25774", color: "white", textAlign: "center", marginTop: 40 }}>
            <h2>Your cart is empty 🛒</h2>
            <p>Add some delicious items to get started!</p>
          </Box>
        ) : (
          <>
            <div style={gridStyle}>
              {cartItem.map((item) => (
                <Box key={getProductId(item)} style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <div style={{ width: "100px", height: "100px", overflow: "hidden", borderRadius: "10px" }}>
                        <img src={item.image || item.images?.[0]} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>₹{item.price}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <button onClick={() => updateQuantity(getProductId(item), "decrease")} style={{ backgroundColor: "#A3D952", color: "white", border: "none", borderRadius: 10, padding: "6px 12px" }}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(getProductId(item), "increase")} style={{ backgroundColor: "#A3D952", color: "white", border: "none", borderRadius: 10, padding: "6px 12px" }}>+</button>
                      <button onClick={() => deleteItem(getProductId(item))} style={{ backgroundColor: "#F20505", color: "white", border: "none", borderRadius: 10, padding: 10 }}><FaRegTrashAlt /></button>
                    </div>
                  </div>
                </Box>
              ))}
            </div>

            <div style={gridStyle}>
              <Box style={{ backgroundColor: "#F2C12E" }}>
                <h3>Order Summary</h3>
                <p>Items Total: ₹{totalAmount.toFixed(2)}</p>
                <p>Handling: ₹{handlingCharge}</p>
                <p><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></p>
                <button onClick={clearCart} style={{ marginTop: 10, background: "#F20505", color: "white", padding: "10px 20px", borderRadius: 10, border: "none" }}>Clear Cart</button>
              </Box>

              <Box style={{ backgroundColor: "#A3D952" }}>
                <h3 style={{ color: "white" }}><FaMapMarkerAlt /> Delivery Info</h3>
                <form onSubmit={handleSubmit} style={{ color: "black" }}>
                  <input type="text" placeholder="Full Name *" value={delivery.name} onChange={(e) => setDelivery({ ...delivery, name: e.target.value })} style={inputStyle} />
                  <input type="tel" placeholder="Phone Number *" value={delivery.phone} onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })} style={inputStyle} />
                  <textarea placeholder="Address *" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
                  <button type="button" onClick={handleLocation} style={{ marginBottom: 10, background: "#F2C12E", color: "black", padding: "10px 20px", borderRadius: 10, border: "none" }}>
                    📍 Use Current Location
                  </button>
                  {delivery.location && <p style={{ color: "#000", fontSize: "0.9rem", marginBottom: 10 }}>{delivery.location}</p>}
                  <button type="submit" style={{ backgroundColor: "#D98E04", color: "white", padding: "12px 24px", border: "none", borderRadius: 10, width: "100%", fontWeight: "bold" }}>Submit Order</button>
                </form>
              </Box>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
