"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotProvided } from "./NotProvided";
import { Check, X, Loader2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  label: string;
  name: string;
  value: string;
  type?: "text" | "date" | "select" | "textarea";
  options?: string[];
  isEditing: boolean;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  className?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  name,
  value,
  type = "text",
  options = [],
  isEditing,
  isLoading = false,
  required = false,
  disabled = false,
  placeholder,
  maxLength,
  onEdit,
  onSave,
  onCancel,
  onChange,
  className = "",
}) => {
  const hasValue = value && value.trim() !== "";

  const renderInput = () => {
    if (type === "select") {
      return (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (type === "date") {
      const date = value ? new Date(value) : undefined;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-10 sm:h-11 text-xs sm:text-sm",
                !date && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {date ? format(date, "PPP") : <span>{placeholder || "Pick a date"}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  onChange(format(selectedDate, "yyyy-MM-dd"));
                }
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    }

    if (type === "textarea") {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          disabled={disabled}
          rows={2}
        />
      );
    }

    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        disabled={disabled}
        maxLength={maxLength}
      />
    );
  };

  return (
    <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
      <Label htmlFor={name} className="text-xs sm:text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {isEditing ? (
        <div className="space-y-2">
          {renderInput()}
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={onSave}
              disabled={isLoading}
              className="flex-1 h-9 text-xs sm:text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                  <span className="sm:hidden">Save</span>
                </>
              ) : (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                  Save
                </>
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="h-9 text-xs sm:text-sm px-3"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
              <span className="hidden sm:inline">Cancel</span>
              <span className="sm:hidden">No</span>
            </Button>
          </div>
        </div>
      ) : hasValue ? (
        <div
          onClick={disabled ? undefined : onEdit}
          className={`px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg bg-background ${
            disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-muted/50 hover:border-primary/50 active:bg-muted"
          } transition-all group min-h-[44px] flex items-center`}
        >
          <p className="text-xs sm:text-sm font-medium break-all">
            {type === "date" && value ? format(new Date(value), "PPP") : value}
          </p>
        </div>
      ) : (
        <NotProvided 
          onClick={disabled ? undefined : onEdit}
          label={`Add ${label}`}
        />
      )}
    </div>
  );
};
