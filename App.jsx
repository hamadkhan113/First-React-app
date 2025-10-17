import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "VR Headset",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Arial, sans-serif",
        margin: 0,
        padding: 0,
        background: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#222",
          color: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>ShopEase</h1>
        <nav>
          <button
            style={{
              background: "#fff",
              color: "#222",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            onClick={() => setShowCart((s) => !s)}
          >
            🛒 Cart ({cart.length})
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem 2rem 1rem",
          background: "linear-gradient(90deg, #e3ffe6 0%, #fff 100%)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2.2rem", margin: "0 0 1rem 0" }}>
          Discover the Latest Tech Gadgets
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#444", marginBottom: "2rem" }}>
          Shop the best electronics at unbeatable prices. Fast shipping & secure checkout!
        </p>
        <a
          href="#products"
          style={{
            background: "#222",
            color: "#fff",
            padding: "0.8rem 2rem",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          Shop Now
        </a>
      </section>

      {/* Products */}
      <section
        id="products"
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: "0 1rem",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#222" }}>
          Featured Products
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                  objectFit: "cover",
                }}
              />
              <h4 style={{ margin: "0.5rem 0", fontSize: "1.2rem" }}>{product.name}</h4>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#27ae60" }}>
                ${product.price.toFixed(2)}
              </p>
              <button
                style={{
                  marginTop: "1rem",
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Modal */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowCart(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "2rem",
              minWidth: "320px",
              maxWidth: "90vw",
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: "1.2rem" }}>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "0.7rem",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        marginRight: "1rem",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold" }}>{item.name}</div>
                      <div style={{ color: "#27ae60" }}>${item.price.toFixed(2)}</div>
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      style={{
                        width: "50px",
                        marginRight: "1rem",
                        padding: "0.3rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      style={{
                        background: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.4rem 0.8rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginTop: "1rem" }}>
                  Total: ${total.toFixed(2)}
                </div>
                <button
                  style={{
                    marginTop: "1.5rem",
                    background: "#27ae60",
                    color: "#fff",
                    border: "none",
                    padding: "0.7rem 2rem",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => {
                    alert("Checkout successful!");
                    setCart([]);
                    setShowCart(false);
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#888",
              }}
              onClick={() => setShowCart(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          background: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "1rem",
          marginTop: "2rem",
        }}
      >
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
}