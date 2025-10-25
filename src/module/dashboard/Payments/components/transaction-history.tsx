"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUserPayments } from '../hooks';
import { 
  ArrowUpRight, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  AlertCircle, 
  Receipt,
  Loader2,
  Eye,
  Wallet,
  Building2,
  Smartphone
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserTransactionHistory = () => {
  const { payments, loading, error } = useUserPayments(10); 
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      COMPLETED: { 
        label: 'Completed', 
        className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100' 
      },
      PENDING: { 
        label: 'Pending', 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100' 
      },
      FAILED: { 
        label: 'Failed', 
        className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100' 
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (payment: any) => {
    const method = (payment.payment_details?.method || payment.method)?.toLowerCase();
    const methodDetails = payment.payment_details?.method_details;
    
    switch (method) {
      case 'cash':
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Wallet className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-sm">Cash</span>
          </div>
        );
      case 'cheque':
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-sm">Cheque</span>
          </div>
        );
      case 'bank_transfer':
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <Building2 className="w-3 h-3 text-purple-600" />
            </div>
            <span className="text-sm">Bank Transfer</span>
          </div>
        );
      case 'upi':
        const vpa = methodDetails?.upi?.vpa;
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <Smartphone className="w-3 h-3 text-orange-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">UPI</span>
              {vpa && (
                <span className="text-xs text-muted-foreground">{vpa}</span>
              )}
            </div>
          </div>
        );
      case 'card':
        const cardDetails = methodDetails?.card;
        const cardInfo = cardDetails
          ? `${cardDetails.network || ""} ${cardDetails.type || ""}`.trim()
          : "Card";
        const last4 = cardDetails?.last4;
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{cardInfo}</span>
              {last4 && (
                <span className="text-xs text-muted-foreground">•••• {last4}</span>
              )}
            </div>
          </div>
        );
      case 'netbanking':
        const bank = methodDetails?.netbanking?.bank;
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Building2 className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Net Banking</span>
              {bank && (
                <span className="text-xs text-muted-foreground capitalize">{bank}</span>
              )}
            </div>
          </div>
        );
      case 'wallet':
        const walletName = methodDetails?.wallet?.wallet;
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <Wallet className="w-3 h-3 text-orange-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Wallet</span>
              {walletName && (
                <span className="text-xs text-muted-foreground capitalize">{walletName}</span>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-sm capitalize">{method || 'Unknown'}</span>
          </div>
        );
    }
  };

  const getTypeBadge = (paymentFor: string) => {
    const type = paymentFor.toLowerCase();
    
    if (type.includes('donation')) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Donation</Badge>;
    }
    if (type.includes('membership') || type.includes('member')) {
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Membership</Badge>;
    }
    if (type.includes('subscription')) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Subscription</Badge>;
    }
    
    return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">General</Badge>;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Your Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Loading your transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Your Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Your Recent Transactions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-500 mb-4">Your payment history will appear here once you make a donation or payment.</p>
            <Button 
              onClick={() => router.push('/donate-now')}
              className="flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Make a Donation
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {payment.order_id}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(payment.amount/100)}
                    </TableCell>
                    <TableCell>{getTypeBadge(payment.payment_for)}</TableCell>
                    <TableCell>{getPaymentMethodIcon(payment)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(payment.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {payments.length > 5 && (
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full flex items-center gap-2"
              onClick={() => router.push('/dashboard/payments')}
            >
              View All Transactions
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserTransactionHistory;