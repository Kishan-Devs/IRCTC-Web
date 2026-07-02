"use client";

import { useState, useEffect, useRef } from "react";
import { Station } from "@/types/station";
import { ChevronDown } from "lucide-react";

type AutocompleteProps = {
  label: string;
  placeholder: string;
  items: Station[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function Autocomplete({
  label,
  placeholder,
  items,
  value,
  onChange,
  error,
}: AutocompleteProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.code === value);

  useEffect(() => {
    // Set initial display value if a value is pre-selected
    if (selectedItem) {
      setQuery(`${selectedItem.name} (${selectedItem.code})`);
    } else {
      setQuery("");
    }
  }, [value, selectedItem]);

  const filteredItems =
    query === "" || query === `${selectedItem?.name} (${selectedItem?.code})`
      ? items
      : items.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.code.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (item: Station) => {
    onChange(item.code);
    setQuery(`${item.name} (${item.code})`);
    setIsOpen(false);
  };

  // Handle clicks outside the component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If query doesn't match a selected value, reset it
        if (!selectedItem || query !== `${selectedItem.name} (${selectedItem.code})`) {
            if (selectedItem) {
                setQuery(`${selectedItem.name} (${selectedItem.code})`);
            } else {
                setQuery("");
                onChange(""); // Clear value if nothing valid is entered
            }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, selectedItem, query, onChange]);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            if (e.target.value === "") {
              onChange("");
            }
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.code}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-4 py-2 text-slate-700 hover:bg-blue-50"
              >
                {item.name} ({item.code})
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-slate-500">No stations found</li>
          )}
        </ul>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
