import { useState, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Send, Bookmark, ChevronDown, RefreshCw } from "lucide-react";
import { StarRating } from "./StarRating";
import { reels, restaurants } from "../data";
import { cn } from "./ui/utils";
import type { Restaurant } from "../data";

interface ReelsScreenProps {
  onSelectRestaurant: (r: Restaurant) => void;
}

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const slideVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%" }),
  center: { y: 0 },
  exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%" }),
};

export function ReelsScreen({ onSelectRestaurant }: ReelsScreenProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ended, setEnded] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const touchStartY = useRef(0);
  const lastActionTime = useRef(0);

  const canAct = () => {
    const now = Date.now();
    if (now - lastActionTime.current < 420) return false;
    lastActionTime.current = now;
    return true;
  };

  const goNext = () => {
    if (!canAct()) return;
    if (index >= reels.length - 1) {
      setEnded(true);
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (!canAct()) return;
    if (ended) {
      setEnded(false);
      return;
    }
    if (index <= 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (delta > 40) goNext();
    else if (delta < -40) goPrev();
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 20) goNext();
    else if (e.deltaY < -20) goPrev();
  };

  const toggleLike = (id: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSave = (id: number) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const reel = reels[index];
  const restaurant = restaurants.find((r) => r.id === reel?.restaurantId);

  return (
    <div
      className="relative flex-1 overflow-hidden bg-black select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Top bar — always visible above the sliding content */}
      <div className="absolute top-0 left-0 right-0 px-5 pt-3 pb-2 z-20 flex items-center justify-between">
        <h3 className="font-semibold text-white drop-shadow">Explorar Reels</h3>
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                setEnded(false);
              }}
              className={cn(
                "rounded-full transition-all duration-300",
                i === index && !ended
                  ? "w-4 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40"
              )}
            />
          ))}
          <div
            className={cn(
              "rounded-full transition-all duration-300 w-1.5 h-1.5",
              ended ? "bg-white" : "bg-white/20"
            )}
          />
        </div>
      </div>

      {/* Sliding reel frames */}
      <AnimatePresence initial={false} custom={direction}>
        {!ended ? (
          <motion.div
            key={reel.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.38, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0"
          >
            <img
              src={reel.image}
              alt={reel.restaurantName}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40" />

            {/* Right action buttons */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5 z-10">
              <ActionBtn
                icon={
                  <Heart
                    size={22}
                    className={cn(
                      "transition-colors",
                      liked.has(reel.id) ? "fill-primary text-primary" : "text-white"
                    )}
                  />
                }
                label={formatCount(reel.likes + (liked.has(reel.id) ? 1 : 0))}
                active={liked.has(reel.id)}
                activeColor="bg-primary/40"
                onClick={() => toggleLike(reel.id)}
              />
              <ActionBtn
                icon={<MessageCircle size={22} className="text-white" />}
                label={formatCount(reel.comments)}
                onClick={() => {}}
              />
              <ActionBtn
                icon={<Send size={20} className="text-white" />}
                label="Enviar"
                onClick={() => {}}
              />
              <ActionBtn
                icon={
                  <Bookmark
                    size={20}
                    className={cn(
                      "transition-colors",
                      saved.has(reel.id) ? "fill-amber-400 text-amber-400" : "text-white"
                    )}
                  />
                }
                label="Salvar"
                active={saved.has(reel.id)}
                activeColor="bg-amber-500/40"
                onClick={() => toggleSave(reel.id)}
              />
            </div>

            {/* Bottom restaurant info */}
            <div className="absolute bottom-6 left-5 right-20 z-10">
              <button
                onClick={() => restaurant && onSelectRestaurant(restaurant)}
                className="flex items-center gap-2 mb-2"
              >
                <span className="font-bold text-white text-lg leading-tight">
                  {reel.restaurantName}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-white shrink-0">
                  {reel.distance} km
                </span>
              </button>
              <p className="text-white/85 text-sm leading-relaxed mb-2">{reel.description}</p>
              <StarRating rating={reel.rating} size={13} showValue className="[&>span]:text-white/60" />
            </div>

            {/* Swipe hint — only on first reel */}
            {index === 0 && (
              <motion.div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 z-10 pointer-events-none"
                animate={{ opacity: [0.8, 0.3, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ChevronDown size={20} className="text-white" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* ── End-of-feed screen ── */
          <motion.div
            key="end"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "tween", duration: 0.38, ease: [0.32, 0, 0.67, 0] }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Blurred last frame as bg */}
            <img
              src={reels[reels.length - 1].image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ filter: "blur(18px) brightness(0.35)" }}
              draggable={false}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6"
              >
                <span className="text-4xl">🍽️</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="font-bold text-white text-xl mb-2">
                  Isso é tudo por agora!
                </p>
                <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-xs">
                  Você viu todos os restaurantes disponíveis em Santo Amaro.
                  Volte mais tarde para descobrir novos locais.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
                onClick={() => {
                  setEnded(false);
                  setDirection(-1);
                  setIndex(0);
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-foreground font-semibold text-sm shadow-lg active:scale-[0.96] transition-transform"
              >
                <RefreshCw size={15} />
                Ver novamente
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  onClick,
  active,
  activeColor,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  activeColor?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      <div
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors",
          active && activeColor ? activeColor : "bg-black/30"
        )}
      >
        {icon}
      </div>
      <span className="text-white text-xs font-medium">{label}</span>
    </motion.button>
  );
}
