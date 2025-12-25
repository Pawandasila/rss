"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentStats } from "./_components/PaymentStats";
import { TransactionTable, type PaymentsFilters } from "./_components/TransactionTable";
import type { TransactionTableHandle } from "./_components/TransactionTable";
import SearchAndFilter from "./_components/SearchAndFilter";
import { Plus, Download } from "lucide-react";
import { RoleGuard } from "@/components/auth/RoleGuard";


export default function PaymentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [filters, setFilters] = useState<PaymentsFilters>({
    search: "",
    status: "all",
    type: "all",
    date: "all",
  });
  const tableRef = useRef<TransactionTableHandle>(null);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFiltersChange = useCallback((next: PaymentsFilters) => {
    setFilters(next);
    setCurrentPage(1);
  }, []);

  return (
    <RoleGuard allowedRoles="auto" showUnauthorized={true}>
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              View and manage all payment transactions and donations
            </p>
          </div>
          <Link href="/dashboard/payments/mannual" className="w-full sm:w-auto">
            <Button className="flex items-center gap-2 w-full sm:w-auto">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Add Manual Payment</span>
            </Button>
          </Link>
        </div>

        
        <PaymentStats date={filters.date === "today" ? new Date().toISOString().slice(0,10) : undefined} />

        
        <Card>
          
          
          <CardContent className="sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <CardTitle className="text-lg sm:text-xl">Transaction History</CardTitle>
              <Button
                variant="outline"
                className="gap-2 h-9 sm:h-10"
                onClick={() => tableRef.current?.exportToCSV()}
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Export CSV</span>
              </Button>
            </div>
            <SearchAndFilter value={filters} onChange={handleFiltersChange} />
            <TransactionTable 
              ref={tableRef}
              page={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              filters={filters}
            />
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}