"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scroller = scrollerRef.current;

    // Evita duplicar os itens novamente durante re-renderizações
    if (scroller.dataset.duplicated === "true") {
      return;
    }

    const scrollerContent = Array.from(scroller.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scroller.appendChild(duplicatedItem);
    });

    scroller.dataset.duplicated = "true";

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );

    const duration =
      speed === "fast"
        ? "20s"
        : speed === "normal"
          ? "40s"
          : "80s";

    containerRef.current.style.setProperty(
      "--animation-duration",
      duration
    );

    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="
              relative
              w-[350px]
              max-w-full
              shrink-0
              rounded-2xl
              border
              border-border
              bg-card
              px-8
              py-6
              shadow-sm
              transition-colors
              duration-300
              md:w-[450px]
            "
          >
            <blockquote>
              <span
                className="
                  relative
                  z-10
                  block
                  text-sm
                  font-normal
                  leading-[1.6]
                  text-card-foreground
                "
              >
                {item.quote}
              </span>

              <div className="relative z-10 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-normal leading-[1.6] text-muted-foreground">
                    {item.name}
                  </span>

                  <span className="text-sm font-normal leading-[1.6] text-muted-foreground">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
