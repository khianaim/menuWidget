"use client";
import { useState } from "react";
import ProductWidget from "./components/Treats/TOTD/menuWidget";

export default function App() {
  const [orderCount, setOrderCount] = useState(1);

  const handlePlaceOrderClick = () => {
    setOrderCount((prev) => (prev < 8 ? prev + 1 : prev));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
      }}
    >
      {/* Widgets Section */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          marginTop: "90px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <ProductWidget handlePlaceOrderClick={handlePlaceOrderClick} />
      </div>
    </main>
  );
}
