import { LogIn, Barcode, Wallet, DoorOpen } from "lucide-react";

const steps = [
  { icon: LogIn, text: "Enter & Log In", color: "bg-sky-500/10 text-sky-500" },
  { icon: Barcode, text: "Scan items", color: "bg-gray-500/10 text-gray-500" },
  { icon: Wallet, text: "Pay securely", color: "bg-green-500/10 text-green-500" },
  { icon: DoorOpen, text: "Quick Exit", color: "bg-red-500/10 text-red-500" },
];

export function HowItWorks() {
  return (
    <ul className="space-y-4">
      {steps.map((step, index) => (
        <li key={index} className="flex items-center gap-4">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step.color}`}>
            <step.icon className="h-5 w-5" />
          </div>
          <span className="font-medium">{step.text}</span>
        </li>
      ))}
    </ul>
  );
}
