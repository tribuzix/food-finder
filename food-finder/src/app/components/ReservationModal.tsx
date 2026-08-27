import { useState } from "react";
import { X, ChevronDown, Minus, Plus, CheckCircle } from "lucide-react";
import { cn } from "./ui/utils";
import type { Restaurant } from "../data";

interface ReservationModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

export function ReservationModal({ restaurant, onClose }: ReservationModalProps) {
  const [date, setDate] = useState(getTodayStr());
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const canConfirm = date && time && guests > 0 && name.trim() && phone.trim();

  function handleConfirm() {
    if (!canConfirm) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="absolute inset-0 bg-black/50 z-30 flex items-end">
        <div className="w-full bg-background rounded-t-3xl px-6 py-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle size={36} className="text-green-500" />
          </div>
          <h3 className="font-bold text-xl mb-1">Reserva Confirmada!</h3>
          <p className="text-muted-foreground text-sm mb-1">
            {restaurant.name}
          </p>
          <p className="text-sm font-medium text-foreground mb-1">
            {date.split("-").reverse().join("/")} • {time}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {guests} pessoa{guests !== 1 ? "s" : ""} • Reservado para {name}
          </p>
          <div className="w-full p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <p className="text-sm text-primary font-medium">
              Você receberá uma confirmação via SMS no número {phone}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-primary text-white font-semibold text-sm shadow-sm active:scale-[0.985] transition-transform"
          >
            Ótimo!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black/50 z-30 flex items-end">
      <div className="w-full bg-background rounded-t-3xl overflow-hidden">
        {/* Handle + header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground">Reserva em</p>
            <h3 className="font-bold text-base">{restaurant.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[75vh] px-5 py-4" style={{ scrollbarWidth: "none" }}>
          {/* Date */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Data
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                min={getTodayStr()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-card rounded-2xl px-4 py-3 text-sm font-medium shadow-sm appearance-none outline-none border border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Time */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Horário
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-sm font-medium transition-colors",
                    time === slot
                      ? "bg-primary text-white shadow-sm"
                      : "bg-card text-foreground border border-border"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Guests */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Pessoas
            </label>
            <div className="flex items-center gap-4 bg-card rounded-2xl px-4 py-3 shadow-sm w-36">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center active:bg-primary/20 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="font-bold text-base w-4 text-center">{guests}</span>
              <button
                onClick={() => setGuests((g) => Math.min(restaurant.tables, g + 1))}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center active:bg-primary/20 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Maria Oliveira"
              className="w-full bg-card rounded-2xl px-4 py-3 text-sm outline-none border border-border focus:border-primary transition-colors placeholder:text-muted-foreground shadow-sm"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Telefone / WhatsApp
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 9 0000-0000"
              className="w-full bg-card rounded-2xl px-4 py-3 text-sm outline-none border border-border focus:border-primary transition-colors placeholder:text-muted-foreground shadow-sm"
            />
          </div>

          {/* Confirm button */}
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={cn(
              "w-full py-4 rounded-2xl font-semibold text-sm shadow-sm transition-all",
              canConfirm
                ? "bg-primary text-white active:scale-[0.985]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Confirmar Reserva
          </button>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
