"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/components/schema/LoginSchema";
import Link from "next/link";
import { colors } from "@/Helpers/colors";

type FormField = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  console.log(callbackUrl);

  const form = useForm<FormField>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormField) {
    await signIn("credentials", {
      callbackUrl: callbackUrl ?? "/",
      redirect: true,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center px-4"
    >
      <div
        style={{ background: colors.secondary, color: colors.accent }}
        className="rounded-3xl shadow-2xl bg-white dark:bg-gray-900 p-8 w-full"
      >
        <h2
          style={{ color: colors.accentForeground }}
          className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100"
        >
          Login
        </h2>

        {/* API Error from searchParams */}
        {searchParams.get("error") && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center font-medium">
            {searchParams.get("error")}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem
                  style={{
                    background: colors.secondary,
                    color: colors.accentForeground,
                  }}
                >
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem
                  style={{
                    background: colors.secondary,
                    color: colors.accentForeground,
                  }}
                >
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                className="w-full mt-4 bg-purple-400 hover:bg-purple-500 text-white rounded-2xl shadow-lg py-3 text-lg font-medium"
              >
                Login
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2 text-gray-500">
          <p>
            Don&apos;t have an account?{" "}
            <Link
            href={"/register"}
              className="text-cyan-500 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link
              href={"/forgetPassword"}
              className="text-cyan-500 font-medium hover:underline"
            >
              Reset
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
