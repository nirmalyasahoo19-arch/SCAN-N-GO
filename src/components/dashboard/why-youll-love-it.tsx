import { Clock, ShoppingCart, Gift, Leaf } from "lucide-react";

const benefits = [
  { icon: Clock, text: "No More Queues", description: "Zip through checkout without waiting." },
  { icon: ShoppingCart, text: "Shop Your Way", description: "Scan, bag, and pay as you go." },
  { icon: Gift, text: "Smart Savings", description: "Get AI-powered recommendations." },
  { icon: Leaf, text: "Eco-Friendly", description: "Go paperless with digital receipts." },
];

export function WhyYoullLoveIt() {
  return (
    <ul className="space-y-4">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent mt-1 shrink-0">
            <benefit.icon className="h-5 w-5" />
          </div>
          <div>
            <span className="font-semibold">{benefit.text}</span>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
