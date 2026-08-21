import { useState } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { ReelsScreen } from "./components/ReelsScreen";
import { SearchScreen } from "./components/SearchScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { RestaurantDetail } from "./components/RestaurantDetail";
import type { Restaurant } from "./data";

export type Screen = "reels" | "home" | "search" | "profile";

function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-white" : "text-foreground";
  return (
    <div className={`flex items-center justify-between px-5 py-2 shrink-0 ${color}`}>
      <span className="text-xs font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <BatteryFull size={14} />
      </div>
    </div>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3]));

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isReels = activeScreen === "reels";

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#DDD8D0] p-0 sm:py-8 sm:px-4">
      {/* Phone frame */}
      <div
        className="relative flex flex-col w-full max-w-[430px] bg-background overflow-hidden"
        style={{
          height: "100dvh",
          maxHeight: "932px",
          borderRadius: "clamp(0px, (100vw - 430px) * 999, 44px)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
        }}
      >
        {/* Status bar */}
        <div className={isReels ? "absolute top-0 left-0 right-0 z-10" : ""}>
          <StatusBar dark={isReels} />
        </div>

        {/* Screen content */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ flex: 1, marginTop: isReels ? 0 : undefined }}
        >
          {activeScreen === "reels" && (
            <ReelsScreen onSelectRestaurant={setSelectedRestaurant} />
          )}
          {activeScreen === "home" && (
            <HomeScreen
              onSelectRestaurant={setSelectedRestaurant}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {activeScreen === "search" && (
            <SearchScreen
              onSelectRestaurant={setSelectedRestaurant}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {activeScreen === "profile" && <ProfileScreen />}
        </div>

        {/* Bottom nav */}
        <BottomNav active={activeScreen} onNavigate={setActiveScreen} />

        {/* Restaurant detail overlay */}
        {selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            isFavorited={favorites.has(selectedRestaurant.id)}
            onToggleFavorite={() => toggleFavorite(selectedRestaurant.id)}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}
      </div>
    </div>
  );
}
