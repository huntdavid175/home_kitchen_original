"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { checkEmail, signup } from "@/app/actions/signup";

// Validation schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onEmailSubmit(data: EmailFormValues) {
    try {
      setIsLoading(true);
      console.log("Submitting email:", data.email);
      const formData = new FormData();
      formData.append("email", data.email);

      const result = await checkEmail(formData);
      console.log("Check email result:", result);

      switch (result.status) {
        case "error":
          console.log("Showing error toast:", result.error);
          toast.error(
            result.error || "An error occurred while checking your email"
          );
          break;

        case "exists":
          console.log("Showing exists toast:", result.message);
          toast.info(
            result.message || "An account with this email already exists"
          );
          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          break;

        case "available":
          console.log("Showing success toast:", result.message);
          setEmail(data.email);
          setShowPassword(true);
          toast.success(
            result.message || "Email verified! Please create your password."
          );
          break;
      }
    } catch (error) {
      console.error("Error in onEmailSubmit:", error);
      toast.error("An error occurred while checking your email");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSignupSubmit(data: SignupFormValues) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signup(formData);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Account created successfully!");
      // Redirect to home page or dashboard
      window.location.href = "/subscribe";
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white md:bg-gray-100">
      {/* Background Image - Only visible on md screens and up */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="https://images.pexels.com/photos/12932209/pexels-photo-12932209.jpeg"
          alt="Fresh produce background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Signup Form Container */}
      <div className="relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-4xl md:rounded-lg md:bg-white md:p-8 md:shadow-lg lg:p-12">
          {/* Main Heading */}
          <h1 className="mb-8 text-center text-2xl font-bold text-green-800 md:mb-10 md:text-4xl">
            Enjoy $100 off the 1st 5 weeks of a new subscription—plus
            <span className="md:hidden">
              <br />
            </span>
            <span className="hidden md:inline"> </span>
            the 1st week ships free!
          </h1>

          {/* Responsive Container - Reorders on mobile */}
          <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-[1fr,1.2fr] md:gap-12">
            {/* How It Works Section */}
            <div className="mt-10 md:mt-0">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-700 md:mb-8">
                How it works
              </h2>

              {/* Step 1 */}
              <div className="mb-6 flex gap-4 md:mb-8">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-green-800 p-3 md:h-16 md:w-16">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 text-white md:h-10 md:w-10"
                      fill="currentColor"
                    >
                      <path d="M3,3H21a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3ZM7,5V7h10V5Z" />
                      <path d="M7,9v2h10V9Z" />
                      <path d="M7,13v2h7V13Z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-800">
                    Choose your Meals
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enjoy unlimited menu access to easy recipes and pre-made
                    meals. Select a plan you can tailor each week to meet your
                    needs.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-6 flex gap-4 md:mb-8">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-green-800 p-3 md:h-16 md:w-16">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 text-white md:h-10 md:w-10"
                      fill="currentColor"
                    >
                      <path d="M12,2.5L2,6v2c0,5.5,3.8,10.7,9,12c5.2-1.3,9-6.5,9-12V6L12,2.5z M12,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S13.7,15,12,15z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-800">
                    Receive what you need
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We'll deliver fresh produce and pre-portioned ingredients,
                    like top-quality meat and sustainably sourced seafood.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-green-800 p-3 md:h-16 md:w-16">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 text-white md:h-10 md:w-10"
                      fill="currentColor"
                    >
                      <path d="M8.1,13.34L3.91,9.16C2.35,7.59,2.35,5.06,3.91,3.5L10.93,10.5L8.1,13.34z" />
                      <path d="M14.88,11.53c1.53,0.71,3.68,0.21,5.94-1.53c3.18-2.45,4.06-5.05,1.18-7.93c-2.88-2.88-5.48-2-7.93,1.18c-1.74,2.26-2.24,4.41-1.53,5.94L4.1,18.64c-0.39,0.39-0.39,1.02,0,1.41l0.71,0.71c0.39,0.39,1.02,0.39,1.41,0l8.43-8.43C14.68,11.67,14.79,11.6,14.88,11.53z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-gray-800">
                    Enjoy restaurant-worthy meals
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Follow step-by-step recipes to create something delicious,
                    or enjoy pre-made meals delivered fresh.
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div className="flex flex-col justify-center md:rounded-lg md:bg-transparent md:p-0 md:shadow-none">
              {/* Sign In Link */}
              <div className="mb-6 text-left">
                <p className="text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-green-700 hover:text-green-800"
                  >
                    Sign in &gt;
                  </Link>
                </p>
              </div>

              {!showPassword ? (
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            EMAIL
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="h-12 w-full rounded-md border border-gray-300 px-4"
                              placeholder="Enter your email"
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="mb-6 h-12 w-full rounded-md bg-green-700 font-semibold text-white hover:bg-green-800"
                      disabled={isLoading}
                    >
                      {isLoading ? "Checking..." : "CONTINUE"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            EMAIL
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              value={email}
                              disabled
                              className="h-12 w-full rounded-md border border-gray-300 px-4 bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            PASSWORD
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={passwordVisible ? "text" : "password"}
                                className="h-12 w-full rounded-md border border-gray-300 px-4 pr-10"
                                placeholder="Create a password"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setPasswordVisible(!passwordVisible)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={
                                  passwordVisible
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {passwordVisible ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-eye-off"
                                  >
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                    <line x1="2" x2="22" y1="2" y2="22"></line>
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-eye"
                                  >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <p className="text-xs text-gray-600">
                      By continuing, you agree to our{" "}
                      <a href="#" className="text-gray-700 underline">
                        Terms of Use
                      </a>{" "}
                      and consent to our{" "}
                      <a href="#" className="text-gray-700 underline">
                        Privacy Policy
                      </a>
                    </p>

                    <Button
                      type="submit"
                      className="mb-6 h-12 w-full rounded-md bg-green-700 font-semibold text-white hover:bg-green-800"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "SIGN UP"}
                    </Button>
                  </form>
                </Form>
              )}

              <div className="relative mb-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">
                    OR
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-gray-300 font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
