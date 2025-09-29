
"use client";

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
import type { Order } from "@/lib/types";
import { Download } from "lucide-react";
import { Logo } from "../logo";

interface DigitalReceiptDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  order: Order;
}


export function DigitalReceiptDialog({
  isOpen,
  onOpenChange,
  order,
}: DigitalReceiptDialogProps) {
  
  const handlePrint = () => {
    // In a real app, you might generate a PDF here.
    // For now, we'll just use the browser's print functionality.
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md print:shadow-none print:border-none">
        <div className="print:hidden">
            <DialogHeader>
            <DialogTitle>Your Digital Receipt</DialogTitle>
            <DialogDescription>
                Show this at the gate for verification. A copy is saved in your history.
            </DialogDescription>
            </DialogHeader>
        </div>

        <div className="py-4 space-y-6">
            <div className="text-center space-y-2">
                <div className="mx-auto h-16 w-48 flex items-center justify-center">
                    <Logo className="h-full w-full" />
                </div>
                <h2 className="text-2xl font-bold sr-only">SCAN-N-GO</h2>
                <p className="text-muted-foreground text-sm">
                    Order #{order.id.slice(-6)} &bull; {new Date(order.date).toLocaleString()}
                </p>
            </div>
            
            <Separator />

            <div>
                <h3 className="font-semibold mb-2">Purchased Items</h3>
                <ul className="space-y-1 text-sm">
                    {order.items.map((item) => (
                    <li key={item.barcode} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-mono">₹{item.price.toFixed(2)}</span>
                    </li>
                    ))}
                </ul>
            </div>

            <Separator />
            
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium font-mono">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">App Fee (5%)</span>
                    <span className="font-medium font-mono">₹{(order.totalAmount * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                    <span>Total Paid</span>
                    <span className="font-mono">₹{(order.totalAmount * 1.05).toFixed(2)}</span>
                </div>
            </div>

            <Separator />

            <div className="flex flex-col items-center justify-center text-center space-y-3">
                <p className="font-semibold">Verification Code</p>
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="140"
                    height="140"
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
                <p className="text-xs text-muted-foreground">Thank you for using SCAN-N-GO!</p>
            </div>
        </div>

        <DialogFooter className="print:hidden">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button onClick={handlePrint}>
                <Download className="mr-2 h-4 w-4" />
                Print / Save
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
