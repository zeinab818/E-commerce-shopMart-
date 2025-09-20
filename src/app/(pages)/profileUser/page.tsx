
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import userImage from "./../../../assets/userIcon.jpeg";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import { colors } from "@/Helpers/colors";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Loading></Loading>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">
          Please <Link href="/login" className="text-pink-600 underline">login</Link> to see your profile.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{background:colors.secondary ,color:colors.accentForeground}}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center p-6"
    >
      <Card className="w-full max-w-3xl rounded-3xl shadow-2xl border-none overflow-hidden">
        {/* Cover Section */}
        <div className="h-36 bg-gradient-to-r from-pink-500 to-purple-600"></div>

        {/* Profile Content */}
        <CardContent className="relative -mt-16 flex flex-col items-center text-center">
          <Image
            src={userImage}
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h2 style={{color:colors.accentForeground}} className="mt-4 text-2xl font-bold text-gray-800">{session.user?.name}</h2>
          <p style={{color:colors.mutedForeground}} className="text-gray-600">{session.user?.email}</p>
          {/* <p className="text-gray-600">{session.user?.email}</p> */}

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
            <Link href="/changePassword">
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-2xl py-3 shadow-lg">
                Change Password
              </Button>
            </Link>
            <Link href="/updateData">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-3 shadow-lg">
                Edit Profile
              </Button>
            </Link>
            <Link href="/address">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl py-3 shadow-lg">
                My Addresses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
