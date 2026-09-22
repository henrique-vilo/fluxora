import { PointerHighlight } from "@/components/ui/pointer-highlight";

export default function PointerHighlightDemo() {
  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto max-w-7xl py-5 text-2xl font-bold tracking-tight md:text-6xl">
      Manage, Organize, Control
      <PointerHighlight>
        <span>Like no Other</span>
      </PointerHighlight>
    </div>
    </div>
  );
}
