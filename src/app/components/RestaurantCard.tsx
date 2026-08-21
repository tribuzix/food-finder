import { Heart } from "lucide-react";
import { StarRating } from "./StarRating";
import { cn } from "./ui/utils";
import type { Restaurant } from "../data";

interface RestaurantCardProps {
  restaurant: Restaurant;
  showFavorite?: boolean;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

export function RestaurantCard({
  restaurant,
  showFavorite,
  isFavorited,
  onToggleFavorite,
  onClick,
}: RestaurantCardProps) {
  return (
    <button
      className="flex items-center gap-3 bg-card rounded-2xl p-3 w-full text-left shadow-sm active:scale-[0.985] transition-transform"
      onClick={onClick}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-[72px] h-[72px] rounded-xl object-cover shrink-0 bg-muted"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold text-sm text-foreground truncate">{restaurant.name}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-semibold text-primary">{restaurant.distance} km</span>
            {showFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className="p-0.5 transition-transform active:scale-90"
              >
                <Heart
                  size={17}
                  className={cn(
                    "transition-colors",
                    isFavorited ? "fill-primary text-primary" : "text-gray-300"
                  )}
                />
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{restaurant.category}</p>
        <StarRating rating={restaurant.rating} size={11} showValue className="mt-1.5" />
      </div>
    </button>
  );
}
