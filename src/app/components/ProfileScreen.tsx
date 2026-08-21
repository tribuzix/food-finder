import { MapPin, Bell, Settings } from "lucide-react";
import { StarRating } from "./StarRating";
import { PROFILE } from "../data";

export function ProfileScreen() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 bg-background shrink-0">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5">
            <MapPin size={15} className="text-primary fill-primary/20" />
            <span className="font-semibold text-sm">Brasil, Sto Amaro</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Bell size={17} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </button>
            <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Settings size={17} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Profile info */}
        <div className="flex flex-col items-center px-5 pt-4 pb-6">
          <img
            src={PROFILE.avatar}
            alt={PROFILE.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-muted mb-3"
          />
          <h2 className="font-bold text-foreground">{PROFILE.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {PROFILE.handle} • {PROFILE.location}
          </p>
          <p className="text-sm text-center text-foreground/80 mt-3 leading-relaxed max-w-xs">
            {PROFILE.bio}
          </p>

          {/* Stats */}
          <div className="flex items-stretch w-full bg-card rounded-2xl mt-5 shadow-sm overflow-hidden">
            {[
              { label: "Avaliações", value: PROFILE.reviewsCount },
              { label: "Fotos", value: PROFILE.photosCount },
              { label: "Favoritos", value: PROFILE.favoritesCount },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                className="flex-1 flex flex-col items-center py-4"
                style={{
                  borderRight: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.06)" : undefined,
                }}
              >
                <span className="font-bold text-lg text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Edit profile button */}
          <button className="w-full mt-4 py-3 rounded-2xl border border-border text-sm font-semibold text-foreground bg-card shadow-sm active:scale-[0.985] transition-transform">
            Editar Perfil
          </button>
        </div>

        {/* Recent reviews */}
        <div className="px-5 pb-6">
          <h3 className="font-semibold mb-3">Avaliações Recentes</h3>
          <div className="flex flex-col gap-3">
            {PROFILE.recentReviews.map((review) => (
              <div key={review.id} className="flex items-center gap-3 bg-card rounded-2xl p-3 shadow-sm">
                <img
                  src={review.restaurantImage}
                  alt={review.restaurantName}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {review.restaurantName}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">{review.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">"{review.text}"</p>
                  <StarRating rating={review.rating} size={11} showValue={false} className="mt-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
