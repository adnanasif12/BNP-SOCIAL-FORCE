import React, { useState, useEffect, useRef } from "react";
import "../styles/imageGallery.css";




const topImages = [
  {
    id: 1,
    bg: "#e8f5e9",
    label: "ছবি ১",
    src: null,
  },
  {
    id: 2,
    bg: "#e8eaf6",
    label: "ছবি ২",
    src: null,
  },
  {
    id: 3,
    bg: "#fff8e1",
    label: "ছবি ৩",
    src: null,
  },
  {
    id: 4,
    bg: "#fce4ec",
    label: "ছবি ৪",
    src: null,
  },
];

const bottomImages = [
  {
    id: 5,
    bg: "#fce4ec",
    label: "ছবি ৫",
    src: null,
  },
  {
    id: 6,
    bg: "#e8f5e9",
    label: "ছবি ৬",
    src: null,
  },
  {
    id: 7,
    bg: "#ede7f6",
    label: "ছবি ৭",
    src: null,
  },
  {
    id: 8,
    bg: "#e3f2fd",
    label: "ছবি ৮",
    src: null,
  },
];

const VISIBLE = 3;
const CARD_GAP = 24;

function useCarousel(items, direction = "left", interval = 3000) {
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const extendedItems = [...items, ...items, ...items];
  const totalItems = items.length;
  const startIndex = totalItems;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => {
        if (direction === "left") return prev + 1;
        return prev - 1;
      });
    }, interval);

    return () => clearInterval(timeoutRef.current);
  }, [direction, interval]);

  useEffect(() => {
    if (!isTransitioning) return;

    if (currentIndex >= totalItems * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems);
      }, 500);
    }

    if (currentIndex <= 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems);
      }, 500);
    }
  }, [currentIndex, totalItems, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return { extendedItems, currentIndex, isTransitioning };
}

function CarouselRow({ images, direction }) {
  const { extendedItems, currentIndex, isTransitioning } = useCarousel(
    images,
    direction,
    2500
  );



//   "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)" 

  return (
    <div className="gallery-carousel-wrapper">
      <div
        className="gallery-carousel-track"
        style={{
          transform: `translateX(calc(-${currentIndex} * (100% / 3 + ${CARD_GAP / 3}px)))`,
          transition: isTransitioning ? "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
          gap: `${CARD_GAP}px`,
        }}
      >
        {extendedItems.map((img, idx) => (
          <div
            key={idx}
            className="gallery-card"
            style={{ background: img.bg }}
          >
            {img.src ? (
              <img src={img.src} alt={img.label} className="gallery-card-img" />
            ) : (
              <div className="gallery-placeholder">
                <span className="gallery-camera-icon">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="9"
                      width="30"
                      height="21"
                      rx="3"
                      stroke="#aaa"
                      strokeWidth="2"
                      fill="white"
                      fillOpacity="0.7"
                    />
                    <circle cx="18" cy="19" r="5" stroke="#aaa" strokeWidth="2" fill="none" />
                    <rect x="13" y="6" width="10" height="5" rx="2" stroke="#aaa" strokeWidth="2" fill="white" fillOpacity="0.7" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImageGallery() {
  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <h2 className="gallery-title">
          <span className="gallery-title-bar">|</span> ছবি গ্যালারি
        </h2>
        <a href="#" className="gallery-see-all">
          সব দেখুন →
        </a>
      </div>

      {/* Top Row - Right to Left */}
      <div className="gallery-row-container">
        <CarouselRow images={topImages} direction="left" />
      </div>

      {/* Bottom Row - Left to Right */}
      <div className="gallery-row-container gallery-row-bottom">
        <CarouselRow images={bottomImages} direction="right" />
      </div>
    </section>
  );
}
