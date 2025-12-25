"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, Loader2 } from "lucide-react";
import useAuth from "@/hooks/use-auth";

export type UserFilterType =
  | "all"
  | "admin"
  | "staff"
  | "member"
  | "volunteer"
  | "business"
  | "verified"
  | "blocked"
  | "non-verified";

export interface UsersSearchFilters {
  search: string;
  type: UserFilterType;
  types?: UserFilterType[];
  dateMode?: "none" | "today" | "custom";
  date?: string; // YYYY-MM-DD
}

interface Props {
  value: UsersSearchFilters;
  onChange: (next: UsersSearchFilters) => void;
  loading?: boolean;
  className?: string;
}

export default function UsersSearchAndFilter({ value, onChange, loading, className }: Props) {
  const [input, setInput] = useState(value.search ?? "");
  const [open, setOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const { isAdmin: isAdminFn } = useAuth();
  const selectedTypes = React.useMemo(
    () => value.types ?? [],
    [value.types]
  );
  const [pendingTypes, setPendingTypes] = useState<UserFilterType[]>(selectedTypes);

  useEffect(() => {
    setInput(value.search ?? "");
  }, [value.search]);

  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = input.trim();
      if (trimmed !== value.search) {
        onChange({ ...value, search: trimmed });
      }
    }, 400);
    return () => clearTimeout(t);
  }, [input, value, onChange]);

  useEffect(() => {
    if (open) {
      setPendingTypes(selectedTypes);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setPendingTypes(selectedTypes);
    }
  }, [selectedTypes, open]);

  const allOptions: UserFilterType[] = (
    isAdminFn()
      ? ["admin", "staff", "member", "volunteer", "business", "verified", "non-verified", "blocked"]
      : ["member", "volunteer", "business", "verified", "non-verified", "blocked"]
  );

  const allSelected = pendingTypes.length > 0 && pendingTypes.length === allOptions.length;

  const toggleType = (t: UserFilterType) => {
    const set = new Set(pendingTypes);
    if (set.has(t)) set.delete(t);
    else set.add(t);
    const next = Array.from(set);
    setPendingTypes(next);
  };

  const toggleAll = () => {
    if (allSelected) setPendingTypes([]);
    else setPendingTypes([...allOptions]);
  };

  const selectedLabel = () => {
    if (selectedTypes.length === 0) return "Filters";
    if (selectedTypes.length === 1) return selectedTypes[0].replace("-", " ");
    if (selectedTypes.length === allOptions.length) return "All Filters";
    return `${selectedTypes.length} selected`;
  };

  const applyFilters = () => {
    const next = pendingTypes;
    onChange({ ...value, types: next, type: next.length === 1 ? next[0] : "all" });
    setOpen(false);
  };

  const clearFilters = () => {
    onChange({ ...value, types: [], type: "all" });
  };

  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, phone, or user ID..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 text-sm"
          autoComplete="off"
          type="text"
          disabled={loading}
        />
        {loading && (
          <Loader2 className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[200px] justify-between h-9 sm:h-10 text-sm">
            {selectedLabel()}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 sm:w-80 p-2">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Filters</span>
            <Button variant="ghost" size="sm" onClick={toggleAll}>
              {allSelected ? "Clear All" : "Select All"}
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-1">
            {allOptions.map((opt) => (
              <DropdownMenuCheckboxItem
                key={opt}
                checked={pendingTypes.includes(opt)}
                onCheckedChange={() => toggleType(opt)}
                onSelect={(e) => e.preventDefault()}
                className={`${pendingTypes.includes(opt) ? "bg-orange-50 text-orange-700" : ""}`}
              >
                {opt.replace("-", " ")}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 px-1 pt-2">
            <Button variant="outline" size="sm" onClick={() => setPendingTypes(selectedTypes)}>
              Cancel
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Date Filter */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[220px] justify-between h-9 sm:h-10 text-sm">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {(() => {
                const mode = value.dateMode ?? "none";
                if (mode === "today") return "Date: Today";
                if (mode === "custom") return `Date: ${value.date ?? "Select"}`;
                return "Date: None";
              })()}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Button
                variant={(value.dateMode ?? "none") === "today" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const today = new Date();
                  const yyyy = today.getFullYear();
                  const mm = String(today.getMonth() + 1).padStart(2, "0");
                  const dd = String(today.getDate()).padStart(2, "0");
                  onChange({ ...value, dateMode: "today", date: `${yyyy}-${mm}-${dd}` });
                }}
              >
                Today
              </Button>
              <Button
                variant={(value.dateMode ?? "none") === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onChange({ ...value, dateMode: "custom" });
                }}
              >
                Custom
              </Button>
              <Button
                variant={(value.dateMode ?? "none") === "none" ? "default" : "outline"}
                size="sm"
                onClick={() => { onChange({ ...value, dateMode: "none", date: undefined }); setDateOpen(false); }}
              >
                None
              </Button>
            </div>

            {(value.dateMode ?? "none") === "custom" && (
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={value.date ? new Date(value.date) : undefined}
                onSelect={(d) => {
                  if (!d) return;
                  const yyyy = d.getFullYear();
                  const mm = String(d.getMonth() + 1).padStart(2, "0");
                  const dd = String(d.getDate()).padStart(2, "0");
                  onChange({ ...value, dateMode: "custom", date: `${yyyy}-${mm}-${dd}` });
                }}
              />
            )}

            {(value.dateMode ?? "none") !== "none" && (
              <div className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => { onChange({ ...value, dateMode: "none", date: undefined }); setDateOpen(false); }}>
                  Clear
                </Button>
                <Button size="sm" onClick={() => { setDateOpen(false); }}>
                  Apply
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      </div>

      {(selectedTypes?.length ?? 0) > 0 && (
        <div className="flex items-center flex-wrap gap-2">
          {selectedTypes.map((t) => (
            <Badge key={t} variant="secondary" className="px-2 py-1 text-xs bg-orange-50 text-orange-700 border-orange-200">
              <span className="mr-1 capitalize">{t.replace("-", " ")}</span>
              <button
                type="button"
                className="ml-1 text-orange-700 hover:text-orange-800"
                onClick={() => {
                  const next = (selectedTypes || []).filter((x) => x !== t);
                  onChange({ ...value, types: next, type: next.length === 1 ? next[0] : "all" });
                }}
              >
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
