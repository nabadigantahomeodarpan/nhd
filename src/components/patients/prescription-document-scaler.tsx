"use client";

import React, { useEffect, useRef, useState } from "react";

export function PrescriptionDocumentScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // 14.8cm = ~559px (assuming 96 DPI)
  // 21cm = ~794px
  const DOC_WIDTH_PX = 560;
  const DOC_HEIGHT_PX = 794;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // Subtract a small amount of padding (e.g., 32px for mobile sides)
        const containerWidth = containerRef.current.clientWidth - 16; 
        if (containerWidth < DOC_WIDTH_PX) {
          setScale(containerWidth / DOC_WIDTH_PX);
        } else {
          setScale(1);
        }
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center print:block print:w-full overflow-hidden print:overflow-visible"
    >
      <div 
        className="origin-top transition-transform duration-200 ease-out print:!transform-none"
        style={{ 
          transform: `scale(${scale})`,
          // Adjust the height of the wrapper so we don't have massive empty space below the scaled document
          marginBottom: scale < 1 ? `-${(1 - scale) * DOC_HEIGHT_PX}px` : '0',
        }}
      >
        {children}
      </div>
    </div>
  );
}
