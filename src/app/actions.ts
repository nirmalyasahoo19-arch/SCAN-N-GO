
"use server";

// Mock product data - in a real app, this would come from a database
const productDatabase: { 
  [key: string]: { 
    name: string; 
    price: number;
    originalPrice?: number;
    specialOffer?: string;
    imageUrl: string;
    modelUrl?: string;
  } 
} = {
  "885909993345": { name: "Organic Bananas", price: 1.15, originalPrice: 1.29, imageUrl: "https://picsum.photos/seed/item1/100/100", modelUrl: "" },
  "030000032644": { name: "Whole Milk, 1 gal", price: 4.59, imageUrl: "https://picsum.photos/seed/item2/100/100" },
  "049000052504": { name: "Classic Potato Chips", price: 3.49, originalPrice: 3.99, specialOffer: "2 for $6", imageUrl: "https://picsum.photos/seed/item3/100/100" },
  "722515004443": { name: "Sparkling Water, 12-pack", price: 6.49, imageUrl: "https://picsum.photos/seed/item4/100/100" },
  "078742131924": { name: "Artisanal Sourdough Bread", price: 5.25, originalPrice: 5.99, imageUrl: "https://picsum.photos/seed/item5/100/100", modelUrl: "" },
  "036000291452": { name: "Creamy Peanut Butter", price: 4.29, imageUrl: "https://picsum.photos/seed/item6/100/100" },
  "041196912759": { name: "Strawberry Jam", price: 3.79, imageUrl: "https://picsum.photos/seed/item7/100/100" },
  "016000124119": { name: "Crunchy Cereal", price: 4.49, originalPrice: 4.99, specialOffer: "Save 10%", imageUrl: "https://picsum.photos/seed/item8/100/100" },
};

export async function getProductDetails(barcode: string) {
    return productDatabase[barcode] || { name: `Unknown Item (${barcode})`, price: 0.00, imageUrl: "https://picsum.photos/seed/unknown/100/100" };
}
