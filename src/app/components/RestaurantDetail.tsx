import { useState } from "react";
import { ArrowLeft, Heart, Share2, MapPin, Clock, Star, Tag } from "lucide-react";
import { StarRating } from "./StarRating";
import { ReservationModal } from "./ReservationModal";
import { cn } from "./ui/utils";
import type { Restaurant } from "../data";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export function RestaurantDetail({
  restaurant,
  isFavorited,
  onToggleFavorite,
  onClose,
}: RestaurantDetailProps) {
  const [showReservation, setShowReservation] = useState(false);

  return (
    <div className="absolute inset-0 bg-background z-20 flex flex-col overflow-hidden">
      {/* Hero image */}
      <div className="relative h-64 shrink-0">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover bg-muted"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Back & actions */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5 pb-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Share2 size={17} className="text-white" />
            </button>
            <button
              onClick={onToggleFavorite}
              className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart
                size={17}
                className={cn(
                  "transition-colors",
                  isFavorited ? "fill-primary text-primary" : "text-white"
                )}
              />
            </button>
          </div>
        </div>

        {/* Title over image */}
        <div className="absolute bottom-4 left-5 right-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white">
              {restaurant.distance} km
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/30 text-white backdrop-blur-sm">
              {restaurant.priceRange}
            </span>
          </div>
          <h2 className="font-bold text-2xl text-white drop-shadow-sm">{restaurant.name}</h2>
          <p className="text-white/80 text-sm mt-0.5">{restaurant.category}</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Rating bar */}
        <div className="flex items-center gap-3 px-5 py-4 bg-card border-b border-border">
          <StarRating rating={restaurant.rating} size={14} showValue />
          <span className="text-xs text-muted-foreground">
            ({restaurant.reviewCount} avaliações)
          </span>
        </div>

        {/* Info */}
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">{restaurant.description}</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm">
              <MapPin size={15} className="text-primary shrink-0" />
              <span className="text-foreground/80">
                {restaurant.address}, {restaurant.city}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Clock size={15} className="text-primary shrink-0" />
              <span className="text-foreground/80">Aberto hoje: {restaurant.hours}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-1.5 mb-3">
            <Tag size={14} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Características
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="px-5 py-4 pb-32">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Avaliações</h3>
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {restaurant.reviews.map((review) => (
              <div key={review.id} className="flex gap-3">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 bg-muted"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{review.userName}</span>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} size={11} showValue={false} className="mb-1.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-7 pt-4 bg-gradient-to-t from-background via-background to-transparent">
        <button
          onClick={() => setShowReservation(true)}
          className="w-full py-4 rounded-2xl bg-primary text-white font-semibold text-sm shadow-lg active:scale-[0.985] transition-transform"
        >
          Fazer Reserva
        </button>
      </div>

      {/* Reservation modal */}
      {showReservation && (
        <ReservationModal
          restaurant={restaurant}
          onClose={() => setShowReservation(false)}
        />
      )}
    </div>
  );
}
