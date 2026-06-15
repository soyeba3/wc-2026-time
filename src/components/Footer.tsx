import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-white/10 bg-slate-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>World Cup 2026 Time — Bangladesh Time (BST, UTC+6)</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for football fans
        </p>
      </div>
    </footer>
  );
}
