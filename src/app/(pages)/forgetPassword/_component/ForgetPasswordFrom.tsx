"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ForgetPasswordSchema } from "@/components/schema/ForgetPasswordSchema";
import { forgetPasswordAction } from "../_action/forgetPasswordAction";

import { useSession } from "next-auth/react";
import { colors } from "@/Helpers/colors";



type FormFieldType = z.infer<typeof ForgetPasswordSchema>;

export default function ForgetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const session=useSession();
  const form = useForm<FormFieldType>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
    
      email: "",
    
    },
  });

  async function onSubmit(values: FormFieldType) {
    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await forgetPasswordAction(values);
      if (response.statusMsg && response.statusMsg.toLowerCase().includes("success")) {
        setSuccessMessage(response.statusMsg);
        session.status='unauthenticated'
        setTimeout(() => router.push("/resetCode"), 1000); 
      } else {
        setApiError(response.statusMsg || "Something went wrong");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setApiError("Server error occurred");
    } finally {
      setLoading(false);
    }

    console.log(values);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
  
      className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center  p-4"
    >
      <div style={{background:colors.secondary, color:colors.accent}} className="rounded-3xl shadow-2xl bg-white dark:bg-gray-900 p-8 w-full">
        <h2 style={{ color:colors.accentForeground}} className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            ForgetPassword
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

        {/* URL Error */}
        {searchParams.get("error") && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-medium">
            {searchParams.get("error")}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
           

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem style={{background:colors.secondary, color:colors.accentForeground}}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          
    
  

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-400 text-white rounded-2xl shadow-lg py-3 text-lg font-semibold"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Send Reset Code"}
                </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
