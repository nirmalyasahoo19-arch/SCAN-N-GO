export interface Order {
  id: string;
  date: string;
  items: {
    barcode: string;
    name: string;
    price: number;
    originalPrice?: number;
    specialOffer?: string;
    imageUrl: string;
  }[];
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'cash';
}
