import { Star } from "lucide-react";
import { cn } from "./ui/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, size = 12, showValue = true, className }: StarRatingProps) {
  const filled = Math.round(rating);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={cn(
              star <= filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-gray-500">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
