import type { FormEvent } from "react";
import {
  CalendarBlankIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { useLang } from "@/app/providers/LangContext";

export type MarketSearchDestination = {
  value: string;
  label: string;
};

type MarketSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  destinations: MarketSearchDestination[];
  onSubmit: () => void;
  className?: string;
};

export function MarketSearch({
  search,
  onSearchChange,
  city,
  onCityChange,
  date,
  onDateChange,
  destinations,
  onSubmit,
  className = "",
}: MarketSearchProps) {
  const { lang } = useLang();
  const ar = lang === "ar";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      className={["market-search", className].filter(Boolean).join(" ")}
      onSubmit={handleSubmit}
      role="search"
      aria-label={ar ? "البحث عن الرحلات" : "Search travel offers"}
    >
      <label className="market-search-field">
        <span>
          <MagnifyingGlassIcon size={16} aria-hidden="true" />
          {ar ? "عن ماذا تبحث؟" : "WHAT ARE YOU LOOKING FOR?"}
        </span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={ar ? "رحلة أو وجهة" : "Trip or destination"}
          autoComplete="off"
        />
      </label>

      <label className="market-search-field">
        <span>
          <MapPinIcon size={16} aria-hidden="true" />
          {ar ? "الوجهة" : "DESTINATION"}
        </span>
        <select value={city} onChange={(event) => onCityChange(event.target.value)}>
          <option value="">{ar ? "جميع الوجهات" : "Anywhere"}</option>
          {destinations.map((destination) => (
            <option key={destination.value} value={destination.value}>
              {destination.label}
            </option>
          ))}
        </select>
      </label>

      <label className="market-search-field">
        <span>
          <CalendarBlankIcon size={16} aria-hidden="true" />
          {ar ? "ابتداءً من" : "DEPARTURE FROM"}
        </span>
        <input
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </label>

      <button className="market-search-submit" type="submit">
        <MagnifyingGlassIcon size={18} aria-hidden="true" />
        <span>{ar ? "ابحث" : "Search"}</span>
      </button>
    </form>
  );
}
