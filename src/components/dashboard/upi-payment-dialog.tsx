"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, Banknote } from "lucide-react";

interface UpiPaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  totalAmount: number;
  onConfirm: () => void;
  paymentMethod: 'upi' | 'card' | 'cash';
}

const titles = {
    upi: "Complete UPI Payment",
    card: "Enter Card Details",
    cash: "Proceed with Cash Payment",
}

const descriptions = {
    upi: "Scan the QR code with your UPI app to complete the payment.",
    card: "Please enter your credit/debit card details on the imaginary terminal.",
    cash: "Please proceed to a checkout counter to pay with cash.",
}

export function UpiPaymentDialog({
  isOpen,
  onOpenChange,
  totalAmount,
  onConfirm,
  paymentMethod,
}: UpiPaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const commissionRate = 0.05; // 5%
  const commission = totalAmount * commissionRate;
  const finalAmount = totalAmount + commission;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call to payment gateway
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm();
  };

  // Reset processing state when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titles[paymentMethod]}</DialogTitle>
          <DialogDescription>
            {descriptions[paymentMethod]}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Cart Total</span>
                    <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">App Fee (5%)</span>
                    <span className="font-medium">₹{commission.toFixed(2)}</span>
                </div>
            </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Amount to Pay</span>
            <span>₹{finalAmount.toFixed(2)}</span>
          </div>

          <div className="p-4 rounded-lg bg-muted flex flex-col items-center justify-center text-center">
            {paymentMethod === 'upi' && (
                 <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-qr-code"
                    >
                        <rect width="5" height="5" x="3" y="3" rx="1"/>
                        <rect width="5" height="5" x="16" y="3" rx="1"/>
                        <rect width="5" height="5" x="3" y="16" rx="1"/>
                        <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                        <path d="M21 21v.01"/>
                        <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                        <path d="M3 12h.01"/>
                        <path d="M12 3h.01"/>
                        <path d="M12 16v.01"/>
                        <path d="M16 12h.01"/>
                        <path d="M21 12v.01"/>
                        <path d="M12 21v-1a2 2 0 0 1 2-2h1"/>
                    </svg>
                    <p className="mt-2 text-sm text-muted-foreground">Scan with any UPI app</p>
                </>
            )}
             {paymentMethod === 'card' && (
                 <>
                    <CreditCard className="w-20 h-20 text-muted-foreground" strokeWidth={1} />
                    <p className="mt-2 text-sm text-muted-foreground">Ready for card payment.</p>
                </>
            )}
             {paymentMethod === 'cash' && (
                 <>
                    <Banknote className="w-20 h-20 text-muted-foreground" strokeWidth={1} />
                    <p className="mt-2 text-sm text-muted-foreground">An associate will assist you.</p>
                </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Processing..." : "Confirm & Pay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
