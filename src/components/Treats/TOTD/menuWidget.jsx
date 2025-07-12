"use client";
import { useState } from "react";

export default function ProductWidget({ handlePlaceOrderClick }) {
  const treats = [
    {
      name: "Éclairs",
      price: "$7.99",
      src: "/images/eclairs.png",
    },
    {
      name: "Frischant",
      price: "$8.99",
      src: "/images/croissant.png",
    },
    {
      name: "Chantilly Cake",
      price: "$12.99",
      src: "/images/frenchchanillycake.png",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buttonLabel, setButtonLabel] = useState("Add to Eat");
  const [fadeKey, setFadeKey] = useState(0);

  function playClickSoundAndTriggerAction() {
    const audio = new Audio("/sounds/click.mp3");
    audio.play();
    setButtonLabel("Order placed");
    setTimeout(() => setButtonLabel("Add to Eat"), 1800);
    if (handlePlaceOrderClick) handlePlaceOrderClick();
  }

  const goToPrevious = () => {
    setFadeKey((k) => k + 1); // force fade restart
    setCurrentImageIndex((prev) => (prev === 0 ? treats.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setFadeKey((k) => k + 1);
    setCurrentImageIndex((prev) => (prev === treats.length - 1 ? 0 : prev + 1));
  };

  const currentTreat = treats[currentImageIndex];

  return (
    <div
      style={{
        width: 450,
        height: 300,
        borderRadius: 30,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#000",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        background: "linear-gradient(to bottom, #fdc8d2 15%, white)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Row: Label (Continuous Loop) */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginBottom: "8px",
          marginLeft: "14px",
          height: "24px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            fontSize: "14px",
            fontWeight: "200",
            textTransform: "uppercase",
            color: "#ff0000",
            animation: "scrollLeft 12s linear infinite",
            minWidth: "200%",
          }}
        >
          {[...Array(2)].map((_, outerIndex) => (
            <div key={outerIndex} style={{ display: "flex" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={`${outerIndex}-${i}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Treat of the day&nbsp;
                  <img
                    src="/images/totd.png"
                    alt="treat icon"
                    style={{
                      width: "20px",
                      height: "20px",
                      verticalAlign: "middle",
                      margin: "0 8px",
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes scrollLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Middle Row: Treat Carousel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left arrow */}
        <div
          onClick={goToPrevious}
          style={{
            position: "absolute",
            left: 10,
            fontSize: 24,
            cursor: "pointer",
            color: "#ff7d92",
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          ‹
        </div>

        {/* Image with fade transition */}
        <img
          key={`image-${fadeKey}`} 
          src={currentTreat.src}
          alt="Treat"
          style={{
            width: "50%",
            height: "auto",
            objectFit: "cover",
            opacity: 0,
            animation: "fadeIn 0.4s ease forwards",
          }}
        />

        {/* Right arrow */}
        <div
          onClick={goToNext}
          style={{
            position: "absolute",
            right: 10,
            fontSize: 24,
            cursor: "pointer",
            color: "#ff7d92",
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          ›
        </div>

        <style>{`
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}</style>
      </div>

      {/* Bottom Row: Product Name and Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4px",
          marginBottom: "0px",
          marginLeft: "14px",
          alignItems: "center",
        }}
      >
        <div
          key={`label-${fadeKey}`} 
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "#000",
            opacity: 0,
            animation: "fadeIn 0.4s ease forwards",
          }}
        >
          {currentTreat.name} ({currentTreat.price})
        </div>

        <div
          onClick={playClickSoundAndTriggerAction}
         style={{
          padding: "8px 16px",
          backgroundColor: "#ff0000",
          border: "2px solid #ff0000",
          borderRadius: 18,
          color: "#ffffff",
          textAlign: "center",
          fontSize: 14,
          fontWeight: "300",
          cursor: "pointer",
          transition: "all 0.3s ease",
          width: "120px", 
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        >
          {buttonLabel}
        </div>
      </div>
    </div>
  );
}
