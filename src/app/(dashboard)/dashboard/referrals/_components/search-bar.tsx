"use client";

import React from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchBarProps } from "../referal";

export const SearchBar: React.FC<SearchBarProps> = ({
  userId,
  loading,
  onUserIdChange,
  onSearch,
  onKeyPress,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">User ID से खोजें</CardTitle>
        <CardDescription className="text-xs sm:text-sm">उपयोगकर्ता की अद्वितीय ID दर्ज करें</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="User ID दर्ज करें (उदा: a27447fb)"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
            onKeyPress={onKeyPress}
            className="flex-1 text-sm sm:text-base"
          />
          <Button onClick={onSearch} disabled={loading} data-search-button className="w-full sm:w-auto">
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                <span className="text-sm">खोज रहे हैं...</span>
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                <span className="text-sm">खोजें</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
