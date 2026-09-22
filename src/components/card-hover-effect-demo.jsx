import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function CardHoverEffectDemo() {
  return (
    <div className="">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Real-Time Inventory Tracking",
    description:
      "Monitor stock levels in real time, helping businesses keep accurate records and maintain full visibility over their inventory.",
  },
  {
    title: "Automated Stock Control",
    description:
      "Automate inventory processes to reduce manual work, minimize errors, and make stock management faster and more efficient.",
  },
  {
    title: "Low Stock Alerts",
    description:
      "Receive timely notifications when products reach critical stock levels, helping prevent shortages and maintain continuous operations.",
  },
  {
    title: "Centralized Inventory Management",
    description:
      "Manage products, quantities, suppliers, and inventory movements from a centralized system designed for better organization and control.",
  },
  {
    title: "Demand Forecasting",
    description:
      "Analyze inventory data and sales patterns to anticipate demand, optimize stock levels, and support smarter purchasing decisions.",
  },
  {
    title: "Detailed Inventory Reports",
    description:
      "Generate comprehensive reports on stock movements, product performance, inventory levels, and operational activity.",
  },
];
