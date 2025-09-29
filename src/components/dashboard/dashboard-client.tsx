
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Barcode, Heart, ShoppingCart, Loader2, CreditCard, BookmarkPlus, Box, Percent, Banknote, Tag, Smartphone, XCircle, Undo, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HowItWorks } from "./how-it-works";
import { WhyYoullLoveIt } from "./why-youll-love-it";
import { getProductDetails } from "@/app/actions";
import { UpiPaymentDialog } from "./upi-payment-dialog";
import { DigitalReceiptDialog } from "./digital-receipt-dialog";
import type { Order } from "@/lib/types";
import { Badge } from "@/components/ui/badge";


interface ScannedItem {
  barcode: string;
  name: string;
  price: number;
  originalPrice?: number;
  specialOffer?: string;
  imageUrl: string;
  modelUrl?: string;
}

const mockBarcodes = [
  "885909993345",
  "030000032644",
  "049000052504",
  "722515004443",
  "078742131924",
  "036000291452",
  "041196912759",
  "016000124119",
];

export default function DashboardClient() {
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<ScannedItem[]>([]);
  const [cancelledItems, setCancelledItems] = useState<ScannedItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isUpiDialogOpen, setIsUpiDialogOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash' | null>(null);

  const { toast } = useToast();

  const allActiveBarcodes = useMemo(() => {
    return [
        ...scannedItems.map(i => i.barcode),
        ...savedForLater.map(i => i.barcode),
        ...cancelledItems.map(i => i.barcode)
    ];
  }, [scannedItems, savedForLater, cancelledItems]);

  const availableBarcodes = useMemo(() => {
    return mockBarcodes.filter(b => !allActiveBarcodes.includes(b));
  }, [allActiveBarcodes]);

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 750));

    if (availableBarcodes.length === 0) {
      toast({
        title: "All items scanned!",
        description: "You've added all available mock items to your cart or saved list.",
      });
      setIsScanning(false);
      return;
    }
    const randomBarcode =
      availableBarcodes[Math.floor(Math.random() * availableBarcodes.length)];
    
    const productDetails = await getProductDetails(randomBarcode);

    setScannedItems((prev) => [...prev, { barcode: randomBarcode, ...productDetails }]);

    toast({
      title: "Item Scanned",
      description: `${productDetails.name} has been added to your cart.`,
    });
    
    setIsScanning(false);
  };
  
  const handleSuccessfulPayment = () => {
    const newOrder: Order = {
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
      items: scannedItems,
      totalAmount: totalCost,
      paymentMethod: paymentMethod || 'upi',
    };

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    history.push(newOrder);
    localStorage.setItem('orderHistory', JSON.stringify(history));

    setLastOrder(newOrder);
    setIsReceiptOpen(true);
    
    toast({
        title: "Payment Successful!",
        description: "Your order has been processed. A receipt is available."
    });

    setScannedItems([]);
    setCancelledItems([]);
    setIsUpiDialogOpen(false);
    setPaymentMethod(null);
  };

  const openPaymentDialog = (method: 'upi' | 'card' | 'cash') => {
      setPaymentMethod(method);
      setIsUpiDialogOpen(true);
  }

  const moveItem = (item: ScannedItem, from: 'cart' | 'saved' | 'cancelled', to: 'cart' | 'saved' | 'cancelled') => {
    const fromSetter = {
        'cart': setScannedItems,
        'saved': setSavedForLater,
        'cancelled': setCancelledItems,
    }[from];

    const toSetter = {
        'cart': setScannedItems,
        'saved': setSavedForLater,
        'cancelled': setCancelledItems,
    }[to];
    
    fromSetter(prev => prev.filter(i => i.barcode !== item.barcode));
    toSetter(prev => [...prev, item]);

    const toTitle = { 'cart': 'Cart', 'saved': 'Saved List', 'cancelled': 'Cancelled Items' }[to];
    toast({ title: `Item moved to ${toTitle}`, description: `${item.name} has been moved.` });
  };

  const totalCost = scannedItems.reduce((acc, item) => acc + item.price, 0);
  const totalSavings = scannedItems.reduce((acc, item) => acc + (item.originalPrice ? item.originalPrice - item.price : 0), 0);

  return (
    <>
    <UpiPaymentDialog 
        isOpen={isUpiDialogOpen}
        onOpenChange={setIsUpiDialogOpen}
        totalAmount={totalCost}
        onConfirm={handleSuccessfulPayment}
        paymentMethod={paymentMethod || 'upi'}
    />
    {lastOrder && <DigitalReceiptDialog 
      isOpen={isReceiptOpen}
      onOpenChange={setIsReceiptOpen}
      order={lastOrder}
    />}

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
      <div className="lg:col-span-1 space-y-4">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-none">
            <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-6 w-6 text-yellow-500" />
                  How It Works
                </CardTitle>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <HowItWorks />
              </AccordionContent>
            </Card>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
             <Card>
              <AccordionTrigger className="p-6 hover:no-underline">
                 <CardTitle className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-red-500" />
                    Why You'll Love It
                </CardTitle>
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <WhyYoullLoveIt />
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Barcode className="h-6 w-6 text-gray-500" />
              Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="p-8 border-2 border-dashed rounded-lg w-full bg-muted/50">
                <p className="text-muted-foreground">The "camera" view would be here.</p>
                <p className="text-sm text-muted-foreground">Click below to simulate scanning an item.</p>
            </div>
            <Button onClick={handleScan} disabled={isScanning || availableBarcodes.length === 0} className="w-full bg-sky-500 hover:bg-sky-600 text-white">
              {isScanning ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Barcode className="mr-2 h-4 w-4" />
              )}
              {isScanning ? "Scanning..." : "Simulate Scan"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              Your Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scannedItems.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty. Start scanning to add items!</p>
            ) : (
              <ul className="space-y-4">
                {scannedItems.map((item) => (
                  <li key={item.barcode} className="flex gap-4 items-start bg-muted/30 p-3 rounded-lg group">
                    <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md border bg-white" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{item.name}</h4>
                         <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => moveItem(item, 'cart', 'saved')} title="Save for later">
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive" onClick={() => moveItem(item, 'cart', 'cancelled')} title="Cancel item">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 text-sm">
                        <span className="font-bold text-primary">₹{item.price.toFixed(2)}</span>
                        {item.originalPrice && <span className="text-muted-foreground line-through">₹{item.originalPrice.toFixed(2)}</span>}
                      </div>
                       {item.specialOffer && (
                        <Badge variant="destructive" className="mt-1 gap-1 animate-pulse">
                          <Tag className="h-3 w-3" />
                          {item.specialOffer}
                        </Badge>
                      )}
                    </div>
                     {item.modelUrl !== undefined && <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 self-center" onClick={() => toast({title: "3D Model", description: "This would open a 3D model viewer."})} title="View in 3D">
                        <Box className="h-4 w-4" />
                      </Button>}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          {scannedItems.length > 0 && (
            <CardFooter className="flex-col gap-4 items-stretch">
                 {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400 p-2 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      <span className="font-medium">Total Savings</span>
                    </div>
                    <span className="font-bold">₹{totalSavings.toFixed(2)}</span>
                  </div>
                 )}
                 <div className="flex justify-between items-center border-t pt-4 font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalCost.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button onClick={() => openPaymentDialog('upi')} className="w-full bg-sky-500 hover:bg-sky-600 text-white">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Pay with UPI
                    </Button>
                     <Button onClick={() => openPaymentDialog('card')} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        <CreditCard className="mr-2 h-4 w-4"/>
                        Pay with Card
                    </Button>
                     <Button onClick={() => openPaymentDialog('cash')} className="w-full bg-green-500 hover:bg-green-600">
                        <Banknote className="mr-2 h-4 w-4"/>
                        Pay with Cash
                    </Button>
                </div>
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BookmarkPlus className="h-6 w-6 text-accent"/>
                Saved for Later
            </CardTitle>
          </CardHeader>
          <CardContent>
            {savedForLater.length === 0 ? (
                <p className="text-muted-foreground">No items saved for later.</p>
            ) : (
                <ul className="space-y-4">
                    {savedForLater.map((item) => (
                        <li key={item.barcode} className="flex gap-4 items-center bg-muted/30 p-3 rounded-lg group">
                           <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md border bg-white" />
                           <div className="flex-1">
                            <span className="font-semibold">{item.name}</span>
                            <div className="flex items-baseline gap-2 text-sm">
                                <span className="font-bold text-primary">₹{item.price.toFixed(2)}</span>
                                {item.originalPrice && <span className="text-muted-foreground line-through">₹{item.originalPrice.toFixed(2)}</span>}
                            </div>
                           </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => moveItem(item, 'saved', 'cart')} title="Move to cart">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <XCircle className="h-6 w-6 text-destructive"/>
                Cancelled Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cancelledItems.length === 0 ? (
                <p className="text-muted-foreground">No items have been cancelled.</p>
            ) : (
                <ul className="space-y-4">
                    {cancelledItems.map((item) => (
                        <li key={item.barcode} className="flex gap-4 items-center bg-destructive/10 p-3 rounded-lg group">
                           <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="rounded-md border bg-white" />
                           <div className="flex-1">
                            <span className="font-semibold line-through">{item.name}</span>
                            <div className="flex items-baseline gap-2 text-sm">
                                <span className="font-bold text-destructive line-through">₹{item.price.toFixed(2)}</span>
                            </div>
                           </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => moveItem(item, 'cancelled', 'cart')} title="Move back to cart">
                              <Undo className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              Intelligent Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">This feature is temporarily disabled.</p>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
