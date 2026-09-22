"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-80 rounded-md flex flex-col antialiased bg-background dark:bg-black dark:bg-grid-white/[0.05] items-start justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Fluxora has completely transformed the way we manage our inventory. We now have a clear view of our stock levels and can make faster decisions with much more confidence.",
    name: "Michael Anderson",
    title: "Operations Manager, Northstar Retail",
  },
  {
    quote:
      "Before Fluxora, keeping track of inventory across our operations was time-consuming and prone to errors. The platform has made everything more organized, accurate, and efficient.",
    name: "Sarah Mitchell",
    title: "Supply Chain Director, Vertex Solutions",
  },
  {
    quote:
      "The real-time inventory tracking has been a game changer for our business. Fluxora helps us avoid stock shortages while giving our team a much better understanding of product demand.",
    name: "James Carter",
    title: "Business Manager, Horizon Commerce",
  },
  {
    quote:
      "Fluxora has simplified our entire inventory workflow. From monitoring stock levels to generating reports, everything is easier to manage and our team spends far less time on manual tasks.",
    name: "Emily Richardson",
    title: "Inventory Manager, BluePeak Industries",
  },
  {
    quote:
      "With Fluxora, we have greater control over our inventory and better visibility into our daily operations. The platform has helped us reduce mistakes and improve the efficiency of our team.",
    name: "Daniel Thompson",
    title: "Operations Director, Sterling Distribution",
  },
];
