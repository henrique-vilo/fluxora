"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link || idx}
          className="relative group block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="
                  absolute
                  inset-0
                  block
                  h-full
                  w-full
                  rounded-3xl
                  bg-accent
                "
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.15,
                    delay: 0.2,
                  },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        `
          relative
          z-20
          h-full
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-card
          p-4
          shadow-sm
          transition-colors
          duration-200
          group-hover:border-primary/40
        `,
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}) => {
  return (
    <h4
      className={cn(
        `
          mt-4
          font-bold
          tracking-wide
          text-card-foreground
        `,
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        `
          mt-8
          text-sm
          leading-relaxed
          tracking-wide
          text-muted-foreground
        `,
        className
      )}
    >
      {children}
    </p>
  );
};