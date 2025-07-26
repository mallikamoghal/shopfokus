import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import kiwi from "../assets/kiwi.png";
import mango from "../assets/mango.png";
import strawberry from "../assets/strawberry.png";
import watermelon from "../assets/watermelon.png";
import pineapple from "../assets/pineapple.png";
import lemon from "../assets/lemon.png";

const fruitImages = [kiwi, mango, strawberry, watermelon, lemon, pineapple];

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/fokus_products.csv");
        const text = await response.text();

        const rows = text.trim().split("\n");
        const headers = rows[0].split(",").map((h) => h.trim());

        const parsed = rows.slice(1).map((row) => {
          const values = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((v) => v.trim().replace(/^"|"$/g, ""));
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = values[i];
          });
          return obj;
        });

        const products = parsed
          .map((data) => {
            const title = data.title?.trim();
            const price = parseFloat(data.price);
            const images = data.image?.split(";").map((img) => img.trim()).filter(Boolean) || [];
            const ingredients = data.ingredients?.split(",").map((i) => i.trim()).filter(Boolean) || [];
            const description = data.description || "";

            if (!title || isNaN(price) || images.length === 0) return null;

            return {
              id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              title,
              price,
              images,
              ingredients,
              description,
              theme: /kiwi/i.test(title)
                ? "#A3D952"
                : /strawberry/i.test(title)
                ? "#F25774"
                : /mango/i.test(title)
                ? "#F2C12E"
                : /pack/i.test(title)
                ? "#D98E04"
                : "#cccccc",
            };
          })
          .filter(Boolean);

        setProducts(products);
      } catch (error) {
        console.error("Error loading CSV:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selected) {
      const interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % selected.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selected]);

  return (
    <div style={{ paddingTop: "60px", background: "#fffef7", overflow: "hidden", position: "relative" }}>
      {fruitImages.map((fruit, i) => (
        <img
          key={i}
          src={fruit}
          alt=""
          style={{
            position: "absolute",
            top: `${20 + i * 80}px`,
            left: `${(i % 3) * 30 + 10}%`,
            width: "60px",
            opacity: 0.1,
            animation: `float${(i % 3) + 1} 18s ease-in-out infinite`,
            zIndex: 0
          }}
        />
      ))}

      <svg viewBox="0 0 1440 320" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "80px", zIndex: 1 }}>
        <path fill="none" stroke="#F2C12E" strokeWidth="3" d="M0,96L80,106.7C160,117,320,139,480,160C640,181,800,203,960,186.7C1120,171,1280,117,1360,90.7L1440,64" />
      </svg>

      {selected ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "20px 0px",
          backgroundColor: selected.theme,
          borderRadius: "20px",
          margin: "0 20px",
        }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>{selected.title}</h2>
            <p style={{ fontWeight: "bold", margin: "10px 0" }}>₹{selected.price}</p>
            <p style={{ marginBottom: "10px" }}>{selected.description}</p>
            <h4 style={{ fontWeight: "bold" }}>Ingredients:</h4>
            <ul style={{ paddingLeft: "20px" }}>
              {selected.ingredients.map((ing, i) => (
                <li key={i} style={{ fontWeight: "500" }}>{ing}</li>
              ))}
            </ul>
            <button
              onClick={() => addToCart(selected)}
              style={{
                marginTop: "20px",
                padding: "12px 24px",
                background: "#000",
                color: "white",
                borderRadius: "10px",
                border: "none"
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                background: "white",
                color: selected.theme,
                borderRadius: "10px",
                fontWeight: "bold"
              }}
            >
              ← Back to Products
            </button>
          </div>

          <div style={{ flex: 1, textAlign: "center", minWidth: 300 }}>
            <img
              src={selected.images?.[imageIndex]}
              alt={selected.title}
              style={{ maxWidth: "100%", borderRadius: "16px", maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          padding: "40px 20px",
          position: "relative",
          zIndex: 1,
        }}>
          {products.map((p, i) => (
            <div key={i}
              onClick={() => setSelected(p)}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "16px",
                cursor: "pointer",
                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
            >
              <div style={{
                height: "180px",
                background: p.theme,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px"
              }}>
                {p.images?.[0] && (
                  <img src={p.images[0]} alt={p.title} style={{ height: "100%", borderRadius: "12px" }} />
                )}
              </div>
              <h4 style={{ fontWeight: "bold" }}>{p.title}</h4>
              <p style={{ fontWeight: "bold", color: "#F20505" }}>₹{p.price}</p>
            </div>
          ))}
        </div>
      )}

      <svg viewBox="0 0 1440 320" style={{ width: "100%", height: "80px", display: "block", marginBottom: "-10px" }}>
        <path fill="none" stroke="#A3D952" strokeWidth="3" d="M0,224L80,213.3C160,203,320,181,480,149.3C640,117,800,75,960,85.3C1120,96,1280,160,1360,192L1440,224" />
      </svg>

      <div style={{ height: "0px", marginBottom: "-40px" }} />

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Products;
