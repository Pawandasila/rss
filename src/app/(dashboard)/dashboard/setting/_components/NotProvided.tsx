"use client";

import React from "react";
import { FileQuestion, Plus } from "lucide-react";

interface NotProvidedProps {
  className?: string;
  onClick?: () => void;
  label?: string;
}

export const NotProvided: React.FC<NotProvidedProps> = ({ 
  className = "", 
  onClick,
  label = "Not Provided"
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20 hover:bg-muted/40 hover:border-primary/50 active:bg-muted/50 transition-all cursor-pointer min-h-[44px] ${className}`}
    >
      <FileQuestion className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50 group-hover:text-primary/70 transition-colors flex-shrink-0" />
      <span className="text-xs sm:text-sm text-muted-foreground/70 group-hover:text-primary font-medium transition-colors">
        {label}
      </span>
      {onClick && (
        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50 group-hover:text-primary/70 transition-colors flex-shrink-0" />
      )}
    </button>
  );
};
