import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { RestaurantCard } from "./RestaurantCard";
import { restaurants } from "../data";
import { cn } from "./ui/utils";
import type { Restaurant, Cuisine } from "../data";

const CUISINES: Array<Cuisine | "Todos"> = ["Todos", "Churrasco", "Hamburguer", "Baiana", "Peixes"];

interface SearchScreenProps {
  onSelectRestaurant: (r: Restaurant) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export function SearchScreen({ onSelectRestaurant, favorites, onToggleFavorite }: SearchScreenProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Cuisine | "Todos">("Todos");

  const results = restaurants.filter((r) => {
    const matchesQuery =
      query === "" ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.category.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "Todos" || r.cuisine === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 bg-background shrink-0">
        <h2 className="font-semibold mb-4">Buscar Restaurantes</h2>

        {/* Search input */}
        <div className="flex items-center gap-2 bg-card rounded-2xl px-4 py-3 shadow-sm">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome, culinária, categoria..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query !== "" && (
            <button onClick={() => setQuery("")}>
              <X size={16} className="text-muted-foreground" />
            </button>
          )}
          <button className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <SlidersHorizontal size={15} className="text-primary" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors",
                filter === c
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ scrollbarWidth: "none" }}>
        {query === "" && filter === "Todos" ? (
          <>
            <p className="text-xs text-muted-foreground mb-3 mt-1 font-medium uppercase tracking-wide">
              Todos os restaurantes
            </p>
            <div className="flex flex-col gap-3">
              {restaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  showFavorite
                  isFavorited={favorites.has(r.id)}
                  onToggleFavorite={() => onToggleFavorite(r.id)}
                  onClick={() => onSelectRestaurant(r)}
                />
              ))}
            </div>
          </>
        ) : results.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground mb-3 mt-1 font-medium">
              {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
            </p>
            <div className="flex flex-col gap-3">
              {results.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  showFavorite
                  isFavorited={favorites.has(r.id)}
                  onToggleFavorite={() => onToggleFavorite(r.id)}
                  onClick={() => onSelectRestaurant(r)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search size={28} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground mb-1">Nenhum resultado</p>
            <p className="text-sm text-muted-foreground">
              Tente outro nome ou categoria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
