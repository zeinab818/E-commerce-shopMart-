"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { checkoutAction } from "./_action/checkoutAction";
import { cashAction } from "./_action/cashAction";

export default function Checkout({ cartId }: { cartId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingVisa, setIsLoadingVisa] = useState(false);
  const [isLoadingCash, setIsLoadingCash] = useState(false);

  const detailsInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);


  async function checkoutSession(details: string, city: string, phone: string) {
    setIsLoadingVisa(true);
    try {
      const data = await checkoutAction(cartId, details, city, phone);

      if (data.status === "success") {
        location.href = data.session.url;
      } else {
        toast.error(data.message || "Failed to create Visa payment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with Visa payment");
    } finally {
      setIsLoadingVisa(false);
    }
  }
  async function addCash(details: string, city: string, phone: string) {
    setIsLoadingCash(true);

    try {
      const data = await cashAction(cartId,details,city,phone)
      if (data.status === "success") {
        console.log(data);
        toast.success("Order created successfully (Cash) ✅");
        setIsDialogOpen(false); // 
      } else {
        toast.error(data.message || "Failed to create cash order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with Cash order");
    } finally {
      setIsLoadingCash(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
          onClick={() => setIsDialogOpen(true)}
        >
          Proceed to Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Shipping Address</DialogTitle>
          <DialogDescription>Please add Shipping Address</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="city">City</Label>
            <Input ref={cityInput} id="city" />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input ref={phoneInput} id="phone" />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="details">Details</Label>
            <Input ref={detailsInput} id="details" />
          </div>
        </div>

        <DialogFooter className="sm:justify-start space-x-2">
          <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>

          <Button
            onClick={() =>
              checkoutSession(
                detailsInput.current?.value || "",
                cityInput.current?.value || "",
                phoneInput.current?.value || ""
              )
            }
            className="cursor-pointer bg-purple-600 hover:bg-pink-500 flex items-center gap-2"
            disabled={isLoadingVisa}
          >
            {isLoadingVisa ? <Loader2 className="animate-spin w-4 h-4" /> : "Visa"}
          </Button>

          <Button
            onClick={() =>
              addCash(
                detailsInput.current?.value || "",
                cityInput.current?.value || "",
                phoneInput.current?.value || ""
              )
            }
            className="cursor-pointer bg-purple-600 hover:bg-pink-500 flex items-center gap-2"
            disabled={isLoadingCash}
          >
            {isLoadingCash ? <Loader2 className="animate-spin w-4 h-4" /> : "Cash"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
