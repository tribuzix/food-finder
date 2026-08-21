import { useState } from "react";
import { MapPin, ChevronDown, User, Map } from "lucide-react";
import { MapView } from "./MapView";
import { RestaurantCard } from "./RestaurantCard";
import { restaurants } from "../data";
import { cn } from "./ui/utils";
import type { Restaurant, Cuisine } from "../data";

const CUISINES: Cuisine[] = ["Churrasco", "Hamburguer", "Baiana", "Peixes"];

interface HomeScreenProps {
  onSelectRestaurant: (r: Restaurant) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export function HomeScreen({ onSelectRestaurant, favorites, onToggleFavorite }: HomeScreenProps) {
  const [view, setView] = useState<"category" | "nearby">("category");
  const [activeCuisine, setActiveCuisine] = useState<Cuisine>("Churrasco");

  const displayList =
    view === "nearby"
      ? [...restaurants].sort((a, b) => a.distance - b.distance)
      : restaurants.filter((r) => r.cuisine === activeCuisine);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 bg-background shrink-0">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5">
            <MapPin size={15} className="text-primary fill-primary/20" />
            <span className="font-semibold text-sm">Brasil, Sto Amaro</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={17} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Map */}
        {view === "category" && (
          <div className="mx-5 h-44 rounded-2xl overflow-hidden shadow-sm">
            <MapView />
          </div>
        )}

        {/* View toggle */}
        <div className="flex gap-3 px-5 mt-4 shrink-0">
          <button
            onClick={() => setView("category")}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-semibold transition-colors",
              view === "category"
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-muted-foreground"
            )}
          >
            {activeCuisine}
          </button>
          <button
            onClick={() => setView("nearby")}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-colors",
              view === "nearby"
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-muted-foreground"
            )}
          >
            Próximos
          </button>
        </div>

        {/* Cuisine chips */}
        {view === "category" && (
          <div
            className="flex gap-2 px-5 mt-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {CUISINES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCuisine(c)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0",
                  activeCuisine === c
                    ? "bg-foreground text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Nearby list header */}
        {view === "nearby" && (
          <div className="flex items-center justify-between px-5 mt-5 mb-1">
            <h2 className="font-semibold">Locais Próximos</h2>
            <button
              onClick={() => setView("category")}
              className="flex items-center gap-1 text-sm text-primary font-medium"
            >
              <Map size={13} />
              Ver Mapa
            </button>
          </div>
        )}

        {/* Restaurant list */}
        <div className="px-5 mt-3 pb-6 flex flex-col gap-3">
          {displayList.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              showFavorite={view === "nearby"}
              isFavorited={favorites.has(r.id)}
              onToggleFavorite={() => onToggleFavorite(r.id)}
              onClick={() => onSelectRestaurant(r)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
