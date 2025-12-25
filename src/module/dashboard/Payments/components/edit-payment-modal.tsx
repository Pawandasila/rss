"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import type { Payment } from "@/module/dashboard/Payments/hooks";

interface EditPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
  onSave: (
    id: number,
    data: Partial<Pick<Payment, "status" | "notes" | "method" | "is_manual" | "amount" | "payment_for">>
  ) => Promise<{ success: boolean; message?: string }>;
}

export function EditPaymentModal({ open, onOpenChange, payment, onSave }: EditPaymentModalProps) {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<Payment["status"]>("PENDING");
  const [method, setMethod] = useState<string>("");
  const [isManual, setIsManual] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [amountRupees, setAmountRupees] = useState<string>("");
  const [paymentFor, setPaymentFor] = useState<string>("");

  useEffect(() => {
    if (!open || !payment) return;
    setStatus(payment.status);
    setMethod(payment.method || "");
    setIsManual(Boolean(payment.is_manual));
    setNotes(payment.notes || "");
    setAmountRupees((payment.amount / 100).toString());
    setPaymentFor(payment.payment_for);
  }, [open, payment]);

  const canEditAmount = useMemo(() => isManual, [isManual]);

  const handleSubmit = async () => {
    if (!payment) return;
    setSaving(true);
    const payload: Partial<Pick<Payment, "status" | "notes" | "method" | "is_manual" | "amount" | "payment_for">> = {
      status,
      notes: notes?.trim() || "",
      method: method || null,
      is_manual: isManual,
      payment_for: paymentFor || payment.payment_for,
    };

    if (canEditAmount) {
      const num = Number(amountRupees);
      if (!Number.isFinite(num) || num <= 0) {
        setSaving(false);
        return;
      }
      payload.amount = Math.round(num * 100);
    }

    const result = await onSave(payment.id, payload);
    setSaving(false);
    if (result.success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>
            Update basic details for order {payment?.order_id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <div className="col-span-3">
              <Select value={status} onValueChange={(v: Payment["status"]) => setStatus(v)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="method" className="text-right">
              Method
            </Label>
            <div className="col-span-3">
              <Select value={method || "unknown"} onValueChange={setMethod}>
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unknown">Unknown</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="netbanking">Netbanking</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Manual</Label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="is_manual"
                type="checkbox"
                className="h-4 w-4"
                checked={isManual}
                onChange={(e) => setIsManual(e.target.checked)}
              />
              <Label htmlFor="is_manual" className="text-sm text-muted-foreground">
                Mark as manual entry
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount (₹)
            </Label>
            <div className="col-span-3">
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amountRupees}
                onChange={(e) => setAmountRupees(e.target.value)}
                disabled={!canEditAmount}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {canEditAmount ? "Enter amount in rupees" : "Enable manual to edit amount"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <div className="col-span-3">
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes"
                rows={4}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
