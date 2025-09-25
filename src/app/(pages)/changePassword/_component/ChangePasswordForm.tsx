"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import z from "zod";
import Link from "next/link";
import { ChangePasswordSchema } from "@/components/schema/ChangePasswordSchema";
import { changePasswordAction } from "../_action/changePasswordAction";
import { useSession } from "next-auth/react";
import { colors } from "@/Helpers/colors";


type FormFieldType = z.infer<typeof ChangePasswordSchema>;

export default function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const session=useSession();  
  const form = useForm<FormFieldType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { currentPassword: "", password: "",rePassword:"" },
  });

async function onSubmit(values: FormFieldType) {
  setLoading(true);
  setApiError(null);
  setSuccessMessage(null);

  try {
    const response = await changePasswordAction({
      currentPassword: values.currentPassword,
      password: values.password,
      rePassword: values.rePassword,

    });

    if (response) {
          setSuccessMessage("Password changed successfully!");
            document.cookie = "next-auth.session-token=; Max-Age=0; path=/;";
            document.cookie = "__Secure-next-auth.session-token=; Max-Age=0; path=/;";
          session.status='unauthenticated'
          await new Promise(res => setTimeout(res, 1500));
          router.push("/login");
        } else {
      setApiError(response.message || "Change Password not verified.");
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    setApiError("Server error occurred");
  } finally {
    setLoading(false);
  }
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full container max-w-md mx-auto min-h-screen flex items-center justify-center  p-4"
    >
      <div style={{background:colors.secondary, color:colors.accent}} className="rounded-3xl shadow-2xl bg-white dark:bg-gray-900 p-8 w-full">
        <h2 style={{ color:colors.accentForeground}} className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Change Password
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-medium">
            {successMessage}
          </div>
        )}

        {/* API Error */}
        {apiError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-medium">
            {apiError}
          </div>
        )}

        {searchParams.get("error") && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-medium">
            {searchParams.get("error")}
          </div>
        )}

        <Form {...form} >
          <form style={{background:colors.secondary, color:colors.accent}} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem  style={{background:colors.secondary, color:colors.accentForeground}}> 
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter current password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem  style={{background:colors.secondary, color:colors.accentForeground}}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem  style={{background:colors.secondary, color:colors.accentForeground}}>
                  <FormLabel>RePassword</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter rePassword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-2xl shadow-lg py-3 text-lg font-semibold"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Change Password"}
              </Button>
              <div className="flex items-center justify-between mt-4">
                <Link href="/" className="text-cyan-500 hover:underline">
                  Back to Home
                </Link>
                <Link href="/forgetPassword" className="text-cyan-500 hover:underline">
                  Forget Password?
                </Link>
              </div>
          
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
