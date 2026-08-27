import { Play, Home, Search, User } from "lucide-react";
import { cn } from "./ui/utils";
import type { Screen } from "../App";

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const items = [
  { id: "reels" as Screen, icon: Play, label: "Reels" },
  { id: "home" as Screen, icon: Home, label: "Início" },
  { id: "search" as Screen, icon: Search, label: "Busca" },
  { id: "profile" as Screen, icon: User, label: "Perfil" },
];

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="flex items-center justify-around bg-white border-t border-border px-2 pt-2 pb-7 shrink-0">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 py-1 px-5 transition-colors",
            active === item.id ? "text-primary" : "text-gray-400"
          )}
        >
          <item.icon
            size={22}
            strokeWidth={active === item.id ? 2.2 : 1.5}
          />
          <span className={cn("text-xs", active === item.id ? "font-semibold" : "font-normal")}>
            {item.label}
          </span>
          {active === item.id && (
            <div className="w-4 h-0.5 rounded-full bg-primary mt-0.5" />
          )}
        </button>
      ))}
    </nav>
  );
}
