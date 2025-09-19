"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { PlusCircle, Home, Phone, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AddressAction } from "./_action/addressAction";
import { addAddressAction } from "./_action/addAddressAction";
import { removeAddressAction } from "./_action/removeAddressAction";
import { getYourAddressAction } from "./_action/getyourAddressAction";
import { colors } from "@/Helpers/colors";

interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default function Profile() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nameInput = useRef<HTMLInputElement | null>(null);
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);

  const session = useSession();
  const route = useRouter();

  async function fetchAddresses() {
    setLoading(true);
    try {
      const data = await AddressAction();
      setAddresses(Array.isArray(data.data) ? data.data : []);
    } catch {
      toast.error("Failed to fetch addresses");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchAddresses();
    } else if (session.status === "unauthenticated") {
      route.push("/login");
    }
  }, [session.status]);

  async function addAddress() {
    const newAddress = {
      name: nameInput.current?.value || "",
      details: detailsInput.current?.value || "",
      phone: phoneInput.current?.value || "",
      city: cityInput.current?.value || "",
    };

    if (!newAddress.name || !newAddress.details || !newAddress.phone || !newAddress.city) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = await addAddressAction(newAddress);

    if (data?.status === "success") {
      toast.success("Address added ✅");
      fetchAddresses();

      if (nameInput.current) nameInput.current.value = "";
      if (detailsInput.current) detailsInput.current.value = "";
      if (phoneInput.current) phoneInput.current.value = "";
      if (cityInput.current) cityInput.current.value = "";
    } else {
      toast.error(data?.message || "Failed to add address");
    }
  }

  async function deleteAddress(id: string) {
    const data = await removeAddressAction(id);
    if (data.status === "success") {
      toast.success("Address removed ✅");
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } else {
      toast.error(data.message || "Failed to delete address");
    }
  }

  async function getYourAddress(id: string) {
    const data = await getYourAddressAction(id);
    if (data.status === "success") {
      setSelectedAddress(data.data);
      setIsModalOpen(true);
    } else {
      toast.error(data.message || "Failed to get address");
    }
  }

  return (
    <div style={{background:colors.secondary ,color:colors.accentForeground}} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto p-6">
      {/* Add Address Form */}
      <Card className="shadow-lg border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> Add New Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label>Name</Label>
          <Input ref={nameInput} placeholder="Home, Office..." />
           <Label>Phone</Label>
          <Input ref={phoneInput} placeholder="0101xxxxxxx" />
          <Label>Details</Label>
          <Input ref={detailsInput} placeholder="Street, Building..." />
         
          <Label>City</Label>
          <Input ref={cityInput} placeholder="Cairo, Giza..." />
          <Button onClick={addAddress} className="w-full bg-purple-600 hover:bg-pink-500">
            Add Address
          </Button>
        </CardContent>
      </Card>

      {/* Addresses */}
      <div className="space-y-4" style={{background:colors.secondary,color:colors.accentForeground}}>
        <h2 className="text-xl font-bold text-purple-700">My Addresses</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : addresses.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2" style={{background:colors.secondary,color:colors.accentForeground}}>
            {addresses.map((addr) => (
              <motion.div
                key={addr._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{background:colors.secondary,color:colors.accentForeground}}
                className="p-4 rounded-xl border border-purple-200 shadow-md bg-gradient-to-br from-pink-50 to-purple-50"
              >
                <p style={{color:colors.accentForeground}} className="font-semibold flex items-center gap-2 text-purple-700">
                  <Home className="w-4 h-4" /> {addr.name}
                </p>
                <p style={{color:colors.accentForeground}}  className="text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {addr.phone}
                </p>
                <p  style={{color:colors.accentForeground}}  className="text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {addr.details}, {addr.city}
                </p>
              
                <div className="flex gap-2 mt-3">
                  <Button onClick={() => getYourAddress(addr._id)} className="bg-blue-100 hover:bg-blue-200 text-gray-800">
                    View
                  </Button>
                  <Button onClick={() => deleteAddress(addr._id)} variant="destructive" className="bg-red-300 hover:bg-red-400 text-gray-800">
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No addresses found</p>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Address Details</DialogTitle>
          </DialogHeader>
          {selectedAddress && (
            <div className="space-y-2">
              <p><b>Name:</b> {selectedAddress.name}</p>
              <p><b>Phone:</b> {selectedAddress.phone}</p>
              <p><b>Details:</b> {selectedAddress.details}</p>
              <p><b>City:</b> {selectedAddress.city}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
