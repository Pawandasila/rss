"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
      {Icon && (
        <Icon className="h-12 w-12 sm:h-16 sm:w-16 mb-4 sm:mb-6 text-muted-foreground opacity-40" />
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 text-center">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md mb-6 sm:mb-8">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          size="sm"
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-r-transparent mr-2"></div>
              Loading...
            </>
          ) : (
            actionLabel
          )}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
