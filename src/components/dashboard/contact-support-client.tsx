// src/components/dashboard/contact-support-client.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export function ContactSupportClient() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description:
        "Thank you for contacting us. Our support team will get back to you shortly.",
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" />
              Call Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              For immediate assistance, call our support line.
            </p>
            <p className="text-2xl font-bold mt-2">+1 (800) 555-0199</p>
            <p className="text-sm text-muted-foreground mt-1">
              Available 24/7
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Chat with a support agent right now.
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="h-6 w-6 text-primary" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Have an issue? Fill out the form below and we'll get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing Issue</SelectItem>
                    <SelectItem value="technical">Technical Problem</SelectItem>
                    <SelectItem value="item-dispute">
                      Item Dispute
                    </SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Describe your issue</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide as much detail as possible..."
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-id">Order ID (optional)</Label>
                <Input id="order-id" placeholder="e.g., #a1b2c3" />
              </div>
              <Separator />
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
