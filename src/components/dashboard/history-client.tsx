"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { History, ShoppingBag, Receipt, ChevronRight, CreditCard, Banknote, Smartphone } from "lucide-react";
import { Button } from '@/components/ui/button';
import { DigitalReceiptDialog } from './digital-receipt-dialog';
import type { Order } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function HistoryClient() {
  const [history, setHistory] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedHistory = localStorage.getItem('orderHistory');
    if (storedHistory) {
      const parsedHistory: Order[] = JSON.parse(storedHistory);
      // Sort by date, newest first
      parsedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setHistory(parsedHistory);
    }
  }, []);

  const handleViewReceipt = (order: Order) => {
    setSelectedOrder(order);
    setIsReceiptOpen(true);
  };

  const PaymentIcon = ({ method }: { method: Order['paymentMethod'] }) => {
    switch (method) {
        case 'card':
            return <CreditCard className="h-4 w-4" />;
        case 'cash':
            return <Banknote className="h-4 w-4" />;
        case 'upi':
        default:
            return <Smartphone className="h-4 w-4" />;
    }
  }

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <>
      {selectedOrder && (
        <DigitalReceiptDialog
          isOpen={isReceiptOpen}
          onOpenChange={setIsReceiptOpen}
          order={selectedOrder}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Order History
          </CardTitle>
          <CardDescription>
            Review your past purchases and view digital receipts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 mt-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-2xl font-bold tracking-tight">
                  No purchase history
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your past purchases will be displayed here once you complete an order.
                </p>
              </div>
            </div>
          ) : (
             <Accordion type="single" collapsible className="w-full space-y-2">
              {history.map((order) => (
                <AccordionItem value={order.id} key={order.id} className="border bg-muted/30 rounded-lg px-4">
                   <AccordionTrigger className="hover:no-underline">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col text-left">
                                <span className="font-semibold">Order #{order.id.slice(-6)}</span>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(order.date).toLocaleDateString()} &bull; {order.items.length} items
                                </span>
                            </div>
                             <div className="flex items-center gap-4">
                                <span className="font-bold text-lg text-right flex items-center gap-2">
                                    <PaymentIcon method={order.paymentMethod} />
                                    ₹{(order.totalAmount * 1.05).toFixed(2)}
                                </span>
                             </div>
                        </div>
                    </AccordionTrigger>
                  <AccordionContent className="pt-2">
                     <div className="space-y-4">
                        <ul className="space-y-1 text-sm pl-2">
                        {order.items.map((item, index) => (
                            <li key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span className="font-mono">₹{item.price.toFixed(2)}</span>
                            </li>
                        ))}
                        </ul>
                        <Button onClick={() => handleViewReceipt(order)} className="w-full sm:w-auto">
                            <Receipt className="mr-2 h-4 w-4" />
                            View Digital Receipt
                        </Button>
                     </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </>
  );
}
