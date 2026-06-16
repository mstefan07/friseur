"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GripVertical } from "lucide-react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  title: string;
};

const clamp = (value: number) => Math.min(92, Math.max(8, value));

export function BeforeAfterSlider({ before, after, title }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next));
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    updatePosition(event.clientX);
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((value) => clamp(value - 4));
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((value) => clamp(value + 4));
    }
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`${title}: Vorher-Nachher Vergleich`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      className="group relative aspect-[4/5] w-full cursor-ew-resize touch-none overflow-hidden border border-white/12 bg-[#11100e] outline-none ring-[#d3ae73]/45 transition focus-visible:ring-2"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onKeyDown={handleKeyDown}
    >
      <Image
        src={after}
        alt={`${title} nachher`}
        fill
        sizes="(min-width: 1024px) 31vw, 100vw"
        className="object-cover"
      />
      <motion.div
        className="absolute inset-0"
        animate={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        transition={{
          duration: isDragging ? 0 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={before}
          alt={`${title} vorher`}
          fill
          sizes="(min-width: 1024px) 31vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <span className="absolute left-4 top-4 bg-black/62 px-3 py-1.5 text-xs font-semibold text-[#f7f1e7] backdrop-blur">
        Vorher
      </span>
      <span className="absolute right-4 top-4 bg-[#d3ae73]/88 px-3 py-1.5 text-xs font-semibold text-[#12110f] backdrop-blur">
        Nachher
      </span>

      <motion.div
        className="absolute inset-y-0 z-10 w-px bg-[#f3ead9]"
        animate={{ left: `${position}%` }}
        transition={{ duration: isDragging ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#f3ead9]/70 bg-[#090907]/78 text-[#d3ae73] shadow-bronze backdrop-blur transition group-hover:scale-105"
        animate={{ left: `${position}%` }}
        transition={{ duration: isDragging ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <GripVertical className="size-5" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
