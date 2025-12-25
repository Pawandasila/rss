"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";

type FilterStatus = "all" | "success" | "failed" | "pending" | "refunded";
type FilterType =
  | "all"
  | "donation"
  | "subscription"
  | "membership"
  | "general";

type DateFilter = "all" | "today";

export interface SearchFilterValue {
  search: string;
  status: FilterStatus;
  type: FilterType;
  date: DateFilter;
}

interface SearchAndFilterProps {
  value: SearchFilterValue;
  onChange: (next: SearchFilterValue) => void;
  loading?: boolean;
  className?: string;
}

export function SearchAndFilter({
  value,
  onChange,
  loading,
  className,
}: SearchAndFilterProps) {
  const [input, setInput] = useState(value.search ?? "");

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

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 mb-4 sm:gap-4 ${className ?? ""}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        <Input
          placeholder="Search by order ID, payment ID, name, or email..."
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

      <Select
        value={value.status}
        onValueChange={(v: FilterStatus) => onChange({ ...value, status: v })}
      >
        <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] h-9 sm:h-10 text-sm">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="success">Success</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={value.type}
        onValueChange={(v: FilterType) => onChange({ ...value, type: v })}
      >
        <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] h-9 sm:h-10 text-sm">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="donation">Donation</SelectItem>
          <SelectItem value="subscription">Subscription</SelectItem>
          <SelectItem value="membership">Member</SelectItem>
          <SelectItem value="general">General</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={value.date}
        onValueChange={(v: DateFilter) => onChange({ ...value, date: v })}
      >
        <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] h-9 sm:h-10 text-sm">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Dates</SelectItem>
          <SelectItem value="today">Today</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchAndFilter;
